import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/chat', label: 'Chat' },
    { path: '/about', label: 'About' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200/80 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-800 hover:text-emerald-600 transition-colors">
            <span className="text-xl">🇮🇳</span>
            <span>Bolo Bharat</span>
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-slate-800 text-slate-300 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>Bolo Bharat – AI voice assistant for rural India.</p>
        </div>
      </footer>
    </div>
  )
}
