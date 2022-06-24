import express from "express";
const app = express();

import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";
import authUser from "./middleware/auth.js";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
