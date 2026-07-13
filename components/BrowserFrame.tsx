export default function BrowserFrame({
  src,
  alt,
  url,
  href,
}: {
  src: string;
  alt: string;
  url?: string;
  href?: string;
}) {
  const frame = (
    <figure className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_2px_20px_rgba(28,37,48,0.08)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(28,37,48,0.14)]">
      <div className="flex items-center gap-2 border-b border-line bg-[#f2f0ea] px-3.5 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4623a]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8b93c]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2fa66a]/70" />
        {url && (
          <span className="ml-2 hidden truncate rounded-md bg-white px-2.5 py-0.5 font-mono text-[11px] text-muted sm:block">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top"
      />
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
