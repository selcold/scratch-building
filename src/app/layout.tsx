import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { _cfgSite } from "@/components/configs/siteLinks";
import { Toaster } from "sonner";
import Head from "next/head";
config.autoAddCss = false; // Disable the automatic CSS injection

export const metadata: Metadata = {
	title: {
		template: `%s | ${_cfgSite.title}`,
		default: `${_cfgSite.title}`
	},
	description: "A building management game is a simulation game where you create buildings using Scratch.",

	generator: "Next.js",
	metadataBase: new URL('https:/scratch-building.vercel.app'),

	// manifest: "/webmanifest.json",

	appleWebApp: { capable: true, title: `${_cfgSite.title}`, statusBarStyle: "black-translucent" },
	verification: { "me": "https://github.com/selcold" },
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
		title: `${_cfgSite.title}`,
		description: "A building management game is a simulation game where you create buildings using Scratch.",
		siteName: `${_cfgSite.title}`,
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
			<body className={`animate-fade animate-once animate-duration-[300ms] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards ${inter.className}`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
