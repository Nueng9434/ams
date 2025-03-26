import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1235',
  database: process.env.DB_DATABASE || 'ams',
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [path.join(__dirname, '../models/entities/**/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{js,ts}')],
  subscribers: [path.join(__dirname, '../subscribers/**/*.{js,ts}')],
});

// Function to initialize the database connection
export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection has been established successfully.');
    }
    return AppDataSource;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};
