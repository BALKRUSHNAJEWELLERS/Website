"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Shield, TrendingUp, Zap, Phone, Mail, MapPin, CheckCircle, Star, Award } from "lucide-react"
import Link from "next/link"

interface DigitalGoldFeature {
  icon: React.ReactNode
  title: string
  description: string
}

interface DigitalGoldBenefit {
  title: string
  description: string
}

export default function DigitalGoldPage() {
  const features: DigitalGoldFeature[] = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Digital Convenience",
      description: "Buy, sell, and store gold digitally without physical storage concerns",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Secure",
      description: "Your digital gold is backed by physical gold stored in secure vaults",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Real-time Pricing",
      description: "Get live gold prices and make transactions at current market rates",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Transactions",
      description: "Buy or sell gold instantly with immediate confirmation",
    },
  ]

  const benefits: DigitalGoldBenefit[] = [
    {
      title: "No Storage Hassles",
      description: "No need to worry about safe storage, insurance, or security of physical gold",
    },
    {
      title: "Start Small",
      description: "Begin your gold investment journey with as little as ₹100",
    },
    {
      title: "No Making Charges",
      description: "Pure gold investment without any making charges or wastage",
    },
    {
      title: "Liquidity",
      description: "Convert your digital gold to cash or physical gold anytime",
    },
    {
      title: "Transparency",
      description: "Complete transparency in pricing and transactions",
    },
    {
      title: "Tax Benefits",
      description: "Enjoy tax benefits as per current government regulations",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Digital Gold Investment</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Invest in gold digitally with complete security and transparency. Start your gold investment journey
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:+917600093017">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Call to Invest Now
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Digital Gold?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of gold investment with our digital gold platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-orange-500 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How Digital Gold Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Simple steps to start your digital gold investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Call us at +91 7600 093 017 or visit our store to get started with digital gold investment
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Choose Amount</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Decide how much you want to invest. Start with as little as ₹100 or invest larger amounts
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Start Investing</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Complete the simple process and start building your digital gold portfolio securely
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Digital Gold Benefits</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the advantages of investing in digital gold
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Current Gold Rates</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Live gold prices updated every 5 minutes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-yellow-400">
                <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <CardTitle className="text-center text-2xl">24K Gold</CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">₹6,250</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">per gram</div>
                  <Badge className="mt-4 bg-green-100 text-green-800">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +0.5% today
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-400">
                <CardHeader className="bg-gradient-to-r from-gray-400 to-gray-600 text-white">
                  <CardTitle className="text-center text-2xl">Silver</CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-gray-600 mb-2">₹78</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">per gram</div>
                  <Badge className="mt-4 bg-red-100 text-red-800">
                    <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                    -0.2% today
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Invest in Digital Gold?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Contact us today to start your digital gold investment journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Speak with our gold investment experts</p>
                  <Link href="tel:+917600093017">
                    <Button className="bg-orange-500 hover:bg-orange-600">+91 7600 093 017</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Get detailed information via email</p>
                  <Link href="mailto:info@balkrushnajewellers.com">
                    <Button className="bg-orange-500 hover:bg-orange-600">Send Email</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Visit Store</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Visit our physical store for consultation</p>
                  <Link href="/contact">
                    <Button className="bg-orange-500 hover:bg-orange-600">Get Directions</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Trust Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">25+ Years</h3>
              <p className="text-gray-600 dark:text-gray-300">Trusted experience in jewelry and gold business</p>
            </div>

            <div className="text-center">
              <Shield className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">100% Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Your investments are completely safe and insured</p>
            </div>

            <div className="text-center">
              <Star className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Satisfied customers trust us with their gold investments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-white via-yellow-100 to-white text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Digital Gold Journey Today!</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of smart investors who choose digital gold for secure and convenient investment
          </p>
          <Link href="tel:+917600093017">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Phone className="h-5 w-5 mr-2" />
              Call Now to Invest
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
