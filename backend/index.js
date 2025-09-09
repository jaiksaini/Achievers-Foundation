import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/connectDB.js";
import userRoutes from "./src/routes/auth.routes.js"

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Database Connection..

connectDB();

// Middlewares...

// Routes..

app.use("/api/user",userRoutes);



// Start server

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
