import { useId } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const emergencyContacts = [
  { name: 'Police', nameHi: 'पुलिस', number: '100', icon: '🚔', color: 'from-blue-500 to-blue-700' },
  { name: 'Ambulance', nameHi: 'एम्बुलेंस', number: '102', icon: '🚑', color: 'from-red-500 to-rose-700' },
  { name: 'Ambulance (108)', nameHi: 'एम्बुलेंस (108)', number: '108', icon: '🏥', color: 'from-pink-500 to-red-600' },
  { name: 'Fire Brigade', nameHi: 'दमकल', number: '101', icon: '🔥', color: 'from-orange-500 to-red-600' },
  { name: 'Women Helpline', nameHi: 'महिला हेल्पलाइन', number: '1091', icon: '👩', color: 'from-purple-500 to-violet-700' },
  { name: 'Child Helpline', nameHi: 'बाल हेल्पलाइन', number: '1098', icon: '👶', color: 'from-emerald-500 to-teal-700' },
  { name: 'Disaster Helpline', nameHi: 'आपदा हेल्पलाइन', number: '1078', icon: '🌊', color: 'from-cyan-500 to-blue-700' },
  { name: 'Kisan Helpline', nameHi: 'किसान हेल्पलाइन', number: '1551', icon: '🌾', color: 'from-lime-500 to-green-700' },
]

export default function Emergency() {
  const id = useId()
  const { uiLang, t } = useLanguage()
  const useHi = uiLang !== 'en'

  return (
    <section className="min-h-[calc(100vh-160px)] bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <span className="text-3xl">🆘</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            {t('emergencyTitle')}
          </h1>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t('emergencyDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {emergencyContacts.map((contact, index) => (
            <div
              key={`${id}-${index}`}
              className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-slate-900 dark:border-slate-800 hover:-translate-y-1"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${contact.color}`} />
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} text-white text-2xl shadow-lg shrink-0`}>
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                      {useHi ? contact.nameHi : contact.name}
                    </h3>
                    <p className="text-2xl font-extrabold tracking-wide text-slate-700 dark:text-slate-200 mt-0.5">
                      {contact.number}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className={`mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r ${contact.color} text-white font-semibold py-3 text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('callNow')}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">{t('emergencyFooter')}</p>
        </div>
      </div>
    </section>
  )
}
