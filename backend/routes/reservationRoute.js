import express from "express";
import cors from "cors";
import { sendReservation } from "../controller/reservation.js";
const router = express.Router();

router.options("*", cors());

router.post("/send", sendReservation);

export default router;