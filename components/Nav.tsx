"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/#projects",
    label: "Projects",
    sub: "live dashboards",
    active: (p: string) => p === "/",
  },
  {
    href: "/research",
    label: "Research",
    sub: "PDF library",
    active: (p: string) => p.startsWith("/research"),
  },
  { href: "/#contact", label: "Contact", sub: null, active: () => false },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        {/* wordmark (home link) + static caption, visually separated */}
        <div className="flex items-baseline gap-3 whitespace-nowrap">
          <Link href="/" className="font-serif text-lg tracking-tight hover:text-accent">
            Anklesh Rawat
          </Link>
          <span className="sc hidden border-l border-line pl-3 text-muted lg:inline">
            Investment Research · Strategy · Financial Analysis
          </span>
        </div>
        {/* interactive nav row: stronger than the caption, active item underlined */}
        <div className="sc flex items-center gap-3 whitespace-nowrap font-medium text-foreground sm:gap-7">
          {links.map((l) => {
            const isActive = l.active(pathname);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex flex-col items-center border-b-2 pb-0.5 transition-colors hover:text-accent ${
                  isActive ? "border-accent text-accent" : "border-transparent"
                }`}
              >
                <span>{l.label}</span>
                {l.sub && (
                  <span
                    className={`hidden text-[9px] normal-case tracking-normal md:block ${
                      isActive ? "text-accent/70" : "text-muted/70"
                    } transition-colors group-hover:text-accent/70`}
                  >
                    {l.sub}
                  </span>
                )}
              </Link>
            );
          })}
          <a
            href="https://github.com/DogInfantry"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border-b-2 border-transparent pb-0.5 transition-colors hover:text-accent sm:block"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
      {/* double rule: masthead */}
      <div className="border-b border-line" />
      <div className="mx-auto max-w-5xl px-5">
        <div className="border-b border-line" />
      </div>
    </header>
  );
}
