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
    users: [
      { id: "user-demo", name: "Pavan Learner", email: "student@gwcertify.local", role: "USER", testsTaken: 6 },
      { id: "admin-demo", name: "GW Admin", email: "admin@gwcertify.local", role: "ADMIN", testsTaken: 3 }
    ]
  });
});

export default router;
