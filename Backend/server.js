import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import axios from 'axios'; 
import { ConnectDB } from './Config/db.js';
import ConnectCloudinary from './Config/cloudinary.js';

import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

ConnectDB();
ConnectCloudinary();

// 1. BROAD CORS (The "I'm Tired" Version)
const allowedOrigins = [
  'https://denoy-connect.vercel.app',
  'https://denoy-connect-admin.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

// THE "AGGRESSIVE" SHIELD
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // If the request comes from one of your Vercel sites
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Fallback for debugging - allows the preflight to pass
    res.setHeader('Access-Control-Allow-Origin', '*'); 
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept, Origin');

  // CRITICAL: Handle the "Preflight" (OPTIONS) immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Standard CORS as a backup
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mounting
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/contact', contactRouter); 
app.use('/api/admin', adminRouter);

app.get("/health-check", (req, res) => {
  res.status(200).send("Server is awake");
});

app.get('/', (req, res) => res.send("Denyo World API is working"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const PING_INTERVAL = 14 * 60 * 1000; 
const SERVER_URL = process.env.BACKEND_URL || "https://denyo-world-project.onrender.com/health-check";

function keepAlive() {
  if (process.env.NODE_ENV === "production") {
    setInterval(async () => {
      try {
        const response = await axios.get(SERVER_URL);
        console.log(`Self-ping successful: ${response.data} at ${new Date().toISOString()}`);
      } catch (error) {
        console.error(`Self-ping failed: ${error.message}`);
      }
    }, PING_INTERVAL);
  }
}

keepAlive();