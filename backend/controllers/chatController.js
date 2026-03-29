import { chatWithGeminiService } from '../services/chatService.js';

export const chatWithGemini = async (req, res) => {
  try {
    const { message, history, language } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'message (string) is required' });
    }

    const text = await chatWithGeminiService({
      message,
      history,
      language,
    });

    res.json({ text });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Chat failed' });
  }
};

