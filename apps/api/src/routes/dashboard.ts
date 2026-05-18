import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { getDashboard } from "../services/repository.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const dashboard = await getDashboard(req.user!.id);
    return res.json(dashboard);
  })
);

export default router;
