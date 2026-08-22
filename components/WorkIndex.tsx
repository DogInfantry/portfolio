"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { domains, domainVar, type DomainKey } from "@/data/domains";
import {
  artifactTypes,
  groups,
  work,
  type ArtifactType,
  type WorkItem,
} from "@/data/work";
import WorkCard from "@/components/WorkCard";

/**
 * The index of everything, grouped by what the artefact actually is.
 *
 * Grouping is the point: a flat grid of thirteen cards reads as a pile, and a
 * reader cannot tell a working paper from a weekend repo without opening both.
 * Filters narrow within the groups rather than replacing them.
 *
 * Filter state lives in the URL so a filtered view is shareable and the back
 * button behaves, but it is read from window.location rather than through
 * useSearchParams. That hook forces the subtree behind a Suspense boundary
 * which partial prerendering then postpones, and a postponed boundary means
 * the cards are absent from the prerendered HTML. Reading the URL after mount
 * keeps every card in the static markup, which is what search engines and a
 * reader on a slow connection actually get.
 */

type Filters = { domain: DomainKey | null; type: ArtifactType | null };

const EMPTY: Filters = { domain: null, type: null };

function isDomain(v: string | null): v is DomainKey {
  return domains.some((d) => d.key === v);
}
function isType(v: string | null): v is ArtifactType {
  return artifactTypes.some((t) => t.key === v);
}

function readUrl(): Filters {
  const p = new URLSearchParams(window.location.search);
  const domain = p.get("domain");
  const type = p.get("type");
  return {
    domain: isDomain(domain) ? domain : null,
    type: isType(type) ? type : null,
  };
}

function Chip({
  active,
  onClick,
  hue,
  children,
}: {
  active: boolean;
  onClick: () => void;
  hue?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`sc inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
        active
          ? "border-accent bg-accent-soft text-foreground"
          : "border-line text-muted hover:border-accent/50 hover:text-foreground"
      }`}
    >
      {hue && (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-opacity"
          style={{ background: hue, opacity: active ? 1 : 0.55 }}
        />
      )}
      {children}
    </button>
  );
}

export default function WorkIndex({ items = work }: { items?: WorkItem[] }) {
  // The server has no URL to read, so it renders everything. A deep link
  // narrows it on mount.
  const [filters, setFilters] = useState<Filters>(EMPTY);

  useEffect(() => {
    const sync = () => setFilters(readUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const commit = useCallback((next: Filters) => {
    setFilters(next);
    const p = new URLSearchParams(window.location.search);
    if (next.domain) p.set("domain", next.domain);
    else p.delete("domain");
    if (next.type) p.set("type", next.type);
    else p.delete("type");
    const qs = p.toString();
    window.history.pushState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, []);

  const shown = useMemo(
    () =>
      items.filter(
        (w) =>
          (!filters.domain || w.domain === filters.domain) &&
          (!filters.type || w.type === filters.type)
      ),
    [items, filters]
  );

  // a group with nothing behind it is not rendered at all, so filtering never
  // leaves a heading standing over an empty space
  const sections = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          items: shown.filter((w) => g.types.includes(w.type)),
        }))
        .filter((g) => g.items.length > 0),
    [shown]
  );

  // only offer a filter that has something behind it
  const present = useMemo(
    () => ({
      domains: new Set(items.map((w) => w.domain)),
      types: new Set(items.map((w) => w.type)),
    }),
    [items]
  );

  const filtered = filters.domain !== null || filters.type !== null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip active={!filtered} onClick={() => commit(EMPTY)}>
          All {items.length}
        </Chip>
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
        {domains
          .filter((d) => present.domains.has(d.key))
          .map((d) => (
            <Chip
              key={d.key}
              active={filters.domain === d.key}
              hue={domainVar(d.key)}
              onClick={() =>
                commit({
                  ...filters,
                  domain: filters.domain === d.key ? null : d.key,
                })
              }
            >
              {d.label}
            </Chip>
          ))}
        {present.types.size > 1 && (
          <>
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
            {artifactTypes
              .filter((t) => present.types.has(t.key))
              .map((t) => (
                <Chip
                  key={t.key}
                  active={filters.type === t.key}
                  onClick={() =>
                    commit({
                      ...filters,
                      type: filters.type === t.key ? null : t.key,
                    })
                  }
                >
                  {t.label}
                </Chip>
              ))}
          </>
        )}
      </div>

      <p aria-live="polite" className="sc mt-5 text-muted-2">
        {shown.length === items.length
          ? `${items.length} items`
          : `${shown.length} of ${items.length} items`}
      </p>

      {sections.length === 0 ? (
        <p className="mt-8 rounded-md border border-line bg-card px-6 py-10 text-center text-muted">
          Nothing in that combination yet.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-16">
          {sections.map((g) => (
            <section key={g.key} id={g.key} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
                <h3 className="font-serif text-2xl tracking-tight">
                  {g.title}
                </h3>
                <p className="sc tnum text-muted-2">
                  {g.items.length} {g.items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {g.blurb}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item) => (
                  <WorkCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
