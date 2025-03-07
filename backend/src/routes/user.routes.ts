import express, { Router } from 'express';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware';
import { 
  listUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  getUserProfile 
} from '../controllers/user.controller';

const router: Router = express.Router();

// All routes are protected by authMiddleware
router.use(authMiddleware as express.RequestHandler);

// Admin only routes
router.get('/list', adminOnly as express.RequestHandler, listUsers as express.RequestHandler);
router.post('/create', adminOnly as express.RequestHandler, createUser as express.RequestHandler);
router.put('/:id', adminOnly as express.RequestHandler, updateUser as express.RequestHandler);
router.delete('/:id', adminOnly as express.RequestHandler, deleteUser as express.RequestHandler);

// Both admin and employee can access (with restrictions)
router.get('/profile', getUserProfile as express.RequestHandler); // Changed to get own profile

export default router;
