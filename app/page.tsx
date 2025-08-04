"use client";
import { useState, useEffect } from "react";
import { Crown, Sparkles, Gem, ChevronLeft, ChevronRight } from "lucide-react";
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
import { Navbar } from "@/components/navbar";

interface MetalRate {
  gold: number;
  silver: number;
  lastUpdated: string;
  previousGold?: number;
  previousSilver?: number;
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

// Static story items
const staticStoryItems: StoryItem[] = [
  {
    id: "daily-wear",
    image:
      "https://jewelemarket.com/cdn/shop/files/11055169GL_71cc0458-b756-4e58-8897-be71847f9e35.jpg?v=1738992800",
    title: "Daily Wear",
    link: "/catalog/daily-wear",
    subtitle: "Elegant pieces for everyday elegance",
  },
  {
    id: "latest",
    image:
      "https://knowyourtown.co.in/wp-content/uploads/2024/05/necklace33-2-800x445.jpg",
    title: "Latest",
    link: "/catalog/latest",
    subtitle: "Trending designs just for you",
  },
  {
    id: "new-arrivals",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5IP-d0axrv1DX_2shjvF9HxBeIXKSTgfI8x5MMgjY2JrIwKSTgfI8x5MMgjY2JrIwKXiONzMMlIbFOlIzlRZfwIIDl5wSD5e3uXhLpTQxbcRDc9EVRuZjv4P9i0Q303FONHhlsU2WEAu9Btu8XanuOTbbo1co3U&usqp=CAc",
    title: "New Arrivals",
    link: "/catalog/new-arrivals",
    subtitle: "Fresh designs, timeless beauty",
  },
  {
    id: "gold",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn9GcQli4ZQrSeVzGyYe2WfeCby-pnFzS1DZWRtYA&s",
    title: "Gold",
    link: "/catalog/gold",
    subtitle: "Pure gold, pure elegance",
  },
  {
    id: "diamond",
    image:
      "https://www.urvaa.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-10-at-13.51.25-2.jpeg",
    title: "Diamond",
    link: "/catalog/diamond",
    subtitle: "Brilliance that captivates",
  },
  {
    id: "rings",
    image:
      "https://accessorizelondon.in/cdn/shop/files/MA-10001458603_1_91e7d176-7ade-41f4-946e-b43c316a9156.jpg?v=1714635582",
    title: "Rings",
    link: "/catalog/rings",
    subtitle: "Symbols of eternal love",
  },
];

// Mobile Story Component
function MobileStory() {
  const [dynamicStories, setDynamicStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedStory, setClickedStory] = useState<string | null>(null);

  useEffect(() => {
    const fetchDynamicStories = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/stories");
        if (!res.ok) {
          throw new Error("Failed to fetch stories");
        }
        const storiesFromAPI = await res.json();
        setDynamicStories(storiesFromAPI);
      } catch (error) {
        console.error("Failed to load dynamic stories", error);
        setDynamicStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicStories();
  }, []);

  const finalStories = [
    ...staticStoryItems.filter(
      (staticItem) => !dynamicStories.some((dyn) => dyn.id === staticItem.id)
    ),
    ...dynamicStories,
  ];

  const handleStoryClick = (storyId: string, link: string) => {
    setClickedStory(storyId);
    setTimeout(() => {
      window.location.href = link;
    }, 200);
  };

  if (loading) {
    return (
      <section className="md:hidden py-4 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="md:hidden py-4 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {finalStories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleStoryClick(story.id, story.link)}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative group">
                  <div className="relative w-20 h-20">
                    {clickedStory !== story.id && (
                      <div
                        className="absolute inset-0 rounded-full p-0.5 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(45deg, 
                          hsl(${(index * 60) % 360}, 70%, 60%), 
                          hsl(${(index * 60 + 60) % 360}, 70%, 60%)
                        )`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white p-0.5">
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                            <img
                              src={story.image || "/placeholder.svg"}
                              alt={story.title}
                              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
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
                    {clickedStory === story.id && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-white p-0.5">
                          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                            <img
                              src={story.image || "/placeholder.svg"}
                              alt={story.title}
                              className="w-full h-full object-cover scale-95 brightness-90"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "/placeholder.svg?height=80&width=80&text=" +
                                  encodeURIComponent(story.title);
                              }}
                            />
                          </div>
                        </div>
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
                <span
                  className={`text-xs font-medium text-center max-w-[80px] leading-tight transition-all duration-200 ${
                    clickedStory === story.id
                      ? "text-rose-600 scale-95 font-semibold"
                      : "text-gray-700 group-hover:text-rose-600 dark:text-gray-300"
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

export default function HomePage() {
  const [rates, setRates] = useState<MetalRate>({
    gold: 6261,
    silver: 81,
    lastUpdated: new Date().toISOString(),
    previousGold: 6250,
    previousSilver: 78,
  });

  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setHasMounted(true);
  }, []);

  // Fetch rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/rates");
        if (response.ok) {
          const data: MetalRate = await response.json();
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

  // Fetch slider items
  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const response = await fetch("/api/admin/slider", {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          setSliderItems(data);
        }
      } catch (error) {
        console.error("Slider fetch error:", error);
      }
    };

    fetchSliderItems();
  }, []);

  const defaultSlider = [
    {
      id: "default-1",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Effortless Elegance, Every Day",
      subtitle: "Discover 7000+ Designs in 18KT, Made for Daily Moments",
      link: "/catalog",
    },
    {
      id: "default-2",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Timeless Gold Collection",
      subtitle: "Crafted with precision, designed for perfection",
      link: "/catalog/gold",
    },
    {
      id: "default-3",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Bridal Collection",
      subtitle: "Make your special day even more memorable",
      link: "/catalog/wedding",
    },
    {
      id: "default-4",
      image:
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Festival Collection",
      subtitle: "Celebrate every moment with our festive jewelry",
      link: "/catalog/festival",
    },
    {
      id: "default-5",
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Ring Collection",
      subtitle: "Symbols of love and commitment",
      link: "/catalog/rings",
    },
  ];

  const slidesToShow = sliderItems.length > 0 ? sliderItems : defaultSlider;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slidesToShow.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slidesToShow.length) % slidesToShow.length
    );
  };

  const collections = [
    {
      id: "earrings",
      title: "Stunning Every Ear",
      subtitle: "Elegant earrings for every occasion",
      image: "/placeholder.svg?height=400&width=600&text=Stunning+Earrings",
      link: "/catalog/earrings",
      size: "large",
    },
    {
      id: "rings",
      title: "The Ring Edit",
      subtitle: "Symbols of eternal love",
      image: "/placeholder.svg?height=300&width=400&text=Beautiful+Rings",
      link: "/catalog/rings",
      size: "medium",
    },
    {
      id: "chains",
      title: "Daily Wear Chains",
      subtitle: "Perfect for everyday elegance",
      image: "/placeholder.svg?height=300&width=400&text=Gold+Chains",
      link: "/catalog/chains",
      size: "medium",
    },
    {
      id: "necklaces",
      title: "Statement Necklaces",
      subtitle: "Make a bold impression",
      image: "/placeholder.svg?height=400&width=600&text=Statement+Necklaces",
      link: "/catalog/necklaces",
      size: "large",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Navbar */}
      

      {/* Live Rates Section - Desktop */}
      <section className="hidden md:block bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-4 border-b border-rose-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-rose-100 dark:bg-gray-800/90 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Live Rates
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 font-medium dark:text-gray-400">
                        Gold (24K)
                      </div>
                      <div className="text-lg font-bold text-amber-600">
                        ₹{rates.gold}
                      </div>
                    </div>
                    {rates.previousGold !== undefined &&
                      rates.gold !== rates.previousGold &&
                      (rates.gold > rates.previousGold ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ))}
                  </div>

                  <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 font-medium dark:text-gray-400">
                        Silver
                      </div>
                      <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
                        ₹{rates.silver}
                      </div>
                    </div>
                    {rates.previousSilver !== undefined &&
                      rates.silver !== rates.previousSilver &&
                      (rates.silver > rates.previousSilver ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ))}
                  </div>
                </div>

                {hasMounted && (
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Updated: {new Date(rates.lastUpdated).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Rates Section - Mobile */}
      <section className="block md:hidden bg-gradient-to-r from-rose-100 to-amber-100 dark:from-gray-900 dark:to-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg dark:bg-gray-800/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Live Rates
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Gold 24K
                  </div>
                  <div className="text-sm font-bold text-amber-600 flex items-center gap-1">
                    ₹{rates.gold}
                    {rates.previousGold !== undefined &&
                      rates.gold !== rates.previousGold &&
                      (rates.gold > rates.previousGold ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Silver
                  </div>
                  <div className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    ₹{rates.silver}
                    {rates.previousSilver !== undefined &&
                      rates.silver !== rates.previousSilver &&
                      (rates.silver > rates.previousSilver ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Story Navigation */}
      <MobileStory />

      {/* Hero Slider Section - Tanishq Style with Proper Preview */}
      <section className="py-6 bg-gradient-to-b from-amber-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Desktop Hero Slider - Tanishq Style */}
          <div className="hidden md:block">
            <div className="relative w-full">
              {/* Navigation Arrows - Positioned over the slider */}
              <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Outer container for clipping the slides and applying overall border-radius */}
              <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">
                {/* Flex container for all slides, handles the horizontal scrolling */}
                <div
                  className="relative h-[450px] flex transition-transform duration-700 ease-in-out"
                  // Each slide takes 80% width with 0.5% margin on each side (total 1% horizontal margin between slides)
                  // So, effective slide width is 80% + 1% = 81%
                  // To center the current slide, we shift it by its position * effectiveSlideWidth
                  // Then add an offset to bring the center of the first slide to the center of the viewport (if it was the only one)
                  // Offset = (ViewportWidth - SlideWidth) / 2. Assuming ViewportWidth = 100% and SlideWidth = 80%.
                  // Offset = (100% - 80%) / 2 = 10%
                  style={{
                    transform: `translateX(calc(-${currentSlide * 81}% + 10%))`,
                  }}
                >
                  {/* Render all slides in sequence */}
                  {slidesToShow.map((item, index) => {
                    const isCurrent = index === currentSlide; // Check if this is the active slide

                    return (
                      <div
                        key={item.id}
                        className={`flex-shrink-0 w-[80%] mx-[0.5%] h-full rounded-xl shadow-2xl bg-white dark:bg-gray-800 relative transition-all duration-700 ${
                          isCurrent
                            ? "scale-100 opacity-100 z-20"
                            : "scale-90 opacity-70 z-10"
                        }`}
                      >
                        {/* Content inside each slide */}
                        <div className="relative w-full h-full">
                          <img
                            src={
                              item.image ||
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KYjYNWgq9ZOTDy2FmxPPT4ubRgGJcp.png" || // Use the provided reference image as default
                              "/placeholder.svg"
                            }
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/placeholder.svg?height=450&width=800&text=Image+Error"; // Fallback on error
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
                {slidesToShow.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Hero Slider - Keep existing mobile implementation */}
          <div className="md:hidden">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800">
              {slidesToShow.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-black/80" />

                   
                  </div>
                </div>
              ))}

              {/* Mobile Navigation Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                {slidesToShow.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 dark:text-gray-200">
              Balkrushna Collections
            </h2>
            <p className="text-lg text-gray-600 font-light dark:text-gray-400">
              Explore our newly launched collection
            </p>
          </div>

          {/* Desktop Collections Grid */}
          <div className="hidden md:grid grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Large Collection Item 1 */}
            <div className="col-span-8 row-span-2">
              <Link href={collections[0].link} className="group block">
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <img
                    src={collections[0].image || "/placeholder.svg"}
                    alt={collections[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-light mb-2">
                      {collections[0].title}
                    </h3>
                    <p className="text-lg opacity-90 font-light">
                      {collections[0].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Medium Collection Item 1 */}
            <div className="col-span-4">
              <Link href={collections[1].link} className="group block">
                <div className="relative h-44 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <img
                    src={collections[1].image || "/placeholder.svg"}
                    alt={collections[1].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-light mb-1">
                      {collections[1].title}
                    </h3>
                    <p className="text-sm opacity-90 font-light">
                      {collections[1].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Medium Collection Item 2 */}
            <div className="col-span-4">
              <Link href={collections[2].link} className="group block">
                <div className="relative h-44 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <img
                    src={collections[2].image || "/placeholder.svg"}
                    alt={collections[2].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-light mb-1">
                      {collections[2].title}
                    </h3>
                    <p className="text-sm opacity-90 font-light">
                      {collections[2].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Large Collection Item 2 */}
            <div className="col-span-12">
              <Link href={collections[3].link} className="group block">
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <img
                    src={collections[3].image || "/placeholder.svg"}
                    alt={collections[3].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white">
                    <h3 className="text-3xl font-light mb-2">
                      {collections[3].title}
                    </h3>
                    <p className="text-lg opacity-90 font-light">
                      {collections[3].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Collections Grid */}
          <div className="md:hidden space-y-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                href={collection.link}
                className="group block"
              >
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-light mb-1">
                      {collection.title}
                    </h3>
                    <p className="text-sm opacity-90 font-light">
                      {collection.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 dark:text-gray-200">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto dark:text-gray-400">
              Discover our comprehensive range of jewelry services designed for
              you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Gold Scheme",
                description:
                  "Join our flexible gold savings scheme and secure your future with gold investments",
                icon: <Crown className="h-8 w-8" />,
                color: "from-amber-500 to-yellow-600",
                link: "/gold-scheme",
              },
              {
                title: "Digital Gold",
                description:
                  "Buy, sell, and store gold digitally with complete security and transparency",
                icon: <Sparkles className="h-8 w-8" />,
                color: "from-red-500 to-pink-600",
                link: "/digital-gold",
              },
              {
                title: "Ring Measurement",
                description:
                  "Find your perfect ring size with our accurate measurement tools",
                icon: <Gem className="h-8 w-8" />,
                color: "from-purple-500 to-indigo-600",
                link: "/ring-measurement",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden dark:from-gray-800 dark:to-gray-700 rounded-3xl"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                    {service.description}
                  </p>
                  <Link href={service.link}>
                    <Button
                      className={`bg-gradient-to-r ${service.color} text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-red-500 dark:text-amber-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 dark:text-gray-200">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent font-medium">
                BALKRUSHNA JEWELLERS
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto dark:text-gray-400">
              Experience the finest in jewelry craftsmanship with our commitment
              to quality and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
                gradient: "from-red-500 to-rose-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20240929/pngtree-beautiful-diamond-engagement-ring-on-a-dark-sparkling-background-the-focus-image_16280948.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Stay Updated
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 font-light">
              Get the latest updates on new collections and exclusive offers
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
