import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="whitespace-nowrap font-serif text-lg tracking-tight">
          Anklesh Rawat
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          <Link href="/#projects" className="transition-colors hover:text-accent">
            Projects
          </Link>
          <Link href="/documents" className="transition-colors hover:text-accent">
            Documents
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
          <a
            href="https://github.com/DogInfantry"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-line px-3 py-1 transition-colors hover:border-accent hover:text-accent sm:block"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
