"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Users,
  Shield,
  Star,
  Heart,
  Gem,
  Crown,
  Sparkles,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    {
      year: "1950",
      event:
        "Balkrushna Narayandas Soni started jewelry craftsmanship in Berna village",
      icon: <Crown className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "1989",
      event: "Paresh Soni joined the family business",
      icon: <Users className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "1994",
      event: "Opened a retail jewelry shop in Himatnagar",
      icon: <MapPin className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "2002",
      event: "Established a larger showroom to expand operations",
      icon: <Gem className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "2008",
      event:
        "Received hallmark certification (among the first in Sabarkantha district)",
      icon: <Award className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "2010",
      event: "Launched monthly gold saving scheme",
      icon: <Star className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "2024",
      event: "Introduced gift vouchers and started the Suvarnadar scheme",
      icon: <Heart className="h-4 w-4 md:h-6 md:w-6" />,
    },
    {
      year: "2025",
      event: "Planning to launch digital gold before the year ends",
      icon: <Sparkles className="h-4 w-4 md:h-6 md:w-6" />,
    },
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Trust & Integrity",
      description:
        "We believe in complete transparency and honest dealings with every customer",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Gem className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Quality Excellence",
      description:
        "Every piece of jewelry meets the highest standards of craftsmanship and purity",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Heart className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do, ensuring their satisfaction",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: <Star className="h-6 w-6 md:h-8 md:w-8" />,
      title: "Innovation",
      description:
        "We continuously evolve to bring the latest designs and services to our customers",
      gradient: "from-amber-500 to-yellow-500",
    },
  ];

  const achievements = [
    {
      number: "75+",
      label: "Years of Excellence",
      icon: <Crown className="h-6 w-6 md:h-8 md:w-8" />,
    },
    {
      number: "50,000+",
      label: "Happy Customers",
      icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
    },
    {
      number: "2,500+",
      label: "Unique Designs",
      icon: <Gem className="h-6 w-6 md:h-8 md:w-8" />,
    },
    {
      number: "100%",
      label: "Certified Jewelry",
      icon: <Shield className="h-6 w-6 md:h-8 md:w-8" />,
    },
  ];

  const commitments = [
    {
      icon: <Award className="h-8 w-8 md:h-12 md:w-12" />,
      title: "Quality Assurance",
      description:
        "Every piece is carefully crafted and certified to meet the highest quality standards",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Users className="h-8 w-8 md:h-12 md:w-12" />,
      title: "Customer Service",
      description:
        "Dedicated support team to assist you with all your jewelry needs and queries",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Shield className="h-8 w-8 md:h-12 md:w-12" />,
      title: "Trust & Security",
      description:
        "Complete transparency in pricing and secure transactions for your peace of mind",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900/20">
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-amber-100 dark:from-red-900/30 dark:to-amber-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-8">
              <Crown className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400 font-semibold text-xs md:text-sm tracking-wider uppercase">
                Our Legacy
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 md:mb-6 leading-tight px-2">
              About{" "}
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-medium">
                BALKRUSHNA JEWELLERS
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-4xl mx-auto px-2">
              75+ years of trust, quality, and excellence in jewelry
              craftsmanship, creating timeless pieces that celebrate life's
              precious moments
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-10 px-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
              >
                <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Contact Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-300 bg-transparent text-sm md:text-base"
              >
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Visit Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            {/* Text Block */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-semibold text-xs md:text-sm">
                  Our Story
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
                A Legacy of{" "}
                <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Excellence
                </span>
              </h2>

              <div className="space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 1950, BALKRUSHNA JEWELLERS began as a small family
                  business with a simple mission: to provide authentic,
                  high-quality jewelry to our community. What started as a
                  modest workshop has grown into one of Gujarat's most trusted
                  jewelry destinations.
                </p>
                <p>
                  Over the past 75 years, we have built our reputation on the
                  pillars of trust, quality, and exceptional customer service.
                  Every piece of jewelry that leaves our store carries with it
                  our commitment to excellence and the trust our customers place
                  in us.
                </p>
                <p>
                  Today, we continue to honor our heritage while embracing
                  modern innovations, offering everything from traditional gold
                  jewelry to contemporary diamond pieces, along with digital
                  gold investment solutions for the modern investor.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                  <span className="text-green-700 dark:text-green-400 font-medium text-xs md:text-sm">
                    Certified Quality
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  <Heart className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  <span className="text-blue-700 dark:text-blue-400 font-medium text-xs md:text-sm">
                    Family Owned
                  </span>
                </div>
              </div>
            </div>

            {/* Image Block */}
            <div className="relative w-full lg:w-1/2">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                <Image
                  src="/old.jpeg"
                  alt="BALKRUSHNA JEWELLERS Heritage"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats - Hidden on very small screens */}
              

            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs md:text-sm tracking-wider uppercase">
                Our Values
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6">
              What We{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent font-medium">
                Stand For
              </span>
            </h2>

            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              The principles that guide us in everything we do, ensuring
              excellence in every interaction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-0 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl md:rounded-3xl"
              >
                <CardContent className="p-6 md:p-8 text-center relative z-10">
                  <div
                    className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${value.gradient} text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {value.icon}
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>

                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl md:rounded-3xl`}
                ></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-semibold text-xs md:text-sm tracking-wider uppercase">
                Our Achievements
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6">
              Numbers That{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent font-medium">
                Speak Volumes
              </span>
            </h2>

            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              Milestones that reflect our commitment to excellence and customer
              satisfaction
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white dark:bg-gray-700 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="text-amber-500 mb-3 md:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>

                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-1 md:mb-2">
                    {achievement.number}
                  </div>

                  <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
              <Crown className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-xs md:text-sm tracking-wider uppercase">
                Our Journey
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6">
              75 Years of{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent font-medium">
                Excellence
              </span>
            </h2>

            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              Key milestones that shaped our journey from a small workshop to a
              trusted jewelry destination
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Mobile Timeline */}
            <div className="block md:hidden">
              <div className="relative">
                {/* Continuous timeline line for mobile */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-red-500 to-orange-500"></div>

                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative flex items-start mb-8 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-red-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center text-white shadow-xl">
                      {milestone.icon}
                    </div>

                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <Card className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold py-1.5 px-3 rounded-full text-sm shadow-lg">
                            {milestone.year}
                          </Badge>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            {milestone.event}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Timeline line for desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-400 via-red-500 to-orange-500 rounded-full"></div>

                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-400 to-red-500 rounded-full border-4 border-white dark:border-gray-900 z-10 flex items-center justify-center text-white shadow-xl">
                      {milestone.icon}
                    </div>

                    {/* Content */}
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                      }`}
                    >
                      <Card className="group bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                          <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg">
                            {milestone.year}
                          </Badge>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            {milestone.event}
                          </p>
                        </CardContent>
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs md:text-sm tracking-wider uppercase">
                Our Promise
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 md:mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-medium">
                Commitment
              </span>
            </h2>

            <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12 px-2">
              At BALKRUSHNA JEWELLERS, we are committed to continuing our legacy
              of excellence. We promise to maintain the highest standards of
              quality, provide exceptional customer service, and remain your
              trusted partner for all your jewelry needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {commitments.map((commitment, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-white dark:bg-gray-700 border-0 shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl md:rounded-3xl"
              >
                <CardContent className="p-6 md:p-8 lg:p-10 text-center relative z-10">
                  <div
                    className={`inline-flex p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br ${commitment.gradient} text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                  >
                    {commitment.icon}
                  </div>

                  <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-white">
                    {commitment.title}
                  </h3>

                  <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {commitment.description}
                  </p>
                </CardContent>

                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${commitment.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl md:rounded-3xl`}
                ></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-red-500 via-rose-500 to-amber-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6">
              Ready to Experience Our{" "}
              <span className="font-medium">Excellence?</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 font-light leading-relaxed mb-8 md:mb-10 px-2">
              Visit our showroom or get in touch with our team to discover the
              perfect piece for you
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Get In Touch
                </Button>
              </Link>

              <Link href="tel:+917600093017">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold transition-all duration-300 bg-transparent text-sm md:text-base"
                >
                  <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Call Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
