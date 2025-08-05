"use client";
import { useState, useEffect } from "react";
import { Crown, Sparkles, Gem, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
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
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Effortless Elegance, Every Day",
      subtitle: "Discover 7000+ Designs in 18KT, Made for Daily Moments",
      link: "/catalog",
    },
    {
      id: "default-2",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Timeless Gold Collection",
      subtitle: "Crafted with precision, designed for perfection",
      link: "/catalog/gold",
    },
    {
      id: "default-3",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Bridal Collection",
      subtitle: "Make your special day even more memorable",
      link: "/catalog/wedding",
    },
    {
      id: "default-4",
      image:
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Festival Collection",
      subtitle: "Celebrate every moment with our festive jewelry",
      link: "/catalog/festival",
    },
    {
      id: "default-5",
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
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
      title: "Stunning Earrings",
      subtitle: "Elegant earrings for every occasion",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/earrings",
      size: "large",
      price: "₹12,999",
      discount: "25% OFF",
    },
    {
      id: "rings",
      title: "Diamond Rings",
      subtitle: "Symbols of eternal love",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/rings",
      size: "medium",
      price: "₹25,999",
      discount: "30% OFF",
    },
    {
      id: "chains",
      title: "Gold Chains",
      subtitle: "Perfect for everyday elegance",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/chains",
      size: "medium",
      price: "₹18,999",
      discount: "20% OFF",
    },
    {
      id: "necklaces",
      title: "Statement Necklaces",
      subtitle: "Make a bold impression",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/necklaces",
      size: "large",
      price: "₹35,999",
      discount: "35% OFF",
    },
    {
      id: "bangles",
      title: "Designer Bangles",
      subtitle: "Traditional meets modern",
      image:
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/bangles",
      size: "medium",
      price: "₹22,999",
      discount: "28% OFF",
    },
    {
      id: "pendants",
      title: "Elegant Pendants",
      subtitle: "Delicate beauty for every day",
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/catalog/pendants",
      size: "medium",
      price: "₹15,999",
      discount: "22% OFF",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Navbar */}
      {/* <Navbar /> */}

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
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 mx-2">
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

                    <div className="absolute z-20 bottom-8 left-4 right-4 text-white text-center">
                      <h1 className="text-2xl font-light leading-tight mb-2">
                        {item.title}
                      </h1>
                      <p className="text-sm mb-4 opacity-90 font-light">
                        {item.subtitle}
                      </p>
                      <Link href={item.link || "#"}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </div>
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
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 px-6 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400 font-semibold text-sm tracking-wider uppercase">
                Featured Collections
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-gray-800 mb-6 dark:text-gray-200">
              Discover Our
              <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent font-medium">
                Exquisite Collections
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              Each piece tells a story of craftsmanship, elegance, and timeless
              beauty
            </p>
          </div>

          {/* Desktop Collections Grid - Advanced Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
              {/* Large Featured Item */}
              <div className="col-span-8 row-span-2">
                <Link href={collections[0].link} className="group block">
                  <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                    <img
                      src={collections[0].image || "/placeholder.svg"}
                      alt={collections[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Floating Discount Badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {collections[0].discount}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-sm font-medium text-rose-200 mb-2 tracking-wider uppercase">
                            Featured Collection
                          </div>
                          <h3 className="text-4xl font-light mb-3 leading-tight">
                            {collections[0].title}
                          </h3>
                          <p className="text-lg opacity-90 font-light mb-4">
                            {collections[0].subtitle}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold">
                              {collections[0].price}
                            </span>
                            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full px-6 py-2 transition-all duration-300">
                              Explore Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Medium Items */}
              {collections.slice(1, 3).map((collection, index) => (
                <div key={collection.id} className="col-span-4">
                  <Link href={collection.link} className="group block">
                    <div className="relative h-[285px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {collection.discount}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">
                          {collection.title}
                        </h3>
                        <p className="text-sm opacity-90 font-light mb-2">
                          {collection.subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {collection.price}
                          </span>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              {/* Bottom Row - Three Equal Items */}
              {collections.slice(3, 6).map((collection, index) => (
                <div key={collection.id} className="col-span-4">
                  <Link href={collection.link} className="group block">
                    <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {collection.discount}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-semibold mb-1">
                          {collection.title}
                        </h3>
                        <p className="text-sm opacity-90 font-light mb-2">
                          {collection.subtitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {collection.price}
                          </span>
                          <Button
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-1 text-xs"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Collections Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  href={collection.link}
                  className="group block"
                >
                  <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {collection.discount}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-semibold mb-2">
                        {collection.title}
                      </h3>
                      <p className="text-sm opacity-90 font-light mb-3">
                        {collection.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">
                          {collection.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-2"
                        >
                          Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Collections Grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  href={collection.link}
                  className="group block"
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white dark:bg-gray-800">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {collection.discount}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {collection.title}
                      </h3>
                      <p className="text-sm opacity-90 font-light mb-3">
                        {collection.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">
                          {collection.price}
                        </span>
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-2"
                        >
                          Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
