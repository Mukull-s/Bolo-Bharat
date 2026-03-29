import { Router } from 'express';
import { getTest } from '../controllers/testController.js';
import authRoutes from './authRoutes.js';
import chatRoutes from './chatRoutes.js';
import voiceRoutes from './voiceRoutes.js';

const router = Router();

router.get('/test', getTest);
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/voice', voiceRoutes);

export default router;

