import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cors from "cors";

import courseRoutes from "./routes/courseRoute.js";
import userRoutes from "./routes/userRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

// Basic test route
app.get("/", (req, res) => {
  res.send("hello scriptman");
});

// API routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api/groups", groupRouter);
app.use("/api", roleRoutes);

// Connect to DB and start server
await connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error);
  });
