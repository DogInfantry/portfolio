import Image from "next/image";

/**
 * A screenshot in browser chrome.
 *
 * The chrome colours are theme tokens rather than literals, so the frame reads
 * correctly in both themes instead of staying a light-mode window pasted onto a
 * dark page. next/image handles the responsive sources: these PNGs are far
 * larger than the slot they render into.
 */
export default function BrowserFrame({
  src,
  alt,
  url,
  href,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  url?: string;
  href?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const frame = (
    <figure className="lift overflow-hidden rounded-sm border border-line-strong bg-card shadow-[var(--raise)]">
      <div className="flex items-center gap-2 border-b border-line bg-frame-chrome px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-frame-dot" />
        <span className="h-2 w-2 rounded-full bg-frame-dot" />
        <span className="h-2 w-2 rounded-full bg-frame-dot" />
        {url && (
          <span className="tnum ml-2 hidden truncate rounded-sm bg-card px-3 py-0.5 text-xs text-muted sm:block">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {frame}
      </a>
    );
  }
  return <div className="group">{frame}</div>;
}
