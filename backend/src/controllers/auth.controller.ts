import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';
import { User } from '../models/user.model';
import { UserSession } from '../models/user-session.model';
import { IsNull } from 'typeorm';
import { AppDataSource } from '../config/database';

const endPreviousSessions = async (userId: number): Promise<void> => {
  const sessionRepository = AppDataSource.getRepository(UserSession);
  const activeSessions = await sessionRepository.find({
    where: {
      userId,
      logoutTime: IsNull()
    }
  });

  for (const session of activeSessions) {
    session.endSession();
    await sessionRepository.save(session);
  }
};

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

    // End any existing active sessions for this user
    await endPreviousSessions(user.id);

    // Create new session
    const sessionRepository = AppDataSource.getRepository(UserSession);
    const userAgent = req.headers['user-agent'];
    const session = UserSession.create({
      userId: user.id,
      ipAddress: req.ip || '0.0.0.0',
      userAgent: userAgent || 'Unknown'
    });
    await sessionRepository.save(session);

    const secret = process.env.JWT_SECRET || 'your-jwt-secret-key-here';
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        role: user.role,
        sessionId: session.id
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
        sessionId: session.id
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(400).json({
        status: 'error',
        message: 'No user found in request',
      });
      return;
    }

    // Get active session for user
    const sessionRepository = AppDataSource.getRepository(UserSession);
    const session = await sessionRepository.findOne({
      where: {
        userId: req.user.userId,
        logoutTime: IsNull()
      }
    });

    if (!session) {
      // If no active session, just return success
      res.json({
        status: 'success',
        message: 'No active session found',
      });
      return;
    }

    // End the session
    session.endSession();
    await sessionRepository.save(session);

    res.json({
      status: 'success',
      message: 'Logged out successfully',
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
