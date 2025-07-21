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
  Sparkles,
  Crown,
  Gem,
} from "lucide-react";
import Link from "next/link";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const features = [
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Certified Quality",
      description:
        "All our jewelry comes with proper certification and quality assurance",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "25+ Years Experience",
      description:
        "Trusted by generations with decades of craftsmanship excellence",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Customer First",
      description:
        "Dedicated customer service and lifetime maintenance support",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Star className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Premium Designs",
      description: "Exclusive designs crafted by master artisans",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/rates");
        if (response.ok) {
          const data = await response.json();
          setPreviousRates((prev) => ({
            gold: rates.gold,
            silver: rates.silver,
            lastUpdated: rates.lastUpdated,
          }));
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
      setCurrentSlide((prev) => (prev + 1) % Math.max(slidesToShow.length, 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderItems.length]);

  const defaultSlider = [
    {
      id: "default-1",
      image: "/placeholder.svg?height=600&width=800",
      title: "Timeless Elegance",
      subtitle: "Discover our exquisite collection of handcrafted jewelry",
      link: "/catalog",
    },
    {
      id: "default-2",
      image: "/placeholder.svg?height=600&width=800",
      title: "Bridal Collection",
      subtitle: "Make your special day unforgettable with our bridal jewelry",
      link: "/bridal",
    },
    {
      id: "default-3",
      image: "/placeholder.svg?height=600&width=800",
      title: "Gold Ornaments",
      subtitle: "Traditional and contemporary gold jewelry for every occasion",
      link: "/gold",
    },
  ];

  const slidesToShow = sliderItems.length > 0 ? sliderItems : defaultSlider;

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Running Ticker for Live Rates */}
      <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-white py-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of content */}
          <div className="flex items-center space-x-8 text-sm font-medium min-w-max px-4">
            <div className="flex items-center space-x-2">
              <Gem className="h-4 w-4" />
              <span>LIVE RATES</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-yellow-200" />
              <span>Gold 24K: ₹{rates.gold}/gram</span>
              {previousRates && getTrendIcon(rates.gold, previousRates.gold)}
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-gray-200" />
              <span>Silver: ₹{rates.silver}/gram</span>
              {previousRates &&
                getTrendIcon(rates.silver, previousRates.silver)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>
                Updated:{" "}
                {hasMounted
                  ? new Date(rates.lastUpdated).toLocaleTimeString()
                  : ""}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>Trusted by 10,000+ Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>25+ Years of Excellence</span>
            </div>
          </div>

          {/* Second set of content for seamless loop */}
          <div className="flex items-center space-x-8 text-sm font-medium min-w-max px-4">
            <div className="flex items-center space-x-2">
              <Gem className="h-4 w-4" />
              <span>LIVE RATES</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-yellow-200" />
              <span>Gold 24K: ₹{rates.gold}/gram</span>
              {previousRates && getTrendIcon(rates.gold, previousRates.gold)}
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-gray-200" />
              <span>Silver: ₹{rates.silver}/gram</span>
              {previousRates &&
                getTrendIcon(rates.silver, previousRates.silver)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>
                Updated:{" "}
                {hasMounted
                  ? new Date(rates.lastUpdated).toLocaleTimeString()
                  : ""}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>Trusted by 10,000+ Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>25+ Years of Excellence</span>
            </div>
          </div>

          {/* Third set of content for extra coverage */}
          <div className="flex items-center space-x-8 text-sm font-medium min-w-max px-4">
            <div className="flex items-center space-x-2">
              <Gem className="h-4 w-4" />
              <span>LIVE RATES</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-yellow-200" />
              <span>Gold 24K: ₹{rates.gold}/gram</span>
              {previousRates && getTrendIcon(rates.gold, previousRates.gold)}
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-gray-200" />
              <span>Silver: ₹{rates.silver}/gram</span>
              {previousRates &&
                getTrendIcon(rates.silver, previousRates.silver)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>
                Updated:{" "}
                {hasMounted
                  ? new Date(rates.lastUpdated).toLocaleTimeString()
                  : ""}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>Trusted by 10,000+ Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-200">•</span>
              <span>25+ Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Hero Slider */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {slidesToShow.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="relative w-full h-full overflow-hidden">
              {/* Mobile-optimized image container */}
              <div className="absolute inset-0">
                <img
                  src={item.image || "/placeholder.svg?height=600&width=800"}
                  alt={item.title}
                  className="w-full h-full object-cover object-center sm:object-cover"
                  style={{
                    objectPosition: "center center",
                  }}
                />
              </div>

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/30 sm:to-black/60" />

              {/* Animated particles - hidden on mobile for performance */}
              <div className="absolute inset-0 overflow-hidden hidden sm:block">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {/* Icon - smaller on mobile */}
                  <div className="mb-3 sm:mb-4">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 mx-auto text-yellow-400 animate-pulse" />
                  </div>

                  {/* Title - responsive sizing */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-shimmer">
                      {item.title}
                    </span>
                  </h1>

                  {/* Subtitle - responsive sizing */}
                  <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
                    {item.subtitle}
                  </p>

                  {/* Buttons - stacked on mobile, side by side on larger screens */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <Link href={item.link}>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Gem className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Explore Collection
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
                      >
                        Our Story
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile-optimized Navigation Dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
          {slidesToShow.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 sm:w-8 h-2 sm:h-3 bg-yellow-400 rounded-full"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/70 rounded-full"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator - hidden on mobile */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <Crown className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                BALKRUSHNA JEWELLERS
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Experience the finest in jewelry craftsmanship with our commitment
              to quality and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 overflow-hidden relative h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  <CardContent className="p-4 sm:p-6 md:p-8 relative">
                    <div
                      className={`text-white mb-3 sm:mb-4 md:mb-6 flex justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Quick Actions */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Discover our comprehensive range of jewelry services designed for
              you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "Gold Scheme",
                description:
                  "Join our flexible gold savings scheme and secure your future with gold investments",
                color: "orange",
                link: "/gold-scheme",
                icon: <Crown className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
              {
                title: "Digital Gold",
                description:
                  "Buy, sell, and store gold digitally with complete security and transparency",
                color: "red",
                link: "/digital-gold",
                icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
              {
                title: "Ring Measurement",
                description:
                  "Find your perfect ring size with our accurate measurement tools",
                color: "yellow",
                link: "/ring-measurement",
                icon: <Gem className="h-6 w-6 sm:h-8 sm:w-8" />,
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white dark:bg-gray-800 overflow-hidden relative"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                    service.color === "orange"
                      ? "from-orange-400 to-orange-600"
                      : service.color === "red"
                      ? "from-red-400 to-red-600"
                      : "from-yellow-400 to-yellow-600"
                  }`}
                ></div>
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div
                    className={`text-white mb-3 sm:mb-4 md:mb-6 flex justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br ${
                      service.color === "orange"
                        ? "from-orange-400 to-orange-600"
                        : service.color === "red"
                        ? "from-red-400 to-red-600"
                        : "from-yellow-400 to-yellow-600"
                    } shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                      service.color === "orange"
                        ? "text-orange-600"
                        : service.color === "red"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link href={service.link}>
                    <Button
                      className={`w-full sm:w-auto ${
                        service.color === "orange"
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          : service.color === "red"
                          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                      } text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                    >
                      {service.color === "orange"
                        ? "Learn More"
                        : service.color === "red"
                        ? "Get Started"
                        : "Measure Now"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-white animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 leading-relaxed px-4 sm:px-0">
              Get the latest updates on new collections, exclusive offers, and
              jewelry care tips
            </p>

            <div className="max-w-md mx-auto px-4 sm:px-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-900 border-0 focus:outline-none focus:ring-4 focus:ring-white/30 placeholder-gray-500 bg-white shadow-lg text-sm sm:text-base"
                />
                <Button className="bg-white text-yellow-600 hover:bg-gray-100 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-white/70 mt-3 sm:mt-4">
                Join 10,000+ happy customers who trust us
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
