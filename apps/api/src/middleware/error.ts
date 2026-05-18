import type { NextFunction, Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  return res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  const message = error.message || "Unexpected server error.";
  const status = message.includes("not found") ? 404 : message.includes("already exists") ? 409 : 400;

  return res.status(status).json({
    message,
    requestId: cryptoRandom()
  });
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 10);
}
