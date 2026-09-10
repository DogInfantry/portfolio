import type { DomainKey } from "@/data/domains";

/**
 * The shared social card.
 *
 * Every page pointed at one static /og.png, so sixteen distinct pieces of work
 * shared a single preview. Each route now generates its own at build time.
 *
 * No font assets. next/og bundles Geist Regular, which is this site's own sans
 * face, so omitting the `fonts` option gives the right typeface for free. The
 * display serif is not available as a TTF here and Satori cannot read the woff2
 * that next/font caches, so hierarchy on the card is carried by size, colour
 * and the domain rule rather than by a second family. That is a deliberate
 * trade against downloading and licensing a font file for one image.
 *
 * Satori is not a browser. Every element with more than one child needs an
 * explicit display:flex, there are no CSS variables and no currentColor, sizes
 * are numbers rather than rem, and clamping is WebkitLineClamp on a
 * -webkit-box. Do not tidy any of that away.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The light values from :root in app/globals.css, repeated because Satori
 * cannot read CSS. scripts/check-tokens.mjs fails the build if the two drift,
 * which is the same instinct as scripts/check-figures.mjs: duplication that
 * cannot be removed gets checked instead of trusted.
 */
export const OG = {
  background: "#faf9f6",
  foreground: "#1c2530",
  muted: "#5b6673",
  muted2: "#68717d",
  accent: "#14665a",
  line: "#e4e1da",
} as const;

export const DOMAIN_HEX: Record<DomainKey, string> = {
  credit: "#00856e",
  macro: "#b4531f",
  equities: "#3550a8",
  product: "#9a7000",
  quant: "#9c3f6d",
  sustainable: "#5d7519",
  climate: "#0f7fa8",
  "market-structure": "#b03636",
  policy: "#7a3d9e",
};

const clamp = (lines: number) => ({
  display: "-webkit-box" as const,
  WebkitBoxOrient: "vertical" as const,
  WebkitLineClamp: lines,
  overflow: "hidden" as const,
});

export function OgCard({
  hue,
  kicker,
  title,
  outcome,
  metrics = [],
  host,
}: {
  hue: string;
  kicker: string;
  title: string;
  outcome: string;
  metrics?: { value: string; label: string }[];
  host: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: OG.background,
      }}
    >
      <div style={{ display: "flex", height: 10, background: hue }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 6,
              background: hue,
              marginRight: 14,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: OG.muted,
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 62,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: OG.foreground,
            ...clamp(3),
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 28,
            lineHeight: 1.4,
            color: OG.muted,
            ...clamp(2),
          }}
        >
          {outcome}
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1px solid ${OG.line}`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>
            {metrics.slice(0, 2).map((m) => (
              <div
                key={m.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 56,
                  maxWidth: 330,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 34,
                    color: OG.foreground,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 18,
                    lineHeight: 1.3,
                    color: OG.muted2,
                    ...clamp(2),
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", fontSize: 24, color: OG.foreground }}>
              Anklesh Rawat
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 6,
                fontSize: 18,
                color: OG.muted2,
              }}
            >
              {host}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
