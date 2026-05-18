import { dashboardData, demoAdmin, demoResult, demoSession, demoUser, domains, questionBank } from "./mock-data";
import type { DashboardData, DomainCategory, PredefinedQuestionSet, TestResult, TestSession, UploadBank, User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const durationByQuestionCount: Record<number, number> = {
  10: 15,
  25: 38,
  50: 75,
  75: 90,
  100: 150,
  150: 225,
  200: 300
};

interface AuthResponse {
  user: User;
  token: string;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(error?.message ?? "Request failed.");
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    return await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  } catch (error) {
    if (password === "password123" && email === demoAdmin.email) {
      return { user: demoAdmin, token: "mock-admin-token" };
    }

    if (password === "password123") {
      return { user: demoUser, token: "mock-user-token" };
    }

    throw error;
  }
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    return await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  } catch {
    return {
      user: { ...demoUser, id: `mock-${Date.now()}`, name, email },
      token: "mock-user-token"
    };
  }
}

export async function getDashboard(token: string): Promise<DashboardData> {
  try {
    return await apiRequest<DashboardData>("/dashboard", {}, token);
  } catch {
    return dashboardData;
  }
}

export async function getDomains(token: string): Promise<DomainCategory[]> {
  try {
    return await apiRequest<DomainCategory[]>("/domains", {}, token);
  } catch {
    return domains;
  }
}

export async function getUploadBanks(token: string): Promise<UploadBank[]> {
  try {
    return await apiRequest<UploadBank[]>("/uploads", {}, token);
  } catch {
    return [];
  }
}

export async function getPredefinedQuestionSets(token: string): Promise<PredefinedQuestionSet[]> {
  return apiRequest<PredefinedQuestionSet[]>("/tests/predefined-sets", {}, token);
}

export async function startPracticeTest(
  token: string,
  input: {
    questionCount?: number;
    uploadId?: string;
    predefinedSetId?: string;
    testName?: string;
  } = {}
): Promise<{
  session: TestSession;
  questions: typeof questionBank;
}> {
  const questionCount = input.questionCount ?? 25;

  try {
    return await apiRequest<{ session: TestSession; questions: typeof questionBank }>("/tests/start", {
      method: "POST",
      body: JSON.stringify({
        testName: input.testName ?? (input.uploadId ? "Uploaded Question Bank Practice" : "PolicyCenter Associate Practice"),
        ...(input.uploadId ? { uploadId: input.uploadId } : {}),
        ...(input.predefinedSetId ? { predefinedSetId: input.predefinedSetId } : {}),
        questionCount
      })
    }, token);
  } catch (error) {
    if (input.uploadId || input.predefinedSetId) {
      throw error;
    }

    return {
      session: demoSession,
      questions: questionBank.slice(0, questionCount)
    };
  }
}

export function getDurationMinutesForQuestionCount(questionCount: number): number {
  return durationByQuestionCount[questionCount] ?? Math.ceil(questionCount * 1.5);
}

export async function submitPracticeTest(
  token: string,
  sessionId: string,
  answers: Record<string, number[]>,
  markedForReview: string[],
  timeTakenSeconds: number
): Promise<TestResult> {
  try {
    return await apiRequest<TestResult>(`/tests/${sessionId}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers, markedForReview, timeTakenSeconds })
    }, token);
  } catch {
    let correct = 0;

    for (const question of questionBank) {
      const expected = question.answerIndexes?.length ? question.answerIndexes : [question.answerIndex];
      const actual = answers[question.id] ?? [];

      if (sameNumberSet(actual, expected)) {
        correct += 1;
      }
    }

    const total = questionBank.length;
    return {
      ...demoResult,
      sessionId,
      score: correct,
      total,
      accuracy: Math.round((correct / Math.max(total, 1)) * 100),
      timeTakenSeconds,
      correctAnswers: correct,
      wrongAnswers: Object.values(answers).filter((answer) => answer.length > 0).length - correct,
      unanswered: total - Object.values(answers).filter((answer) => answer.length > 0).length
    };
  }
}

function sameNumberSet(left: number[], right: number[]): boolean {
  const normalizedLeft = [...new Set(left)].sort((a, b) => a - b);
  const normalizedRight = [...new Set(right)].sort((a, b) => a - b);

  return normalizedLeft.length === normalizedRight.length && normalizedLeft.every((value, index) => value === normalizedRight[index]);
}

export async function uploadQuestionBank(token: string, formData: FormData) {
  const response = await fetch(`${API_URL}/uploads/questions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(error?.message ?? "Upload failed.");
  }

  return response.json() as Promise<{
    uploadId: string;
    upload: UploadBank;
    fileName: string;
    detectedQuestions: number;
    storedQuestions: number;
    preview: Array<{ id: string; prompt: string; options: string[] }>;
  }>;
}

export async function getAdminAnalytics(token: string) {
  try {
    return await apiRequest<{
      users?: number;
      domains: number;
      questions: number;
      completedTests: number;
      questionMix: Array<{ domain: string; questions: number }>;
    }>("/admin/analytics", {}, token);
  } catch {
    return {
      users: 2,
      domains: domains.length,
      questions: questionBank.length,
      completedTests: 9,
      questionMix: domains.map((domain) => ({
        domain: domain.name,
        questions: questionBank.filter((question) => question.domainId === domain.id).length
      }))
    };
  }
}
