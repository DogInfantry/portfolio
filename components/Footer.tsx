import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
          <p className="font-serif text-lg tracking-tight">Anklesh Rawat</p>
          <div className="sc flex gap-6 text-muted">
            <Link href="/#projects" className="transition-colors hover:text-accent">
              Projects
            </Link>
            <Link href="/research" className="transition-colors hover:text-accent">
              Research
            </Link>
            <a
              href="mailto:ankleshrawat5@duck.com"
              className="transition-colors hover:text-accent"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/anklesh-rawat-00508a1aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/DogInfantry"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-6 border-t border-line pt-4 text-xs text-muted/80">
          © {new Date().getFullYear()} Anklesh Rawat · MBA, IIM Bodh Gaya ·
          Investment Research &amp; Quantitative Tools
        </p>
      </div>
    </footer>
  );
}
