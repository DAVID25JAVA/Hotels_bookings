import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHook from "./controllers/ClerkWebhooks.js";

connectDB();
const app = express();
app.use(cors()); // Cross Origin Resource Shareing

app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebHook)

app.get("/", (req, res) => res.send("Api is working fine...."));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
