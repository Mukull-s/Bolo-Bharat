import { useId } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const services = [
  {
    id: 'schemes',
    icon: '📋',
    title: { en: 'Govt Schemes', hi: 'सरकारी योजना' },
    desc: { en: 'PM Kisan, Awas Yojana, Ujjwala and more', hi: 'PM किसान, आवास योजना, उज्ज्वला और बहुत कुछ' },
    updates: [
      { title: 'PM-Kisan 17th instalment', titleHi: 'PM-किसान 17वीं किस्त', info: '₹2,000 per farmer credited. Check on pmkisan.gov.in', infoHi: '₹2,000 हर किसान को मिले। pmkisan.gov.in पर चेक करें।' },
      { title: 'Ayushman Bharat 70+', titleHi: 'आयुष्मान भारत 70+', info: 'Free health coverage for all above 70 years.', infoHi: '70 साल से ऊपर सबको फ्री इलाज मिलेगा।' },
      { title: 'PM Awas Yojana', titleHi: 'PM आवास योजना', info: 'New applications open for 2025. Visit Gram Panchayat.', infoHi: '2025 के लिए नए आवेदन खुले हैं। ग्राम पंचायत जाएं।' },
    ],
  },
  {
    id: 'farming',
    icon: '🌾',
    title: { en: 'Farming', hi: 'खेती-बाड़ी' },
    desc: { en: 'Crop advice, MSP, mandi prices', hi: 'फसल सलाह, MSP, मंडी भाव' },
    updates: [
      { title: 'Wheat MSP 2024-25', titleHi: 'गेहूं MSP 2024-25', info: 'Wheat MSP ₹2,275/quintal', infoHi: 'गेहूं MSP ₹2,275/क्विंटल' },
      { title: 'Cold wave alert', titleHi: 'शीतलहर अलर्ट', info: 'Cold wave in North India. Protect crops.', infoHi: 'उत्तर भारत में शीतलहर। फसल बचाएं।' },
      { title: 'Kisan Credit Card', titleHi: 'किसान क्रेडिट कार्ड', info: 'Low interest crop loan. Apply at your bank.', infoHi: 'कम ब्याज पर फसल लोन। बैंक में अप्लाई करें।' },
    ],
  },
  {
    id: 'health',
    icon: '🏥',
    title: { en: 'Health', hi: 'सेहत / दवाई' },
    desc: { en: 'Free checkups, medicines, hospitals', hi: 'फ्री चेकअप, दवाइयां, अस्पताल' },
    updates: [
      { title: 'Free health camps', titleHi: 'फ्री स्वास्थ्य शिविर', info: 'District hospitals running free checkups this week.', infoHi: 'जिला अस्पतालों में इस हफ्ते फ्री चेकअप।' },
      { title: 'Jan Aushadhi generic medicines', titleHi: 'जन औषधि सस्ती दवाई', info: 'Low-cost medicines at Jan Aushadhi centers.', infoHi: 'जन औषधि केंद्र पर सस्ती दवाइयां मिलती हैं।' },
      { title: 'Health Wellness Centres', titleHi: 'स्वास्थ्य केंद्र', info: 'Free BP, sugar check, basic medicines at HWCs.', infoHi: 'HWC पर फ्री BP, शुगर चेक और बेसिक दवाइयां।' },
    ],
  },
  {
    id: 'education',
    icon: '📚',
    title: { en: 'Education / Jobs', hi: 'पढ़ाई / नौकरी' },
    desc: { en: 'Scholarships, skill training, jobs', hi: 'स्कॉलरशिप, स्किल ट्रेनिंग, नौकरी' },
    updates: [
      { title: 'National Scholarship Portal', titleHi: 'राष्ट्रीय स्कॉलरशिप', info: 'Post-matric scholarship applications open 2025-26.', infoHi: '2025-26 पोस्ट-मैट्रिक स्कॉलरशिप आवेदन खुले।' },
      { title: 'Skill India / PMKVY', titleHi: 'स्किल इंडिया', info: 'Free short-term training with certificate.', infoHi: 'फ्री शॉर्ट-टर्म ट्रेनिंग और सर्टिफिकेट।' },
      { title: 'Rozgar Mela', titleHi: 'रोज़गार मेला', info: 'Government job fairs in many districts.', infoHi: 'कई जिलों में सरकारी जॉब मेला।' },
    ],
  },
  {
    id: 'ration',
    icon: '🛒',
    title: { en: 'Ration / PDS', hi: 'राशन / PDS' },
    desc: { en: 'Free grain, ration card, fair price shop', hi: 'फ्री अनाज, राशन कार्ड, सरकारी दुकान' },
    updates: [
      { title: 'PMGKAY free grain', titleHi: 'PMGKAY फ्री अनाज', info: '5 kg free wheat/rice per person per month.', infoHi: 'हर व्यक्ति को 5 किलो फ्री गेहूं/चावल हर महीने।' },
      { title: 'One Nation One Ration Card', titleHi: 'एक देश एक राशन कार्ड', info: 'Use your ration card at any FPS in India.', infoHi: 'अपना राशन कार्ड भारत में किसी भी दुकान पर इस्तेमाल करें।' },
    ],
  },
  {
    id: 'banking',
    icon: '🏦',
    title: { en: 'Bank / Money', hi: 'बैंक / पैसा' },
    desc: { en: 'Jan Dhan, insurance, pension', hi: 'जनधन, बीमा, पेंशन' },
    updates: [
      { title: 'PM Jan Dhan Yojana', titleHi: 'PM जनधन योजना', info: 'Zero-balance account with RuPay card and insurance.', infoHi: 'ज़ीरो-बैलेंस खाता, RuPay कार्ड और बीमा।' },
      { title: 'PMJJBY / PMSBY', titleHi: 'PMJJBY / PMSBY', info: 'Low-cost life and accident insurance at bank.', infoHi: 'कम कीमत का जीवन और दुर्घटना बीमा बैंक से।' },
    ],
  },
  {
    id: 'women',
    icon: '👩‍👧',
    title: { en: 'Women / Children', hi: 'महिला / बच्चे' },
    desc: { en: 'Maternity benefits, girl child schemes', hi: 'मातृ लाभ, बेटी बचाओ योजनाएं' },
    updates: [
      { title: 'PM Matru Vandana Yojana', titleHi: 'PM मातृ वंदना योजना', info: '₹5,000 for first child. Register at Anganwadi.', infoHi: 'पहले बच्चे के लिए ₹5,000। आंगनबाड़ी में रजिस्टर करें।' },
      { title: 'Beti Bachao Beti Padhao', titleHi: 'बेटी बचाओ बेटी पढ़ाओ', info: 'Benefits for girl child. Contact district office.', infoHi: 'बेटी के लिए लाभ। जिला कार्यालय से संपर्क करें।' },
    ],
  },
]

function ServiceCard({ service, useHi, askAIText, latestText, askBoloText }) {
  const headingId = useId()
  const title = useHi ? service.title.hi : service.title.en
  const desc = useHi ? service.desc.hi : service.desc.en

  return (
    <section
      id={service.id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/70"
      aria-labelledby={headingId}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-500/20">
          {service.icon}
        </span>
        <div>
          <h2 id={headingId} className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          {latestText}
        </p>
        {service.updates.map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {useHi ? item.titleHi : item.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                {useHi ? item.infoHi : item.info}
              </p>
            </div>
            <Link
              to={`/chat?q=${encodeURIComponent(item.title + ' ke baare mein batao')}`}
              className="shrink-0 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              {askAIText}
            </Link>
          </div>
        ))}
      </div>

      <Link
        to={`/chat?q=${encodeURIComponent('Tell me about ' + service.title.en)}`}
        className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/80"
      >
        {askBoloText} {title.toLowerCase()}
      </Link>
    </section>
  )
}

export default function Services() {
  const { uiLang, t } = useLanguage()
  const useHi = uiLang !== 'en'

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors duration-200">
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('servicesTitle')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {t('servicesDesc')}
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              useHi={useHi}
              askAIText={t('askAI')}
              latestText={t('latestUpdates')}
              askBoloText={t('askBoloFor')}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
