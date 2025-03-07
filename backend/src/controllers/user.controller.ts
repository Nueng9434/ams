import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { User } from '../models/user.model';

// List all users (admin only)
export const listUsers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.listUsers();
    res.json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

// Create new user (admin only)
export const createUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({
        status: 'error',
        message: 'Access denied: Admin only',
      });
      return;
    }

    const user = await User.createUser({
      ...req.body,
      isActive: true,
    });

    const { password, ...userData } = user;
    res.status(201).json({
      status: 'success',
      data: { user: userData },
    });
  } catch (error) {
    next(error);
  }
};

// Update user (admin only)
export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({
        status: 'error',
        message: 'Access denied: Admin only',
      });
      return;
    }

    const userId = parseInt(req.params.id);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    // Update user properties
    Object.assign(user, req.body);
    const updatedUser = await user.save();

    if (!updatedUser) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    const { password, ...userData } = updatedUser;
    res.json({
      status: 'success',
      data: { user: userData },
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(403).json({
        status: 'error',
        message: 'Access denied: Admin only',
      });
      return;
    }

    const userId = parseInt(req.params.id);
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    await user.remove();

    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get own user profile
export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        status: 'error',
        message: 'User not authenticated',
      });
      return;
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return;
    }

    const { password, ...userData } = user;
    res.json({
      status: 'success',
      data: { user: userData },
    });
  } catch (error) {
    next(error);
  }
};
