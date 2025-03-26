import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export class AuthController {
  /**
   * Register a new user
   * @route POST /api/auth/register
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const user = await AuthService.register(userData);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: userWithoutPassword
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to register user',
        error: error.message
      });
    }
  }

  /**
   * Login a user
   * @route POST /api/auth/login
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
        return;
      }

      const result = await AuthService.login(username, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Authentication failed',
        error: error.message
      });
    }
  }

  /**
   * Get current user info
   * @route GET /api/auth/me
   */
  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      // User will be available from auth middleware
      const user = req.user;

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get user info',
        error: error.message
      });
    }
  }
}

export default new AuthController();
