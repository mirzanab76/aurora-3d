type Feature = { title: string; desc: string }

const FEATURES: Feature[] = [
  { title: "Titanium frame", desc: "Lighter than aluminum, stronger than steel." },
  { title: "ProMotion display", desc: "120Hz adaptive refresh with 2000-nit peak brightness." },
  { title: "Neural engine", desc: "35 TOPS of on-device intelligence, instantly." },
]

export function Sections() {
  return (
    <div className="w-screen text-white">
      {/* HERO */}
      <section className="flex h-screen w-screen flex-col justify-center px-8 md:px-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-300/80">Aurora Labs</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Engineered for the{" "}
          <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
            extraordinary
          </span>
          .
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/60">
          A flagship device crafted from aerospace-grade materials. Precision you can feel,
          performance you can see.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90">
            Pre-order
          </button>
          <button className="rounded-full border border-white/20 px-7 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10">
            Watch film
          </button>
        </div>
      </section>

      {/* ABOUT — text left, model slides right */}
      <section className="flex h-screen w-screen items-center px-8 md:px-20">
        <div className="max-w-lg">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-300/80">The craft</p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Obsessed with every detail.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            From the seamless unibody to the surgically polished edges, each surface is refined
            over thousands of iterations. The result is a product that feels inevitable.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-semibold">0.28mm</div>
              <div className="text-sm text-white/50">edge tolerance</div>
            </div>
            <div>
              <div className="text-3xl font-semibold">100%</div>
              <div className="text-sm text-white/50">recycled frame</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="flex h-screen w-screen flex-col justify-center px-8 md:px-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-300/80">Specifications</p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Power, redefined.
        </h2>
        <div className="mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-white/25"
            >
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-white/55">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section className="flex h-screen w-screen flex-col justify-end px-8 pb-16 md:px-20">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Aurora One.</h2>
            <p className="mt-3 max-w-md text-white/55">Available this fall. Reserve yours today.</p>
            <button className="mt-6 rounded-full bg-white px-7 py-3 font-medium text-black transition hover:bg-white/90">
              Reserve now
            </button>
          </div>
          <div className="flex gap-10 text-sm text-white/50">
            <div className="flex flex-col gap-2">
              <span className="text-white/80">Product</span>
              <a href="#">Overview</a>
              <a href="#">Specs</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/80">Company</span>
              <a href="#">About</a>
              <a href="#">Press</a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-white/30">© 2026 Aurora Labs. All rights reserved.</p>
      </section>
    </div>
  )
}