export default function Services() {
  const services = [
    {
      title: 'Government Schemes',
      description: 'Information on central and state schemes — eligibility, documents, and how to apply.',
      icon: '📋',
    },
    {
      title: 'Daily Services',
      description: 'Local utilities, helplines, and day-to-day service information.',
      icon: '🛎️',
    },
    {
      title: 'General Help',
      description: 'Answers to common questions in your preferred language.',
      icon: '💬',
    },
  ]

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Services</h1>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto">
            What Bolo Bharat can help you with.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200/60 transition-all"
            >
              <span className="text-3xl" role="img" aria-hidden>{service.icon}</span>
              <h2 className="mt-4 text-lg font-semibold text-slate-800">{service.title}</h2>
              <p className="mt-2 text-slate-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
