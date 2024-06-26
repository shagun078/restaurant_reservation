import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Handle preflight requests
app.options("*", cors());

app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
