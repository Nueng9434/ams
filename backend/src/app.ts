import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import tenantRoutes from './routes/tenant.routes';
import { initializeDatabase } from './config/database';
import path from 'path';

// Load environment variables
dotenv.config();

// Create app instance
const createApp = async () => {
  // Initialize database connection before setting up routes
  await initializeDatabase();

  const expressApp = express();

  // Middleware
  expressApp.use(cors());
  expressApp.use(express.json());

  // Static files
  expressApp.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Routes
  expressApp.use('/api/auth', authRoutes);
  expressApp.use('/api/users', userRoutes);
  expressApp.use('/api/tenants', tenantRoutes);

  // Error handling
  expressApp.use(errorHandler);

  // Base route for API health check
  expressApp.get('/api/health', (req, res) => {
    res.json({ 
      status: 'success',
      message: 'API is running',
      timestamp: new Date().toISOString()
    });
  });

  return expressApp;
};

const app = express(); // Main app instance
createApp().then(initializedApp => {
  Object.assign(app, initializedApp);
}).catch(error => {
  console.error('Failed to initialize app:', error);
  process.exit(1);
});


export default app;
