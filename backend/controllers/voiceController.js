import { getSpeechAudioUrl } from '../services/ttsService.js';
import { transcribeHindiAudio } from '../services/sttService.js';

export const speakHindi = async (req, res) => {
  try {
    const { text, language } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ message: 'text (string) is required' });
    }

    const audioUrl = await getSpeechAudioUrl(text, typeof language === 'string' ? language : 'hi');
    res.json({ audioUrl, lang: typeof language === 'string' ? language : 'hi' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'TTS failed' });
  }
};

export const transcribeHindi = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'audio file is required (multipart field "audio")' });
    }

    const { language } = req.body || {};
    const transcript = await transcribeHindiAudio({
      buffer: req.file.buffer,
      filename: req.file.originalname,
      mimeType: req.file.mimetype,
      language: typeof language === 'string' ? language : 'hi',
    });

    res.json({ text: transcript });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'STT failed' });
  }
};

