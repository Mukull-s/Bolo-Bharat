import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
            Bolo Bharat
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Your AI voice assistant for rural India — information on government schemes, daily services, and help in your language.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/30 transition-shadow"
            >
              Start Chat
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
        <div className="mt-20 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'Government Schemes', desc: 'Find and understand schemes in simple language.' },
            { title: 'Daily Services', desc: 'Local services and useful information.' },
            { title: 'Voice & Chat', desc: 'Ask in your language — voice or text.' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm"
            >
              <h3 className="font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
