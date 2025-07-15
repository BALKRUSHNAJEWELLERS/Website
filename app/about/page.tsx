import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Shield, Star, Heart, Gem } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const milestones = [
    { year: "1999", event: "BALKRUSHNA JEWELLERS founded with a vision to provide quality jewelry" },
    { year: "2005", event: "Expanded to become one of the trusted jewelry stores in Ahmedabad" },
    { year: "2010", event: "Introduced certified diamond jewelry collection" },
    { year: "2015", event: "Launched gold investment schemes for customers" },
    { year: "2020", event: "Embraced digital transformation with online presence" },
    { year: "2024", event: "Introduced digital gold investment platform" },
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Integrity",
      description: "We believe in complete transparency and honest dealings with every customer",
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Quality Excellence",
      description: "Every piece of jewelry meets the highest standards of craftsmanship and purity",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do, ensuring their satisfaction",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously evolve to bring the latest designs and services to our customers",
    },
  ]

  const achievements = [
    { number: "25+", label: "Years of Excellence" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Unique Designs" },
    { number: "100%", label: "Certified Jewelry" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
     <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About BALKRUSHNA JEWELLERS</h1>
            <p className="text-xl md:text-2xl opacity-90">
              25+ years of trust, quality, and excellence in jewelry craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 1999, BALKRUSHNA JEWELLERS began as a small family business with a simple mission: to
                  provide authentic, high-quality jewelry to our community. What started as a modest store has grown
                  into one of Ahmedabad's most trusted jewelry destinations.
                </p>
                <p>
                  Over the past 25 years, we have built our reputation on the pillars of trust, quality, and exceptional
                  customer service. Every piece of jewelry that leaves our store carries with it our commitment to
                  excellence and the trust our customers place in us.
                </p>
                <p>
                  Today, we continue to honor our heritage while embracing modern innovations, offering everything from
                  traditional gold jewelry to contemporary diamond pieces, along with digital gold investment solutions
                  for the modern investor.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="BALKRUSHNA JEWELLERS Store"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm">Years of Trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-orange-500 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{achievement.number}</div>
                <div className="text-lg text-gray-600 dark:text-gray-300">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Key milestones in our 25-year journey</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-orange-500"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-900"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-orange-500">{milestone.year}</Badge>
                        <p className="text-gray-700 dark:text-gray-300">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              At BALKRUSHNA JEWELLERS, we are committed to continuing our legacy of excellence. We promise to maintain
              the highest standards of quality, provide exceptional customer service, and remain your trusted partner
              for all your jewelry needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every piece is carefully crafted and certified to meet the highest quality standards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dedicated support team to assist you with all your jewelry needs and queries
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trust & Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete transparency in pricing and secure transactions for your peace of mind
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
