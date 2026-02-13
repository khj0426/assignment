import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="app-header app-container">
        <div className="flex items-center gap-3">
          <Image src="/next.svg" alt="logo" width={36} height={36} />
          <span className="text-lg font-semibold">My App</span>
        </div>
        <nav className="hidden sm:flex gap-4 text-sm">
          <a href="#" className="hover:underline">
            Docs
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
        </nav>
      </header>

      <main className="app-container py-8">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-2">Welcome to the responsive layout</h1>
              <p className="text-base text-muted mb-4">
                Mobile-first layout with a centered container and responsive grids. Resize to see the layout adapt.
              </p>
              <div className="flex gap-3">
                <a className="rounded-full bg-primary px-4 py-2 text-primary-foreground" href="#">
                  Get Started
                </a>
                <a className="rounded-full border px-4 py-2" href="#">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="rounded-lg bg-card p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Card {i}</h3>
              <p className="text-sm text-muted">This is a responsive card. On small screens it stacks; on larger screens it forms a grid.</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
