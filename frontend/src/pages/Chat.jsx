import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { UI_LANG_TO_BACKEND } from '../i18n';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const BACKEND_LANGUAGES = [
  { code: 'hi', label: 'Hindi' },
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'ur', label: 'Urdu' },
];

function getSupportedMimeType() {
  // MediaRecorder support varies by browser. Try common options.
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/ogg'];
  for (const c of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported?.(c)) return c;
  }
  return '';
}

export default function Chat() {
  const { uiLang, t } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isStartingMic, setIsStartingMic] = useState(false);
  const [language, setLanguage] = useState(() => UI_LANG_TO_BACKEND[uiLang] || 'hi');
  const [speakReplies, setSpeakReplies] = useState(true);
  const [micError, setMicError] = useState('');
  const [typingMsgIndex, setTypingMsgIndex] = useState(-1);
  const [typingText, setTypingText] = useState('');

  const scrollRef = useRef(null);
  const messagesRef = useRef(messages);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const typingTimerRef = useRef(null);

  const persistKey = 'bolo-bharat:chat:v1';

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Sync STT/TTS language with UI language
  useEffect(() => {
    setLanguage(UI_LANG_TO_BACKEND[uiLang] || 'hi');
  }, [uiLang]);

  useEffect(() => {
    // Restore chat or show greeting
    try {
      const raw = localStorage.getItem(persistKey);
      if (!raw) {
        setMessages([{ role: 'bot', text: t('chatGreeting') }]);
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      else setMessages([{ role: 'bot', text: t('chatGreeting') }]);
    } catch (_) {
      setMessages([{ role: 'bot', text: t('chatGreeting') }]);
    }

    // Auto-start recording if coming from Landing page mic button
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('voice') === 'true') {
      setTimeout(() => {
        if (!isListening && !isStartingMic) {
          startRecording().catch(err => console.log('Auto mic failed:', err));
        }
      }, 500);
    }

    // Auto-send query if coming from Services page
    const query = searchParams.get('q');
    if (query) {
      setTimeout(() => {
        // Auto replace URL so it doesn't resend on refresh
        window.history.replaceState({}, '', '/chat');
        submitMessage(query);
      }, 500);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(messages));
    } catch (_) { }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch (_) {
      return null;
    }
  };

  const speakText = useCallback(async (text, lang) => {
    if (!speakReplies) return;
    try {
      if (audioPlayerRef.current) {
        try {
          audioPlayerRef.current.pause();
        } catch (_) { }
      }

      const r = await fetch(`${API_BASE}/api/voice/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: lang }),
      });

      const data = await safeJson(r);
      if (!r.ok || !data?.audioUrl) throw new Error(data?.message || 'TTS failed');

      const player = new Audio(data.audioUrl);
      audioPlayerRef.current = player;

      // We can also sync listening UI if we wanted, but native play is fine
      await player.play();
    } catch (err) {
      // If TTS fails, still show the text answer.
      console.warn('Backend TTS error:', err?.message || err);
    }
  }, [speakReplies]);

  const submitMessage = useCallback(async (text) => {
    const trimmed = typeof text === 'string' ? text.trim() : '';
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user', text: trimmed };
    const newMessages = [...messagesRef.current, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setMicError('');

    try {
      const history = newMessages
        .filter((m) => m && typeof m.text === 'string')
        .slice(-10)
        .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));

      const r = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, language }),
      });

      const data = await safeJson(r);
      if (!r.ok) throw new Error(data?.message || 'Chat failed');

      const botText = typeof data?.text === 'string' ? data.text : '';
      const fullText = botText || 'No response from AI.';
      const botMsg = { role: 'bot', text: fullText };
      setMessages((prev) => [...prev, botMsg]);

      // Start typing animation
      const newIndex = messagesRef.current.length; // index of the new bot msg
      setTypingMsgIndex(newIndex);
      setTypingText('');

      // Animate character by character
      await new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
          i++;
          setTypingText(fullText.slice(0, i));
          if (i >= fullText.length) {
            clearInterval(timer);
            setTypingMsgIndex(-1);
            setTypingText('');
            resolve();
          }
        }, 25);
        typingTimerRef.current = timer;
      });

      // Read aloud AFTER typing completes
      if (fullText) await speakText(fullText, language);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Abhi AI server busy hai. Thoda baad try kijiye.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language, speakText]);

  const sendMessage = (e) => {
    e.preventDefault();
    submitMessage(input);
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (_) { }
    }
    if (mediaStreamRef.current) {
      try {
        for (const track of mediaStreamRef.current.getTracks()) track.stop();
      } catch (_) { }
    }
    mediaStreamRef.current = null;
  }, []);

  const startRecording = useCallback(async () => {
    setMicError('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError('Mic not supported in this browser.');
      return;
    }

    setIsStartingMic(true);
    audioChunksRef.current = [];

    const mimeType = getSupportedMimeType();
    try {
      // Stop any currently playing TTS audio while recording.
      if (audioPlayerRef.current) {
        try {
          audioPlayerRef.current.pause();
        } catch (_) { }
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        setIsListening(false);
        setIsStartingMic(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        audioChunksRef.current = [];

        if (!audioBlob.size) {
          setMicError('No audio captured. Please try again.');
          return;
        }

        const form = new FormData();
        form.append('audio', audioBlob, `voice.${mimeType && mimeType.includes('ogg') ? 'ogg' : 'webm'}`);
        form.append('language', language);

        try {
          const r = await fetch(`${API_BASE}/api/voice/stt`, {
            method: 'POST',
            body: form,
          });

          const data = await safeJson(r);
          if (!r.ok) throw new Error(data?.message || 'STT failed');

          const transcript = typeof data?.text === 'string' ? data.text : '';
          if (transcript.trim()) {
            setInput(transcript);
            // Auto-send after voice.
            await submitMessage(transcript);
          } else {
            setMicError('I could not understand. Please speak again.');
          }
        } catch (err) {
          console.error('STT error:', err);
          setMicError(err?.message || 'Voice-to-text failed. Please try again.');
        } finally {
          stopRecording();
        }
      };

      recorder.start();
      setIsListening(true);
      setIsStartingMic(false);

      // Safety: auto-stop after ~8 seconds to help rural users.
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') stopRecording();
      }, 8000);
    } catch (err) {
      console.error('Mic start failed:', err);
      setMicError(err?.message || 'Mic permission denied or not available.');
      setIsListening(false);
      setIsStartingMic(false);
      stopRecording();
    }
  }, [language, stopRecording, submitMessage]);

  const toggleListening = () => {
    if (isLoading) return;
    if (isListening || isStartingMic) {
      stopRecording();
      setIsListening(false);
      return;
    }
    startRecording().catch((err) => {
      console.error('Mic start failed:', err);
      setMicError('Mic permission denied or not available.');
      setIsListening(false);
      setIsStartingMic(false);
    });
  };

  const quickPrompts = useMemo(
    () => [
      { label: t('quickSehat'), value: t('quickQ1') },
      { label: t('quickKheti'), value: t('quickQ2') },
      { label: t('quickYojana'), value: t('quickQ3') },
    ],
    [uiLang]
  );

  return (
    <section className="flex flex-col flex-1 min-h-0 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-950 dark:to-slate-950 transition-colors duration-200">
      <div className="flex-1 min-h-0 w-full max-w-3xl mx-auto flex flex-col">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-slate-100 dark:bg-slate-900/80 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-lg">🤖</div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">Bolo Bharat</h1>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400">{t('aiHelper')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
            >
              {BACKEND_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setSpeakReplies((v) => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${speakReplies
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}
              title={speakReplies ? t('soundOn') : t('soundOff')}
            >
              {speakReplies ? '🔊' : '🔇'}
            </button>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex gap-2 px-3 py-2 overflow-x-auto shrink-0 scrollbar-hide">
          {quickPrompts.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setInput(p.value)}
              className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 shrink-0 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                    ? 'bg-emerald-500 text-white rounded-br-sm'
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'bot' ? (
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                      {typingMsgIndex === index ? (
                        <>{typingText}<span className="inline-block w-0.5 h-4 bg-emerald-500 ml-0.5 animate-pulse align-text-bottom" /></>
                      ) : (
                        msg.text
                      )}
                    </div>
                  ) : (
                    <span className="text-[15px]">{msg.text}</span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-500 rounded-2xl rounded-bl-sm px-4 py-3 text-sm border border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}} />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                  </span>
                  {t('chatThinking')}
                </div>
              </div>
            )}

            {isListening && (
              <div className="flex justify-start">
                <div className="bg-red-50 text-red-700 rounded-2xl rounded-bl-sm px-5 py-4 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800 flex items-center gap-3">
                  <div className="flex items-center gap-[4px] h-6">
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_0s]" />
                    <span className="w-1 h-5 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_0.1s]" />
                    <span className="w-1 h-4 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_0.2s]" />
                    <span className="w-1 h-6 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_0.3s]" />
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_0.8s_infinite_0.4s]" />
                  </div>
                  <span className="text-sm font-medium">{t('chatListening')}</span>
                </div>
              </div>
            )}

            {micError && (
              <div className="flex justify-start">
                <div className="bg-amber-50 text-amber-800 rounded-2xl px-4 py-2 text-xs font-medium border border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
                  {micError}
                </div>
              </div>
            )}
          </div>

          {/* Input — WhatsApp style */}
          <form onSubmit={sendMessage} className="px-2 py-2 bg-white/90 backdrop-blur-sm border-t border-slate-100 dark:bg-slate-900/90 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading || isStartingMic}
                className={`flex items-center justify-center shrink-0 w-11 h-11 rounded-full transition-all ${isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400'
                } disabled:opacity-50`}
                aria-label={isListening ? 'Band karo' : 'Boliye'}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? '...' : t('chatPlaceholder')}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 placeholder-slate-400"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center shrink-0 w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-all shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}