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
  title: 'ビル経営ゲーム',
  description: 'A building management game is a simulation game where you create buildings using Scratch.',
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
