import { GoogleGenerativeAI } from '@google/generative-ai';

const LANGUAGE_HINTS = {
  hi: 'Hindi (use Devanagari)',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi (Gurmukhi preferred)',
  ur: 'Urdu',
  en: 'simple English',
  en_in: 'simple English',
  'hi-IN': 'Hindi (use Devanagari)',
};

function languageOutputRules(lang) {
  switch (lang) {
    case 'hi':
    case 'hi-IN':
      return 'Respond ONLY in Hindi using Devanagari script. Avoid English transliteration.';
    case 'en':
    case 'en_in':
      return 'Respond ONLY in simple English.';
    case 'mr':
      return 'Respond ONLY in Marathi.';
    case 'ta':
      return 'Respond ONLY in Tamil.';
    case 'te':
      return 'Respond ONLY in Telugu.';
    case 'bn':
      return 'Respond ONLY in Bengali.';
    case 'gu':
      return 'Respond ONLY in Gujarati.';
    case 'kn':
      return 'Respond ONLY in Kannada.';
    case 'ml':
      return 'Respond ONLY in Malayalam.';
    case 'pa':
      return 'Respond ONLY in Punjabi. Use Gurmukhi script if possible.';
    case 'ur':
      return 'Respond ONLY in Urdu.';
    default:
      return 'Respond in the user selected language.';
  }
}

function guessLanguageFromText(text) {
  // Quick heuristic: if Devanagari characters exist, assume Hindi.
  return /[\u0900-\u097F]/.test(text) ? 'hi' : 'en';
}

export const chatWithGeminiService = async ({ message, history, language }) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY missing in backend .env');
  }

  const chosenLang = typeof language === 'string' && language ? language : guessLanguageFromText(message);
  const responseStyle = LANGUAGE_HINTS[chosenLang] || (chosenLang === 'en' ? 'simple English' : 'Hindi (use Devanagari)');
  const outputRules = languageOutputRules(chosenLang);

  const systemInstruction = `
You are Bolo Bharat, a friendly AI assistant for rural Indian users.
Speak like a real human helper — like a caring neighbour talking face to face.
Keep answers SHORT: maximum 2–3 lines. Never write long paragraphs.
Use simple Hindi or Hinglish by default, unless the user speaks in another language.
Be direct and helpful. Give the exact answer, no unnecessary detail.
If the user asks about health, suggest simple OTC medicines and home remedies first, then say "zyada problem ho toh doctor ko dikhao".
If needed, ask one small follow-up question.
Do NOT use markdown formatting — no asterisks, no hashtags, no bullet dashes. Write plain conversational text only.

LANGUAGE:
- Reply in: ${responseStyle}
- ${outputRules}
`.trim();

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction,
  });

  const contents = [];

  if (Array.isArray(history)) {
    for (const msg of history) {
      if (!msg || typeof msg.text !== 'string') continue;
      const role = msg.role === 'user' ? 'user' : 'model';
      contents.push({ role, parts: [{ text: msg.text }] });
    }
  }

  // Add the latest user message
  contents.push({ role: 'user', parts: [{ text: message }] });

  const result = await model.generateContent({ contents });
  const response = await result.response;
  return response.text();
};

