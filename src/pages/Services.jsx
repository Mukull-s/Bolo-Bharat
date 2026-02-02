import { useId } from 'react'

const servicesWithUpdates = [
  {
    id: 'schemes',
    title: 'Government schemes',
    description: 'Central and state schemes — eligibility, documents, and how to apply in simple language.',
    icon: '📋',
    updates: [
      { date: '28 Jan 2025', title: 'PM-Kisan 17th instalment', summary: '₹2,000 per farmer credited for Oct–Dec 2024. Check status on pmkisan.gov.in or your bank.' },
      { date: '25 Jan 2025', title: 'Ayushman Bharat expansion', summary: 'Coverage extended to all above 70 years; no income criteria. Enrol at Ayushman card centre.' },
      { date: '20 Jan 2025', title: 'PM Awas Yojana (Rural)', summary: 'New application window for 2025–26 in many districts. Visit Gram Panchayat or CSC.' },
      { date: '15 Jan 2025', title: 'Ujjwala 2.0 refill subsidy', summary: 'Free LPG refill under PMUY continues; book via distributor or app.' },
    ],
  },
  {
    id: 'farming',
    title: 'Farming & agriculture',
    description: 'Crop advice, weather, MSP, mandi prices, and farmer welfare schemes.',
    icon: '🌾',
    updates: [
      { date: '27 Jan 2025', title: 'Rabi MSP 2024–25', summary: 'Wheat MSP ₹2,275/quintal; gram ₹5,850. Procurement at mandis and designated centres.' },
      { date: '26 Jan 2025', title: 'IMD weather alert', summary: 'Cold wave in North India till 30 Jan. Protect standing crops; irrigation as advised.' },
      { date: '22 Jan 2025', title: 'PM-Kisan Samman Nidhi', summary: 'Ensure Aadhaar-linked bank account; land records updated for next instalment.' },
      { date: '18 Jan 2025', title: 'Kisan Credit Card (KCC)', summary: 'Interest subvention on KCC for crop loan; apply at your bank or PAC.' },
    ],
  },
  {
    id: 'health',
    title: 'Health & hospitals',
    description: 'Government health schemes, nearby facilities, and health advisories.',
    icon: '🏥',
    updates: [
      { date: '29 Jan 2025', title: 'Seasonal flu advisory', summary: 'Rise in flu cases in North India. Avoid crowded places; see doctor if fever or cough persists.' },
      { date: '26 Jan 2025', title: 'Free health camps', summary: 'District hospitals running free check-up camps this week. Contact CHC/PHC for dates.' },
      { date: '24 Jan 2025', title: 'AB-HWCs (Health & Wellness Centres)', summary: 'Free BP, sugar, and basic medicines at nearby HWCs. No registration fee.' },
      { date: '20 Jan 2025', title: 'Jan Aushadhi generic medicines', summary: 'Low-cost medicines at Pradhan Mantri Bhartiya Jan Aushadhi Kendras; list on janaushadhi.gov.in.' },
    ],
  },
  {
    id: 'education',
    title: 'Education & students',
    description: 'Scholarships, exam dates, school and college schemes for rural students.',
    icon: '📚',
    updates: [
      { date: '28 Jan 2025', title: 'National Scholarship Portal', summary: 'Post-matric scholarship applications open for 2025–26. Apply at scholarships.gov.in.' },
      { date: '25 Jan 2025', title: 'PM Vidya Lakshmi', summary: 'Education loans for higher studies; low interest for eligible students. Apply online.' },
      { date: '22 Jan 2025', title: 'Mid-day meal scheme', summary: 'Hot cooked meals in government schools; report issues to school or block education office.' },
      { date: '18 Jan 2025', title: 'DDU-GKY / skill training', summary: 'Free skill training for rural youth; placement support. Enrol at nearest training centre.' },
    ],
  },
  {
    id: 'ration',
    title: 'Ration & PDS',
    description: 'Fair price shop timings, ration eligibility, and PDS updates.',
    icon: '🛒',
    updates: [
      { date: '27 Jan 2025', title: 'One Nation One Ration Card', summary: 'Use ration in any FPS across India with same ration card. Link Aadhaar at FPS.' },
      { date: '24 Jan 2025', title: 'PMGKAY (free grain)', summary: '5 kg free wheat/rice per person per month for NFSA cardholders. Collect at FPS.' },
      { date: '20 Jan 2025', title: 'e-Ration card correction', summary: 'Name or family member corrections at FPS or online via state PDS portal.' },
    ],
  },
  {
    id: 'utilities',
    title: 'Electricity & water',
    description: 'Bill payment, complaints, and power/water helplines.',
    icon: '💡',
    updates: [
      { date: '26 Jan 2025', title: 'Saubhagya / free connection', summary: 'Eligible households can apply for free electricity connection at discom office.' },
      { date: '23 Jan 2025', title: 'Power cut complaints', summary: 'Register on state discom app or call 1912 (many states). Use consumer number.' },
      { date: '19 Jan 2025', title: 'Jal Jeevan Mission', summary: 'Tap water connection to every rural home; apply at Gram Panchayat or water department.' },
    ],
  },
  {
    id: 'banking',
    title: 'Banking & financial inclusion',
    description: 'Jan Dhan, PMJJBY, pensions, and basic banking help.',
    icon: '🏦',
    updates: [
      { date: '28 Jan 2025', title: 'PM Jan Dhan Yojana', summary: 'Zero-balance account, RuPay card, and accident insurance. Open at any bank or BC.' },
      { date: '25 Jan 2025', title: 'PMJJBY / PMSBY', summary: 'Low-cost life and accident insurance; enrol at bank or through CSP.' },
      { date: '21 Jan 2025', title: 'National Pension Scheme (NPS) Lite', summary: 'Small pension for unorganised workers; enrol at bank or CSC.' },
    ],
  },
  {
    id: 'employment',
    title: 'Employment & skills',
    description: 'MNREGA, skill training, and job-related schemes.',
    icon: '💼',
    updates: [
      { date: '27 Jan 2025', title: 'MNREGA work and wages', summary: '100 days work guarantee; wage credited to bank. Check job card at Gram Panchayat.' },
      { date: '24 Jan 2025', title: 'Skill India / PMKVY', summary: 'Free short-term training in many trades; certificate and placement support.' },
      { date: '20 Jan 2025', title: 'Rozgar Mela', summary: 'Government job fairs in many districts; check state employment portal for dates.' },
    ],
  },
  {
    id: 'women',
    title: 'Women & child welfare',
    description: 'Schemes for women, maternity, and child care.',
    icon: '👩‍👧',
    updates: [
      { date: '26 Jan 2025', title: 'PM Matru Vandana Yojana', summary: '₹5,000 in instalments for first child; register at Anganwadi or health centre.' },
      { date: '23 Jan 2025', title: 'Beti Bachao Beti Padhao', summary: 'Awareness and benefits for girl child; details at block or district office.' },
      { date: '19 Jan 2025', title: 'Anganwadi services', summary: 'Supplementary nutrition for children and pregnant women. Enrol at nearest Anganwadi.' },
    ],
  },
]

function ServiceCard({ service }) {
  const headingId = useId()
  return (
    <section
      id={service.id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/70 transition-colors"
      aria-labelledby={headingId}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-500/20" aria-hidden>
          {service.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-xl font-semibold text-slate-900 dark:text-white">
            {service.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Latest updates
        </p>
        <ul className="mt-3 space-y-3" role="list">
          {service.updates.map((item, index) => (
            <li key={index} className="flex gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <span className="shrink-0 text-[10px] font-medium uppercase text-slate-500 dark:text-slate-400">
                {item.date}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  {item.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-slate-50 via-white to-emerald-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100 transition-colors duration-200">
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Services for rural India
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Scroll through each service to see latest updates and information. Ask Bolo Bharat in Chat for details on any scheme.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          {servicesWithUpdates.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  )
}
