import { ThemeProvider } from "@/components/theme-provider";
import { AppProviders } from "./provider"; // 👈 import wrapper
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
              <main className="flex-1 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">{children}</main>
              <Footer />
            </div>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
