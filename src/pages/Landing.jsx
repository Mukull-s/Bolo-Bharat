import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Voice-first help',
    description:
      'Speak in Hindi, Hinglish, or English. No typing needed — just ask your question naturally.',
    icon: '🎤',
  },
  {
    title: 'Schemes made simple',
    description:
      'Understand eligibility, required documents, and how to apply in plain language, not official jargon.',
    icon: '📋',
  },
  {
    title: 'Local & daily services',
    description:
      'Get guidance for health, farming, banking, education, and digital services you use every day.',
    icon: '🛎️',
  },
  {
    title: 'For low-connectivity areas',
    description:
      'Experience is designed to work smoothly even on basic smartphones and slower internet.',
    icon: '📶',
  },
  {
    title: 'Trust & safety',
    description:
      'We encourage you to verify important details with official sources and avoid scams.',
    icon: '🛡️',
  },
  {
    title: 'Always improving',
    description:
      'The assistant keeps learning from real questions to answer better over time.',
    icon: '✨',
  },
]

const helpPoints = [
  'Save time by avoiding long queues and repeated visits to offices.',
  'Know which scheme you are actually eligible for before applying.',
  'Understand documents and forms in simple words.',
  'Get practical checklists: what to carry, where to go, who to contact.',
  'Support for family decisions about health, education, and finance.',
]

const howItWorksSteps = [
  {
    label: '1. Ask in your language',
    detail:
      'Tap the big mic button (coming soon) or type your question in Hindi, Hinglish, or English.',
  },
  {
    label: '2. Bolo Bharat listens & understands',
    detail:
      'Our AI understands natural speech and local style questions, even if they are not perfect.',
  },
  {
    label: '3. Get clear, bullet-point answers',
    detail:
      'You receive short, structured replies: what it is, who gets it, documents needed, and next steps.',
  },
  {
    label: '4. Take action with confidence',
    detail:
      'Use the answer as a guide when you visit offices, centers, or use online portals.',
  },
]

export default function Landing() {
  // Placeholder for future voice integration
  const handleMicClick = () => {
    // Later: connect to voice-to-text API and start/stop recording here.
    // For now, we just show a friendly message in the console.
    console.log('Mic button clicked. Hook up voice-to-text API here.')
  }

  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100 transition-colors duration-200">
      <main className="relative">
        {/* Hero + mic CTA */}
        <section className="pt-16 sm:pt-20 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
            {/* Text side */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/40 px-3 py-1 text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-100">
                Made for Bharat • Rural-friendly AI
              </p>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Talk to your
                <span className="block text-emerald-600 dark:text-emerald-300">government-savvy friend.</span>
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed dark:text-slate-200/90">
                Bolo Bharat explains schemes, documents, and everyday services in simple words.
                Ask about health, farming, education, business, or daily life — just like talking
                to a trusted local guide.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-400/40 transition-all duration-200"
                >
                  Start chatting now
                </Link>
                <div className="flex flex-col text-xs sm:text-sm text-slate-500 space-y-1 dark:text-slate-300">
                  <p>• Simple English replies, even if you ask in Hindi or Hinglish.</p>
                  <p>• No login required to start.</p>
                </div>
              </div>
            </div>

            {/* Mic / preview card */}
            <div className="lg:justify-self-end">
              <div className="rounded-3xl border border-emerald-300 bg-white/90 backdrop-blur-xl shadow-lg p-6 sm:p-7 flex flex-col items-center gap-5 sm:gap-6 dark:border-emerald-500/30 dark:bg-slate-900/60 dark:shadow-[0_24px_80px_rgba(16,185,129,0.35)]">
                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200/80">
                  Coming soon • Voice mode
                </p>
                <button
                  type="button"
                  onClick={handleMicClick}
                  className="relative flex items-center justify-center h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-slate-950 shadow-[0_18px_50px_rgba(16,185,129,0.6)] hover:shadow-[0_22px_65px_rgba(16,185,129,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-transform transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
                  aria-label="Ask using your voice (coming soon)"
                >
                  <span className="absolute inset-[-18%] rounded-full border border-emerald-300/30" />
                  <span className="absolute inset-[-32%] rounded-full border border-emerald-200/15" />
                  <span className="text-4xl sm:text-5xl">🎤</span>
                </button>
                <div className="text-center space-y-1.5">
                  <p className="text-sm sm:text-base font-semibold text-emerald-800 dark:text-emerald-100">
                    Big mic button for hands-free help
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Soon you&apos;ll be able to press &amp; speak directly. We&apos;ll convert your voice
                    to text and Bolo Bharat will reply in clear bullet points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                What we do
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200/90 leading-relaxed">
                Bolo Bharat is built for people who may not be comfortable with complicated
                apps, long English forms, or government websites. We sit between you and the
                information you need, translating everything into simple, practical guidance.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 dark:bg-slate-900/70 dark:border-slate-700/80">
                <h3 className="text-base sm:text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                  For government schemes & documents
                </h3>
                <ul className="mt-3 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-200/90">
                  <li>• Explain scheme purpose, benefits, and who it is for.</li>
                  <li>• List documents you normally need to carry.</li>
                  <li>• Guide you on where to start (online or offline).</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 dark:bg-slate-900/70 dark:border-slate-700/80">
                <h3 className="text-base sm:text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                  For everyday decisions
                </h3>
                <ul className="mt-3 space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-200/90">
                  <li>• Compare options for health, education, or farming choices.</li>
                  <li>• Understand basic financial and digital terms in plain words.</li>
                  <li>• Get step-by-step checklists to follow.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it helps */}
        <section className="py-14 sm:py-16 md:py-20 bg-slate-100 border-y border-slate-200 dark:bg-slate-900/70 dark:border-slate-800/70">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                  How it helps you & your family
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200/90 leading-relaxed">
                  Whether you are a farmer, small business owner, student, or homemaker, Bolo
                  Bharat is designed to support everyday decisions — not replace your judgement,
                  but to give you clarity.
                </p>
                <ul className="mt-5 space-y-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-200/90">
                  {helpPoints.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 p-5 sm:p-6 dark:from-emerald-400/15 dark:via-emerald-500/10 dark:to-teal-400/10 dark:border-emerald-400/40">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-200">
                  Example
                </p>
                <p className="mt-3 text-sm sm:text-base text-slate-800 dark:text-emerald-50">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">You ask:</span> “Meri maa ke
                  liye health insurance ka kaunsa sarkari yojana hai? Kya documents chahiye?”
                </p>
                <p className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-100">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">Bolo Bharat replies in simple English:</span>
                </p>
                <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-100">
                  <li>• Explains what type of schemes are usually available.</li>
                  <li>• Lists common documents you may need.</li>
                  <li>• Suggests where people normally apply in your area.</li>
                  <li>• Reminds you to verify all details with official sources.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                  Features designed for Bharat
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200/90 max-w-2xl">
                  We keep the experience focused on clarity, low-friction access, and support
                  for mixed languages — not on fancy menus and complex forms.
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Built with modern AI, but designed like a patient local guide.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-400/60 hover:shadow-md dark:bg-slate-900/70 dark:border-slate-800/80 dark:hover:shadow-[0_18px_40px_rgba(16,185,129,0.4)] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-lg dark:bg-emerald-500/10">
                      <span role="img" aria-hidden>
                        {feature.icon}
                      </span>
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-700 dark:text-emerald-100">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200/90 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 sm:py-16 md:py-20 bg-slate-100 border-t border-slate-200 dark:bg-slate-950/60 dark:border-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-200/90 max-w-2xl">
              We keep the flow simple so anyone in your family can use it — from students to
              elders who are using a smartphone for the first time.
            </p>

            <ol className="mt-7 space-y-4">
              {howItWorksSteps.map((step) => (
                <li
                  key={step.label}
                  className="flex gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3.5 sm:px-5 sm:py-4 dark:bg-slate-900/70 dark:border-slate-800/80"
                >
                  <div className="mt-0.5 h-7 w-7 flex items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/50">
                    {step.label.split('.')[0]}
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-100">
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200/90">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-600 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 transition-colors duration-150"
              >
                Try a demo question
              </Link>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Example: “Explain in simple words which schemes can help a small farmer like me.”
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
