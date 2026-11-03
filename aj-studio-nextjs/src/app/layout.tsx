import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJ Studio | UI/UX Design & Web Development Studio",
  description:
    "AJ Studio helps businesses build better digital experiences through UI/UX design, website development, CRM solutions and creative branding.",
  keywords: [
    "UI/UX Design Studio",
    "Website Design and Development",
    "SaaS Dashboard Design",
    "CRM Development and Customization",
    "Business Website Design",
    "Digital Design Studio India",
    "Next.js Development",
    "Zoho CRM Workflows",
  ],
  authors: [{ name: "AJ Studio" }],
  openGraph: {
    title: "AJ Studio | UI/UX Design & Web Development Studio",
    description:
      "Ideas into digital experiences. Thoughtful design, modern Next.js technology, and practical business understanding.",
    type: "website",
    locale: "en_US",
    siteName: "AJ Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJ Studio | UI/UX Design & Web Development Studio",
    description:
      "Ideas into digital experiences. Design. Develop. Deliver.",
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
