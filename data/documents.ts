export type Doc = {
  title: string;
  description: string;
  /** path under public/, e.g. "/docs/equity-note.pdf" */
  file: string;
};

// To publish a document:
// 1. Drop the PDF into public/docs/  (PPTs: export to PDF first —
//    browsers cannot render .pptx natively)
// 2. Add an entry here.
export const documents: Doc[] = [];
