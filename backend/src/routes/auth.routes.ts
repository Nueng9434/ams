import express, { Router } from 'express';
import { login, logout, getProfile } from '../controllers/auth.controller';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Cast routes to use AuthRequest type
router.post('/login', login as express.RequestHandler);
router.post('/logout', authMiddleware as express.RequestHandler, logout as express.RequestHandler);
router.get('/profile', authMiddleware as express.RequestHandler, getProfile as express.RequestHandler);

export default router;
