import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ Studio — Design & Technology Partner for Scaling Companies",
  description:
    "Design partner for scaling companies in India and worldwide. Fueling growth through strategic branding, intuitive UI/UX design, Next.js engineering, and business automation systems.",
  keywords: [
    "Design Partner India",
    "UI/UX Design Studio",
    "Next.js Development Company",
    "SaaS Dashboard UI/UX",
    "Zoho CRM Automation",
    "B2B Web Development",
    "Figma Design Systems",
    "Independent Digital Studio",
  ],
  authors: [{ name: "AJ Studio" }],
  openGraph: {
    title: "AJ Studio — Design & Technology Partner for Scaling Companies",
    description:
      "Fueling growth through strategic branding, UX/UI, modern Next.js development, and business automation.",
    type: "website",
    locale: "en_US",
    siteName: "AJ Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Studio — Design & Technology Partner for Scaling Companies",
    description:
      "Fueling growth through strategic branding, UX/UI, modern Next.js development, and business automation.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
