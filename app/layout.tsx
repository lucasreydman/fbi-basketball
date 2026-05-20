import type { Metadata, Viewport } from "next";

import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

import "./globals.css";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { SmoothScroll } from "@/components/shell/smooth-scroll";

export const metadata: Metadata = {
  title: {
    default: "Fantasy Basketball International",
    template: "%s — FBI",
  },
  description:
    "The world's premier fantasy basketball community. Dynasty + redraft leagues, the FBI World Cup, three pods, and a full toolkit for serious managers.",
  metadataBase: new URL("https://fbi-basketball.vercel.app"),
  openGraph: {
    title: "Fantasy Basketball International",
    description:
      "Dynasty + redraft leagues, the FBI World Cup, podcasts, and a full toolkit.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#1a1d23",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="relative min-h-full flex flex-col">
        <SmoothScroll />
        <div className="noise" aria-hidden />
        <SiteHeader />
        <main className="relative z-[2] flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
