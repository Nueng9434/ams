import { DataSource } from 'typeorm';
import { User } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1235',
  database: process.env.DB_DATABASE || 'ams',
  synchronize: process.env.NODE_ENV === 'development', // Auto-create tables in development
  logging: process.env.NODE_ENV === 'development',
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');
    
    // Check and create admin user if not exists
    const existingAdmin = await User.findByUsername('admin');
    if (!existingAdmin) {
      await User.createUser({
        username: 'admin',
        password: 'admin123',
        name: 'Administrator',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
