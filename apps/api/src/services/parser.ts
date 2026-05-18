import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import ExcelJS from "exceljs";
import type { ParsedQuestion } from "../types/domain.js";

const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const questionStartPattern = /(?=^ *(?:Q|Question)\s*\d+[\).:\- ]+)/gim;
const correctMarkerPattern = /^[✔✓☑✅]\s*/u;
const answerOnlyTargetOptionCount = 4;

interface AnswerOnlyQuestion {
  prompt: string;
  correctOptions: string[];
  wrongOptions: string[];
}

export function parseMcqText(rawText: string): ParsedQuestion[] {
  const normalized = rawText
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+$/gm, "")
    .trim();

  if (!normalized) {
    return [];
  }

  const blocks = normalized
    .split(questionStartPattern)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map(parseQuestionBlock)
    .filter((question): question is ParsedQuestion => Boolean(question));
}

function parseQuestionBlock(block: string): ParsedQuestion | null {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const prompt = lines[0]
    .replace(/^(?:Q|Question)\s*\d+[\).:\- ]*/i, "")
    .trim();
  const options: string[] = [];
  const answerIndexes: number[] = [];
  let explicitAnswerText = "";
  let explanation = "";

  for (const line of lines.slice(1)) {
    if (/^note\s*:/i.test(line)) {
      continue;
    }

    if (/^(?:answer|answers|correct answer|correct answers)\s*:/i.test(line)) {
      explicitAnswerText = line.replace(/^(?:answer|answers|correct answer|correct answers)\s*:\s*/i, "").trim();
      continue;
    }

    if (/^(?:explanation|rationale)\s*:/i.test(line)) {
      explanation = line.replace(/^(?:explanation|rationale)\s*:\s*/i, "").trim();
      continue;
    }

    const markedCorrect = correctMarkerPattern.test(line) || /^correct\s*[:\-]/i.test(line);
    const optionText = cleanOptionText(line);

    if (!optionText) {
      continue;
    }

    const optionIndex = options.length;
    options.push(optionText);

    if (markedCorrect) {
      answerIndexes.push(optionIndex);
    }
  }

  if (!answerIndexes.length && explicitAnswerText) {
    answerIndexes.push(...resolveExplicitAnswers(explicitAnswerText, options));
  }

  const uniqueAnswerIndexes = [...new Set(answerIndexes)].filter((index) => index >= 0 && index < options.length);
  const answerIndex = uniqueAnswerIndexes[0] ?? -1;

  if (!prompt || options.length < 2 || answerIndex < 0) {
    return null;
  }

  return {
    prompt,
    options,
    answerIndex,
    answerIndexes: uniqueAnswerIndexes,
    explanation
  };
}

export async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  const extension = file.originalname.toLowerCase().split(".").pop();

  if (extension === "txt") {
    return file.buffer.toString("utf8");
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }

  if (extension === "xlsx" || extension === "xlsm") {
    return extractTextFromWorkbook(file.buffer);
  }

  if (extension === "csv") {
    return extractTextFromCsv(file.buffer.toString("utf8"));
  }

  if (extension === "pdf") {
    const result = await pdfParse(file.buffer);
    return result.text;
  }

  throw new Error("Unsupported file type. Upload PDF, DOCX, TXT, XLSX, XLSM, or CSV.");
}

function cleanOptionText(line: string): string {
  return line
    .replace(correctMarkerPattern, "")
    .replace(/^correct\s*[:\-]\s*/i, "")
    .replace(/^option\s+[A-H]\s*[\).:\-]\s*/i, "")
    .replace(/^\(?([A-H])\)?[\).:\-]\s+/i, "")
    .replace(/^[•\-–]\s+/, "")
    .trim();
}

function resolveExplicitAnswers(answerText: string, options: string[]): number[] {
  const normalized = answerText.replace(/\band\b/gi, ",");
  const letterMatches = normalized.match(/\b[A-H]\b/gi) ?? [];
  const letterIndexes = letterMatches
    .map((letter) => optionLetters.indexOf(letter.toUpperCase()))
    .filter((index) => index >= 0 && index < options.length);

  if (letterIndexes.length) {
    return [...new Set(letterIndexes)];
  }

  const numberMatches = normalized.match(/\b\d+\b/g) ?? [];
  const numberIndexes = numberMatches
    .map((value) => Number(value) - 1)
    .filter((index) => index >= 0 && index < options.length);

  if (numberIndexes.length) {
    return [...new Set(numberIndexes)];
  }

  const answerLower = normalizeForMatch(answerText);
  return options
    .map((option, index) => ({ option: normalizeForMatch(option), index }))
    .filter(({ option }) => answerLower.includes(option) || option.includes(answerLower))
    .map(({ index }) => index);
}

async function extractTextFromWorkbook(buffer: Buffer): Promise<string> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
  const extractedBlocks: string[] = [];
  const answerOnlyQuestions: AnswerOnlyQuestion[] = [];

  workbook.eachSheet((worksheet) => {
    const rows = readWorksheetRows(worksheet);
    const structuredAnswerOnly = extractStructuredAnswerOnlyRows(rows);
    const alternatingAnswerOnly = extractAlternatingAnswerOnlyRows(rows);
    const answerOnlyRows =
      alternatingAnswerOnly.length > structuredAnswerOnly.length ? alternatingAnswerOnly : structuredAnswerOnly;

    if (answerOnlyRows.length) {
      answerOnlyQuestions.push(...answerOnlyRows);
      return;
    }

    const header = rows[0] ?? [];
    const headerMap = buildHeaderMap(header);

    if (headerMap.questionIndex >= 0 && headerMap.optionIndexes.length >= 2) {
      rows.slice(1).forEach((row, rowIndex) => {
        const cells = row;
        const question = cells[headerMap.questionIndex];

        if (!question) {
          return;
        }

        const lines = [`Q${rowIndex + 1}. ${question}`];
        headerMap.optionIndexes.forEach((columnIndex, optionIndex) => {
          const option = cells[columnIndex];

          if (option) {
            lines.push(`${optionLetters[optionIndex]}. ${option}`);
          }
        });

        const answer = headerMap.answerIndex >= 0 ? cells[headerMap.answerIndex] : "";

        if (answer) {
          lines.push(`Answer: ${answer}`);
        }

        extractedBlocks.push(lines.join("\n"));
      });
      return;
    }

    rows.forEach((row) => {
      const cells = row.filter(Boolean);

      if (cells.length) {
        extractedBlocks.push(cells.join("\n"));
      }
    });
  });

  if (answerOnlyQuestions.length) {
    return answerOnlyQuestionsToMcqText(answerOnlyQuestions);
  }

  return extractedBlocks.join("\n\n");
}

function extractTextFromCsv(text: string): string {
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim()));
  const headerMap = buildHeaderMap(rows[0] ?? []);

  if (headerMap.questionIndex < 0 || headerMap.optionIndexes.length < 2) {
    return text;
  }

  return rows
    .slice(1)
    .map((cells, rowIndex) => {
      const lines = [`Q${rowIndex + 1}. ${cells[headerMap.questionIndex] ?? ""}`];
      headerMap.optionIndexes.forEach((columnIndex, optionIndex) => {
        if (cells[columnIndex]) {
          lines.push(`${optionLetters[optionIndex]}. ${cells[columnIndex]}`);
        }
      });
      if (headerMap.answerIndex >= 0 && cells[headerMap.answerIndex]) {
        lines.push(`Answer: ${cells[headerMap.answerIndex]}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");
}

function buildHeaderMap(headers: string[]) {
  const normalized = headers.map((header) => normalizeForMatch(header));
  const questionIndex = normalized.findIndex((header) => ["question", "prompt", "questiontext"].includes(header));
  const answerIndex = normalized.findIndex((header) => ["answer", "answers", "correctanswer", "correctanswers", "correct"].includes(header));
  const optionIndexes = normalized
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => /^option[a-h]$/.test(header) || /^[a-h]$/.test(header) || /^choice[a-h]$/.test(header))
    .map(({ index }) => index);

  return { questionIndex, answerIndex, optionIndexes };
}

function readWorksheetRows(worksheet: ExcelJS.Worksheet): string[][] {
  const rows: string[][] = [];

  worksheet.eachRow((row) => {
    const cells: string[] = [];

    for (let columnIndex = 1; columnIndex <= Math.max(worksheet.columnCount, 1); columnIndex += 1) {
      cells.push(cellToText(row.getCell(columnIndex).value));
    }

    rows.push(cells);
  });

  return rows;
}

function extractStructuredAnswerOnlyRows(rows: string[][]): AnswerOnlyQuestion[] {
  const headerIndex = rows.findIndex((row) => {
    const normalized = row.map(normalizeForMatch);
    return normalized.some((cell) => ["answer", "answers", "correctanswer", "correctanswers"].includes(cell));
  });
  const header = headerIndex >= 0 ? rows[headerIndex] : [];
  const headerMap = buildHeaderMap(header);
  const result: AnswerOnlyQuestion[] = [];

  if (headerMap.questionIndex >= 0 && headerMap.answerIndex >= 0 && headerMap.optionIndexes.length === 0) {
    rows.slice(headerIndex + 1).forEach((row) => {
      const prompt = row[headerMap.questionIndex];
      const answer = row[headerMap.answerIndex];

      if (isUsablePrompt(prompt) && answer) {
        result.push({
          prompt,
          correctOptions: splitAnswerText(answer),
          wrongOptions: []
        });
      }
    });

    return result;
  }

  // Support simple dump sheets like: Sl#, Question, Answers.
  rows.forEach((row) => {
    const [serial, prompt, answer] = row;

    if (/^\d+$/.test(serial) && isUsablePrompt(prompt) && answer && normalizeForMatch(answer) !== "answers") {
      result.push({
        prompt,
        correctOptions: splitAnswerText(answer),
        wrongOptions: []
      });
    }
  });

  return result;
}

function extractAlternatingAnswerOnlyRows(rows: string[][]): AnswerOnlyQuestion[] {
  const result: AnswerOnlyQuestion[] = [];
  let current: AnswerOnlyQuestion | null = null;
  let collectingWrongOptions = false;

  const finishCurrent = () => {
    if (current && current.prompt && current.correctOptions.length) {
      result.push({
        prompt: current.prompt,
        correctOptions: uniqueTexts(current.correctOptions),
        wrongOptions: uniqueTexts(current.wrongOptions)
      });
    }
  };

  rows.forEach((row) => {
    const serial = row[0];
    const text = row.find((cell, index) => index > 0 && Boolean(cell)) ?? "";

    if (!text) {
      return;
    }

    if (/^wrong options?/i.test(text)) {
      collectingWrongOptions = true;
      return;
    }

    const startsNumberedQuestion = /^\d+$/.test(serial) && isUsablePrompt(text);
    const startsInlineQuestion = current && current.correctOptions.length > 0 && isQuestionLike(text);

    if (startsNumberedQuestion || startsInlineQuestion) {
      finishCurrent();
      current = {
        prompt: text,
        correctOptions: [],
        wrongOptions: []
      };
      collectingWrongOptions = false;
      return;
    }

    if (!current) {
      return;
    }

    if (collectingWrongOptions) {
      current.wrongOptions.push(...splitAnswerText(text));
    } else {
      current.correctOptions.push(...splitAnswerText(text));
    }
  });

  finishCurrent();
  return result;
}

function answerOnlyQuestionsToMcqText(records: AnswerOnlyQuestion[]): string {
  const answerPool = uniqueTexts(records.flatMap((record) => [...record.correctOptions, ...record.wrongOptions]));

  return records
    .map((record, index) => {
      const correctOptions = uniqueTexts(record.correctOptions).slice(0, optionLetters.length);
      const wrongOptions = uniqueTexts(record.wrongOptions);
      const neededDistractors = Math.max(answerOnlyTargetOptionCount - correctOptions.length, 1);
      const distractors = chooseDistractors({
        prompt: record.prompt,
        correctOptions,
        preferredDistractors: wrongOptions,
        answerPool,
        count: neededDistractors
      });
      const options = shuffleStrings([...correctOptions.map((text) => ({ text, correct: true })), ...distractors.map((text) => ({ text, correct: false }))]);
      const lines = [`Q${index + 1}. ${record.prompt}`];

      options.forEach((option) => {
        lines.push(`${option.correct ? "✔ " : ""}${option.text}`);
      });

      lines.push(`Note: Choose ${correctOptions.length} option${correctOptions.length > 1 ? "s" : ""}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function chooseDistractors(input: {
  prompt: string;
  correctOptions: string[];
  preferredDistractors: string[];
  answerPool: string[];
  count: number;
}): string[] {
  const correctSet = new Set(input.correctOptions.map(normalizeForMatch));
  const promptSet = new Set(input.prompt.split(/\s+/).map(normalizeForMatch).filter((word) => word.length > 3));
  const selected: string[] = [];
  const candidates = uniqueTexts([...input.preferredDistractors, ...shuffleStrings(input.answerPool)]);

  for (const candidate of candidates) {
    const normalized = normalizeForMatch(candidate);

    if (!normalized || correctSet.has(normalized) || selected.some((item) => normalizeForMatch(item) === normalized)) {
      continue;
    }

    // Prefer corpus distractors that are not simply a restatement of the prompt.
    const candidateTokens = candidate.split(/\s+/).map(normalizeForMatch).filter((word) => word.length > 3);
    const overlap = candidateTokens.filter((token) => promptSet.has(token)).length;

    if (candidateTokens.length > 0 && overlap === candidateTokens.length) {
      continue;
    }

    selected.push(candidate);

    if (selected.length >= input.count) {
      return selected;
    }
  }

  return selected;
}

function splitAnswerText(answer: string): string[] {
  const normalized = answer
    .replace(/\r/g, "\n")
    .replace(/[•●]/g, "\n")
    .replace(/\s+(\d+)\.\s*/g, "\n$1. ")
    .trim();
  const numbered = normalized.split(/\n?\d+\.\s+/).map(cleanGeneratedOption).filter(Boolean);

  if (numbered.length > 1) {
    return numbered;
  }

  if (normalized.includes("\n")) {
    return normalized.split("\n").map(cleanGeneratedOption).filter(Boolean);
  }

  const commaParts = normalized.split(/\s*,\s*/).map(cleanGeneratedOption).filter(Boolean);

  if (commaParts.length > 1 && commaParts.every((part) => part.length <= 90)) {
    return commaParts;
  }

  return [cleanGeneratedOption(normalized)].filter(Boolean);
}

function cleanGeneratedOption(value: string): string {
  return value.replace(/^\d+\.\s*/, "").replace(/\s+/g, " ").trim();
}

function uniqueTexts(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  values.map(cleanGeneratedOption).filter(Boolean).forEach((value) => {
    const key = normalizeForMatch(value);

    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  });

  return result;
}

function isUsablePrompt(value: string): boolean {
  const normalized = normalizeForMatch(value);
  return normalized.length >= 8 && !["question", "questions", "answer", "answers", "sl"].includes(normalized);
}

function isQuestionLike(value: string): boolean {
  return /[?]$/.test(value) || /^(what|which|where|why|how|when|during|select|according|all of|in which|who)\b/i.test(value);
}

function shuffleStrings<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function cellToText(cell: unknown): string {
  if (cell === null || cell === undefined) {
    return "";
  }

  if (typeof cell === "object" && "text" in cell) {
    return String((cell as { text?: unknown }).text ?? "").trim();
  }

  if (typeof cell === "object" && "richText" in cell && Array.isArray((cell as { richText?: unknown }).richText)) {
    return ((cell as { richText: Array<{ text?: unknown }> }).richText)
      .map((part) => String(part.text ?? ""))
      .join("")
      .trim();
  }

  if (typeof cell === "object" && "result" in cell) {
    return String((cell as { result?: unknown }).result ?? "").trim();
  }

  if (cell instanceof Date) {
    return cell.toISOString();
  }

  return String(cell).trim();
}

function normalizeForMatch(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
