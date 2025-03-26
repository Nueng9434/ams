import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './config/database';

// Import routes
import tenantRoutes from './routes/tenant.route';
import buildingRoutes from './routes/building.route';
import roomRoutes from './routes/room.route';
import transactionRoutes from './routes/transaction.route';
import utilityRoutes from './routes/utility.route';
import employeeRoutes from './routes/employee.route';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler();
  }

  private config(): void {
    // Middleware
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('AMS API is running');
    });

    // API routes
    this.app.use('/api/tenants', tenantRoutes);
    this.app.use('/api/buildings', buildingRoutes);
    this.app.use('/api/rooms', roomRoutes);
    this.app.use('/api/transactions', transactionRoutes);
    this.app.use('/api/utilities', utilityRoutes);
    this.app.use('/api/employees', employeeRoutes);
  }

  private errorHandler(): void {
    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        message: 'Route not found',
      });
    });

    // Global error handler
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    });
  }
}

export default new App().app;
