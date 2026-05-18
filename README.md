# GW Certify

GW Certify is a full-stack certification-style MCQ practice platform for Guidewire and QA exam preparation. It includes a Next.js dark portal, Express API, JWT authentication, PostgreSQL schema, upload parsing for PDF/DOCX/TXT/Excel question banks, admin analytics, timed exams, and result history.

## What is Included

- Login and register flow with JWT authentication.
- Dashboard with total tests, accuracy, recent scores, weak domains, quick test start, and upload action.
- Certification-style MCQ engine with timer, question palette, previous/next controls, mark for review, and submit confirmation.
- Upload parser for strict answer-key format:

```text
Q1. What is PolicyCenter?
A. Billing application
B. Policy administration system
C. CRM tool
D. Database
Answer: B
```

- Upload parser also supports dump-style checkmarked answers:

```text
Q1: A Typelist is _______
a set of fields or attributes related to an object
a set of references to another entity
✔ associated with a type key field
✔ a set of values used as the source of drop-down lists
Note: Choose 2 options
```

- Excel upload supports `.xlsx`, `.xlsm`, and `.csv` files with columns such as `Question`, `Option A`, `Option B`, `Option C`, `Option D`, and `Answer`.
- Excel dumps with only a question and correct answer are converted into MCQs by generating randomized distractors from the same uploaded workbook.
- Practice rounds let the user choose 10, 25, 50, 75, 100, 150, or 200 questions. Questions and options are shuffled every round.
- Timers are calculated from the round size. Current presets include 10 questions = 15 minutes, 50 = 75 minutes, 75 = 90 minutes, 100 = 150 minutes, 150 = 225 minutes, and 200 = 300 minutes.
- The Practice Test page has two clear modules:
  - Predefined MCQ Test: built from the four supplied Guidewire files, with Set 1, Set 2, Set 3, and Set 4 selection.
  - Upload & Take Test: users upload a file, the system scans it, and the exam starts directly from that uploaded data.
- Predefined sets include 57 questions in Set 1, 56 in Set 2, 52 in Set 3, and 108 in Set 4.
- Upload rounds started from an upload use only questions from that uploaded document.
- User question coverage is rotated so remaining unseen questions are selected before repeats.
- Domain categories for PolicyCenter, ClaimCenter, BillingCenter, Insurance Domain, Manual Testing, and API Testing.
- Results page with score, accuracy, time taken, correct/wrong/unanswered counts, topic-wise performance, and weak areas.
- Admin panel for question bank, user, test, and analytics management.
- Prisma PostgreSQL schema and seed script.
- Mock database mode for immediate local demo without PostgreSQL.
- AI-ready question enhancement boundary in `apps/api/src/services/ai-ready.ts`.

## Project Structure

```text
apps/
  api/
    src/
      routes/          Express route modules
      services/        Auth, parser, repository, AI-ready boundary
      middleware/      JWT and error middleware
      data/            Sample MCQ data
  web/
    src/
      app/             Next.js App Router pages
      components/      Reusable UI, dashboard, exam, upload, admin components
      lib/             API client, types, mock data, utilities
packages/
  db/
    prisma/schema.prisma
    seed/seed.ts
    sample/sample-question-bank.txt
```

## Run Locally

```powershell
cd "C:\Users\Pavan\OneDrive\Desktop\projects\MCQ Exam Tester"
copy .env.example .env
npm.cmd install
npm.cmd run build
npm.cmd run start
```

Open [http://localhost:3000](http://localhost:3000).

Create a new account from the register page, then log in with that account.

## Development

```powershell
npm.cmd run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)  
Backend health: [http://localhost:4000/health](http://localhost:4000/health)

## PostgreSQL Setup

By default `.env.example` uses `USE_MOCK_DB=true`, so the app runs immediately. For PostgreSQL:

```powershell
# Edit .env
USE_MOCK_DB=false
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gw_certify?schema=public

npm.cmd run db:generate
npm.cmd run db:push
npm.cmd run db:seed
npm.cmd run dev
```

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/dashboard`
- `GET /api/domains`
- `GET /api/tests/predefined-sets`
- `POST /api/tests/start`
- `POST /api/tests/:sessionId/answer`
- `POST /api/tests/:sessionId/submit`
- `GET /api/uploads`
- `POST /api/uploads/questions`
- `GET /api/admin/analytics`

All routes except registration, login, and health require `Authorization: Bearer <token>`.

## Verification

Completed checks:

```powershell
npm.cmd run build
```

Browser QA was run against installed Chrome for:

- Login page
- Dashboard after login
- Practice test page with timer, palette, options, and submit control
