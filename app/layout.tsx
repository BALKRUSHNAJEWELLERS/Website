import { ThemeProvider } from "@/components/theme-provider";
import { AppProviders } from "./provider"; // 👈 import wrapper
import { Navbar } from "@/components/navbar";
import { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ChatBot } from "@/components/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://balkrushnajewellers.com"),
  title: {
    default: " Balkrushna Jewellers",
    template: "%s | Balkrushna Jewellers",
  },
  description: "Balkrushna Jewellers - Exquisite Jewelry Craftsmanship",
  keywords: [
    "Balkrushna Jewellers",
    "Jewelry",
    "Gold Jewelry",
    "Diamond Jewelry",
    "Custom Jewelry",
    "Handcrafted Jewelry",
    "Fine Jewelry",
    "Jewelry Store",
    "Luxury Jewelry",
    "Engagement Rings",
    "Wedding Bands",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Jewelry Design",
    "Jewelry Repair",
    "Jewelry Appraisal",
    "Bespoke Jewelry",
    "Jewelry Collections",
    "Jewelry Trends",
    "Jewelry Gifts",
    "Jewelry Care",
    "Jewelry Maintenance",
    "Jewelry Cleaning",
    "Jewelry Accessories",
    "Jewelry Fashion",
    "Jewelry Styles",
    "Jewelry Inspiration",
    "Jewelry Ideas",
    "Jewelry Shopping",
    "Jewelry Offers",
    "Jewelry Discounts",
    "Jewelry Deals",
    "Jewelry Reviews",
    "Jewelry Testimonials",
    "Jewelry Blog",
    "Jewelry News",
  ],
  
  authors: {
    name: "Bluecore IT",
    url: "bluecoreit.tech",
  },
  creator: "Bluecore IT",
  publisher: "Bluecore IT",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>
            {" "}
            {/* ✅ now this is client-safe */}
            <div className="min-h-screen flex flex-col dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
              <Navbar />
              <main className="flex-1 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
                {children}
              </main>
              <Footer />
              <ChatBot />
            </div>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
