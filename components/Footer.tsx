export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Anklesh Rawat · MBA, IIM Bodh Gaya</p>
        <div className="flex gap-5">
          <a
            href="mailto:ankleshrawat5@duck.com"
            className="transition-colors hover:text-accent"
          >
            Email
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
    </footer>
  );
}
