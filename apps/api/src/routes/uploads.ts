import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { addQuestionsFromUpload, listUserUploads } from "../services/repository.js";
import { createQuestionEnhancer } from "../services/ai-ready.js";
import { extractTextFromFile, parseMcqText } from "../services/parser.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (/\.(pdf|docx|txt|xlsx|xlsm|csv)$/i.test(file.originalname)) {
      callback(null, true);
      return;
    }

    callback(new Error("Only PDF, DOCX, TXT, XLSX, XLSM, and CSV files are supported."));
  }
});

const uploadSchema = z.object({
  domainId: z.string().min(1)
});

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const uploads = await listUserUploads(req.user!.id);
    return res.json(uploads);
  })
);

router.post(
  "/questions",
  requireAuth,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Question bank file is required." });
    }

    const input = uploadSchema.parse(req.body);
    const text = await extractTextFromFile(req.file);
    const parsedQuestions = await createQuestionEnhancer().enhance(parseMcqText(text));

    if (!parsedQuestions.length) {
      return res.status(422).json({
        message: "No MCQs were detected. Use Q1, options, and either checkmarked correct choices or Answer: B format."
      });
    }

    const stored = await addQuestionsFromUpload({
      userId: req.user!.id,
      domainId: input.domainId,
      fileName: req.file.originalname,
      parsedQuestions
    });

    return res.status(201).json({
      uploadId: stored.upload.id,
      upload: stored.upload,
      fileName: req.file.originalname,
      detectedQuestions: parsedQuestions.length,
      storedQuestions: stored.questions.length,
      preview: stored.questions.slice(0, 3).map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options
      }))
    });
  })
);

export default router;
