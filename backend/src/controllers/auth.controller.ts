import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';
import { User } from '../models/user.model';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);

    if (!user || !user.isActive) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'your-jwt-secret-key-here';
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        role: user.role
      },
      secret,
      { expiresIn: '1d' }
    );

    const { password: _, ...userData } = user;
    res.json({
      status: 'success',
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'User not authenticated',
      });
      return;
    }

    const userDetails = await User.findById(user.userId);
    if (!userDetails) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    const { password, ...userData } = userDetails;
    res.json({
      status: 'success',
      data: {
        user: userData,
      },
    });
  } catch (error) {
    next(error);
  }
};
