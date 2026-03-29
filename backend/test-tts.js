import { getSpeechAudioUrl } from './services/ttsService.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting Test. API Key exists:', !!process.env.SARVAM_API_KEY);

getSpeechAudioUrl('Namaste, main Bolo Bharat hoon.', 'hi')
    .then(url => {
        console.log('SUCCESS! TTS URL prefix:', url.substring(0, 50));
        console.log('SUCCESS! TTS URL length:', url.length);
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILED! TTS test error:', err);
        process.exit(1);
    });
