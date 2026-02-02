import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const location = useLocation()
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
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/chat', label: 'Chat' },
    { path: '/about', label: 'About' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white/90 border-b border-slate-200/80 shadow-sm backdrop-blur-sm dark:bg-slate-950/95 dark:border-slate-800/80">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-slate-800 hover:text-emerald-600 transition-colors dark:text-slate-100 dark:hover:text-emerald-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-emerald-500/60 overflow-hidden dark:bg-slate-900">
              <img
                src="/indian%20flag.jpg"
                alt="Indian flag - Bolo Bharat"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-base sm:text-lg">Bolo Bharat</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-3 inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? '☀ Light mode' : '🌙 Dark mode'}
          </button>
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
