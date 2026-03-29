import { Router } from 'express';
import multer from 'multer';
import { speakHindi, transcribeHindi } from '../controllers/voiceController.js';

const router = Router();

// POST /api/voice/tts
router.post('/tts', speakHindi);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// POST /api/voice/stt (multipart/form-data: field name "audio")
router.post('/stt', upload.single('audio'), transcribeHindi);

export default router;

