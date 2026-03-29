import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { UI_LANGUAGES } from '../i18n'

export default function Layout({ children }) {
  const location = useLocation()
  const { uiLang, changeLanguage, t } = useLanguage()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('bolo-theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.localStorage.setItem('bolo-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/services', label: t('services') },
    { path: '/chat', label: t('chat') },
    { path: '/emergency', label: t('emergency') },
    { path: '/about', label: t('about') },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white/90 border-b border-slate-200/80 shadow-sm backdrop-blur-sm dark:bg-slate-950/95 dark:border-slate-800/80">
        <nav className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-slate-800 hover:text-emerald-600 transition-colors dark:text-slate-100 dark:hover:text-emerald-400 shrink-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-emerald-500/60 overflow-hidden dark:bg-slate-900">
              <img
                src="/indian%20flag.jpg"
                alt="Bolo Bharat"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-base sm:text-lg hidden sm:inline">Bolo Bharat</span>
          </Link>

          {/* Nav links */}
          <ul className="flex items-center gap-1 flex-wrap">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    location.pathname === path
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language + Theme */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              value={uiLang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-1.5 py-1 text-xs font-medium dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              aria-label="Language"
            >
              {UI_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.native}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? t('lightMode') : t('darkMode')}
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-300 py-6 mt-auto dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>Bolo Bharat – AI voice assistant for rural India.</p>
        </div>
      </footer>
    </div>
  )
}
