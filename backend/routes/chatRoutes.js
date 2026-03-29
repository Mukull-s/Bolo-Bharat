import { Router } from 'express';
import { chatWithGemini } from '../controllers/chatController.js';

const router = Router();

// POST /api/chat
router.post('/', chatWithGemini);

export default router;

