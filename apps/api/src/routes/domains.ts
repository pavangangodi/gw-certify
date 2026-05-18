import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { getDomains } from "../services/repository.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (_req, res) => {
    return res.json(await getDomains());
  })
);

export default router;
