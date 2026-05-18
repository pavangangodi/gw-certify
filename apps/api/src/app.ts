import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import domainRoutes from "./routes/domains.js";
import testRoutes from "./routes/tests.js";
import uploadRoutes from "./routes/uploads.js";
import adminRoutes from "./routes/admin.js";
import { errorHandler, notFound } from "./middleware/error.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
      credentials: true
    })
  );
  app.use(express.json({ limit: "2mb" }));

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "gw-certify-api",
      mockDatabase: process.env.USE_MOCK_DB === "true" || !process.env.DATABASE_URL
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/domains", domainRoutes);
  app.use("/api/tests", testRoutes);
  app.use("/api/uploads", uploadRoutes);
  app.use("/api/admin", adminRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
