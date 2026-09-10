"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/data/site";

/**
 * The masthead.
 *
 * Two things changed here and both were defects rather than taste.
 *
 * The bar was bg-background/90 backdrop-blur. Ten percent transparency means
 * content underneath contributes to every pixel, and Tailwind's bare
 * backdrop-blur is 8px, which smears a 40px Fraunces heading into legible grey
 * bands rather than hiding it. It is opaque now.
 *
 * Below sm the row used to collapse to a single "Work" link, so Research,
 * About and Contact were unreachable on a phone. The menu uses the native
 * popover attribute, which React 19 passes straight through: light dismiss, Esc
 * and top-layer rendering come free, and the top layer is what keeps the sticky
 * header's stacking context from trapping the panel. The whole JavaScript cost
 * is one hidePopover call, needed because App Router navigation keeps the
 * header mounted and the panel would otherwise hang over the new page.
 *
 * The tiny sub-labels under each link are gone. They were the only 9px type on
 * the site, they forced every item into a two-line column inside a 56px bar,
 * and their active colour text-accent/70 computed to 2.45:1 on the light
 * background, which also fired on group-hover for every inactive item.
 */

const links = [
  {
    href: "/work",
    label: "Work",
    active: (p: string) => p === "/work" || p.startsWith("/projects"),
  },
  {
    href: "/research",
    label: "Research",
    active: (p: string) => p.startsWith("/research"),
  },
  { href: "/#about", label: "About", active: () => false },
  { href: "/#contact", label: "Contact", active: () => false },
];

const MENU_ID = "site-menu";

export default function Nav() {
  const pathname = usePathname();
  const closeMenu = () =>
    (
      document.getElementById(MENU_ID) as HTMLElement & {
        hidePopover?: () => void;
      } | null
    )?.hidePopover?.();

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        {/* wordmark (home link) + static caption, visually separated */}
        <div className="flex items-baseline gap-3 whitespace-nowrap">
          <Link
            href="/"
            className="font-serif text-xl tracking-tight hover:text-accent"
          >
            Anklesh Rawat
          </Link>
          <span className="sc hidden border-l border-line pl-3 text-muted lg:inline">
            Investment Research · Strategy · Financial Analysis
          </span>
        </div>

        <div className="sc flex items-center gap-3 whitespace-nowrap font-medium text-foreground sm:gap-6">
          {links.map((l) => {
            const isActive = l.active(pathname);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`hidden border-b-2 pb-0.5 transition-colors hover:text-accent sm:block ${
                  isActive ? "border-accent text-accent" : "border-transparent"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border-b-2 border-transparent pb-0.5 transition-colors hover:text-accent lg:block"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            popoverTarget={MENU_ID}
            className="flex items-center gap-2 border-b-2 border-transparent pb-0.5 transition-colors hover:text-accent sm:hidden"
          >
            Menu
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2 4.5h12M2 8h12M2 11.5h12" />
            </svg>
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* double rule: masthead */}
      <div className="border-b border-line" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="border-b border-line" />
      </div>

      {/* Rendered in the top layer by the popover attribute, so it is not
          clipped by the header. Present in the markup at every width and simply
          unreachable above sm, where the link row is visible instead. */}
      <div
        id={MENU_ID}
        popover="auto"
        className="fixed inset-x-4 top-16 m-0 w-auto rounded-md border border-line-strong bg-card p-2 text-foreground shadow-[var(--shadow-lift)] sm:hidden"
      >
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={closeMenu}
            className="flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors hover:bg-row-hover hover:text-accent"
          >
            {l.label}
          </Link>
        ))}
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors hover:bg-row-hover hover:text-accent"
        >
          GitHub <span aria-hidden="true">&nbsp;↗</span>
        </a>
      </div>
    </header>
  );
}
