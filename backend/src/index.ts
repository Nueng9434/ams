import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { initializeDatabase } from './config/database';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Initialize the database connection
const startServer = async () => {
  try {
    await initializeDatabase();
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
