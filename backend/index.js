import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDB } from "./src/config/connectDB.js";
import userRoutes from "./src/routes/auth.routes.js";
import donarRoutes from "./src/routes/donation.route.js";
import './src/config/passport-jwt-strategy.js'
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser( ))
app.use(passport.initialize());

// Database Connection..

connectDB();

// Routes..

app.use("/api/user",userRoutes);
app.use("/api/donation",donarRoutes);






// Start server

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
