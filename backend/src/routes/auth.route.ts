import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current user info (protected route)
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
