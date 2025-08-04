"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
  Sparkles,
  BookOpen,
  Mail,
} from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Catalog", href: "/catalog", icon: Gem },
    { name: "Ring Measurement", href: "/ring-measurement", icon: Ruler },
    { name: "Gold Scheme", href: "/gold-scheme", icon: PiggyBank },
    { name: "Digital Gold", href: "/digital-gold", icon: Sparkles },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
  ]

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - More Attractive */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-bold text-lg">bkj</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-md"></div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-500 group-hover:to-red-600">
                  BALKRUSHNA
                </span>
                <div className="text-sm text-red-600 font-semibold tracking-wider dark:text-red-400">JEWELLERS</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - More Compact Rounded Pills */}
          <div className="hidden lg:flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 rounded-full p-1.5 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-aligned Icons - Rounded Design */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle - Rounded */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Shopping Bag - Rounded */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button> */}

            {/* User Profile - Rounded */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
              aria-label="User profile"
            >
              <User className="h-5 w-5" />
            </Button> */}

            {/* Call Now Button - Enhanced Rounded */}
            <Link href="tel:+917600093017" className="hidden md:block">
              <Button className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-semibold">Call Now</span>
              </Button>
            </Link>

            {/* Mobile Menu Trigger - Rounded */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-xs sm:max-w-sm p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-xl border-none shadow-2xl flex flex-col rounded-l-3xl"
              >
                {/* Mobile Sheet Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white font-bold text-lg">bkj</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">BALKRUSHNA</span>
                      <div className="text-sm text-red-300 font-semibold tracking-wider">JEWELLERS</div>
                    </div>
                  </Link>
                </div>

                {/* Mobile Navigation Items - Rounded */}
                <div className="flex flex-col gap-3 flex-grow">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 backdrop-blur-sm transition-all duration-300 text-white text-lg font-medium group transform hover:translate-x-2 hover:scale-105 border border-white/10 hover:border-red-400/30"
                      >
                        <Icon className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Mobile Call Now Button - Enhanced */}
                <div className="mt-8">
                  <Link href="tel:+917600093017" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Phone className="h-5 w-5 mr-3" />
                      <span className="font-semibold">Call Now</span>
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
