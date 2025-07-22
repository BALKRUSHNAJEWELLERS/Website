// Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Sun, Moon, ShoppingBag, User } from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Catalog", href: "/catalog" },
    { name: "Ring Measurement", href: "/ring-measurement" },
    { name: "Gold Scheme", href: "/gold-scheme" },
    { name: "Digital Gold", href: "/digital-gold" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">BKJ</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-bold text-red-700 dark:text-white">
                BALKRUSHNA
              </span>
              <div className="text-sm text-red-700 font-medium">
                JEWELLERS
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Link href="tel:+917600093017">
              <Button className="hidden md:flex bg-gradient-to-r from-red-500 to-red-600 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden z-50"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-xs p-6 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-none shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">BJ</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">
                        BALKRUSHNA
                      </span>
                      <div className="text-sm text-orange-300 font-medium">
                        JEWELLERS
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition text-white"
                    >
                      <Menu className="w-4 h-4 text-orange-400" />
                      <span className="text-base font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="absolute bottom-6 left-0 w-full px-6">
                  <Link
                    href="tel:+917600093017"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-3 rounded-xl">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
