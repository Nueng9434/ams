import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { initializeDatabase } from './config/database';

// Load environment variables
dotenv.config();

const app = express();

// Initialize database connection
initializeDatabase()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Base route for API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;
