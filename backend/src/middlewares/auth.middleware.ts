import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { AppDataSource } from '../config/database';
import { User } from '../models/entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

/**
 * Authentication middleware
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authorization token is required'
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify token
      const decoded = authService.verifyToken(token);

      // Find user
      const user = await userRepository.findOne({
        where: { id: decoded.id },
        select: ['id', 'username', 'role', 'isActive', 'createdAt', 'updatedAt']
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid user'
        });
        return;
      }

      if (!user.isActive) {
        res.status(401).json({
          success: false,
          message: 'Account has been deactivated'
        });
        return;
      }

      // Set user in request
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
};

/**
 * Role-based access control middleware
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access'
      });
      return;
    }

    if (!roles.includes(req.user.role as string)) {
      res.status(403).json({
        success: false,
        message: 'Access forbidden'
      });
      return;
    }

    next();
  };
};
