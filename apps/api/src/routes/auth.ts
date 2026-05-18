import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../middleware/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { createUser, verifyUser } from "../services/repository.js";
import { signToken } from "../services/tokens.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const input = registerSchema.parse(req.body);
    const user = await createUser(input);

    return res.status(201).json({
      user,
      token: signToken(user)
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const input = loginSchema.parse(req.body);
    const user = await verifyUser(input.email, input.password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      user,
      token: signToken(user)
    });
  })
);

router.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
