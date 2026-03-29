import { useLanguage } from '../context/LanguageContext.jsx'

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="relative min-h-[calc(100vh-8rem)] bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <section className="py-10 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
              <span className="text-3xl">🙏</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Bolo Bharat
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              AI voice assistant for rural India
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Bolo Bharat kya hai?</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Bolo Bharat ek AI assistant hai jo gaon aur chhote shaharon ke logon ki madad karta hai. Aap isse sarkari yojana, sehat, kheti, padhai, ya kisi bhi samasya ke baare mein pooch sakte hain — apni bhasha mein.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👥</span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Kiske liye hai?</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Kisan, mazdoor, ghar ki maa, student, dukandaar — sabke liye. Jo log smartphone use karte hain lekin sarkari websites ya English forms samajhna mushkil lagta hai, unke liye yeh app bani hai.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Humara goal</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Har insaan ko zaruri jaankari seedhi aur simple bhasha mein milni chahiye. Bolo Bharat yahi kaam karta hai — baat karo, samjho, aur apna kaam karo. Bilkul free!
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">Technology</h2>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Voice</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">Deepgram + Sarvam</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">AI Brain</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">Gemini</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Frontend</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">React + TW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
