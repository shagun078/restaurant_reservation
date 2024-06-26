import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });


console.log("Allowed Frontend URL:", process.env.FRONTEND_URL);

// CORS configuration
app.use(
  cors({
    // origin: process.env.FRONTEND_URL, 
    origin:'https://restaurant-reservation-mauve.vercel.app/',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// // Middleware to log requests and headers for debugging
// app.use((req, res, next) => {
//   console.log("Request Headers:", req.headers);
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
