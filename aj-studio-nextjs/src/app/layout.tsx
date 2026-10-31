import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ Studio | Premium Digital Experiences",
  description: "AJ Studio builds premium, modern digital experiences for brands. UI/UX design, web apps, and content creation.",
  keywords: "web design, UI/UX, web development, digital agency, Next.js",
  openGraph: {
    title: "AJ Studio | Premium Digital Experiences",
    description: "Building modern digital experiences for ambitious brands.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
