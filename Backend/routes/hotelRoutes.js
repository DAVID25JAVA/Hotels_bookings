import express from "express";
import isUser from "../middlewares/authMiddleware.js";
import { hotelRegister } from "../controllers/HotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/", isUser, hotelRegister);

export default hotelRouter;
