import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Disable the automatic CSS injection

export const metadata: Metadata = {
	title: {
		template: '%s | Scratch Building',
		default: 'Scratch Building'
	},
	description: "A building management game is a simulation game where you create buildings using Scratch.",

	generator: "Next.js",
	metadataBase: new URL('https:/scratch-building.vercel.app'),

	// manifest: "/webmanifest.json",

	appleWebApp: { capable: true, title: "Scratch Building", statusBarStyle: "black-translucent" },
	verification: { "me": "https://github.com/selcold" },
	publisher: "Vercel",
	creator: "selcold",
	authors: [{ name: "selcold", url: "https://github.com/selcold" }],

	category: "Scratch Building",
	classification: "Scratch Building",
	keywords: "selcold,Scratch,game,website",

	applicationName: "Scratch Building",
	openGraph: {
		type: "website",
		url: "https://scratch-building.vercel.app/",
		title: "Scratch Building",
		description: "A building management game is a simulation game where you create buildings using Scratch.",
		siteName: "Scratch Building",
	},

	bookmarks: "https://scratch-building.vercel.app/"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="">
			<body className={`animate-fade animate-once animate-duration-[800ms] animate-delay-0 animate-ease-in-out animate-normal animate-fill-forwards ${inter.className}`}>{children}</body>
		</html>
	);
}
