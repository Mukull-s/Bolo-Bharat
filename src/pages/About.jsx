export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50"
        aria-hidden
      />
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">About Bolo Bharat</h1>
          <p className="mt-2 text-slate-600">AI voice assistant for rural India.</p>

          <div className="mt-12 sm:mt-14 space-y-12 sm:space-y-14">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">What is Bolo Bharat</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Bolo Bharat is an AI-powered voice and chat assistant built for rural and non-tech-savvy users. It helps people get information about government schemes, farming, health, daily utilities, and general help — in their own language.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                “Bolo” means “speak” — the idea is to make it easy to just speak or type and get clear, simple answers without navigating complex websites or forms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Who it helps</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Bolo Bharat is for people in rural India and anyone who finds technology or official language difficult. It helps farmers, homemakers, daily wage workers, and others who need quick, reliable information on schemes and services but may not have easy access to the internet or know how to search.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                It is designed for voice-first and simple chat, so users don’t need to read long documents or understand jargon to get the help they need.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Mission and goal</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Our mission is to make essential government and service information accessible to everyone, in simple language and through voice or text — so no one is left behind because of language, literacy, or lack of tech access.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                The goal is to bridge the gap between official information and the people who need it, by providing a single, easy-to-use assistant that answers in local languages and explains schemes, eligibility, and processes in plain terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
