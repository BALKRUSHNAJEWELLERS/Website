"use client";
import { useState, useEffect } from "react";
import { Crown, Sparkles, Gem } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Shield,
  Award,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

interface MetalRate {
  gold: number;
  silver: number;
  lastUpdated: string;
  previousGold?: number; // Now optional as it might not be there on initial fetch if no data
  previousSilver?: number; // Now optional as it might not be there on initial fetch if no data
}

interface SliderItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

interface StoryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

// --- MobileStory Component (Moved Outside HomePage) ---
const staticStoryItems: StoryItem[] = [
  {
    id: "daily-wear",
    image:
      "https://jewelemarket.com/cdn/shop/files/11055169GL_71cc0458-b756-4e58-8897-be71847f9e35.jpg?v=1738992800",
    title: "Daily Wear",
    link: "/catalog/daily-wear",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
  {
    id: "latest",
    image:
      "https://knowyourtown.co.in/wp-content/uploads/2024/05/necklace33-2-800x445.jpg",
    title: "Latest",
    link: "/catalog/latest",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
  {
    id: "new-arrivals",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5IP-d0axrv1DX_2shjvF9HxBeIXKSTgfI8x5MMgjY2JrIwKSTgfI8x5MMgjY2JrIwKXiONzMMlIbFOlIzlRZfwIIDl5wSD5e3uXhLpTQxbcRDc9EVRuZjv4P9i0Q303FONHhlsU2WEAu9Btu8XanuOTbbo1co3U&usqp=CAc",
    title: "New Arrivals",
    link: "/catalog/new-arrivals",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
  {
    id: "gold",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn9GcQli4ZQrSeVzGyYe2WfeCby-pnFzS1DZWRtYA&s",
    title: "Gold",
    link: "/catalog/gold",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
  {
    id: "diamond",
    image:
      "https://www.urvaa.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-10-at-13.51.25-2.jpeg",
    title: "Diamond",
    link: "/catalog/diamond",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
  {
    id: "rings",
    image:
      "https://accessorizelondon.in/cdn/shop/files/MA-10001458603_1_91e7d176-7ade-41f4-946e-b43c316a9156.jpg?v=1714635582",
    title: "Rings",
    link: "/catalog/rings",
    subtitle: "Daily updates on 24k and 22k gold prices.",
  },
];

function MobileStory() {
  const [dynamicStories, setDynamicStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedStory, setClickedStory] = useState<string | null>(null);

  useEffect(() => {
    const fetchDynamicStories = async () => {
      try {
        setLoading(true);
        // Use the dedicated stories API endpoint
        const res = await fetch("/api/stories");

        if (!res.ok) {
          throw new Error("Failed to fetch stories");
        }

        const storiesFromAPI = await res.json();
        console.log("data", storiesFromAPI);

        setDynamicStories(storiesFromAPI);
      } catch (error) {
        console.error("Failed to load dynamic stories", error);
        // Fallback to static stories if API fails
        setDynamicStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicStories();
  }, []);

  // Combine static and dynamic stories, ensuring no duplicates by ID
  const finalStories = [
    ...staticStoryItems.filter(
      (staticItem) => !dynamicStories.some((dyn) => dyn.id === staticItem.id)
    ),
    ...dynamicStories,
  ];

  const handleStoryClick = (storyId: string, link: string) => {
    setClickedStory(storyId);

    // Add a small delay for animation before navigation
    setTimeout(() => {
      //in link first letter need capital

      window.location.href = link;
    }, 200);
  };

  if (loading) {
    return (
      <section className="md:hidden py-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {/* Loading skeleton */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 p-1 animate-pulse">
                      <div className="w-full h-full rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                  <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="md:hidden py-6 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {finalStories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleStoryClick(story.id, story.link)}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  {/* Rotating Dotted Border Ring */}
                  <div className="relative w-24 h-24">
                    {/* Static gradient background - only show when NOT clicked */}
                    {clickedStory !== story.id && (
                      <div
                        className="absolute inset-0 rounded-full p-1 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(45deg, 
              hsl(${(index * 60) % 360}, 70%, 60%), 
              hsl(${(index * 60 + 60) % 360}, 70%, 60%)
            )`,
                        }}
                      >
                        {/* Inner White Ring */}
                        <div className="w-full h-full rounded-full bg-white p-0.5">
                          {/* Image Container */}
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                            <img
                              src={story.image || "/placeholder.svg"}
                              alt={story.title}
                              className="w-full h-full p-4 object-cover transition-all duration-300 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "/placeholder.svg?height=80&width=80&text=" +
                                  encodeURIComponent(story.title);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* When clicked - show only image with white background and rotating dotted border */}
                    {clickedStory === story.id && (
                      <>
                        {/* White background with image */}
                        <div className="absolute inset-0 rounded-full bg-white p-0.5">
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                            <img
                              src={story.image || "/placeholder.svg"}
                              alt={story.title}
                              className="w-full h-full p-4 object-cover scale-95 brightness-90"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "/placeholder.svg?height=80&width=80&text=" +
                                  encodeURIComponent(story.title);
                              }}
                            />
                          </div>
                        </div>

                        {/* Clean Rotating Dotted Border */}
                        <div
                          className="absolute inset-0 rounded-full animate-spin"
                          style={{
                            border: `3px dotted hsl(${
                              (index * 60) % 360
                            }, 80%, 60%)`,
                            borderRadius: "50%",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Story Title */}
                <span
                  className={`text-xs font-medium text-center max-w-[90px] leading-tight transition-all duration-200 ${
                    clickedStory === story.id
                      ? "text-purple-600 scale-95 font-semibold"
                      : "text-gray-700 group-hover:text-purple-600"
                  }`}
                >
                  {story.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- HomePage Component ---
export default function HomePage() {
  // Initialize rates with default values, including previous values
  const [rates, setRates] = useState<MetalRate>({
    gold: 6250,
    silver: 78,
    lastUpdated: new Date().toISOString(),
    previousGold: 6250, // Default to current gold if no previous
    previousSilver: 78, // Default to current silver if no previous
  });
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Consolidated useEffect for fetching rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/rates");
        if (response.ok) {
          const data: MetalRate = await response.json();
          // Update rates, which now includes previousGold and previousSilver
          setRates(data);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000); // Fetch every 5 minutes
    return () => clearInterval(interval);
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

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Certified Quality",
      description:
        "All our jewelry comes with proper certification and quality assurance",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "25+ Years Experience",
      description:
        "Trusted by generations with decades of craftsmanship excellence",
      gradient: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer First",
      description:
        "Dedicated customer service and lifetime maintenance support",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Designs",
      description: "Exclusive designs crafted by master artisans",
      gradient: "from-pink-500 to-red-500",
    },
  ];

  const defaultSlider = [
    {
      id: "default-1",
      image: "/placeholder.svg?height=800&width=1200",
      title: "Discover Our Exquisite Diamond Jewellery",
      subtitle: "Radiance in Rhythm - Timeless elegance for every occasion",
      link: "/catalog",
    },
    {
      id: "default-2",
      image: "/placeholder.svg?height=800&width=1200",
      title: "Timeless Gold Collection",
      subtitle: "Crafted with precision, designed for perfection",
      link: "/catalog/gold",
    },
    {
      id: "default-3",
      image: "/placeholder.svg?height=800&width=1200",
      title: "Bridal Collection",
      subtitle: "Make your special day even more memorable",
      link: "/catalog/wedding",
    },
  ];

  const slidesToShow = sliderItems.length > 0 ? sliderItems : defaultSlider;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slidesToShow.length]);

  return (
    <div className="min-h-screen">
      {/* Live Rates Section */}
      <section className="hidden md:block bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500 mb-12">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-semibold uppercase tracking-wide">
                Live Rates
              </h2>
            </div>

            {/* Gold */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Gold (24K)
                </span>
                <span className="text-xl font-bold">
                  ₹{rates.gold}{" "}
                  <span className="text-sm font-normal">/ gram</span>
                </span>
              </div>
              {/* Check if previousGold exists before comparing */}
              {rates.previousGold !== undefined ? (
                rates.gold > rates.previousGold ? (
                  <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-300" />
                ) : rates.gold < rates.previousGold ? (
                  <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-300" />
                ) : null
              ) : null}
            </div>

            {/* Silver */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Silver
                </span>
                <span className="text-xl font-bold">
                  ₹{rates.silver}{" "}
                  <span className="text-sm font-normal">/ gram</span>
                </span>
              </div>
              {/* Check if previousSilver exists before comparing */}
              {rates.previousSilver !== undefined ? (
                rates.silver > rates.previousSilver ? (
                  <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-300" />
                ) : rates.silver < rates.previousSilver ? (
                  <TrendingDown className="h-5 w-5 text-red-500 dark:text-red-300" />
                ) : null
              ) : null}
            </div>

            {hasMounted && (
              <div className="absolute bottom-3 right-4 text-xs text-gray-500 dark:text-gray-400">
                Last updated: {new Date(rates.lastUpdated).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Rates Section - Mobile Only */}
      <section className="block md:hidden relative py-8 text-white bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <h2 className="text-sm font-semibold uppercase tracking-wide">
                Live Rates
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-medium">Gold (24K)</span>
                <span className="text-lg font-bold flex items-center gap-1">
                  ₹{rates.gold}{" "}
                  <span className="text-xs font-normal">/ gram</span>
                  {/* Conditional rendering for mobile gold trend */}
                  {rates.previousGold !== undefined &&
                  rates.gold > rates.previousGold ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : rates.previousGold !== undefined &&
                    rates.gold < rates.previousGold ? (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  ) : null}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium">Silver</span>
                <span className="text-lg font-bold flex items-center gap-1">
                  ₹{rates.silver}{" "}
                  <span className="text-xs font-normal">/ gram</span>
                  {/* Conditional rendering for mobile silver trend */}
                  {rates.previousSilver !== undefined &&
                  rates.silver > rates.previousSilver ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : rates.previousSilver !== undefined &&
                    rates.silver < rates.previousSilver ? (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  ) : null}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Story Navigation */}
      <MobileStory />

      {/* Hero Slider Section */}
      <section className="relative">
        {/* Desktop Hero Slider */}
        <div className="hidden md:block relative h-[70vh] lg:h-[80vh] overflow-hidden bg-center bg-cover">
          {slidesToShow.map((item, index) => (
            <Link
              href={item.link || "#"}
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateX(${100 * (index - currentSlide)}%)`,
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
                {/* Content */}
                <div className="absolute z-20 left-8 lg:left-16 top-1/2 transform -translate-y-1/2 text-white max-w-2xl">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
                    {item.title}
                  </h1>
                  <p className="text-lg lg:text-xl xl:text-2xl mb-8 opacity-90 drop-shadow-md">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* Desktop Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30 bg-cover ">
            {slidesToShow.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Mobile Hero Slider */}
        <div className="md:hidden relative h-[50vh] overflow-hidden">
          {slidesToShow.map((item, index) => (
            <Link
              href={item.link || "#"}
              key={item.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateX(${100 * (index - currentSlide)}%)`,
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  // Adjusted object-cover and added object-position to ensure image fills well
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Adjusted gradient for better text visibility on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                {/* Mobile Content - Adjusted positioning and text sizes */}
                <div className="absolute z-20 bottom-6 left-4 right-4 text-white text-center">
                  <h1 className="text-xl xs:text-2xl font-bold leading-tight mb-2">
                    {item.title}
                  </h1>
                  <p className="text-xs xs:text-sm mb-4 opacity-90">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* Mobile Navigation Dots - Adjusted size for better touch */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {slidesToShow.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
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
          {/* Adjusted grid for better mobile stacking and spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8">
            {[
              {
                title: "Gold Scheme",
                description:
                  "Join our flexible gold savings scheme and secure your future with gold investments",
                color: "orange",
                link: "/gold-scheme",
                icon: <Crown className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />,
              },
              {
                title: "Digital Gold",
                description:
                  "Buy, sell, and store gold digitally with complete security and transparency",
                color: "red",
                link: "/digital-gold",
                icon: (
                  <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />
                ),
              },
              {
                title: "Ring Measurement",
                description:
                  "Find your perfect ring size with our accurate measurement tools",
                color: "yellow",
                link: "/ring-measurement",
                icon: <Gem className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />,
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="w-full h-72 sm:h-full sm:w-auto flex flex-col justify-center items-center text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white dark:bg-gray-800 overflow-hidden relative"
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
                {/* Adjusted padding for card content on smaller screens */}
                <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
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
                  {/* Adjusted text sizes for better mobile readability */}
                  <h3
                    className={`text-base sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center ${
                      service.color === "orange"
                        ? "text-orange-600"
                        : service.color === "red"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {service.description}
                  </p>
                  <Link href={service.link}>
                    {/* Adjusted button width for better mobile fit */}
                    <Button
                      className={`w-full ${
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

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-teal-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
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
          {/* Adjusted grid for better mobile stacking and spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-8">
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
                <Card
                  key={index}
                  className="w-full h-72 sm:h-full sm:w-auto flex flex-col justify-center items-center text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white dark:bg-gray-800 overflow-hidden relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  {/* Adjusted padding for card content on smaller screens */}
                  <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
                    <div
                      className={`text-white mb-3 sm:mb-4 md:mb-6 flex justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    {/* Adjusted text sizes for better mobile readability */}
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-12 md:py-16 bg-cover bg-center text-white relative"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20240929/pngtree-beautiful-diamond-engagement-ring-on-a-dark-sparkling-background-the-focus-image_16280948.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 "></div>
        <div className="relative container mx-auto px-4 text-center ">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
            Get the latest updates on new collections and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
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
