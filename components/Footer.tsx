import Link from "next/link";
import { site } from "@/data/site";

/**
 * The footer was a nav strip, and it was display:none in print, so a printed
 * dossier carried no way to reach the person who wrote it. The two link columns
 * are .no-print and everything else survives, so the last printed page ends
 * with a name, a role, an email and a URL.
 *
 * ORCID appeared only in the home Contact block. A persistent identifier
 * belongs on every page.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-xl tracking-tight">{site.name}</p>
            <p className="sc mt-2 text-muted-2">{site.role}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Open to roles and collaborations across strategy, finance,
              investment and policy research, and quantitative work.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="lk mt-4 inline-block text-sm text-accent"
            >
              {site.email}
            </a>
          </div>

          <div className="no-print">
            <h2 className="sc text-muted-2">Site</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: "/work", label: "Work" },
                { href: "/research", label: "Research" },
                { href: "/#about", label: "About" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="no-print">
            <h2 className="sc text-muted-2">Elsewhere</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { href: site.linkedin, label: "LinkedIn" },
                { href: site.github, label: "GitHub" },
                { href: site.ssrn, label: "SSRN" },
                { href: site.orcid, label: "ORCID" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-muted-2">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.education}
          </p>
          <p className="tnum">{site.url.replace(/^https?:\/\//, "")}</p>
        </div>
      </div>
    </footer>
  );
}
