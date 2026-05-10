import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import axios from 'axios'; // Fixed: Changed from require to import
import { ConnectDB } from './Config/db.js';
import ConnectCloudinary from './Config/cloudinary.js';

import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Initialize Configs
ConnectDB();
ConnectCloudinary();

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://your-frontend-domain.com'], 
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mounting
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/contact', contactRouter); 
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get("/health-check", (req, res) => {
  res.status(200).send("Server is awake");
});

app.get('/', (req, res) => res.send("Denyo World API is working"));

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// --- KEEP ALIVE LOGIC ---
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
// Use an environment variable for the URL so it doesn't ping localhost or old names
const SERVER_URL = process.env.BACKEND_URL || "https://your-actual-render-app-name.onrender.com/health-check";

function keepAlive() {
  // Only ping if we are actually on Render (production)
  if (process.env.NODE_ENV === "production") {
    setInterval(async () => {
      try {
        const response = await axios.get(SERVER_URL);
        console.log(`Self-ping successful: ${response.data} at ${new Date().toISOString()}`);
      } catch (error) {
        console.error(`Self-ping failed: ${error.message}`);
      }
    }, PING_INTERVAL);
  } else {
    console.log("Local development detected: Self-ping skipped.");
  }
}

keepAlive();