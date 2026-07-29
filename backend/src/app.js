import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import dns from "dns";


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
    

// Set DNS servers for MongoDB SRV resolution to prevent local ISP resolution issues
dns.setServers(["1.1.1.1", "8.8.8.8"]);


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const _dirname = path.resolve();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));


app.use(express.json());

app.use("/api/notes", notesRoutes);

import fs from 'fs';

const frontendDistPath = path.join(_dirname, "../frontend/dist");

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Notely API is running...");
  });
}

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});});

