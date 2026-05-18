import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { domains as seedDomains, questions as seedQuestions } from "../data/sampleData.js";
import { predefinedQuestionSets } from "../data/predefinedQuestionSets.js";
import type {
  AuthUser,
  ClientQuestion,
  DomainCategory,
  ParsedQuestion,
  PredefinedQuestionSet,
  Question,
  StoredUser,
  TestResult,
  TestSession,
  TopicPerformance,
  UploadBank,
  UserRole
} from "../types/domain.js";

type PrismaLike = any;

const useMockDb = process.env.USE_MOCK_DB === "true" || !process.env.DATABASE_URL;
let prisma: PrismaLike | undefined;
const durationByQuestionCount: Record<number, number> = {
  10: 15,
  25: 38,
  50: 75,
  75: 90,
  100: 150,
  150: 225,
  200: 300
};

const users: StoredUser[] = [
  {
    id: "user-demo",
    name: "Pavan Learner",
    email: "student@gwcertify.local",
    role: "USER",
    passwordHash: bcrypt.hashSync("password123", 10),
    createdAt: new Date().toISOString()
  },
  {
    id: "admin-demo",
    name: "GW Admin",
    email: "admin@gwcertify.local",
    role: "ADMIN",
    passwordHash: bcrypt.hashSync("password123", 10),
    createdAt: new Date().toISOString()
  }
];

let questions: Question[] = [...seedQuestions];
const predefinedQuestions: Question[] = predefinedQuestionSets.flatMap((set) =>
  set.questions.map((question, index): Question => ({
    id: `predefined-${set.id}-${index + 1}`,
    domainId: set.domainId,
    predefinedSetId: set.id,
    prompt: question.prompt,
    options: question.options,
    answerIndex: question.answerIndex,
    answerIndexes: question.answerIndexes,
    explanation: question.explanation || "Imported from predefined Guidewire question set.",
    difficulty: "ASSOCIATE",
    tags: ["predefined", set.label, set.sourceFile],
    createdAt: new Date().toISOString(),
    source: set.sourceFile
  }))
);
const sessions: TestSession[] = [];
const uploads: UploadBank[] = [];
const questionProgressByUser = new Map<string, string[]>();

async function getPrisma(): Promise<PrismaLike> {
  if (useMockDb) {
    throw new Error("Prisma is disabled because USE_MOCK_DB is enabled or DATABASE_URL is missing.");
  }

  if (!prisma) {
    const client = await import("@prisma/client");
    prisma = new client.PrismaClient();
  }

  return prisma;
}

export function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export function toClientQuestion(question: Question): ClientQuestion {
  return {
    id: question.id,
    domainId: question.domainId,
    prompt: question.prompt,
    options: question.options,
    answerCount: getCorrectIndexes(question).length,
    difficulty: question.difficulty,
    tags: question.tags
  };
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<AuthUser> {
  const existing = await findUserByEmail(input.email);

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  if (!useMockDb) {
    const db = await getPrisma();
    const user = await db.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash,
        role: input.role ?? "USER"
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  const user: StoredUser = {
    id: randomUUID(),
    name: input.name,
    email: input.email.toLowerCase(),
    role: input.role ?? "USER",
    passwordHash,
    createdAt: new Date().toISOString()
  };
  users.push(user);

  return toAuthUser(user);
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const normalizedEmail = email.toLowerCase();

  if (!useMockDb) {
    const db = await getPrisma();
    return db.user.findUnique({ where: { email: normalizedEmail } });
  }

  return users.find((user) => user.email === normalizedEmail) ?? null;
}

export async function verifyUser(email: string, password: string): Promise<AuthUser | null> {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  return validPassword ? toAuthUser(user) : null;
}

export async function getDomains(): Promise<DomainCategory[]> {
  if (!useMockDb) {
    const db = await getPrisma();
    return db.domain.findMany({ orderBy: { name: "asc" } });
  }

  return seedDomains;
}

export async function getDashboard(userId: string) {
  const completed = await getCompletedSessions(userId);
  const totalTests = completed.length;
  const averageAccuracy = totalTests
    ? Math.round(completed.reduce((sum, session) => sum + (session.accuracy ?? 0), 0) / totalTests)
    : 78;
  const recentScores = completed.slice(-5).reverse().map((session) => ({
    id: session.id,
    testName: session.testName,
    score: session.score ?? 0,
    accuracy: session.accuracy ?? 0,
    submittedAt: session.submittedAt ?? session.startedAt
  }));

  return {
    totalTests: totalTests || 6,
    accuracy: averageAccuracy,
    recentScores:
      recentScores.length > 0
        ? recentScores
        : [
            { id: "demo-1", testName: "PolicyCenter Associate Practice", score: 48, accuracy: 80, submittedAt: new Date().toISOString() },
            { id: "demo-2", testName: "API Testing Sprint", score: 22, accuracy: 73, submittedAt: new Date().toISOString() },
            { id: "demo-3", testName: "Manual Testing Core", score: 31, accuracy: 86, submittedAt: new Date().toISOString() }
          ],
    weakDomains: await getWeakDomains(completed),
    readiness: Math.min(96, Math.max(42, averageAccuracy + 8))
  };
}

async function getCompletedSessions(userId: string): Promise<TestSession[]> {
  if (!useMockDb) {
    const db = await getPrisma();
    const dbSessions = await db.testSession.findMany({
      where: { userId, status: "COMPLETED" },
      orderBy: { submittedAt: "desc" }
    });

    return dbSessions.map(mapDbSession);
  }

  return sessions.filter((session) => session.userId === userId && session.status === "COMPLETED");
}

async function getWeakDomains(completed: TestSession[]) {
  const base = [
    { domain: "BillingCenter", accuracy: 58, attempts: 14 },
    { domain: "API Testing", accuracy: 64, attempts: 18 },
    { domain: "PolicyCenter Rules", accuracy: 69, attempts: 21 }
  ];

  if (!completed.length) {
    return base;
  }

  const domainScores = new Map<string, { correct: number; total: number }>();

  for (const session of completed) {
    for (const topic of session.topicBreakdown ?? []) {
      const current = domainScores.get(topic.domainName) ?? { correct: 0, total: 0 };
      current.correct += topic.correct;
      current.total += topic.total;
      domainScores.set(topic.domainName, current);
    }
  }

  return [...domainScores.entries()]
    .map(([domain, value]) => ({
      domain,
      accuracy: Math.round((value.correct / Math.max(value.total, 1)) * 100),
      attempts: value.total
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
}

export async function startTest(input: {
  userId: string;
  domainId?: string;
  uploadId?: string;
  predefinedSetId?: string;
  questionCount?: number;
  durationMinutes?: number;
  testName?: string;
}) {
  if (input.uploadId && input.predefinedSetId) {
    throw new Error("Choose either a predefined set or an uploaded file, not both.");
  }

  const selectedUpload = input.uploadId ? await getUploadBank(input.userId, input.uploadId) : null;
  const selectedSet = input.predefinedSetId ? getPredefinedQuestionSet(input.predefinedSetId) : null;
  const effectiveDomainId = selectedUpload?.domainId ?? selectedSet?.domainId ?? input.domainId;
  const roundQuestionPool = selectedSet
    ? predefinedQuestions.filter((question) => question.predefinedSetId === selectedSet.id)
    : selectedUpload
      ? await listQuestions({ domainId: effectiveDomainId, uploadId: selectedUpload.id })
      : seedQuestions.filter((question) => (effectiveDomainId ? question.domainId === effectiveDomainId : true));
  const selectedQuestions = await selectQuestionsForRound({
    userId: input.userId,
    domainId: effectiveDomainId,
    uploadId: selectedUpload?.id,
    predefinedSetId: selectedSet?.id,
    questions: roundQuestionPool,
    questionCount: input.questionCount ?? 25
  });

  if (!selectedQuestions.length) {
    throw new Error(
      selectedUpload
        ? "No questions found in this uploaded document. Re-upload the file or choose another uploaded bank."
        : selectedSet
          ? "No questions found in this predefined set."
          : "No questions found for this practice round."
    );
  }

  const optionOrders = buildOptionOrders(selectedQuestions);
  const clientQuestions = selectedQuestions.map((question) => toClientQuestionWithOrder(question, optionOrders[question.id]));
  const durationMinutes = input.durationMinutes ?? getDurationMinutesForQuestionCount(selectedQuestions.length);
  const session: TestSession = {
    id: randomUUID(),
    userId: input.userId,
    testName: input.testName ?? (selectedUpload ? documentTestName(selectedUpload.fileName) : selectedSet?.name ?? "PolicyCenter Associate Practice"),
    domainId: effectiveDomainId,
    uploadId: selectedUpload?.id,
    predefinedSetId: selectedSet?.id,
    durationMinutes,
    questionIds: selectedQuestions.map((question) => question.id),
    answers: {},
    markedForReview: [],
    optionOrders,
    status: "IN_PROGRESS",
    startedAt: new Date().toISOString()
  };

  if (!useMockDb) {
    const db = await getPrisma();
    const created = await db.testSession.create({
      data: {
        id: session.id,
        userId: session.userId,
        testName: session.testName,
        domainId: session.domainId,
        uploadId: session.uploadId,
        predefinedSetId: session.predefinedSetId,
        durationMinutes: session.durationMinutes,
        questionIds: session.questionIds,
        answers: session.answers,
        markedForReview: session.markedForReview,
        optionOrders: session.optionOrders,
        status: session.status
      }
    });

    return {
      session: mapDbSession(created),
      questions: clientQuestions
    };
  }

  sessions.push(session);

  return {
    session,
    questions: clientQuestions
  };
}

export async function saveAnswer(input: {
  userId: string;
  sessionId: string;
  questionId: string;
  answerIndex?: number;
  answerIndexes?: number[];
  markedForReview?: boolean;
}) {
  const session = await getSession(input.userId, input.sessionId);
  session.answers[input.questionId] = normalizeAnswerIndexes(input.answerIndexes ?? input.answerIndex ?? []);

  if (input.markedForReview === true && !session.markedForReview.includes(input.questionId)) {
    session.markedForReview.push(input.questionId);
  }

  if (input.markedForReview === false) {
    session.markedForReview = session.markedForReview.filter((id) => id !== input.questionId);
  }

  await persistSession(session);
  return session;
}

export async function submitTest(input: {
  userId: string;
  sessionId: string;
  answers: Record<string, number[] | number>;
  markedForReview?: string[];
  timeTakenSeconds: number;
}): Promise<TestResult> {
  const session = await getSession(input.userId, input.sessionId);
  session.answers = { ...session.answers, ...normalizeAnswerMap(input.answers) };
  session.markedForReview = input.markedForReview ?? session.markedForReview;

  const selectedQuestions = await getQuestionsByIds(session.questionIds);
  const result = buildResult(session, selectedQuestions, input.timeTakenSeconds);

  session.status = "COMPLETED";
  session.submittedAt = new Date().toISOString();
  session.score = result.score;
  session.accuracy = result.accuracy;
  session.timeTakenSeconds = input.timeTakenSeconds;
  session.topicBreakdown = result.topicBreakdown;
  await persistSession(session);

  return result;
}

export async function addQuestionsFromUpload(input: {
  userId: string;
  domainId: string;
  fileName: string;
  parsedQuestions: ParsedQuestion[];
}): Promise<{ upload: UploadBank; questions: Question[] }> {
  const now = new Date().toISOString();
  const upload: UploadBank = {
    id: randomUUID(),
    userId: input.userId,
    domainId: input.domainId,
    domainName: domainNameFor(input.domainId),
    fileName: input.fileName,
    questionCount: input.parsedQuestions.length,
    createdAt: now
  };
  const created = input.parsedQuestions.map((question): Question => ({
    id: randomUUID(),
    domainId: input.domainId,
    uploadId: upload.id,
    prompt: question.prompt,
    options: question.options,
    answerIndex: question.answerIndex,
    answerIndexes: question.answerIndexes,
    explanation: question.explanation ?? "Imported from uploaded question bank.",
    difficulty: "ASSOCIATE",
    tags: ["uploaded", input.fileName],
    createdAt: now,
    source: input.fileName
  }));

  if (!useMockDb) {
    const db = await getPrisma();
    await db.upload.create({
      data: {
        id: upload.id,
        userId: input.userId,
        fileName: input.fileName,
        domainId: input.domainId,
        questionCount: created.length
      }
    });
    await db.question.createMany({
      data: created.map((question) => ({
        id: question.id,
        domainId: question.domainId,
        prompt: question.prompt,
        options: question.options,
        answerIndex: question.answerIndex,
        answerIndexes: question.answerIndexes,
        explanation: question.explanation,
        difficulty: question.difficulty,
        tags: question.tags,
        source: question.source,
        uploadId: upload.id
      }))
    });

    return { upload, questions: created };
  }

  uploads.unshift(upload);
  questions = [...questions, ...created];
  return { upload, questions: created };
}

export async function listUserUploads(userId: string): Promise<UploadBank[]> {
  if (!useMockDb) {
    const db = await getPrisma();
    const dbUploads = await db.upload.findMany({
      where: { userId },
      include: { domain: true },
      orderBy: { createdAt: "desc" }
    });

    return dbUploads.map(mapDbUpload);
  }

  return uploads.filter((upload) => upload.userId === userId);
}

export function listPredefinedQuestionSets(): PredefinedQuestionSet[] {
  return predefinedQuestionSets.map((set) => ({
    id: set.id,
    name: set.name,
    label: set.label,
    sourceFile: set.sourceFile,
    domainId: set.domainId,
    domainName: domainNameFor(set.domainId),
    questionCount: set.questions.length
  }));
}

export async function getAdminAnalytics() {
  const domainList = await getDomains();
  const questionList = await listQuestions();
  const totalQuestionCount = questionList.length + predefinedQuestions.length;
  const completed = useMockDb ? sessions.filter((session) => session.status === "COMPLETED") : [];

  return {
    users: useMockDb ? users.length : undefined,
    domains: domainList.length,
    questions: totalQuestionCount,
    completedTests: completed.length,
    questionMix: domainList.map((domain) => ({
      domain: domain.name,
      questions: questionList.filter((question) => question.domainId === domain.id).length
    }))
  };
}

async function listQuestions(filter: { domainId?: string; uploadId?: string } = {}): Promise<Question[]> {
  if (!useMockDb) {
    const db = await getPrisma();
    const dbQuestions = await db.question.findMany({
      where: {
        ...(filter.domainId ? { domainId: filter.domainId } : {}),
        ...(filter.uploadId ? { uploadId: filter.uploadId } : {})
      },
      orderBy: { createdAt: "desc" }
    });

    return dbQuestions.map(mapDbQuestion);
  }

  return questions.filter((question) => {
    const domainMatches = filter.domainId ? question.domainId === filter.domainId : true;
    const uploadMatches = filter.uploadId ? question.uploadId === filter.uploadId : true;
    return domainMatches && uploadMatches;
  });
}

async function getQuestionsByIds(ids: string[]): Promise<Question[]> {
  const predefinedMatches = ids
    .map((id) => predefinedQuestions.find((question) => question.id === id))
    .filter(Boolean) as Question[];

  if (predefinedMatches.length === ids.length) {
    return ids.map((id) => predefinedMatches.find((question) => question.id === id)).filter(Boolean) as Question[];
  }

  if (!useMockDb) {
    const db = await getPrisma();
    const dbQuestions = await db.question.findMany({ where: { id: { in: ids } } });
    const mapped = [...predefinedMatches, ...dbQuestions.map(mapDbQuestion)];
    return ids.map((id) => mapped.find((question: Question) => question.id === id)).filter(Boolean) as Question[];
  }

  const allQuestions = [...predefinedMatches, ...questions];
  return ids.map((id) => allQuestions.find((question) => question.id === id)).filter(Boolean) as Question[];
}

async function getSession(userId: string, sessionId: string): Promise<TestSession> {
  if (!useMockDb) {
    const db = await getPrisma();
    const session = await db.testSession.findFirst({ where: { id: sessionId, userId } });

    if (!session) {
      throw new Error("Test session not found.");
    }

    return mapDbSession(session);
  }

  const session = sessions.find((item) => item.id === sessionId && item.userId === userId);

  if (!session) {
    throw new Error("Test session not found.");
  }

  return session;
}

async function persistSession(session: TestSession) {
  if (!useMockDb) {
    const db = await getPrisma();
    await db.testSession.update({
      where: { id: session.id },
      data: {
        answers: session.answers,
        markedForReview: session.markedForReview,
        optionOrders: session.optionOrders,
        status: session.status,
        submittedAt: session.submittedAt ? new Date(session.submittedAt) : undefined,
        score: session.score,
        accuracy: session.accuracy,
        timeTakenSeconds: session.timeTakenSeconds,
        topicBreakdown: session.topicBreakdown ?? undefined
      }
    });
  }
}

function buildResult(session: TestSession, selectedQuestions: Question[], timeTakenSeconds: number): TestResult {
  let correctAnswers = 0;
  const domainMap = new Map<string, { domainName: string; correct: number; total: number }>();
  const domainLookup = new Map(seedDomains.map((domain) => [domain.id, domain.name]));

  for (const question of selectedQuestions) {
    const givenAnswer = session.answers[question.id];
    const correctDisplayedIndexes = getCorrectDisplayedIndexes(question, session.optionOrders[question.id]);
    const isAnswered = Array.isArray(givenAnswer) && givenAnswer.length > 0;
    const isCorrect = isAnswered && sameNumberSet(givenAnswer, correctDisplayedIndexes);

    if (isCorrect) {
      correctAnswers += 1;
    }

    const domainName = domainLookup.get(question.domainId) ?? question.domainId;
    const current = domainMap.get(question.domainId) ?? { domainName, correct: 0, total: 0 };
    current.total += 1;
    current.correct += isCorrect ? 1 : 0;
    domainMap.set(question.domainId, current);
  }

  const total = selectedQuestions.length;
  const unanswered = selectedQuestions.filter((question) => !session.answers[question.id]?.length).length;
  const wrongAnswers = total - correctAnswers - unanswered;
  const topicBreakdown: TopicPerformance[] = [...domainMap.entries()].map(([domainId, value]) => ({
    domainId,
    domainName: value.domainName,
    correct: value.correct,
    total: value.total,
    accuracy: Math.round((value.correct / Math.max(value.total, 1)) * 100)
  }));

  return {
    sessionId: session.id,
    score: correctAnswers,
    total,
    accuracy: Math.round((correctAnswers / Math.max(total, 1)) * 100),
    timeTakenSeconds,
    correctAnswers,
    wrongAnswers,
    unanswered,
    topicBreakdown,
    weakAreas: topicBreakdown
      .filter((topic) => topic.accuracy < 75)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((topic) => topic.domainName)
  };
}

function mapDbQuestion(row: any): Question {
  return {
    id: row.id,
    domainId: row.domainId,
    uploadId: row.uploadId ?? undefined,
    prompt: row.prompt,
    options: row.options,
    answerIndex: row.answerIndex,
    answerIndexes: row.answerIndexes ?? [row.answerIndex],
    explanation: row.explanation,
    difficulty: row.difficulty,
    tags: row.tags ?? [],
    createdAt: row.createdAt?.toISOString?.() ?? new Date().toISOString(),
    source: row.source ?? undefined
  };
}

function mapDbSession(row: any): TestSession {
  return {
    id: row.id,
    userId: row.userId,
    testName: row.testName,
    domainId: row.domainId ?? undefined,
    uploadId: row.uploadId ?? undefined,
    predefinedSetId: row.predefinedSetId ?? undefined,
    durationMinutes: row.durationMinutes,
    questionIds: row.questionIds ?? [],
    answers: row.answers ?? {},
    markedForReview: row.markedForReview ?? [],
    optionOrders: row.optionOrders ?? {},
    status: row.status,
    startedAt: row.startedAt?.toISOString?.() ?? new Date().toISOString(),
    submittedAt: row.submittedAt?.toISOString?.(),
    score: row.score ?? undefined,
    accuracy: row.accuracy ?? undefined,
    timeTakenSeconds: row.timeTakenSeconds ?? undefined,
    topicBreakdown: row.topicBreakdown ?? undefined
  };
}

async function selectQuestionsForRound(input: {
  userId: string;
  domainId?: string;
  uploadId?: string;
  predefinedSetId?: string;
  questions: Question[];
  questionCount: number;
}): Promise<Question[]> {
  const count = Math.min(Math.max(input.questionCount, 1), 200, input.questions.length);
  const key = `${input.userId}:${input.predefinedSetId ?? input.uploadId ?? input.domainId ?? "all"}`;
  const allIds = new Set(input.questions.map((question) => question.id));
  let usedIds = (
    questionProgressByUser.get(key) ??
    (await getHistoricalQuestionIds(input.userId, input.domainId, input.uploadId, input.predefinedSetId))
  ).filter((id) => allIds.has(id));
  let remaining = input.questions.filter((question) => !usedIds.includes(question.id));

  if (!remaining.length) {
    usedIds = [];
    remaining = input.questions;
  }

  const selected = shuffle(remaining).slice(0, count);
  let nextUsedIds = [...usedIds, ...selected.map((question) => question.id)];

  if (selected.length < count) {
    const selectedIds = new Set(selected.map((question) => question.id));
    const topUp = shuffle(input.questions.filter((question) => !selectedIds.has(question.id))).slice(0, count - selected.length);
    selected.push(...topUp);
    nextUsedIds = selected.map((question) => question.id);
  }

  questionProgressByUser.set(key, [...new Set(nextUsedIds)]);
  return selected;
}

async function getHistoricalQuestionIds(
  userId: string,
  domainId?: string,
  uploadId?: string,
  predefinedSetId?: string
): Promise<string[]> {
  if (useMockDb) {
    return sessions
      .filter(
        (session) =>
          session.userId === userId &&
          (domainId ? session.domainId === domainId : true) &&
          (uploadId ? session.uploadId === uploadId : true) &&
          (predefinedSetId ? session.predefinedSetId === predefinedSetId : true)
      )
      .flatMap((session) => session.questionIds);
  }

  const db = await getPrisma();
  const dbSessions = await db.testSession.findMany({
    where: {
      userId,
      ...(domainId ? { domainId } : {}),
      ...(uploadId ? { uploadId } : {}),
      ...(predefinedSetId ? { predefinedSetId } : {})
    },
    orderBy: { startedAt: "asc" },
    select: { questionIds: true }
  });

  return dbSessions.flatMap((session: { questionIds: string[] }) => session.questionIds ?? []);
}

function buildOptionOrders(selectedQuestions: Question[]): Record<string, number[]> {
  return Object.fromEntries(
    selectedQuestions.map((question) => [question.id, shuffle(question.options.map((_option, index) => index))])
  );
}

function toClientQuestionWithOrder(question: Question, optionOrder: number[]): ClientQuestion {
  return {
    ...toClientQuestion(question),
    options: optionOrder.map((optionIndex) => question.options[optionIndex])
  };
}

function getCorrectIndexes(question: Question): number[] {
  const indexes = question.answerIndexes?.length ? question.answerIndexes : [question.answerIndex];
  return [...new Set(indexes)].filter((index) => index >= 0 && index < question.options.length);
}

function getCorrectDisplayedIndexes(question: Question, optionOrder: number[] = question.options.map((_option, index) => index)): number[] {
  const correctOriginalIndexes = new Set(getCorrectIndexes(question));
  return optionOrder
    .map((originalIndex, displayedIndex) => (correctOriginalIndexes.has(originalIndex) ? displayedIndex : -1))
    .filter((index) => index >= 0);
}

function normalizeAnswerMap(answers: Record<string, number[] | number>): Record<string, number[]> {
  return Object.fromEntries(Object.entries(answers).map(([questionId, answer]) => [questionId, normalizeAnswerIndexes(answer)]));
}

function normalizeAnswerIndexes(answer: number[] | number): number[] {
  if (Array.isArray(answer)) {
    return [...new Set(answer)].sort((a, b) => a - b);
  }

  return Number.isFinite(answer) ? [answer] : [];
}

function sameNumberSet(left: number[], right: number[]): boolean {
  const normalizedLeft = [...new Set(left)].sort((a, b) => a - b);
  const normalizedRight = [...new Set(right)].sort((a, b) => a - b);

  return normalizedLeft.length === normalizedRight.length && normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

async function getDefaultUploadBank(userId: string): Promise<UploadBank | null> {
  const userUploads = await listUserUploads(userId);
  return userUploads[0] ?? null;
}

async function getUploadBank(userId: string, uploadId: string): Promise<UploadBank> {
  const upload = (await listUserUploads(userId)).find((item) => item.id === uploadId);

  if (!upload) {
    throw new Error("Uploaded question bank not found for this user.");
  }

  return upload;
}

function getPredefinedQuestionSet(setId: string): PredefinedQuestionSet {
  const set = listPredefinedQuestionSets().find((item) => item.id === setId);

  if (!set) {
    throw new Error("Predefined question set not found.");
  }

  return set;
}

function mapDbUpload(row: any): UploadBank {
  return {
    id: row.id,
    userId: row.userId,
    domainId: row.domainId,
    domainName: row.domain?.name ?? domainNameFor(row.domainId),
    fileName: row.fileName,
    questionCount: row.questionCount,
    createdAt: row.createdAt?.toISOString?.() ?? new Date().toISOString()
  };
}

function domainNameFor(domainId: string): string {
  return seedDomains.find((domain) => domain.id === domainId)?.name ?? domainId;
}

function documentTestName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "").slice(0, 80);
}

function getDurationMinutesForQuestionCount(questionCount: number): number {
  return durationByQuestionCount[questionCount] ?? Math.ceil(questionCount * 1.5);
}
