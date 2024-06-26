import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { _cfgImages, _cfgSite } from "@/components/configs/siteLinks";
import { Toaster } from "sonner";
import type { Viewport } from "next";
config.autoAddCss = false; // Disable the automatic CSS injection

export const viewport: Viewport = {
  themeColor: "#18181b",
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${_cfgSite.title_ja}`,
    default: `${_cfgSite.title_ja}`,
  },
  description: _cfgSite.description_ja,

  generator: "Next.js",
  metadataBase: new URL("https:/scratch-building.vercel.app"),

  manifest: "/webmanifest.json",

  appleWebApp: {
    capable: true,
    title: `${_cfgSite.title}`,
    statusBarStyle: "black-translucent",
  },
  verification: { me: "https://github.com/selcold" },
  publisher: "Vercel",
  creator: "selcold",
  authors: [{ name: "selcold", url: "https://github.com/selcold" }],

  category: `${_cfgSite.title}`,
  classification: `Educational Game, ${_cfgSite.title}, Scratch Project Official Site`,
  keywords: "website, selcold, Scratch, game, Educational Game",

  applicationName: `${_cfgSite.title}`,
  openGraph: {
    type: "website",
    url: "https://scratch-building.vercel.app/",
    title: `${_cfgSite.title_ja}`,
    description: _cfgSite.description_ja,
    siteName: `${_cfgSite.title}`,
    images: [
      {
        url: _cfgImages.links_game_banner_bg,
      },
    ],
  },

  bookmarks: "https://scratch-building.vercel.app/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn2.scratch.mit.edu" />
      </head>
      <body
        className={`animate-fade animate-once animate-duration-[300ms] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards ${inter.className}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
