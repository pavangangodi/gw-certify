import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const domains = [
  ["policycenter", "Guidewire PolicyCenter", "Policy administration, submissions, renewals, underwriting, and product model.", "cyan"],
  ["claimcenter", "ClaimCenter", "Claims intake, exposures, assignments, activities, reserves, and recoveries.", "emerald"],
  ["billingcenter", "BillingCenter", "Billing accounts, invoices, payment plans, commissions, and receivables.", "amber"],
  ["insurance-domain", "Insurance Domain", "Policy lifecycle, endorsements, risk, claims, billing, and industry vocabulary.", "blue"],
  ["manual-testing", "Manual Testing", "STLC, test design, regression, defect lifecycle, smoke, UAT, and reporting.", "slate"],
  ["api-testing", "API Testing", "HTTP, payloads, auth, contracts, status codes, and negative testing.", "emerald"]
];

const questions = [
  ["policycenter", "What is PolicyCenter primarily used for?", ["Billing application", "Policy administration system", "CRM tool", "Database backup tool"], 1, "PolicyCenter supports policy administration workflows such as submissions, renewals, changes, and cancellations.", ["policy lifecycle"]],
  ["policycenter", "Which PolicyCenter flow is normally used to create a new policy for an applicant?", ["Subrogation", "Submission", "Delinquency", "Salvage"], 1, "A submission is the transaction flow used to quote and bind a new policy.", ["submission"]],
  ["claimcenter", "In ClaimCenter, what is an exposure?", ["A billing invoice", "A claimant or coverage-specific unit of loss", "A policy quote", "A code deployment package"], 1, "An exposure represents a specific part of a claim that needs handling.", ["claim basics"]],
  ["billingcenter", "What is BillingCenter responsible for?", ["Only automated UI testing", "Premium billing and receivables management", "Claim reserve setup", "Policy form generation only"], 1, "BillingCenter handles billing accounts, invoices, payments, payment plans, and receivables.", ["billing"]],
  ["insurance-domain", "What is an endorsement in insurance?", ["A change to an existing policy", "A claim payment", "A database index", "A test report"], 0, "An endorsement modifies terms, coverages, limits, insured items, or other policy details.", ["endorsement"]],
  ["manual-testing", "Which test type verifies that critical existing functionality still works after a change?", ["Regression testing", "Alpha sorting", "Data masking", "Code minification"], 0, "Regression testing checks whether recent changes broke previously working behavior.", ["regression"]],
  ["api-testing", "Which status code generally means a request succeeded and returned a response body?", ["200", "401", "404", "500"], 0, "HTTP 200 OK indicates that the request succeeded.", ["http"]]
];

async function main() {
  for (const [id, name, description, color] of domains) {
    await prisma.domain.upsert({
      where: { id },
      update: { name, description, color },
      create: { id, name, description, color }
    });
  }

  for (const [domainId, prompt, options, answerIndex, explanation, tags] of questions) {
    await prisma.question.create({
      data: {
        domainId: domainId as string,
        prompt: prompt as string,
        options,
        answerIndex: answerIndex as number,
        explanation: explanation as string,
        tags,
        source: "seed"
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
