import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white m-30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">BJ</span>
              </div>
              <div>
                <span className="text-xl font-bold">BALKRUSHNA</span>
                <div className="text-sm text-orange-400 font-medium">JEWELLERS</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Premium quality jewelry with 25+ years of trust and excellence in craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-white">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/gold-scheme" className="text-gray-300 hover:text-white">
                  Gold Scheme
                </Link>
              </li>
              <li>
                <Link href="/digital-gold" className="text-gray-300 hover:text-white">
                  Digital Gold
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ring-measurement" className="text-gray-300 hover:text-white">
                  Ring Measurement
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Custom Jewelry</span>
              </li>
              <li>
                <span className="text-gray-300">Jewelry Repair</span>
              </li>
              <li>
                <span className="text-gray-300">Gold Exchange</span>
              </li>
              <li>
                <span className="text-gray-300">Certification</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">+91 7600 093 017</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">info@balkrushnajewellers.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <span className="text-gray-300">
                 Gandhi Rd, Ganotri Society,
                  <br />
                 Himatnagar, Gujarat 380001 India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 BALKRUSHNA JEWELLERS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
