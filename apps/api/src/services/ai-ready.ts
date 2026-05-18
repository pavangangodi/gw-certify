import type { ParsedQuestion } from "../types/domain.js";

export interface QuestionEnhancer {
  enhance(questions: ParsedQuestion[]): Promise<ParsedQuestion[]>;
}

class NoopQuestionEnhancer implements QuestionEnhancer {
  async enhance(questions: ParsedQuestion[]): Promise<ParsedQuestion[]> {
    return questions;
  }
}

export function createQuestionEnhancer(): QuestionEnhancer {
  // Future OpenAI integration can be selected here through env flags without changing upload routes.
  return new NoopQuestionEnhancer();
}
