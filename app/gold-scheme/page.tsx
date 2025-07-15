"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Gift, Shield, Phone } from "lucide-react"
import Link from "next/link"

interface SchemeFeature {
  icon: React.ReactNode
  title: string
  description: string
}

interface GoldScheme {
  id: string
  name: string
  duration: string
  monthlyAmount: string
  totalAmount: string
  goldValue: string
  discount: string
  features: string[]
  popular?: boolean
  color: string
}

export default function GoldSchemePage() {
  const schemes: GoldScheme[] = [
    {
      id: "1",
      name: "Gold Saver",
      duration: "11 Months",
      monthlyAmount: "₹1,000",
      totalAmount: "₹11,000",
      goldValue: "₹12,000",
      discount: "8.3%",
      features: [
        "No making charges on select items",
        "Free jewelry cleaning",
        "Priority customer service",
        "Flexible payment dates",
      ],
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "2",
      name: "Gold Plus",
      duration: "12 Months",
      monthlyAmount: "₹2,000",
      totalAmount: "₹24,000",
      goldValue: "₹26,400",
      discount: "10%",
      features: [
        "No making charges on all items",
        "Free jewelry cleaning & polishing",
        "Priority customer service",
        "Flexible payment dates",
        "Free home delivery",
      ],
      popular: true,
      color: "from-orange-400 to-red-500",
    },
    {
      id: "3",
      name: "Gold Premium",
      duration: "24 Months",
      monthlyAmount: "₹3,000",
      totalAmount: "₹72,000",
      goldValue: "₹79,200",
      discount: "10%",
      features: [
        "No making charges on all items",
        "Free jewelry cleaning & polishing",
        "Priority customer service",
        "Flexible payment dates",
        "Free home delivery",
        "Exclusive design access",
      ],
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "4",
      name: "Gold Elite",
      duration: "36 Months",
      monthlyAmount: "₹5,000",
      totalAmount: "₹1,80,000",
      goldValue: "₹1,98,000",
      discount: "10%",
      features: [
        "No making charges on all items",
        "Free jewelry cleaning & polishing",
        "Priority customer service",
        "Flexible payment dates",
        "Free home delivery",
        "Exclusive design access",
        "Personal jewelry consultant",
      ],
      color: "from-indigo-400 to-purple-600",
    },
  ]

  const schemeFeatures: SchemeFeature[] = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Investment",
      description: "Your money is safe with our trusted gold scheme backed by proper documentation",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Extra Benefits",
      description: "Get additional gold value and exclusive benefits on scheme completion",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Flexible Plans",
      description: "Choose from multiple duration and payment options that suit your budget",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Easy Process",
      description: "Simple enrollment process with minimal documentation required",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gold Investment Schemes</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Secure your future with our flexible gold savings plans</p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Trusted by 10,000+ customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Gold Scheme?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the benefits of systematic gold investment with attractive returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schemeFeatures.map((feature, index) => (
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

      {/* Schemes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Gold Scheme</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select the perfect plan that matches your investment goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schemes.map((scheme) => (
              <Card
                key={scheme.id}
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  scheme.popular ? "ring-2 ring-orange-500 scale-105" : ""
                }`}
              >
                {scheme.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className={`bg-gradient-to-r ${scheme.color} text-white rounded-t-lg`}>
                  <CardTitle className="text-center">
                    <div className="text-2xl font-bold">{scheme.name}</div>
                    <div className="text-lg opacity-90">{scheme.duration}</div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{scheme.monthlyAmount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">per month</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Payment:</span>
                      <span className="font-semibold">{scheme.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Gold Value:</span>
                      <span className="font-semibold text-green-600">{scheme.goldValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">You Save:</span>
                      <span className="font-semibold text-orange-600">{scheme.discount}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {scheme.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${scheme.color} hover:opacity-90 text-white`}>
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Simple steps to start your gold investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Plan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select the gold scheme that fits your budget and timeline
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">Pay monthly installments as per your chosen plan</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your investment growth and accumulated gold value
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Benefits</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive bonus gold value and exclusive benefits on completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-white via-yellow-100 to-white text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Gold Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us with their gold investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Visit Our Store
              </Button>
            </Link>
            <Link href="tel:+917600093017">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
