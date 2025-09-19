import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHook from "./controllers/ClerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/claudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingsRoutes.js";

connectDB();
connectCloudinary();
const app = express();

// CORS middleware
app.use(cors());

// IMPORTANT: Parse webhook body as text for signature verification
app.use("/api/clerk", express.text({ type: "application/json" }));

// JSON middleware for other routes (after webhook route)
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// Webhook route - MUST be POST
app.post("/api/clerk", clerkWebHook);

// Default route
app.get("/", (req, res) => res.send("API is working fine...."));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
