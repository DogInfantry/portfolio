import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anklesh-portfolio.vercel.app"),
  title: {
    default: "Anklesh Rawat · Investment Research, Strategy & Financial Analysis",
    template: "%s · Anklesh Rawat",
  },
  description:
    "Portfolio of Anklesh Rawat (MBA, IIM Bodh Gaya): investment research, strategy, and financial analysis. Covenant surveillance, equity research engines, capital markets intelligence, and sustainable finance strategy.",
  openGraph: {
    title: "Anklesh Rawat · Investment Research, Strategy & Financial Analysis",
    description:
      "Covenant surveillance, equity research engines, capital markets intelligence, and sustainable finance research.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
