import express from "express";
import {
  checkAvailbilityApi,
  createBookings,
  getAllBookingByUser,
  getHotelBookings,
} from "../controllers/BookingController.js";
import isUser from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailbilityApi);
bookingRouter.post("/book", isUser, createBookings);
bookingRouter.get("/user", isUser, getAllBookingByUser);
bookingRouter.get("/hotel", isUser, getHotelBookings);

export default bookingRouter;
