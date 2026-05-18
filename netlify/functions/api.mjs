import serverless from "serverless-http";
import { createApp } from "../../apps/api/dist/app.js";

export const handler = serverless(createApp());
