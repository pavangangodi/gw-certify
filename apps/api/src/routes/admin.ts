import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { getAdminAnalytics } from "../services/repository.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get(
  "/analytics",
  asyncHandler(async (_req, res) => {
    return res.json(await getAdminAnalytics());
  })
);

router.get("/users", (_req, res) => {
  return res.json({
    users: []
  });
});

export default router;
