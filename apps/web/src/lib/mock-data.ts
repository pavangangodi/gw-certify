import type { DashboardData, DomainCategory, PracticeQuestion, TestResult, TestSession, User } from "./types";

export const demoUser: User = {
  id: "user-demo",
  name: "Pavan Learner",
  email: "student@gwcertify.local",
  role: "USER"
};

export const demoAdmin: User = {
  id: "admin-demo",
  name: "GW Admin",
  email: "admin@gwcertify.local",
  role: "ADMIN"
};

export const domains: DomainCategory[] = [
  {
    id: "policycenter",
    name: "Guidewire PolicyCenter",
    description: "Policy lifecycle, submissions, renewals, product model, and underwriting.",
    color: "cyan"
  },
  {
    id: "claimcenter",
    name: "ClaimCenter",
    description: "Claims intake, exposures, assignments, activities, and recovery basics.",
    color: "emerald"
  },
  {
    id: "billingcenter",
    name: "BillingCenter",
    description: "Invoices, payment plans, delinquency, agency billing, and receivables.",
    color: "amber"
  },
  {
    id: "insurance-domain",
    name: "Insurance Domain",
    description: "Policy lifecycle, endorsements, risk, claims, and billing vocabulary.",
    color: "blue"
  },
  {
    id: "manual-testing",
    name: "Manual Testing",
    description: "STLC, test design, defect lifecycle, regression, smoke, and UAT.",
    color: "slate"
  },
  {
    id: "playwright-automation",
    name: "Playwright Automation",
    description: "Locators, fixtures, assertions, reports, CI, and reliable automation.",
    color: "cyan"
  },
  {
    id: "api-testing",
    name: "API Testing",
    description: "HTTP methods, payloads, auth, contract testing, and negative cases.",
    color: "emerald"
  }
];

export const dashboardData: DashboardData = {
  totalTests: 6,
  accuracy: 78,
  readiness: 86,
  recentScores: [
    { id: "r1", testName: "PolicyCenter Associate Practice", score: 48, accuracy: 80, submittedAt: new Date().toISOString() },
    { id: "r2", testName: "API Testing Sprint", score: 22, accuracy: 73, submittedAt: new Date().toISOString() },
    { id: "r3", testName: "Manual Testing Core", score: 31, accuracy: 86, submittedAt: new Date().toISOString() }
  ],
  weakDomains: [
    { domain: "BillingCenter", accuracy: 58, attempts: 14 },
    { domain: "API Testing", accuracy: 64, attempts: 18 },
    { domain: "PolicyCenter Rules", accuracy: 69, attempts: 21 }
  ]
};

export const questionBank: PracticeQuestion[] = [
  {
    id: "q-policy-1",
    domainId: "policycenter",
    prompt: "What is PolicyCenter primarily used for?",
    options: ["Billing application", "Policy administration system", "CRM tool", "Database backup tool"],
    answerIndex: 1,
    explanation: "PolicyCenter supports policy administration workflows such as submissions, renewals, changes, and cancellations.",
    difficulty: "FOUNDATION",
    tags: ["policy lifecycle", "core platform"]
  },
  {
    id: "q-policy-2",
    domainId: "policycenter",
    prompt: "Which PolicyCenter flow is normally used to create a new policy for an applicant?",
    options: ["Subrogation", "Submission", "Delinquency", "Salvage"],
    answerIndex: 1,
    explanation: "A submission is the transaction flow used to quote and bind a new policy.",
    difficulty: "ASSOCIATE",
    tags: ["submission", "policy transactions"]
  },
  {
    id: "q-policy-3",
    domainId: "policycenter",
    prompt: "What does a product model define in PolicyCenter?",
    options: ["Only system users", "Policy lines, coverages, forms, and rules", "Only claim reserves", "Only payment batches"],
    answerIndex: 1,
    explanation: "The product model captures the structure and behavior of products such as lines, coverages, forms, and availability.",
    difficulty: "ASSOCIATE",
    tags: ["product model", "configuration"]
  },
  {
    id: "q-claim-1",
    domainId: "claimcenter",
    prompt: "In ClaimCenter, what is an exposure?",
    options: ["A billing invoice", "A claimant or coverage-specific unit of loss", "A policy quote", "A code deployment package"],
    answerIndex: 1,
    explanation: "An exposure represents a specific part of a claim that needs handling, such as injury or vehicle damage.",
    difficulty: "FOUNDATION",
    tags: ["claim basics", "exposures"]
  },
  {
    id: "q-billing-1",
    domainId: "billingcenter",
    prompt: "What is BillingCenter responsible for?",
    options: ["Only automated UI testing", "Premium billing and receivables management", "Claim reserve setup", "Policy form generation only"],
    answerIndex: 1,
    explanation: "BillingCenter handles billing accounts, invoices, payments, payment plans, commissions, and receivables.",
    difficulty: "FOUNDATION",
    tags: ["billing", "receivables"]
  },
  {
    id: "q-insurance-1",
    domainId: "insurance-domain",
    prompt: "What is an endorsement in insurance?",
    options: ["A change to an existing policy", "A claim payment", "A database index", "A test report"],
    answerIndex: 0,
    explanation: "An endorsement modifies terms, coverages, limits, insured items, or other policy details.",
    difficulty: "FOUNDATION",
    tags: ["policy lifecycle", "endorsement"]
  },
  {
    id: "q-manual-1",
    domainId: "manual-testing",
    prompt: "Which test type verifies that critical existing functionality still works after a change?",
    options: ["Regression testing", "Alpha sorting", "Data masking", "Code minification"],
    answerIndex: 0,
    explanation: "Regression testing checks whether recent changes broke previously working behavior.",
    difficulty: "FOUNDATION",
    tags: ["STLC", "regression"]
  },
  {
    id: "q-playwright-1",
    domainId: "playwright-automation",
    prompt: "Which Playwright locator strategy is usually most resilient for user-facing actions?",
    options: ["CSS nth-child selectors only", "Role and accessible name based locators", "Absolute XPath from html", "Random timeouts"],
    answerIndex: 1,
    explanation: "Role-based locators reflect user-visible semantics and are less brittle than implementation-specific selectors.",
    difficulty: "ASSOCIATE",
    tags: ["locators", "automation design"]
  },
  {
    id: "q-api-1",
    domainId: "api-testing",
    prompt: "Which status code generally means a request succeeded and returned a response body?",
    options: ["200", "401", "404", "500"],
    answerIndex: 0,
    explanation: "HTTP 200 OK indicates that the request succeeded.",
    difficulty: "FOUNDATION",
    tags: ["http", "status codes"]
  },
  {
    id: "q-api-2",
    domainId: "api-testing",
    prompt: "What should an API contract test primarily validate?",
    options: ["Only button colors", "Request and response shape against an agreed schema", "Browser viewport size", "CPU temperature"],
    answerIndex: 1,
    explanation: "Contract tests validate that API consumers and providers agree on request and response structures.",
    difficulty: "ASSOCIATE",
    tags: ["contract testing", "schemas"]
  }
];

export const demoSession: TestSession = {
  id: "demo-session",
  userId: "user-demo",
  testName: "PolicyCenter Associate Practice",
  durationMinutes: 45,
  questionIds: questionBank.map((question) => question.id),
  answers: {},
  markedForReview: [],
  status: "IN_PROGRESS",
  startedAt: new Date().toISOString()
};

export const demoResult: TestResult = {
  sessionId: "demo-session",
  score: 8,
  total: 10,
  accuracy: 80,
  timeTakenSeconds: 1320,
  correctAnswers: 8,
  wrongAnswers: 1,
  unanswered: 1,
  topicBreakdown: [
    { domainId: "policycenter", domainName: "Guidewire PolicyCenter", correct: 3, total: 4, accuracy: 75 },
    { domainId: "api-testing", domainName: "API Testing", correct: 1, total: 2, accuracy: 50 },
    { domainId: "manual-testing", domainName: "Manual Testing", correct: 2, total: 2, accuracy: 100 },
    { domainId: "claimcenter", domainName: "ClaimCenter", correct: 2, total: 2, accuracy: 100 }
  ],
  weakAreas: ["API Testing", "PolicyCenter Rules"]
};
