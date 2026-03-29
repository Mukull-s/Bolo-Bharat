import googleTTS from 'google-tts-api';

const SARVAM_LANG_MAP = {
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  en: 'en-IN'
};

export const getSpeechAudioUrl = async (text, language = 'hi') => {
  // Strip markdown formats (*, #, _, `, [, ]) as they ruin TTS voice reading
  const strippedText = String(text || '').replace(/[-*#_`\[\]()~]/g, '').trim();
  if (!strippedText) throw new Error('text is required');

  const apiKey = process.env.SARVAM_API_KEY;
  const langCode = SARVAM_LANG_MAP[language] || 'hi-IN';

  // Attempt Sarvam AI TTS first (Extremely high quality Indian languages)
  if (apiKey) {
    try {
      console.log('Sending TTS request to Sarvam API for lang:', langCode);
      const payload = {
        inputs: [strippedText.substring(0, 300)],
        target_language_code: langCode,
        speaker: "shubh",
        pace: 1.05,
        speech_sample_rate: 8000,
        enable_preprocessing: true,
        model: "bulbul:v3"
      };

      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Subscription-Key': apiKey,
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.audios && data.audios[0]) {
          console.log(`Sarvam TTS generated beautifully (${data.audios[0].length} chars). Sending back to UI!`);
          return `data:audio/wav;base64,${data.audios[0]}`;
        } else {
          console.warn('Sarvam OK but no audio payload found!', data);
        }
      } else {
        console.error(`Sarvam API failed! Status: ${response.status}`, await response.text());
      }
    } catch (err) {
      console.error('Sarvam request crashed fatally:', err.message);
    }
  } else {
    console.warn('No SARVAM_API_KEY found, falling back strictly to Google TTS');
  }

  // Fallback to Free Google TTS
  console.log('Using Google TTS Fallback...');
  const safeText = strippedText.length > 200 ? strippedText.substring(0, 199) : strippedText;
  const url = googleTTS.getAudioUrl(safeText, {
    lang: language,
    slow: false,
    host: 'https://translate.google.com',
  });

  return url;
};
