import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Shield, Star, Heart, Gem } from "lucide-react";
import Image from "next/image";
import React from 'react';

export default function AboutPage() {
  const milestones = [
    {
      year: "1950",
      event:
        "Balkrushna Narayandas Soni started jewelry craftsmanship in Berna village",
    },
    {
      year: "1989",
      event: "Paresh Soni joined the family business",
    },
    {
      year: "1994",
      event: "Opened a retail jewelry shop in Himatnagar",
    },
    {
      year: "2002",
      event: "Established a larger showroom to expand operations",
    },
    {
      year: "2008",
      event:
        "Received hallmark certification (among the first in Sabarkantha district)",
    },
    {
      year: "2010",
      event: "Launched monthly gold saving scheme",
    },
    {
      year: "2024",
      event: "Introduced gift vouchers and started the Suvarnadar scheme",
    },
    {
      year: "2025",
      event: "Planning to launch digital gold before the year ends",
    },
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Integrity",
      description:
        "We believe in complete transparency and honest dealings with every customer",
    },
    {
      icon: <Gem className="h-8 w-8" />,
      title: "Quality Excellence",
      description:
        "Every piece of jewelry meets the highest standards of craftsmanship and purity",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do, ensuring their satisfaction",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Innovation",
      description:
        "We continuously evolve to bring the latest designs and services to our customers",
    },
  ];

  const achievements = [
    { number: "25+", label: "Years of Excellence" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Unique Designs" },
    { number: "100%", label: "Certified Jewelry" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-16 md:py-20 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              About BALKRUSHNA JEWELLERS
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl opacity-90 px-2">
              25+ years of trust, quality, and excellence in jewelry
              craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
 
<section className="py-12 md:py-16 bg-white dark:bg-black">
  <div className="container mx-auto px-4">
    <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
      {/* Text Block */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Story
        </h2>
        <div className="space-y-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
          <p>
            Founded in 1999, BALKRUSHNA JEWELLERS began as a small family
            business with a simple mission: to provide authentic, high-quality
            jewelry to our community. What started as a modest store has grown
            into one of Ahmedabad's most trusted jewelry destinations.
          </p>
          <p>
            Over the past 25 years, we have built our reputation on the pillars
            of trust, quality, and exceptional customer service. Every piece of
            jewelry that leaves our store carries with it our commitment to
            excellence and the trust our customers place in us.
          </p>
          <p>
            Today, we continue to honor our heritage while embracing modern
            innovations, offering everything from traditional gold jewelry to
            contemporary diamond pieces, along with digital gold investment
            solutions for the modern investor.
          </p>
        </div>
      </div>

      {/* Image Block */}
      <div className="relative w-full lg:w-1/2">
        <Image
          src="/WhatsApp Image 2025-07-23 at 17.20.17.jpeg"
          alt="BALKRUSHNA JEWELLERS"
          width={600}
          height={400}
          className="rounded-lg shadow-xl w-full h-auto max-h-[600px] "
        />
        <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-3 rounded-lg shadow-lg">
          <div className="text-xl font-bold">25+</div>
          <div className="text-xs">Years of Trust</div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Our Values */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Our Values
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide us in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700
                           dark:border dark:border-zinc-700"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {/* Icon with hover color and subtle scale */}
                    {promptIconsWithHoverColor(value.icon, 'text-orange-500', 'text-orange-700')}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Our Achievements
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Our Journey
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Key milestones in our 25-year journey
            </p>
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
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <Card className="text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700
                                   dark:border dark:border-zinc-700">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-orange-500 hover:bg-orange-600 transition-colors duration-200
                                          text-white font-semibold py-1 px-3 rounded-full text-xs md:text-sm">
                          {milestone.year}
                        </Badge>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                          {milestone.event}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Our Commitment
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              At BALKRUSHNA JEWELLERS, we are committed to continuing our legacy
              of excellence. We promise to maintain the highest standards of
              quality, provide exceptional customer service, and remain your
              trusted partner for all your jewelry needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700
                         dark:border dark:border-zinc-700">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  {promptIconsWithHoverColor(<Award className="h-12 w-12" />, 'text-orange-500', 'text-orange-700')}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Quality Assurance
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Every piece is carefully crafted and certified to meet the
                  highest quality standards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700
                         dark:border dark:border-zinc-700">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  {promptIconsWithHoverColor(<Users className="h-12 w-12" />, 'text-orange-500', 'text-orange-700')}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Customer Service</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Dedicated support team to assist you with all your jewelry
                  needs and queries
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-zinc-800 dark:to-zinc-700
                         dark:border dark:border-zinc-700">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  {promptIconsWithHoverColor(<Shield className="h-12 w-12" />, 'text-orange-500', 'text-orange-700')}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Trust & Security</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Complete transparency in pricing and secure transactions for
                  your peace of mind
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function to add hover styles to icons
const promptIconsWithHoverColor = (
  // Use React.SVGProps<SVGSVGElement> for Lucide icons as they are SVG elements
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>, // <--- UPDATED TYPE FOR ICON
  defaultColor: string,
  hoverColor: string
) => {
  // Ensure icon.props is treated as an object that might have a className
  const currentClassName = icon.props.className || '';
  return React.cloneElement(icon, {
    className: `${currentClassName} ${defaultColor} hover:${hoverColor} transition-colors duration-200`,
  } as React.SVGProps<SVGSVGElement>); // <--- Added type assertion for cloneElement props
};