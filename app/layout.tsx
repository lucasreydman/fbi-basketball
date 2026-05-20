import type { Metadata, Viewport } from "next";

import "@fontsource-variable/fraunces";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

import "./globals.css";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";

export const metadata: Metadata = {
  title: "Fantasy Basketball International",
  description:
    "The world's premier fantasy basketball community. Dynasty + redraft leagues, world cup, podcasts, free tools.",
  metadataBase: new URL("https://fbi-basketball.com"),
  openGraph: {
    title: "Fantasy Basketball International",
    description:
      "Dynasty + redraft leagues, the FBI World Cup, podcasts, and a full toolkit for fantasy basketball.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0B0D10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="relative min-h-full flex flex-col antialiased">
        <div className="noise-overlay" aria-hidden />
        <SiteHeader />
        <main className="relative z-[2] flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
