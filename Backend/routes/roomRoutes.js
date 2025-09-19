import express from "express";
import isUser from "../middlewares/authMiddleware.js";
import {
  createRoom,
  geAlltRoomByHotel,
  getAllRoom,
  toggleRoomAvailability,
} from "../controllers/roomController.js";
import upload from "../middlewares/uploadMiddleware.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), isUser, createRoom);
roomRouter.get("/", getAllRoom);
roomRouter.get("/owner", isUser, geAlltRoomByHotel);
roomRouter.post("/toggle-availability", isUser, toggleRoomAvailability);

export default roomRouter;
