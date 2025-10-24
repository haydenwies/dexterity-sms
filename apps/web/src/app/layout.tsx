import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Toaster } from "@dexterity-sms/ui/components/sonner"
import "@dexterity-sms/ui/globals.css"

import { MobileGuard } from "~/components/mobile-guard"
import { APP_INFO } from "~/lib/app"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: APP_INFO.name,
	description: APP_INFO.description
}

export const viewport: Viewport = {
	themeColor: "#000000"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<MobileGuard>{children}</MobileGuard>
				<Toaster />
			</body>
		</html>
	)
}
