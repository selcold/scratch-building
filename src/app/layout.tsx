import type { Metadata } from 'next'
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Inter } from 'next/font/google';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Disable the automatic CSS injection

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  generator: "Next.js",
  metadataBase: new URL('https://scratch-building.vercel.app'),

  title: 'ビル経営ゲーム',
  description: 'A building management game is a simulation game where you create buildings using Scratch.',

  manifest: "/webmanifest.json",

  appleWebApp: { capable: true, title: "ビル経営ゲーム", statusBarStyle: "black-translucent" },
  verification: { "me": "https://github.com/Fun117" },
  publisher: "Vercel",
  creator: "Fun117",
  authors: [{ name: "Fun117", url: "https://github.com/Fun117" }],

  category: "ビル経営ゲーム",
  classification: "ビル経営ゲーム",
  keywords: "fun117,Scratch",

  applicationName: "ビル経営ゲーム",
  openGraph: {
    type: "website",
    url: "https://generated.vercel.app/",
    title: "ビル経営ゲーム",
    description: "A building management game is a simulation game where you create buildings using Scratch.",
    siteName: "ビル経営ゲーム",
    images: [{
      url: "/assets/img/game/banner_bg.png",
    }],
  },

  bookmarks: "https://scratch-building.vercel.app/"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`bg-zinc-900 text-white ${inter.className}`}>
      <ClerkProvider appearance={{baseTheme: dark}}>
        {children}
      </ClerkProvider>
    </html>
  )
}
