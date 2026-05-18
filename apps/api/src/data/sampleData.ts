import type { DomainCategory, Question } from "../types/domain.js";

export const domains: DomainCategory[] = [
  {
    id: "policycenter",
    name: "Guidewire PolicyCenter",
    description: "Policy administration, product model, submissions, renewals, and underwriting workflows.",
    color: "cyan"
  },
  {
    id: "claimcenter",
    name: "ClaimCenter",
    description: "Claims intake, assignment, exposure handling, activities, and recovery basics.",
    color: "emerald"
  },
  {
    id: "billingcenter",
    name: "BillingCenter",
    description: "Invoices, payment plans, agency billing, delinquency, and account receivables.",
    color: "amber"
  },
  {
    id: "insurance-domain",
    name: "Insurance Domain",
    description: "Core insurance concepts, policy lifecycle, endorsements, claims, and billing.",
    color: "blue"
  },
  {
    id: "manual-testing",
    name: "Manual Testing",
    description: "Test design, STLC, defect lifecycle, regression, smoke, and UAT practices.",
    color: "slate"
  },
  {
    id: "api-testing",
    name: "API Testing",
    description: "HTTP methods, status codes, payload validation, auth, contract, and negative testing.",
    color: "emerald"
  }
];

export const questions: Question[] = [
  {
    id: "q-policy-1",
    domainId: "policycenter",
    prompt: "What is PolicyCenter primarily used for?",
    options: ["Billing application", "Policy administration system", "CRM tool", "Database backup tool"],
    answerIndex: 1,
    explanation: "PolicyCenter supports policy administration workflows such as submissions, renewals, changes, and cancellations.",
    difficulty: "FOUNDATION",
    tags: ["policy lifecycle", "core platform"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-policy-2",
    domainId: "policycenter",
    prompt: "Which PolicyCenter flow is normally used to create a new policy for an applicant?",
    options: ["Subrogation", "Submission", "Delinquency", "Salvage"],
    answerIndex: 1,
    explanation: "A submission is the transaction flow used to quote and bind a new policy.",
    difficulty: "ASSOCIATE",
    tags: ["submission", "policy transactions"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-policy-3",
    domainId: "policycenter",
    prompt: "What does a product model define in PolicyCenter?",
    options: ["Only system users", "Policy lines, coverages, forms, and rules", "Only claim reserves", "Only payment batches"],
    answerIndex: 1,
    explanation: "The product model captures the structure and behavior of products such as lines, coverages, modifiers, forms, and availability.",
    difficulty: "ASSOCIATE",
    tags: ["product model", "configuration"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-claim-1",
    domainId: "claimcenter",
    prompt: "In ClaimCenter, what is an exposure?",
    options: ["A billing invoice", "A claimant or coverage-specific unit of loss", "A policy quote", "A code deployment package"],
    answerIndex: 1,
    explanation: "An exposure represents a specific part of a claim that needs handling, such as injury or vehicle damage.",
    difficulty: "FOUNDATION",
    tags: ["claim basics", "exposures"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-claim-2",
    domainId: "claimcenter",
    prompt: "Which concept helps ClaimCenter assign work to adjusters?",
    options: ["Assignment rules", "Invoice aging", "Policy forms", "Selector engines only"],
    answerIndex: 0,
    explanation: "Assignment rules route claims, exposures, and activities to suitable groups or users.",
    difficulty: "ASSOCIATE",
    tags: ["assignment", "activities"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-billing-1",
    domainId: "billingcenter",
    prompt: "What is BillingCenter responsible for?",
    options: ["Only automated UI testing", "Premium billing and receivables management", "Claim reserve setup", "Policy form generation only"],
    answerIndex: 1,
    explanation: "BillingCenter handles billing accounts, invoices, payments, payment plans, commissions, and receivables.",
    difficulty: "FOUNDATION",
    tags: ["billing", "receivables"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-insurance-1",
    domainId: "insurance-domain",
    prompt: "What is an endorsement in insurance?",
    options: ["A change to an existing policy", "A claim payment", "A database index", "A test report"],
    answerIndex: 0,
    explanation: "An endorsement modifies terms, coverages, limits, insured items, or other policy details.",
    difficulty: "FOUNDATION",
    tags: ["policy lifecycle", "endorsement"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-manual-1",
    domainId: "manual-testing",
    prompt: "Which test type verifies that critical existing functionality still works after a change?",
    options: ["Regression testing", "Alpha sorting", "Data masking", "Code minification"],
    answerIndex: 0,
    explanation: "Regression testing checks whether recent changes broke previously working behavior.",
    difficulty: "FOUNDATION",
    tags: ["STLC", "regression"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-api-1",
    domainId: "api-testing",
    prompt: "Which status code generally means a request succeeded and returned a response body?",
    options: ["200", "401", "404", "500"],
    answerIndex: 0,
    explanation: "HTTP 200 OK indicates that the request succeeded.",
    difficulty: "FOUNDATION",
    tags: ["http", "status codes"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-api-2",
    domainId: "api-testing",
    prompt: "What should an API contract test primarily validate?",
    options: ["Only button colors", "Request and response shape against an agreed schema", "Browser viewport size", "CPU temperature"],
    answerIndex: 1,
    explanation: "Contract tests validate that API consumers and providers agree on request and response structures.",
    difficulty: "ASSOCIATE",
    tags: ["contract testing", "schemas"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  },
  {
    id: "q-manual-2",
    domainId: "manual-testing",
    prompt: "What is the best reason to write clear expected results in a test case?",
    options: ["To make execution repeatable and objective", "To increase file size", "To avoid logging defects", "To replace requirements entirely"],
    answerIndex: 0,
    explanation: "Clear expected results reduce ambiguity and make pass/fail decisions consistent.",
    difficulty: "FOUNDATION",
    tags: ["test cases", "quality"],
    createdAt: new Date().toISOString(),
    source: "Sample bank"
  }
];
