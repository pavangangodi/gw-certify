export type UserRole = "USER" | "ADMIN";
export type Difficulty = "FOUNDATION" | "ASSOCIATE" | "PROFESSIONAL";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface DomainCategory {
  id: string;
  name: string;
  description: string;
  color: string;
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

export interface PracticeQuestion extends ClientQuestion {
  answerIndex: number;
  answerIndexes?: number[];
  explanation: string;
}

export interface DashboardData {
  totalTests: number;
  accuracy: number;
  readiness: number;
  recentScores: Array<{
    id: string;
    testName: string;
    score: number;
    accuracy: number;
    submittedAt: string;
  }>;
  weakDomains: Array<{
    domain: string;
    accuracy: number;
    attempts: number;
  }>;
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
  optionOrders?: Record<string, number[]>;
  status: "IN_PROGRESS" | "COMPLETED";
  startedAt: string;
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
  topicBreakdown: Array<{
    domainId: string;
    domainName: string;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  weakAreas: string[];
}
