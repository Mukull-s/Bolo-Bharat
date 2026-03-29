import { createClient } from "@deepgram/sdk";

export const transcribeHindiAudio = async ({ buffer, filename, mimeType, language }) => {
  const apiKey = process.env.DEEPGRAM_API_KEY || process.env.DEEPGRAP_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPGRAM_API_KEY missing in backend .env (required for STT)');
  }

  const deepgram = createClient(apiKey);
  const lang = typeof language === 'string' && language ? language : 'hi';

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    buffer,
    {
      model: "general",
      language: lang,
      smart_format: true,
    }
  );

  if (error) {
    throw new Error('Deepgram STT error: ' + error.message);
  }

  const transcript = result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
  return transcript;
};

