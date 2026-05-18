import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { listPredefinedQuestionSets, saveAnswer, startTest, submitTest } from "../services/repository.js";

const router = Router();

const startSchema = z.object({
  domainId: z.string().optional(),
  uploadId: z.string().optional(),
  predefinedSetId: z.string().optional(),
  questionCount: z.number().int().min(1).max(200).default(25),
  durationMinutes: z.number().int().min(5).max(360).optional(),
  testName: z.string().optional()
});

const answerSchema = z.object({
  questionId: z.string(),
  answerIndex: z.number().int().min(0).max(9).optional(),
  answerIndexes: z.array(z.number().int().min(0).max(9)).optional(),
  markedForReview: z.boolean().optional()
});

const submitSchema = z.object({
  answers: z.record(z.union([z.number().int().min(0).max(9), z.array(z.number().int().min(0).max(9))])),
  markedForReview: z.array(z.string()).optional(),
  timeTakenSeconds: z.number().int().min(0)
});

router.get("/", requireAuth, (_req, res) => {
  return res.json([
    {
      id: "practice",
      name: "PolicyCenter Associate Practice",
      description: "Mixed certification practice across Guidewire and QA domains.",
      durationMinutes: 38,
      questionCount: 25
    },
    {
      id: "domain-sprint",
      name: "Domain Sprint",
      description: "Focused short test by selected domain.",
      durationMinutes: 20,
      questionCount: 5
    }
  ]);
});

router.get("/predefined-sets", requireAuth, (_req, res) => {
  return res.json(listPredefinedQuestionSets());
});

router.post(
  "/start",
  requireAuth,
  asyncHandler(async (req, res) => {
    const input = startSchema.parse(req.body);
    const started = await startTest({ ...input, userId: req.user!.id });

    return res.status(201).json(started);
  })
);

router.post(
  "/:sessionId/answer",
  requireAuth,
  asyncHandler(async (req, res) => {
    const input = answerSchema.parse(req.body);
    const session = await saveAnswer({
      ...input,
      sessionId: String(req.params.sessionId),
      userId: req.user!.id
    });

    return res.json({ session });
  })
);

router.post(
  "/:sessionId/submit",
  requireAuth,
  asyncHandler(async (req, res) => {
    const input = submitSchema.parse(req.body);
    const result = await submitTest({
      ...input,
      sessionId: String(req.params.sessionId),
      userId: req.user!.id
    });

    return res.json(result);
  })
);

export default router;
