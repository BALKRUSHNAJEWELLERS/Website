// Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  Sun,
  Moon,
  ShoppingBag,
  User,
  Home,
  Info,
  Gem,
  Ruler,
  PiggyBank,
  Sparkles, // For Digital Gold, implies value/shine
  BookOpen, // For Blog
  Mail, // For Contact
} from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Catalog", href: "/catalog", icon: Gem },
    { name: "Ring Measurement", href: "/ring-measurement", icon: Ruler },
    { name: "Gold Scheme", href: "/gold-scheme", icon: PiggyBank },
    { name: "Digital Gold", href: "/digital-gold", icon: Sparkles },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    // Prevent scrolling when the mobile menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    // Cleanup function to reset overflow when component unmounts or isOpen becomes false
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Define common logo styles for consistency
  const logoTextClass = "text-white font-bold text-lg";
  const logoCircleBgClass = "w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md"; // Consistent red gradient

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Desktop & Mobile (main navbar) */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={logoCircleBgClass + " transform transition-transform duration-300 group-hover:scale-110"}>
              <span className={logoTextClass}>bkj</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-bold text-red-700 dark:text-white transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                BALKRUSHNA
              </span>
              <div className="text-sm text-red-700 font-medium dark:text-gray-300">
                JEWELLERS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 font-medium relative
                           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-orange-600 dark:after:bg-orange-400 after:transition-all after:duration-300
                           hover:after:w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-aligned Icons and Call Now Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-700 dark:text-gray-300" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-700 dark:text-gray-300" />
            </Button>

            {/* Shopping Bag */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-full"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-full"
              aria-label="User profile"
            >
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>

            {/* Call Now Button (Desktop) */}
            <Link href="tel:+917600093017" className="hidden md:block">
              <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden z-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-xs sm:max-w-sm p-6 bg-gradient-to-br from-gray-900 to-black/95 backdrop-blur-xl border-none shadow-2xl flex flex-col"
              >
                {/* Mobile Sheet Header (Logo) - NOW CONSISTENT */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2"
                  >
                    {/* Re-using the same logo classes for consistency */}
                    <div className={logoCircleBgClass}>
                      <span className={logoTextClass}>bkj</span>
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

                {/* Mobile Navigation Items */}
                <div className="flex flex-col gap-4 flex-grow">
                  {navItems.map((item) => {
                    const Icon = item.icon; // Get the Lucide icon component
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white text-lg font-medium group
                                   transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      >
                        <Icon className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Call Now Button */}
                <div className="mt-8">
                  <Link
                    href="tel:+917600093017"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
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