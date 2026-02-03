export default function Chat() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Chat</h1>
          <p className="mt-2 text-slate-600">
            Ask about schemes, services, or general help. Voice and text support coming soon.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[320px] flex flex-col items-center justify-center p-8 text-slate-500">
          <p className="text-sm">Chat interface will be connected here.</p>
          <p className="mt-2 text-xs">Frontend structure only — no backend yet.</p>
        </div>
      </div>
    </section>
  )
}
