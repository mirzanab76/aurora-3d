export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
        <span className="text-lg font-semibold tracking-tight">AURORA</span>
        <div className="hidden gap-8 text-sm text-white/70 md:flex">
          <a className="transition hover:text-white" href="#">Overview</a>
          <a className="transition hover:text-white" href="#">Design</a>
          <a className="transition hover:text-white" href="#">Specs</a>
        </div>
        <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90">
          Buy
        </button>
      </nav>
    </header>
  )
}