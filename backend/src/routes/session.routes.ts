import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
import { authMiddleware, adminOnly } from '../middleware/authMiddleware';

const router = Router();
const sessionController = new SessionController();

// Only admin users can access session history
router.get('/', authMiddleware, adminOnly, sessionController.getAllSessions);

export default router;
