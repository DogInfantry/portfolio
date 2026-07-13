import type { Metadata } from "next";
import { documents } from "@/data/documents";

export const metadata: Metadata = {
  title: "Documents",
  description: "Research notes, decks, and writing by Anklesh Rawat.",
};

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-4xl tracking-tight">Documents</h1>
      <p className="mt-3 text-muted">
        Research notes, models, and presentation decks.
      </p>

      {documents.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-line bg-card px-8 py-16 text-center">
          <p className="font-serif text-xl">Research library coming soon</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            Notes and decks are being prepared for publication. In the
            meantime, the live projects above are the best sample of my work.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-10">
          {documents.map((doc) => (
            <article
              key={doc.file}
              className="overflow-hidden rounded-xl border border-line bg-card shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line p-5">
                <div>
                  <h2 className="font-serif text-xl">{doc.title}</h2>
                  <p className="mt-1 text-sm text-muted">{doc.description}</p>
                </div>
                <a
                  href={doc.file}
                  download
                  className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  Download
                </a>
              </div>
              <iframe
                src={doc.file}
                title={doc.title}
                className="h-[70vh] w-full"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
