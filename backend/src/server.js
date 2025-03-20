import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";
import stripeRoutes from "./routes/stripe.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URI = process.env.VITE_FRONTEND_URI || "http://localhost:5173"; // Default to localhost if not set

app.use(cors({ origin: FRONTEND_URI,methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'], }));  // Adjust this to match your frontend URL

// ✅ Allow CORS for all origins (for development only)
app.use(cors()); 


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json()); // Ensure JSON parsing middleware is enabled

app.get("/", (req, res) => {
  res.send("MongoDB Connection is Working!");
});

app.use("/api/stripe", stripeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
