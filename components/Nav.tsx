import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-baseline gap-3 whitespace-nowrap font-serif text-lg tracking-tight"
        >
          Anklesh Rawat
          <span className="sc hidden text-muted lg:inline">
            Investment Research · Strategy · Financial Analysis
          </span>
        </Link>
        <div className="sc flex items-center gap-3 whitespace-nowrap text-muted sm:gap-7">
          <Link href="/#projects" className="transition-colors hover:text-accent">
            Projects
          </Link>
          <Link href="/research" className="transition-colors hover:text-accent">
            Research
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
          <a
            href="https://github.com/DogInfantry"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition-colors hover:text-accent sm:block"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
      {/* double rule — masthead */}
      <div className="border-b border-line" />
      <div className="mx-auto max-w-5xl px-5">
        <div className="border-b border-line" />
      </div>
    </header>
  );
}
