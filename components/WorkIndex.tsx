"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DomainKey } from "@/data/domains";
import type { ArtifactType, DomainOption, IndexRow } from "@/data/work";
import WorkFacets from "@/components/WorkFacets";
import WorkRows, { type Dir, type SortKey } from "@/components/WorkRows";

/**
 * The index shell: search, facets, view switch, sort, and the live count.
 *
 * Three things about the architecture are load bearing.
 *
 * It imports nothing from data/. It used to `import { work }`, which dragged
 * data/projects.ts and data/research.ts into the client chunk, roughly 50KB of
 * descriptions, approaches, highlights and abstracts that no card renders and
 * none of it tree shakeable. The server passes a slim row view model instead,
 * and the cards themselves arrive as server rendered children that this
 * component only hides and shows.
 *
 * Filter state is read from window.location and written with history.pushState
 * rather than through useSearchParams. That hook forces a Suspense boundary,
 * partial prerendering postpones it, and a postponed boundary means the cards
 * are absent from the prerendered HTML. Do not "improve" the facet buttons into
 * anchors with a query string either: it looks like progressive enhancement and
 * is a lie, because reading searchParams on the server makes the route dynamic
 * and brings the same postponement back.
 *
 * Nothing is behind a control. With JavaScript off the reader gets every card
 * and every row, unfiltered, with every link working.
 */

type State = {
  domains: DomainKey[];
  types: ArtifactType[];
  q: string;
  view: "cards" | "table";
  sort: SortKey;
  dir: Dir;
};

const DEFAULT: State = {
  domains: [],
  types: [],
  q: "",
  view: "cards",
  sort: "featured",
  dir: "asc",
};

const MAX_Q = 80;

function write(p: URLSearchParams, key: string, value: string) {
  if (value) p.set(key, value);
  else p.delete(key);
}

export default function WorkIndex({
  rows,
  domains,
  types,
  children,
}: {
  rows: IndexRow[];
  domains: DomainOption[];
  types: { key: ArtifactType; label: string }[];
  children: React.ReactNode;
}) {
  // The server has no URL to read, so it renders everything. A deep link
  // narrows it on mount.
  const [state, setState] = useState<State>(DEFAULT);
  const searchRef = useRef<HTMLInputElement>(null);

  const read = useCallback((): State => {
    const p = new URLSearchParams(window.location.search);
    const pick = <T extends string>(key: string, allowed: readonly T[]): T[] =>
      (p.get(key) ?? "")
        .split(",")
        .filter((v): v is T => (allowed as readonly string[]).includes(v));
    return {
      domains: pick(
        "domain",
        domains.map((d) => d.key)
      ),
      types: pick(
        "type",
        types.map((t) => t.key)
      ),
      q: (p.get("q") ?? "").slice(0, MAX_Q),
      view: p.get("view") === "table" ? "table" : "cards",
      sort: (["title", "domain", "type"] as const).find(
        (s) => s === p.get("sort")
      ) ?? "featured",
      dir: p.get("dir") === "desc" ? "desc" : "asc",
    };
  }, [domains, types]);

  useEffect(() => {
    const sync = () => setState(read());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [read]);

  // "/" focuses search, unless the reader is already typing somewhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commit = useCallback(
    (patch: Partial<State>, push = true) => {
      setState((prev) => {
        const next = { ...prev, ...patch };
        // sorting is a table-only affordance, so it does not linger in the URL
        if (next.view === "cards") {
          next.sort = "featured";
          next.dir = "asc";
        }
        // canonical order, so the same selection reached two ways is one URL
        next.domains = domains
          .map((d) => d.key)
          .filter((k) => next.domains.includes(k));
        next.types = types
          .map((t) => t.key)
          .filter((k) => next.types.includes(k));

        document.documentElement.dataset.view =
          next.view === "table" ? "table" : "";

        const p = new URLSearchParams(window.location.search);
        write(p, "domain", next.domains.join(","));
        write(p, "type", next.types.join(","));
        write(p, "q", next.q.slice(0, MAX_Q));
        write(p, "view", next.view === "table" ? "table" : "");
        write(p, "sort", next.sort === "featured" ? "" : next.sort);
        write(p, "dir", next.dir === "desc" ? "desc" : "");
        const qs = p.toString();
        const url = qs
          ? `${window.location.pathname}?${qs}`
          : window.location.pathname;
        window.history[push ? "pushState" : "replaceState"](null, "", url);
        return next;
      });
    },
    [domains, types]
  );

  const tokens = useMemo(
    () => state.q.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [state.q]
  );

  /** query applied, facets not: this is what the matrix counts */
  const base = useMemo(
    () =>
      tokens.length
        ? rows.filter((r) => tokens.every((t) => r.search.includes(t)))
        : rows,
    [rows, tokens]
  );

  const shown = useMemo(
    () =>
      base.filter(
        (r) =>
          (state.domains.length === 0 || state.domains.includes(r.domain)) &&
          (state.types.length === 0 || state.types.includes(r.type))
      ),
    [base, state.domains, state.types]
  );

  const sorted = useMemo(() => {
    if (state.sort === "featured") return shown;
    const order = (r: IndexRow) =>
      state.sort === "title"
        ? r.title
        : state.sort === "domain"
          ? String(domains.findIndex((d) => d.key === r.domain)).padStart(2, "0")
          : String(types.findIndex((t) => t.key === r.type)).padStart(2, "0");
    const sign = state.dir === "desc" ? -1 : 1;
    return [...shown].sort(
      (a, b) =>
        sign * (order(a).localeCompare(order(b)) || a.title.localeCompare(b.title))
    );
  }, [shown, state.sort, state.dir, domains, types]);

  /* The cards are server-owned DOM, so the filter is applied to them rather
     than rendered by them. Group counts are rewritten in the same pass, because
     a heading that says "5 items" over one card is worse than no count. */
  useEffect(() => {
    const visible = new Set(shown.map((r) => r.slug));
    for (const el of document.querySelectorAll<HTMLElement>("[data-slug]")) {
      el.hidden = !visible.has(el.dataset.slug ?? "");
    }
    for (const section of document.querySelectorAll<HTMLElement>(
      "[data-group]"
    )) {
      const n = section.querySelectorAll(
        "article[data-slug]:not([hidden])"
      ).length;
      const label = section.querySelector<HTMLElement>("[data-group-count]");
      if (label) label.textContent = `${n} ${n === 1 ? "item" : "items"}`;
    }
  }, [shown]);

  const filtered =
    state.domains.length > 0 || state.types.length > 0 || tokens.length > 0;

  const activeLabel = [
    ...state.domains.map(
      (k) => domains.find((d) => d.key === k)?.label ?? k
    ),
    ...state.types.map((k) => types.find((t) => t.key === k)?.label ?? k),
  ].join(", ");

  const emptyMessage =
    base.length === 0 && shown.length === 0 && tokens.length > 0
      ? `No text match for "${state.q.trim()}".`
      : activeLabel
        ? `Nothing in ${activeLabel} yet.`
        : "Nothing matches.";

  return (
    <div>
      <div className="no-print flex flex-wrap items-center gap-3">
        <label className="relative flex min-w-[13rem] flex-1 items-center">
          <span className="vh">Search work</span>
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none absolute left-3 h-4 w-4 text-muted-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            value={state.q}
            placeholder="Search title, subject, stack"
            onChange={(e) =>
              commit(
                { q: e.target.value.slice(0, MAX_Q) },
                // one history entry for entering the search, not one per key
                state.q === "" && e.target.value !== ""
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                commit({ q: "" }, false);
                e.currentTarget.blur();
              }
            }}
            className="w-full rounded-sm border border-line-strong bg-card py-2.5 pl-9 pr-3 text-sm text-foreground transition-colors placeholder:text-muted-2 hover:border-accent focus:border-accent"
          />
        </label>

        <div
          role="group"
          aria-label="View"
          className="flex shrink-0 rounded-sm border border-line-strong p-0.5"
        >
          {(
            [
              { key: "cards", label: "Cards", d: "M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" },
              { key: "table", label: "Table", d: "M2 3.5h12M2 8h12M2 12.5h12" },
            ] as const
          ).map((v) => (
            <button
              key={v.key}
              type="button"
              aria-pressed={state.view === v.key}
              onClick={() => commit({ view: v.key })}
              className={`flex h-8 w-9 items-center justify-center rounded-[2px] transition-colors ${
                state.view === v.key
                  ? "bg-accent-soft text-accent"
                  : "text-muted-2 hover:text-accent"
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <path d={v.d} />
              </svg>
              <span className="vh">{v.label} view</span>
            </button>
          ))}
        </div>
      </div>

      <div className="no-print mt-4">
        <WorkFacets
          rows={base}
          domains={domains}
          types={types}
          selectedDomains={state.domains}
          selectedTypes={state.types}
          /* a matrix of seven dots over two columns is a table with a
             decorative column, so /research degrades to a plain chip list */
          showCounts={rows.length > 10}
          onToggleDomain={(k) =>
            commit({
              domains: state.domains.includes(k)
                ? state.domains.filter((x) => x !== k)
                : [...state.domains, k],
            })
          }
          onToggleType={(k) =>
            commit({
              types: state.types.includes(k)
                ? state.types.filter((x) => x !== k)
                : [...state.types, k],
            })
          }
        />
      </div>

      <p aria-live="polite" className="sc mt-6 flex flex-wrap gap-x-4 text-muted-2">
        <span>
          {filtered
            ? `${activeLabel ? activeLabel + ": " : ""}${shown.length} of ${rows.length} items`
            : `${rows.length} items`}
        </span>
        {filtered && (
          <button
            type="button"
            onClick={() => commit(DEFAULT)}
            className="no-print underline underline-offset-2 transition-colors hover:text-accent"
          >
            Clear
          </button>
        )}
      </p>

      {/* a printed subset should say what it is a subset of */}
      {filtered && (
        <p className="sc hidden text-muted-2 print:block">
          Filtered to {activeLabel || `"${state.q.trim()}"`}. {shown.length} of{" "}
          {rows.length} items.
        </p>
      )}

      {shown.length === 0 && (
        <p className="mt-8 rounded-md border border-line-strong bg-card px-6 py-10 text-center text-muted">
          {emptyMessage}{" "}
          <button
            type="button"
            onClick={() => commit(DEFAULT)}
            className="lk text-accent"
          >
            Clear filters
          </button>
        </p>
      )}

      <div className="mt-8">
        {children}
        <div className="wi-table">
          <WorkRows
            rows={sorted}
            sort={state.sort}
            dir={state.dir}
            onSort={(k) =>
              commit(
                state.sort !== k
                  ? { sort: k, dir: "asc" }
                  : state.dir === "asc"
                    ? { sort: k, dir: "desc" }
                    : // third click returns to Featured, which is a real
                      // editorial order rather than a null state
                      { sort: "featured", dir: "asc" }
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
