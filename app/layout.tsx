import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ChatBot } from "@/components/chatbot"
import { GoldRatesProvider } from "@/context/GoldRatesContext" // ✅ added

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BALKRUSHNA JEWELLERS - Premium Gold & Diamond Jewelry",
  description:
    "Discover exquisite gold, diamond, and silver jewelry at BALKRUSHNA JEWELLERS. Premium quality, certified jewelry with 25+ years of trust.",
  keywords: "jewelry, gold, diamond, silver, rings, necklaces, earrings, bracelets",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <GoldRatesProvider> {/* ✅ wrap with context */}
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatBot />
            <Toaster />
          </GoldRatesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
