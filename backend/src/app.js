import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const _dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
app.use(cors({
  origin: "http://localhost:5173",
}));
}


app.use(express.json()); // Middleware to parse JSON bodies

// Disabled rate limiting for development - uncomment to enable
// app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname,"../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "../frontend","dist", "index.html"));
});
}

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});});

