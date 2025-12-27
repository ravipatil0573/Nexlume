import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectsRouter from "./routes/projects.js";
import teamRouter from "./routes/team.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(helmet());                         // security headers
app.use(morgan("dev"));                    // request logs
app.use(express.json({ limit: "1mb" }));   // JSON body parsing
app.use(
  cors({
    origin: (origin, cb) => cb(null, true) // allow all in dev
    // origin: process.env.CORS_ORIGIN?.split(",") ?? "*", // stricter option
  })
);

/* Routes */
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/projects", projectsRouter);
app.use("/api/team", teamRouter);

/* Start with Mongo */
const PORT = process.env.PORT || 5005;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 API running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

