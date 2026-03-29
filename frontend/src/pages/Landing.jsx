import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { UI_LANG_TO_BACKEND } from '../i18n'

export default function Landing() {
  const navigate = useNavigate()
  const { uiLang, t } = useLanguage()

  const handleMicClick = () => {
    navigate(`/chat?voice=true&lang=${UI_LANG_TO_BACKEND[uiLang] || 'hi'}`)
  }

  const categories = [
    { icon: '🏥', label: t('catHealth'), example: t('quickQ1') },
    { icon: '🌾', label: t('catFarming'), example: t('quickQ2') },
    { icon: '📋', label: t('catSchemes'), example: t('quickQ3') },
    { icon: '📚', label: t('catEducation'), example: t('quickQ3') },
    { icon: '🏦', label: t('catBanking'), example: t('quickQ3') },
    { icon: '🆘', label: t('catEmergency'), example: t('quickQ1') },
  ]

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-emerald-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors duration-200">
      
      {/* Hero Section — Big Mic */}
      <section className="pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          
          {/* Greeting */}
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🙏</span>
            <span className="text-sm font-semibold text-orange-800 dark:text-orange-200">{t('greeting')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {t('heroTitle')}
            <span className="block text-emerald-600 dark:text-emerald-400 mt-1">{t('heroSubtitle')}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t('heroDesc')}
          </p>

          {/* Giant Mic Button */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleMicClick}
              className="relative flex items-center justify-center h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-[0_20px_60px_rgba(16,185,129,0.5)] hover:shadow-[0_25px_70px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 group"
              aria-label={t('speakNow')}
            >
              <span className="absolute inset-[-15%] rounded-full border-2 border-emerald-300/40 animate-ping" />
              <span className="absolute inset-[-8%] rounded-full border-2 border-emerald-400/30" />
              <svg className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 animate-pulse">
              {t('tapToSpeak')}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('orTypeBelow')}
            </p>
          </div>

          {/* Type option */}
          <div className="mt-6">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-2xl bg-white border-2 border-emerald-200 px-6 py-3.5 text-base font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all dark:bg-slate-900 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-slate-800"
            >
              {t('typeToAsk')}
            </Link>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">
            {t('whatCanYouAsk')}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(`/chat?q=${encodeURIComponent(item.example)}`)}
                className="flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-700"
              >
                <span className="text-3xl sm:text-4xl">{item.icon}</span>
                <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-8 sm:py-12 bg-emerald-50/50 dark:bg-slate-900/50 border-y border-emerald-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {t('howItWorks')}
          </h2>
          <div className="space-y-4">
            {[
              { step: '1', icon: '🎤', text: t('step1') },
              { step: '2', icon: '🤖', text: t('step2') },
              { step: '3', icon: '🔊', text: t('step3') },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-2xl shrink-0">
                  {s.icon}
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Step {s.step}</span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <span className="text-4xl">👨‍🌾</span>
            <span className="text-4xl">👩‍⚕️</span>
            <span className="text-4xl">👨‍🏫</span>
            <span className="text-4xl">👩‍💼</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('forEveryone')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {t('forEveryoneDesc')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/chat?voice=true"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
            >
              {t('speakNow')}
            </Link>
            <Link
              to="/emergency"
              className="inline-flex items-center gap-2 rounded-2xl bg-red-50 border-2 border-red-200 px-6 py-3.5 text-base font-bold text-red-700 hover:bg-red-100 transition-all dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
            >
              {t('emergencyNumbers')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
