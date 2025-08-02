import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', userRoutes);
app.use('/api', projectRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
