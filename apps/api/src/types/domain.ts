export type UserRole = "USER" | "ADMIN";
export type Difficulty = "FOUNDATION" | "ASSOCIATE" | "PROFESSIONAL";
export type SessionStatus = "IN_PROGRESS" | "COMPLETED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StoredUser extends AuthUser {
  passwordHash: string;
  createdAt: string;
}

export interface DomainCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Question {
  id: string;
  domainId: string;
  uploadId?: string;
  predefinedSetId?: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  answerIndexes?: number[];
  explanation: string;
  difficulty: Difficulty;
  tags: string[];
  createdAt: string;
  source?: string;
}

export interface UploadBank {
  id: string;
  userId: string;
  domainId: string;
  domainName?: string;
  fileName: string;
  questionCount: number;
  createdAt: string;
}

export interface PredefinedQuestionSet {
  id: string;
  name: string;
  label: string;
  sourceFile: string;
  domainId: string;
  domainName?: string;
  questionCount: number;
}

export interface ClientQuestion {
  id: string;
  domainId: string;
  prompt: string;
  options: string[];
  answerCount?: number;
  difficulty: Difficulty;
  tags: string[];
}

export interface TestSession {
  id: string;
  userId: string;
  testName: string;
  domainId?: string;
  uploadId?: string;
  predefinedSetId?: string;
  durationMinutes: number;
  questionIds: string[];
  answers: Record<string, number[]>;
  markedForReview: string[];
  optionOrders: Record<string, number[]>;
  status: SessionStatus;
  startedAt: string;
  submittedAt?: string;
  score?: number;
  accuracy?: number;
  timeTakenSeconds?: number;
  topicBreakdown?: TopicPerformance[];
}

export interface TopicPerformance {
  domainId: string;
  domainName: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface TestResult {
  sessionId: string;
  score: number;
  total: number;
  accuracy: number;
  timeTakenSeconds: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  topicBreakdown: TopicPerformance[];
  weakAreas: string[];
  questionReview: QuestionReviewItem[];
}

export interface QuestionReviewItem {
  questionId: string;
  domainId: string;
  domainName: string;
  prompt: string;
  options: string[];
  selectedIndexes: number[];
  correctIndexes: number[];
  selectedOptions: string[];
  correctOptions: string[];
  isAnswered: boolean;
  isCorrect: boolean;
  explanation?: string;
}

export interface ParsedQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  answerIndexes: number[];
  explanation?: string;
}
