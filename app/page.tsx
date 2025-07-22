"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Star,
  Shield,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MetalRate {
  gold: number;
  silver: number;
  lastUpdated: string;
}

interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export default function HomePage() {
  const [previousRates, setPreviousRates] = useState<MetalRate | null>(null);
  const [rates, setRates] = useState<MetalRate>({
    gold: 6250,
    silver: 78,
    lastUpdated: new Date().toISOString(),
  });
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const response = await fetch("/api/admin/slider", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setSliderItems(data);
        } else {
          console.error("Failed to load sliders");
        }
      } catch (error) {
        console.error("Slider fetch error:", error);
      }
    };

    fetchSliderItems();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/rates");
        if (response.ok) {
          const data = await response.json();
          setPreviousRates({
            gold: rates.gold,
            silver: rates.silver,
            lastUpdated: rates.lastUpdated,
          });
          setRates(data);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(sliderItems.length, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderItems.length]);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Certified Quality",
      description:
        "All our jewelry comes with proper certification and quality assurance",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "25+ Years Experience",
      description:
        "Trusted by generations with decades of craftsmanship excellence",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description:
        "Dedicated customer service and lifetime maintenance support",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Designs",
      description: "Exclusive designs crafted by master artisans",
    },
  ];

  const defaultSlider = [
    {
      id: "default",
      image:
        "https://media.istockphoto.com/id/1338830019/vector/vector-illustration-golden-ribbon-circle-on-black-background.jpg?s=612x612&w=0&k=20&c=P0utRq7iOkdACPBXxZC_poN-UCLdBZYhqmo8PK1pApY=",
      title: "Timeless Beauty",
      subtitle: "Crafted elegance for every occasion",
      link: "/catalog",
    },
  ];

  const slidesToShow = sliderItems.length > 0 ? sliderItems : defaultSlider;

  return (
    <div className="min-h-screen">
      {/* Live Rates Section */}
      <section className="relative py-20 text-white bg-cover" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20230223/pngtree-large-collection-of-gold-jewellery-image_1689318.jpg')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-semibold uppercase tracking-wide">
                Live Rates
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Gold (24K)</span>
                <span className="text-xl font-bold">
                  ₹{rates.gold} <span className="text-sm font-normal">/ gram</span>
                </span>
              </div>
              {previousRates && (rates.gold > previousRates.gold ? <TrendingUp className="h-5 w-5 text-green-400" /> : rates.gold < previousRates.gold ? <TrendingDown className="h-5 w-5 text-red-400" /> : null)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Silver</span>
                <span className="text-xl font-bold">
                  ₹{rates.silver} <span className="text-sm font-normal">/ gram</span>
                </span>
              </div>
              {previousRates && (rates.silver > previousRates.silver ? <TrendingUp className="h-5 w-5 text-green-400" /> : rates.silver < previousRates.silver ? <TrendingDown className="h-5 w-5 text-red-400" /> : null)}
            </div>
            {hasMounted && (
              <div className="absolute bottom-3 right-4 text-xs text-gray-300">
                Last updated: {new Date(rates.lastUpdated).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden m-20 bg-gray-50 dark:bg-gray-900">
        {slidesToShow.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="relative w-full h-[500px] overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {item.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    {item.subtitle}
                  </p>
                  <Link href={item.link}>
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slidesToShow.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

         {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 shadow border-l-4 border-l-orange-500 bg-white dark:bg-gray-800 overflow-hidden relative">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-orange-600">
                  Gold Scheme
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Join our flexible gold savings scheme and secure your future
                  with gold investments
                </p>
                <Link href="/gold-scheme">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card
             className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 shadow border-l-4 border-l-red-500 bg-white dark:bg-gray-800 overflow-hidden relative">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-red-600">
                  Digital Gold
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Buy, sell, and store gold digitally with complete security and
                  transparency
                </p>
                <Link href="/digital-gold">
                  <Button className="bg-red-500 hover:bg-red-600">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card 
            className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 shadow border-l-4 border-l-yellow-500 bg-white dark:bg-gray-800 overflow-hidden relative">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-yellow-600">
                  Ring Measurement
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Find your perfect ring size with our accurate measurement
                  tools
                </p>
                <Link href="/ring-measurement">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Measure Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose BALKRUSHNA JEWELLERS
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the finest in jewelry craftsmanship with our commitment
              to quality and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-orange-500 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     
      {/* Newsletter */}
      <section className="py-16 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240929/pngtree-beautiful-diamond-engagement-ring-on-a-dark-sparkling-background-the-focus-image_16280948.jpg')"}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest updates on new collections and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
