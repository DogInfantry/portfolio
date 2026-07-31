/**
 * Single source of truth for canonical URL and contact details.
 * metadataBase, sitemap, robots, JSON-LD and every visible contact link read
 * from here, so a change like a new email or domain is a one-line edit.
 */
export const site = {
  url: "https://portfolio-five-rouge-90.vercel.app",
  name: "Anklesh Rawat",
  role: "Investment Research, Strategy & Financial Analysis",
  education: "MBA, IIM Bodh Gaya",
  email: "anklesh.r@merinth.in",
  linkedin: "https://www.linkedin.com/in/anklesh-rawat-00508a1aa/",
  github: "https://github.com/DogInfantry",
  ssrn: "https://papers.ssrn.com/abstract=7135161",
  orcid: "https://orcid.org/0009-0001-2399-8032",
} as const;
