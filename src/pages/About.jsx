export default function About() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">About Bolo Bharat</h1>
          <p className="mt-2 text-slate-600">
            AI voice assistant for rural India.
          </p>
        </div>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600">
          <p>
            Bolo Bharat is a final year project aimed at helping users in rural India get information about government schemes, daily services, and general help using voice or chat.
          </p>
          <p>
            The goal is to make essential information accessible in local languages through a simple, minimal interface — so everyone can “Bolo” (speak) and get the help they need.
          </p>
          <p className="text-sm text-slate-500">
            This is the frontend only. Backend and AI integration will be added later.
          </p>
        </div>
      </div>
    </section>
  )
}
