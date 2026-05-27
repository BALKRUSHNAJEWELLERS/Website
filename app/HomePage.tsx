"use client";
import { useState, useEffect } from "react";
import {
  Crown,
  Sparkles,
  Gem,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Users,
  Heart,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
// import Link from "next/link"; // Removed to fix build error
import { motion } from "framer-motion";
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
const staticStoryItems: StoryItem[] = [];
// --- Services Data for Complete Jewelry Solutions ---
const services = [
  {
    icon: <Crown className="h-7 w-7 text-white" />,
    title: "Gold Scheme",
    desc: "Monthly gold saving scheme with attractive benefits and flexible payment options",
    link: "/gold-scheme",
    btn: "Learn More",
    btnClasses:
      "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-full px-6 py-2",
  },
  {
    icon: <Sparkles className="h-7 w-7 text-white" />,
    title: "Digital Gold",
    desc: "Invest in pure 24K gold digitally with secure storage and easy redemption options",
    link: "/digital-gold",
    btn: "Start Investing",
    btnClasses:
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full px-6 py-2",
  },
  {
    icon: <Gem className="h-7 w-7 text-white" />,
    title: "Custom Design",
    desc: "Create unique, personalized jewelry pieces with our expert design consultation",
    link: "/contact",
    btn: "Get Quote",
    btnClasses:
      "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full px-6 py-2",
  },
];

// --- Features Data for Why Balkrushna Jewellers ---
const features = [
  {
    id: "certified-quality",
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Certified Quality",
    desc: "All our jewelry is hallmarked and certified for purity and authenticity",
  },
  {
    id: "expert-craftsmanship",
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Expert Craftsmanship",
    desc: "Skilled artisans with decades of experience in traditional and modern designs",
  },
  {
    id: "lifetime-support",
    icon: <Shield className="h-8 w-8 text-white" />,
    title: "Lifetime Support",
    desc: "Free cleaning, maintenance, and repair services for all our jewelry",
  },
  {
    id: "custom-designs",
    icon: <Gem className="h-8 w-8 text-white" />,
    title: "Custom Designs",
    desc: "Personalized jewelry designs tailored to your preferences and occasions",
  },
];

// --- Testimonials Data ---
const testimonials = [
  {
    id: "priya",
    name: "Priya Patel",
    place: "Himatnagar",
    text: "Excellent quality and service! I've been buying jewelry from Balkrushna Jewellers for over 10 years. Their gold scheme helped me save for my daughter's wedding.",
    avatarClass: "from-rose-400 to-pink-500",
    initial: "P",
  },
  {
    id: "rajesh",
    name: "Rajesh Shah",
    place: "Ahmedabad",
    text: "The craftsmanship is outstanding! They created a custom necklace for my wife's anniversary. The attention to detail and quality is unmatched.",
    avatarClass: "from-blue-400 to-indigo-500",
    initial: "R",
  },
  {
    id: "meera",
    name: "Meera Desai",
    place: "Gandhinagar",
    text: "Trusted family jeweller for three generations! Their hallmarked gold and transparent pricing gives us complete confidence in every purchase.",
    avatarClass: "from-green-400 to-emerald-500",
    initial: "M",
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
      (staticItem) => !dynamicStories.some((dyn) => dyn.id === staticItem.id),
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
      <section className="md:hidden py-4 bg-gray-50 dark:bg-gray-800">
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
    <section className="md:hidden py-4 bg-gray-50 dark:bg-gray-800">
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
                            border: `3px dotted hsl(${(index * 60) % 360
                              }, 80%, 60%)`,
                            borderRadius: "50%",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-medium text-center max-w-[80px] leading-tight transition-all duration-200 ${clickedStory === story.id
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
      (prev) => (prev - 1 + slidesToShow.length) % slidesToShow.length,
    );
  };

  const collections = [
    {
      id: "earrings",
      title: "Stunning Earrings",
      subtitle: "Elegant earrings for every occasion",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKCwoLCg8ODAwODxYQERAREBYiFRkVFRkVIh4kHhweJB42KiYmKjY+NDI0PkxERExfWl98fKcBBgYGBgcGBwgIBwoLCgsKDw4MDA4PFhAREBEQFiIVGRUVGRUiHiQeHB4kHjYqJiYqNj40MjQ+TERETF9aX3x8p//CABEIBgAEAAMBIgACEQEDEQH/xAAwAAEBAAMBAQAAAAAAAAAAAAAAAQIDBAUGAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAC+mHOgAAAAAAAAAAAAAAAAAAAAAAAAAAAFEKRYFgKRYAKEAUEFAASgAAUEAAABQAAAAAAAAAAAAEEAAAAAAAAAAAAAAAAAAAAAAAACkBYCwWWFAIWKRQIUEoAAAEoFBAAAAUAAAAAAAAAAAAAAAAoYiAAAAAAAAAAAAAAAAAAAAACwALAAoEBQABKAAAJQACgAAAgKACAoAICgAAAAAAAAAAFgAWCpTEQAAAAAAAAAAAAKQBQgFEWBYLAWBQABKAAVKQAABKCUBQAAAAAAAAAAAAAAAAAAAAAApAFgWFICgGIgAAAAAAAAAAohQgKICxQAAAlEoAiiUAolgAAAKAAAAAAAAAAAAACAoAAAAAAAAAAolgsCoFACFAMRAAAAABRAAWBQEoAAlBKQoAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCAWAoikUAASgBiIAAFIsALLAUIKlAAJQAa9musXxn0SevPlvYX0gAMXzJ9QBKOfLxsU+goohg8jhPprkOafM/Rp16t/MuyfIe8nqZ/PaD6gLpvi6U+jyFx0dPkndv8X2xw+b6Br79XMenz9GgmXyP2gBzTH5xPqtouGfyX1BtA5+jkMt/he+AMcPCPogAWKQApFEKShKAhQAAAAYiBSAFJULFEoJQBKAAAoAD437L437Kzl+b7N57YlA8bzNvv2Ydfy31MoHjEs9oSgeb5/oefZ9F4fd50dvpCpYfJ/W/J/WI+N+x+Ir7HfhnL5Ojfos90SvO9HzjV63k+sfH/YfPc9n1KWUU+O+w+P+wANHzf0nzVn1gl+T5vV9Kzfv+K+ul369ms8j2/E9sGJ4PHv9Szt2eB78oFgCkoRQABKBKAAAAAYiACwUCUAlAKAACAoAAD436r5b7GzzfC+v8o7ej5n6aV5np/Jnret4azzPqPn9h9GJfGlWeyJQPN8/0PPs8z7Hh8A+xSypYfJ+r5f1lnxvv+H756BZfI0dHHZ9CJb5vo+YYet5XqjxvZHx31fN87Z9jZZfh/d8n7CzxXtjwOL6T5s+rEvz/wBB8/8AQVxfL/a8kZbfjPqLOP2/D9yV4fu/IWfQ9viQ8j7L5T0j2hLZQABKAAAABKAAAAQRKACUAABQAAAAAAA5j5f7H4j27Pc8fRzG76LDCXR5vD7lnoiWfD/c/JWfV5fOe/L5Tk02fVvAkev0eF7q+d52zhs+s8T19kvyv1Xha7PosdOiXwPrvjfq7Hx32/AdO/5L6Iz+W+x8Y9i/N9a+x89s2J6HUS+Z6fyXp2ez8j6HQeucEvz31/xf19m6WS6Pm/W8Wz69qwl8f6H5L6ezaJeX5D7nlTzfd8b0V4tfi/UWdYl0fHfafHWfavD9mXMAAhQAAAAAAAAAQRKAAUAAAAAAAAAABYACwVKIBYWWFAQVBQSwKCUASgASkWFlgUQoIVKJQAShKAAJQAAAAASgAAAAAAAAAAAEEBQAAAAAAAAAAAAAAApCkKShCkURQlCUSgBKAAhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAApAACkAUSoVKJR4uj0PNs927Uvzm3i+is8zk+n5zo5ulL8v63k+lZ6wl830vi/pLPQ07tMvzvveH9NZPF9vxY0bdnsV8963XpN3D3JfmvoPk/sbAlcvVD5r3vlvsbAlc/QPl+zx/tLPDw9/Qb9W1L81v4vorPKz9v50+ieL7Urz/Q+Us7df0Q4O/n6JQAAAAAAAAAAAAAAAAIAAAAAAAAsAAALKJQAlQKCU87zvR86z6IS/K/Q/PdVn0DxNkvrg4fC+r+Ls+z5en56PP6vofjK+78X1/mj2PQJXi+14tmfr/Ldx7bwvdlA+O+x+O+xsCUD4/wCw+P8AsLAlA+M+z+K9mz3Hh9sveD5T6L532rPR8XZ4p6H0HP0SviftuWx1fFe8euJQAAAAAAAAAAAAAAAAIAAAAAAAABYAKgqUAEKQsoA87zvR86z6IS/K/Q/O/RWdPH2JTVtHie3geTwcPt2e3879Fojy+Tyfp69USvF9rxbMvY8f2Dk62uXYD477H477GwSWsMz4/wCw+P8AsLAlNew+M+z+M+zsx5+pKa9h8p9H859HZ4PV7fxp9m8/0JSc5v8Akvr8bPE93477ECUAAAAAAAAAAAAAAACAAAAAAFIsAABSWCpQlIsBRKAPN8/u47PoDVL8t6/Us183bDX6UsoHzP0GWwA+T+pw3WSkrwfd47PK9LOnNr7eg2YZ8kvyv0uazX5/qbTol55fkvps1mrz/Vpv2OeX4/6fYs1cPp0272lfmPotOad2jel+L+n7eOzb819RCebs6jzvbJQAAAAAAAAAAACwACggKggAAAAAsALKIsFgoCUAAAAadw+Y+g3rAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAiAAWAAAACyiKCCgiwWUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChSAAghYACwAKJQSgBKJQigAACUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoIAAACggKAAAgiwFgFJQJQAAlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoICgKgAsACoFDEsRYFCKRYVKAEFAAAABKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAEBQAAAAABRAQQsFBLKAASgQKAAhQAAAAAAAAAAAAAAAAAAAAAAABQQAAAAAAFBAAAAUAAAEBQAAAAogACkUSwQRZRKBKSgIUAAAAAAAAAAAAAAAAAAAAAAAAAAAUEBQQAAFABAAAAAAAAAUAAAAAAKSwVAAAAAEAAAJQAAABKAAhQAAAEoIUAAAAAAAEoAAAABQQAAAAAAAAAAAAAAAAFAAAAAFgAKIABSQKKkWKEAAEoAAAAAAAlAAACKAAAAAAAAAAAAAAAABQQFBAUEAAAAAAAAAABQAAAAAAAFgAWAsAAAAQAAAAAAAAAAAAAAASgCUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQCoAAAAAAWAAUksLYAIEoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAEBQAAQAAAAAAAAAFAAAAAAAAAFEAAACBKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBAAAAAUEAAAAAABQAAQFAAAAAAAAAWUkWKspBAAAAAAAAAAABKEoASgAAAAEoAAAAAAAAAAEoAAAAAFBAAEoAAAAABQAAAAAAAAAApKiWUCFlgEoAAAUAEAAAARYVKAIoAAAASgEsoAIUAAAABBQAAAAAAACFAAIWUAAEoAAAAAFBAUAAABZSQCykWLUpKJAoQAAFBAAAAAAAEoCFBFgspKhZYAAAAFgoEolABBUoAAAAAAAQUCWFQVBUFShAsFgLBSFSgAUAAAAAAKiClgBUqQKAAAsAAAQAAAABKgKQAAAAAAAAAACwUEAWFASgAAAhQSoVBYAAAAAAAAAAAFSgAUEBQAAFQgoSiACgAAAAAABAAAACUIAABBYFQWAsBBkgqCoKAAAAACkKQoACUAILAAAILAqAAAmJskFsFQUAFQUAAUAAAsCiASgIAoAAAAAAACVAAgAAII5ZWG1HDOjjzr1tvzvu6m1jzWZatPoS8Dp4I9XZ4ns2Zo1KlAFgqUAAAFACUJQQqAAAQsBry8+Xbz+nzy+f28fDm/TOTq3lpy8yOnV6PMvB18/Pm+/eTp3nK42ygqCgWCpQKAAABAAKgsUgUAAAAAAAIAAgCQrVJdqLHl+n4mddnh93IcHvfPeoOzm4Jfr/G9Dw7PW83q8M6fU8r1Tk935n3s3vuF3nNFlsFQWwUAAFihBYCoWAsABBYCIc3Lt4s67vnPU8A+h4tmmXd73yX01nLs83qN3z3ZxHqtnJL6PqeT6dm265ZtvPuMrjbLYKlKgoAoAAApAIoJSBQAAAAAAAgBLAYGGidObo4btl4+7RxS/Qeb5/r6nheh5+w4nTzHreN6XAerxYZHo+D7vgno9nPTg+h+a+ol6s+Pks9S8OEerfK9CzbccrFiqlKgoACwLAUgABBNfLL1Xj8/N97HwvUs0+b6Xjy+h4XteVXbrx6JfI9zwe+zL0OTaeR3cPsmzxevTHvOLSvTnu7LPN19vNm9nX4PrWdTG6zklqpRYKKAAAUQlEsKCBQAAAQFAACCABzdGiXn5WWb8lu9rj06O7xcI9Lk6rLwMOrWejzs98ujo5u487fw9tnpeF7XlS+vwej4hv8AU8PpOn1eTadN+R9U72GrN9zLVnvOdxpbFlsFSgCyksAAADDLQcff5nRnV4/Hh3c3oefm+z4U2anfwbsY5/T8z0q8Xt4uiz0fP9DyJev1NHAcWzV32bPUYnT4nFhLl7nD6Jp6fN9HN9LPVnvOdxystxpQVKBQAFSogUhUpFEAAACgAABEsAgxsPH4/ovLxrm3+Vz16HJt6jzL1aK7/I6UYdPJ6B5/dp2nld/N6tnHef05d/zPqebXX1c/uJfmd+Us9zTDXho7ca9XPRt3nblqzszuNMktlQUAFgAAJYNO7FfC3a9PPWrz/c87UvRwdZwdGfAdHXxdRy+l53eeL2aPXrRy7emN3z3fzm/1eMdHj5+wcPqzzj0PK5Nxv9zn3ZvRs0bNTblhlZncbZbKLBRQAIAoJYVAqFikAKsAAAAJAEwx0S3m6+KXXq2Yxr8z0uauDT2ytvT52cbuvb6VnmdejyZfevzuNvvc/l9sc3V3eMnB2avQs6eLZwK9fDbF8nTvl2+tz7Jerbo23O3PXnWy42zKy2UFAAAAAiDHKHP4n0PLnXjdHDjGOvv4138k3mG7n9HU5+ru3p527l4pfUnlbF1Z+jE8/n2eobePn4zLm9XA19mG41Z9W+Xm7dPNHr7PN9HUzywysyS2VKVLQACwhYUEsoABFgAKQKAAlkJdZy9HFuzfH4dWpetqyN+zixPVnk7Td26/XMvntnHd449u3WvF2d/Pbv1YpvZ7PkY55ZbfS8Sc8/V0+bXo+Jeo2dXLtyz27Ow4+lzy+lnxdlmeWOVmWWOVVLYoAAAECOSXbzZ6ZV8/RHqeFuwrm256jbhp9Anu82uyeE9B082eto3rlz07p00dfJumPb8bZ6OOXg+rh0WdWfzes+l0eJlXrTzEex0eb6Jzeh5nZm+jlr2bzlccrFlFKABACwoAAAEAsCwABQIIY0eVOjzue+nVz89ek8XVZ7ePgYnrvJ6j2Ns8s0c/Zlvvu1TyrjdhjF6N3FlNbd+ejWvT59focfP4XTr9XWdGXoFw6vA5D6TyeHpj1c8ueM/S8j1Jd+WvPWc8sbWVlsFAAAIsNPH1efnXseZu+Xs9bL57KX29HnbzbjdB0zT3We58r7nzrfp+p4eO72+ToN3dzZS9WrLVNbvY8XtnKc/peROftbfG1nuZ/O7T3c/Ep7vn8GyXq9Dh9OOjPXnrOeWOWpbKLLQAIAoSgAAIUACACgJZAElhOTrxl8bn93kzfJ870sK0Z9u04tzzz2fJ9PzlyatOuk5csdDZk1guUvVhljvo9ryfS4eXxejn9fWfH2+6TyO3q0S9GXnDt49dzdvpcnRL07NO7ec8scrMrjlYsoAAAlhh43t8OdcmOlm69e/TWjR3LPPz6KYdq1h5XqeU6dWGfDu4XDoa055SXLK9Wt6N2O7OOzxPb8PHn6Hd2Hh8/r8hzbLvlnVjtzerfy9NnRt07dTZlhlZlZbFloAEWCwKAAAAgsUiwBQAEIiwmGXFLq4vUsc2rzeBejV2d55fY4D09HD7p8/z9WnXbZzdWO96Jsszhv39WunLz7dOc+ph3+Ly8/L05XUw09mR5j0uY1dW3di49GOcu3fp32bt2rbqZ5Y52Wy2LKAAARYTHKRo8/1cJr53y/s9EfIT1Nenm59+xODo7YvX4fteTN6McNvTpou7WYZXpXsw2ZdO3D6Hn+3w8/B52Wqcet6mJnv8XYdGn1JL5nTgzerp5umzfs17NTPLHKy5S2LLQAAIKAAAAEoBAWACgRZCBz68tWbh8r7PkW7fS2Zxl4uHOOvb1WYZdPly9/k+nua8iXHXXDbqR0teN1fRzyzx1eJt7mMfb8XSe7o87rNWr2t58zv9bz5d2zl7c3Ldr32bNmGepnZlZS2UAAACWEmWJjhl5WdXzOzqjx9voefW7R5mR28/XvOfq8ztPLy9ryHTV0adm+mK4rnMPXxljv8An3HVs225w9Tzov0Hm4+xHgejs4z1OPbql3dnD3Rv26tmpsyxy1m2UUoAAVCUAAASgQqUSwABQEISw5eH1vMxpjzaZd/lZ41xenOqx35/N2Zejt4peLo5OqvV0eN0x13RsXp6PL5k9Hxp1nHvyte5Pn/SNc9zlTxXp8i93Tx9scXRzdWNb9uGzWdmeOdlymVLLZUoAAAgJcTl87s58b9HwvU+O1NuHV6Ryejs8yOrx9Owx7OrZXJ6PjbI79ejbLls06j1+PyOezZnO2uXt1dEcs6+StPTy093b4HZm9vPc83d283TZv2a9ms55Y5amSUWWgASkKAAAAAABAABQEshAmGeMvDz+pqzeF08UvD6fJ36nj6+X3jLwPS8g2e75Ponj9ertPE36+uzm7t/NLo7/S8SvV8r0848jT0K09/m2PotvzfbHoceFms+vR0xu2a9us55452WrYpSgsAACUSWHP5fteZjWvTcZWfPyU8/0NVmv1+H0rNvD3fOy9PdnyHm9mjtPN6OnqPHzneef08e+vX8/wBXzY9PzN3fHgb5Vxb85dfVNsbujT0WbNmGzWcsplqKFFAVCUAAAAAAACUQAAKlgETHKGGGzGXTw+j5+bu8b3fka7fa4Nx5nJnD0d+joPN9PzPaPmern9GvR8P2/Gj2+Xh988D1eDWet5Xpjyezj6Jcm+5uGzPIm/HdZduOyzLPHLUtlSloAAUgEsEsJjlJeHm9TXm+Xl3apfO592NdHffnLNPbye8Y/O9eo33o889Ds09R4Hoat8edr7fLr1+zyfdPI9Pz8jp873vFl253Zm3fN9jdM7Ms5lqZWWygooEKCUAAAAAAAAgCwBUogiTKGMykYcPfyTTkuqNvkbuRdW3t0Wde3TsPP9Pf6lngbfQ1HmaPY83N8/0fL7K9vwuzvPA93yPVOPj9Djze7ObYud2VjsZ2M1suRVstigKQBRAASUYzLGXHXtwjVp6uaXzOzV3nh+Z6m+s9HT45o6NXVXVwe52p5WffzS+Y6OOXo+f9Tmsy9Dz9h9Fzcm46/NuWbt3Y7jPbNlmWUzsuUyqlsWWgASxSUAAAAAAAACUiiBQEogjFRhhtxl83z/fwxr53f6umXVw9+g5vX8/6LedXHNdjBJbIOHh9jgl4vX8LOz6vl4N8srdm7d2vdZnsmyxkysVaVbFlAACiVABKICTLEmOSXXr3Yy+Verjzd/NOM18zsp9Byd2s48+OEueWjMaOjVL5Ov0eSM+btzXh688ow6Gwy34brMtmOzUuUystmViyiy0ABUJQAAAAAAAAJRKCACpRFkJYSWRhhtwl06ujCa58OjDLV2813NeOMMpBDEc2/VLwbsNua2tplnNpnv177Ms5nrNq0q2CgAFFAJRFRARYJYMckYY5xderfhLxYdmvN83R6vJL7HH0cXTGOOWObWIzYRdenZJZtm2MM9mZhsz2WY7bnYzmepMlRVqUFKBBSUAAAAAAAAAAAIsAAVLAIkyhjjnJcMNuMacd2EvG2c0tYLMsWJYq4aLjGG1tlb50GGzZnZNjPUZLZatgoAAUBQAAEVEBFElGMykYY7MV1a9+vN08PpcEu7XdVZ4ypjWK5amJhno65buw3SZbG3SZ3OyZW2KqLLVAVQAFCEFAAAAAAAAAAAlEWAKBFRJRJRjMka5njLq8z1tMvmujRLjdStmjdY0TVtl2bde829GvfZcmeoyWxVRSqAUllAoAAAQohLABLBLCTKS4YbMY1cffrl4tevpzea7ebTPHHImOcjDbNkuzdr32Z7cNtlzmWoqopSgVQAIBQAAAAAAAAAAAACFlEACyhFkASZQmOUlw1buKPJw9DwM69lwYxt5eXdp0deGebv6NfQmzdr26mWUysZFWy2CgClAAAAAAAAJUQEWEWGMykuvTv45eXy/c8HN7u7yNsvpafM1ndwTpN3Vw+iZb9e6zPZjnqZZS2KtiygFFAAiygAAAAAAAAAAAAAEoRRAAoEWCVExyhjx9vFm+P1cXsZ14uj6DRL89v9nVWrHr449Dfr3WbM8c9TLKWy2ZWLKALBRQAAAICgAAAJZAElExykuvl7POl4Lz9+NcTt1HFu3Q5urDss4PQ4+2Xbuw2aznnjlZlZatlsoFKABFAAAAAAAAAAAAAAAABKIohSBQIsiAx8/0OPN5dXTzzWzm3648z0Ob1zVyTrl3bsNmpnnjnc3KWrZbFlFgooAAAAAAAAABKiAiwkyhj53pcub52HZx51v044S5Z6qPU5sLOP1OPuM9uvZZnlLqXKWy2UAooEWUAAAAAAAAAAAAAAAAAAAiiABUoksiYZ4x5V9Lkxt5/RxGzXp9KXX1TOzLZhnZsyxysystWy2UAVQAAAihFgBZYAoAACEJYJRjjljL52r1eTGtGWoY5YcB6HPs65btxzszzwz1M8scrLZbLYLYKKBFlAAAAAAAAAoIAAAAAAAAAAQAUQSyJjlrluCZvNw+xhm+N3dMNOWyFyxy1M88MrM7jlVstiwUFFAAAiwKEoQAAKABFkJRCDFhLdcYurDqq+Tu78Y5M92JhnLWeeGepncc7LZbKC2UCgRQAAAAAAAACgAgAAKCAAAAAIsAUYRdcmbFZqUSUYrJYogLlhlqZ5YZamVxySiqBZaABFgqBZQAlIAFAASyBgXXGLFSxQFYTPHKLFiyGUabMtees5WWzJLVsFFCoAAAAAAAFBAUAAAAAAEAAAARYDFZrOdFIqpKJLISyWEWohZS568tTZcMtTJLZbKLBRQIAAsoABFgACgQwhrXGoIWWwCKMccosJFhKA2a1m64ZbmWWNstlFloEWUAAAAAAAACgAgKACAAAAAAIFmnLHFCKWltskzGubMTDHZjLrmeObiSXJjYtxpsy1Z9M53G1lYsySlS0ACKAACWBYAAohNOWPOhKLSsrJcrZrZw1zZjLhM8ZcJnjGNklzY5RdmrPc2XDLUzY5WW40opYSgAAAAACggKAAACAAAAAAAGN1y4DGhbLlLZllLYFMM8Y145TOsJlhLMcpmwQsS5ZYXU23DLec7jbMrjaoKKApEpBZQCFIAFmOWrLEmNLKMsctTLKZ2KupFhhjs15uMyxlxxyxlxxymbhngl2pbNmWvLedlxtmVirZaBKAAAAAKAAAAAAACAAAAAAJo3aM6qM1liTPLDPUzyxupUpMbrlkY5sxslY2QlSybdcVC556s+mdmWGVmVxtmSUqWgASpQBFEUgUQc+7TiiZtsypljlZnnhlqWy2CGOFwzUklmNmbIkuOOWObsz07auevLedmWGWpnccrLcaUWLKAAAABQAAAAAAAQAAAAlCWGOnbqxoTNMRsz1Z6m3LXlqZSYkwxxxcoktxuIYpblhTbqywFjNbNeW87M9eepncbWViy2WgAQCygAgBUsMNWzVz0hm5WTUyy11N2WvLU2MbZcGqW4zHNykLMbjKjGGKZt38+8qNzblrz1nPLG1lZbKloVAAAAAAoAAAAICgAgAAABLDHTu040xszcES55arZuurKzZjMTHFM6qC4pBC24ozgLLGOzVs6TZnhnrOVxyq2ZWLKBQFCEFAgAqEa9W3Tz1Bm5RNRcKuzZozs2XXbGvLCWJM3KSCRKjGGNkt6NG9GNm5sz17NTPLHLUyuOVlS0sJQAAAABQAAAAAAAQAAAAlhOfo041iTFwx2YSywZZYZ1ZZZhjnJcZkjGZRcRBUZSgYVN2rZubM8M9TLLHKy5RZbBRSypKAEUQALBGPP082NQYtlVgC5Y51UtjXnjGErNksWSyJKlxlkbNmOWpixups2a9mpnljlqZWWy2WgRQAAACgAAAAAFgCAAAAAECYbJLzyzltjkNbKQzxtWIIAElRgykuNWFKmrZqrPbr2ameeOes5WZVbLYstAUIBLKRRKgCpZE07sJdA5aqWsWUhlFlRSEslElkSXGWSyXGs4yrXqYbMNmpnt17NTLPHLUtlstloVJQAACgAAAAAAAAAgAAACASxdero087iTOkqIQsgJJakMkCWktENRjcdmmWzHPWcs8c7MrjlZbLSlAWKhKACFgAqWElkacN+nnqDNELcRSVYkEBCyVGLJLMiy8+WNZ7MNmpnnjnqZZY5WWrYstAlAAAAFAAAAAAAAAABAACWCWLMc8Y0Tdq56gzZKMZlJcZURRKtADUXUyq7JnqXZjnZc5lqMpbKBShUhQAABLAFSwSyMcNmMuhs189EsEACWEUsURUQgwahnM9TLZjs1LnjnZcpbLZaopZUAAACgAAAAAAAAAAgAABABZLImGcl047cc3AmKjGVhzc0vp3zO82WRMprwrKW6MrlYzZ2M5lZatUtiy0AogAAABACpRJUYzKGOGzGXTNuvnqIzakKmJk1U2sRlJrNmrBTJnYzZ1c5lqXKZWWy2KoFlAAAAFAAAAAAAAAAAABAAEAlizHKRjjnJdczxl14bcM3ztmOuOXr5e6Xa2LMMssqwyypM2dkyZWLbSy2KFFAigAAAAlEWALFkJYYzPGXHHOGvDZjm68dkzebg685fN6N/AvqSVIytS5WxlcqZXKxkysVbFCihUAAACgACwAAAAAAAAACAAAEogWTKRjMoYzKS4TZjHmcfvY515PfuGq52zXllTHK5VLbYqiliqSlFiUAAAAAACUQALFkSUYzJGvHZJdczi8Oj1OXN8vL0N0uu7ZZhc6Y5XKyXK2TJatWxQUoVAAAAAAoAACwAAAAAAAAAgABKIBKWSoxZQxVGEzi4M5GLKmFyVLaSrZLQKBQFipKAAAAAAACUQCUsERYSZQxmclwmY1zZIwZlwuVTG5KltJasUFKFQAAAAKAAAAAqAAAAAAsFgAACAAAIsAWKJKiTIYzIRRFBQWBVAAiygAAAAAAAAACUQCUsWRFEmQxUSZDGZWMWSotIoKoACpUAAAACgAAAABSKIohSAWAACxSAAACAAIolgBUoiiKIolAEAoAAAAAAAAAAoAIAASwBQEoiiKiKIolKAKSKJQAAAACgAgKFIUgKgsAURSAAAAAAAACAAAAAIogACiUAAAAAAAoAAAAAAAIAAAASiUIoiwKIolAAAAAAAKAAWAUgAFgALCxSLAAUhSAWAAAAAAAAIAAAAAAAACggKAAAAAAAAAAAAACAAAAAAAAAAAAAAoAAAAAAsLFIogCgAACFJQECwLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAAAAgAAAKAAAAAAsABYFlEBZSWCkCwssFlBCkKlJUChKEsFgqCxSAAAALAAAAAAAUgBSAAAFIAAAAAUlgLCwAAAAAAAAAAAAAALAqACyiLCglQqUASglAAAAEsFCKEoQALKIAACwBSAAAAAAAWCwALAsoiwFIsCwAAAFJUAAAAAAAAAAAACwAAAWCxSKAEoiiLBULKACCgSgAABKAAAJUKACUCAAAUgLAApABUKlEsKgsoihLBZSKIUEKCKIoQLAWACkAAAAAAAAAAALAssLFJQAlCUEsKgssKBAqCgJQAAAAACLCyggWUiwoIohSUIoQAFgqAsFlACAolgUEoSiFEoiwsBQQAACiAAWAAUgCiLAUiiFIsLFJQAAIKlIoiwUAAAJQASglJZQAAACKEoiiKCUAShKIolCUIUAAAlCAWAsLAAqUELKIAoiiVAAUlgAKJZRLACwAFgLCywWCpRKIoAlAACKJQJQAlAAAAAAAAAEolAAgoAAAACCpSKIoAIFQoAEUAhQAAAQsUAAEFgUEolgAUEoAAAASiAKAAACUEKAlAAJUKAAAAAAAAAlCUAAlAAAAAQqUAASgQUAAAEsKAlIsBQAQUEohSWCpSALAUQFQWCpQBFAIsKAACUIoEKBKAEsKBKEoAAAILAoAAAAABCgAAAAAAAAAJSUJQAAASwoAAAABCglAAlIoEBQBKJQiiVCygAQpCyiKEUiiWUlCUJQAASgAAAAAAAAAAAAAQoAAAAAAAAAAACCgAASgQoAAAIolQqUAIKlCCgSiKCCgJQgqUAAJQAlBCgAAAAAAEKAAAAACWUAAAAAAAlAlAAAEoAAigAAAAAQoAABCgAAAAAAEFAQqUSglAAAACUAAJSUBCgAAJQAAAlAAAAAAAAAAAAAAAABCpQQoAACCgAAAAAJQACKAAAAAAAAAEoAlBFAAACUAASgAAAgoACCgAlQoABCgAAAAAAAAAAAAAAAAAAAAAlAAAAAAAQqUEKAAAAABLBQlABKABCgAAAAAlQUAAAAAAAAAAAAAAACUAAAAAAAAAAAEKlAAAAAAAAAAAAAAAAAJQASgAAAAAAAAAAlAAAAAAAAAACUAAEKlIoAAAAAEKAAAAAAAAAAAAAAAAAAAAAAlAACUAAAAEKQoACUIKCUEoAAAAAJQAlBCgAAAAASgAAAAAAlAAAAAACUARQAAAAAAAAgsoAAAAEKAAAAAQoAAAEoAAAShKAAAAAAAAAAAAACUAAAAAAASgAAAAAAAAAAAAAAAAAAAAAAAgoAAEoAAAAAAAASgAAAAAAAAAAAAAAAAAAAAAgUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEoAAAEKCUAJQSgAAAACUAEoAAAAAAlQoIlBC3EZMQsFSGSQyY0qUoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJQASwsoAASiUAAAAAAAEolAACAiiLCVSKIoigBZQQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIoAAAAAAEKAAAAAAAAAAAAAAAAABKAAAAP/8QAAv/aAAwDAQACAAMAAAAhBDDBDDDPPLjP/wDz57/3+/8A/wD/AP8A/wD/AP8APvffvf8Aj/zPDDLDDBDDDHBBBNJFZ11d9999DDDLDL3/ADz/AO88/wD/AP8A/wD/AP8A/wD/AP8Av9+9cMdvMcOMMMMsEMMMMEEEEEkE3HX1333332AMMOd8/wD7/wD/AP8A/wD/AP8A/wD/AP8A/wD9/wDf/MfsMNMMMOMMEEkEMkEMEENWUXWX33333z2zywkcMcs/9+//AP8A/wD/AL/zfz33v3zDDjDBjDDDjTBBBBBBhBxhl9tBR999t99994901E4AL/8A/wD/AP8A/wD/AP8A8+z8/wBsMMMtMPOMEsMMMkGEEEUGEE0EkmUP1n3n33n33zzCxw2EDkJ//wD/AP8A/P8A/fDLDDTL7DDDBBFBBBBNJFFFFJFJFRFJNJNBRNV9999999xd15YwAAgA/wD/APvf9fs8sMOMMHPIEUoGX8EWqR/h/wDNL1oemioSRb9S9MGxi98Y84w4giEAAAAA/wC/+520yw0wwwQQfdVXQZrbffaT/CN8XLdetqfOPvXfUsqFvL/vXOIMQAoCAhgggv8A/eMsOMEEEMEk1mX365V3Xn02E3zzEngn15a7WoUHn3wpl7FWXxAACAIIIIqIIIIOMNMMMEU10X0nnhm1KH0FqktJ35VqXkEGCEKn0L1SHInx+ZUBkYAKYIIIYJaYYZoOMMEUEE3133333132whzRQAwwCyBIKAAjVTDoYpICooIBIKIIIIoIJJoL66oYKIYMEEE0FXn233333333jniDjHBBCACAIYAAIAIIAYIIIIIIIIIIIIJKJLIIb5o74oYUEl323331n3zj3CQgKVIpVJ0IVbEMmFIEJY0IL9FKZUKGEoJZoIIY4JbL647b77o0kl23333X331CACXApkIEYIHOpUI3la4EIIUopcIKFErUkIJIIZLLbL7775r7744U113333323wwgAQRAJEI1Loa4d/KGmLaFoIUoIVKqlG5I0lILLJq5aJ677q65774X333z3nXzziwgjThALUIU24ooLGrEFUJ0noHWbXlx24VEnKLI6464Zq6777b7z7z333333T1DSwAgAIIJIEIIIoYoIJJ4p777774777777Z6575777777r77b7777zz632zzzzxLA4DSgIAIIIIIoaIIIILJp65Z4a7pZ4Zb6Yrb4r5b677L777r7777zjzz2zzT3CJIJKDAAIKIKIIIoIIIIpKL6bbIKa67p77rr77b7r7656577z7777z7zzzz1yziAoIIoIIIIIIKIIILJrIJKpLKrb647a7q75oI7r7r7b777r7777z7zwzxzwyDHXBjYoI4IIoIKIIKIIIIYIIIII56qLrb7Y777b7rrbKJ77777777zz7zzzzzzzDzywKoIKA6IIYIIIIIIIKJLYYaoJoYII677q6h4pJoLo7Rrrb7zzzz7zzTTzhzzjCzxKIqIYIJILIIIJIIYIIIIKIIaJa46Z7L7h7yoILTz6676a7b67zyzzzzziwzzzzwIIIJIIIKKJIYIIIIobIIIoIaKKK7JYbyZq6apII477LL6YILbzxwzzzTzhzzHznQIIIoIIIKIIJYoIJoIIIYYKIIIKaI4b7Kx6xqhpYaYZpb64ZrzgzzyzzzxzxyzzzwIIIIooIIIIIIIIIIoJIIIIIIJaKJIKJarb76boJJIY7I6rr77zCTzzzzzxzzGxz0IIIIIIIIIIIIIIIIIIIIIY4IIYI4oLLDjzjqxzwJJILpY46IZyxzzzzzzzzDzzz0o4YoIooYYIIIIIIIIIIIIJIaKIIJLIIZoiqKIqKAIIII4oKTxibzzzzzzzzzxHSi545a744roIIIooIoIIIIKIIIIIKIZKI5oaoYIIgIIaKIILIZBADTzzzzzzziVEVWoI77jCJ4oILYoJoIIIIoKoIYIIIII4ILIIooIIYIIZIIIoIJKIJzKzzzzxH2nQiHw567wqqIIoIIKIYLaqZb7777aIpII4oIIoJIII4JY444o6564YpKDDzzzzzlzTwnzzzyzzyqYIIIKbr77b7rbLrb7u4L7YJoIIIYKY57rbrrLJLJJb4oISLDzzw3kl3zzyzzzxxqIoIJJ7rKpEFGH0U81Jb7774YYIIoI57oM98HHH12E0PY4IaTzzyyEGEXzyxzzzyjBIIb7oNa/e4aCkcFnG0tbb7oIooY74odnBb8K9h3bnE/K44Dzzz3301nzzzzyzRAIILq67EAFZSo2m4ZWH2UNP5o56Z6rI8E2kHBkTHXEiq2Xo5LTzzzEHEvzzzzzTygIJIc8OJmnKEb9laR++uX01f7bbr6ofyN+81LbU6NDzf8AfZauQ088hJVD888898oACO6W7UrO5B1NfP2aqx4illP+qu++jZ0dbunlVlxhBXZzl5t2KE08JdFJx99988kICqGZfdl0N2i5uMxKOeYpSBNW2a+iXEiBRnNBsOa+Katn00Byuw899hVNlZ9488gAGq4wrGUy1GlYRnYyqkxwE1VS2++KdxCL+u8JNUViHiV+toKd+IU8t1DrBB19588gWBzHLTxeEX9hCb00TDlP3qZhe+qPasX6Cb5/lZ1r6GgWhlYB6gc991DDDDd119sI+JR451+XWI1BBXDsMWv9X2B5W+6l8BvxZJLrwweKpyO1uVX5CoM99jjDDFBDd88Wu94fOqKBfdAbovsZu1l240Jp++WGg7qtlQnRqrBKBeGeKVMOCoU9tdDDDDNZ188AahYH+yr913fwdDscwfSFoYBq6uKlbcTIx4qb7+AizNJ2jPU+joE895DDDDLD9d8oyJ3Uy+JuZjv8hb7iS2iaEYZC++qX1sPlRu9nNLnpXUJrw9mFegU87LDDDTHLX98IeSnjAOZeADx9yIsFANO1z69Kee6dFAUQS60dbXPgrQgCaVHtOoc9HDDDDDDDf98oWfO3daKj62DikCMm7ICR731yu+uTJffxFtu+b7vYeToIWa/x2QcPDDDDDDDDT99oUqZZvq2KKyIlGq9F2Gp2M/ZW+62XVK9VUeCuhmHSWso+JucNec9zLDDDDDDDD918QuxrIfQNyHdr+KOP/qPnmNia+yuCZ23lvmZkN0kVzZpBRf6ToU9bjDDDLDDDDLx8gQqpyS6dK9Rt6mUNFj3GxJe+ymu6t14ytjmByre3wiwKsUJqoU8PDDDD7rDHDTjd8QmevnYTwlphV6R+KzWpbe+AAQyu3db8gBqhXHa42uuypnj+gd7jDDDDDDrLLDD19IUKB2DHirDW/pKWI0RYWeyAAAAy+6Z/1Hl27KC0f4wBPtGwc8DPDDTHzznDDDDT1Moiad7nZDcZ1AiYg71CaqAEIIECWuXdifhXAonwZqhbliwU9/DDDDP3vLXHDDDHT9sg2q1avH35VvvTmJ6egAAkoM8AASu3tq8eesyKqgCxq+Ac9rDDTDHP/X7vvDDDjz98A0ad7bG4OrUk5qWuAI40988MAAWq5C8OlFhaxvW9CgU9jDDDDDT/AP8A/wD/AP7wyw08+TAIqy1JfwpM5jbrgAPPPPPPLCAEvtcQXUlisbhIQvhPaQwww0w0+/8A/wD/AP3/AM+MMPP3hBZ8oZHnUcbELwADz2HX1XzgAB75H7LBXYIQB0e5T2kMMcN/f/f3/wD/AP8A+9usMMN+wR7QIdndWcIG/wCAU89tjj998IA2SNIrEBP+8Yx3qU9jDDDDH/8A/wD33/8A/wDb33wxw9/BsY0u5qLmLG1VqNPbT6wy/fPAFjcwQpJxN0D93RlOwww0xz//AH/3333333/88MPei8nFj8LQyiAh2KYD33+sMPX3wD0h6s+tgVJy1yXKj2sMc9f9/wD/APfd/ff/APe/sMPjn9Y9Y0HOhO817VojT2MMNfX3wBeJwIG2YbflvF5kpS0MMNf/AP8Af/ffff8A/wD/AP5ywygMRR3HypHi4ilxzVlNBx6w+fcL5YrUiZRpgCvHB1xqPQwx+/8A33333333/wDrX/DD8In5lKkucdU3EgANaY09LDZZ8MdlYqEqChN7KyMBwROVrDz7/wDffffffff/AO98PNfmZ4Bzh8Ze6hSSe8YehT39MM+xAhTRf9O6fxAUmVgsaJzsNNP/AP8Afffff/ff/wCsMNcl3g3+9rFvCdEOAF7kLTwM8N3go7dkgqDiZKofytPrIoi0MPO//wB9899999//ADww1+pwxXlWW0Od0/bPPpTvKYw8/aKhgcjWCEeznmjVa+3HaPY0/wD/AN989999t/8A/wA8cN+t6gWhZiAuCenSbFoqjwMOvOWwJw0iKekrg87rebOKDWhGMff3333333333/8A7zD/AHDxMp2ZtstcIWAfz+oPGywx3bFPefbz9B+bPTvVhEPs+PQ9z/8A333333333328sNdzX0Pmp8fnyX6CaCEbDnsMMNWxQb6gk3lXBzI7ccEve5CsPf8A99999989999//vDf4+atL+YM3nk15vWRIcjDDDDP8w65EWKGA9GCEbSEsN6dDXf/APffPfffffffffX6w7RHeLDn056Ri+8jdgPY0www09TNh8gTaaUIlnXEAAZnOw3/AP333X3z3333333/APrDToSlEn6a5hAVKFqk1DDPLjDDT9Mm977shWmOLRsBGg5DHf8A/wD3z31333333333+8NO1gqWvzc+UrmcoTxmMf8A/XnDDT9YuuFGp/IL0a1Ok5DDH/8AfffffTPffffdbfff/wAMPezB5t0kUcbQz2sPfN+89+8MNP3yb5O1lsVlZQzwsf8A/wD/AH333zznDDj23zxj3338sPO+xjDDCx38MMMP/wD/AP7/AP32sMNfwxzAIJKwzHOMdff/AN9/8448Mc4Y88899999fvLDDDz9/wA4wwwz3/8A33333332+OOsNOPPVPOMMMMP/wD999t489s90Y08448s8889999/frLPDDnPdP8Affffffffffffbfz8wywwwzy3z3//AH333zzzRjDzAAADiATTXz33z3333333333333333333zz333X33333/AP8A/wD3333331zyyhyiwTRSgQQiTBBSwxjzzz3X333333n3n3zzjzzz33izV333333333333331wz1DQCQgBAgAAABSDBBzxDzzxzjzzz333yxzxxDTjTTzz3iT3zz333333333X332xjABDDSRAAwBAAABAAACQACAzzzjxzwTyQhQxDBSjDgQDDBxyzwTz33zzzzzzzxxRiACCBQxQBwwAgAAAAADRAyjQDDiDBzywzSgAzCyBBDhDRyBzzzDzyzzjzDTjDjRiAAAwjDSAAACABAigAAADBDDAgBBDCCDgAACDyzRzwgRDzDCTzizzChTxzyzRSwhDACAADCAgAgAAAAAAAABCAAwAAAAAwjDAAyQABgDgAAARgAASyBCzyBAAAABDzAAAAgQAgACQAAAAAAAAAggACAAAAAQgABASAAABQAjTgASBDiwjzThySwgBgDQAACDAQBABQBBAAAAxwAAAAAAQAAAAAAAAAAiCAAABQAAAAAQCAAjATgBCDCRAAQRDBjCiCCAABAAAAAAAAAAAAAAQAAAAAAAAAAAAwAABAQAAADCQgAwgwBDAwAgwgAAgAgQAAAAAAAQAAAAACgAAAAAACAgAABAADAAAAAAQAAAQAAAAAAASAQhAgAAAAgAAiAQAAAgAAAgAAAAAAAAAAAAAAAAQgQAAAwAAAAAAgADAAAAAAAAABACBgAAAgABAAAAwAAwACQAAQAAAAAAAAAAAAAAAAAAAAACAAAAAAAQgQAAAAABSCABAAQAAAAACSAAAAAAAAAAAAAAAAgAAAAA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3FKyCc0s8848808gS2p10i6wOWqagfmmnPjdTsbxpFBXyE5wXpPvvsg6lq5ZtvZOp1KS08c88890408iKS+dOFWwBEBly+OUu+66hCh99FBNqYf1Ru2Mn0BVvN+WbOjnBKGC88988888884AAiWh7UoDqM7ZxEloPwav8fls85vR3+2EGseapIJI0UV7dXCZMiGMU40898848408iKW+5K3ZbHVhpmkICWjwHBRy2e+FRrgTq/We6YR6sf8A2YdEzeoggtPfNDCHPPPPPPEsunf4D4j47ghJDWE0Ak/eggqmvrUa1DxQUMNZrRZLt4ExfugjDBDPODfPPPPNLKGAoviZWvL8Djn8F8Aj6dyjqkuogvr3b2N//MgU0UocEhjWwkjtPPPPfeMcefLPfWePAAtv8TXlIDDMr3QRXvghigkggAFryVbmkCNkxoFg8ZeqigpPBveefT3eWfffdPPHCIktvr2cTzUZVXfsogkBPMAFMAEnnhgUYQR4caX/AL74IIzzSzH3y3zVnX3nn23333xAggKJbbK45rKjZizDyzzghhgwwxgLI76Z577LaLKIIQzTz333VnH/ADDDD7jH309s8988MEAAIAAkY4888888s99888wAoQYECCCGMgAAI0cV9tpdptF1VrHHLnzTXtNZ9998wscsIU84848997999885t0M48Mc0MIAEc4ck8dN8R1BlJBRJDDTDXjzTf9R9/wD3efffcPPPbXfXUde9dfffOZdPffPPLPPPKPBPPPLWcQUcdZ0wzQ0www0www5w04zff+/3fRfZy1TU8168+xw8cXXbfRffHPfffffdfXVWYY44VT1w3zw2ywwwww90z69Q8+YcXf7z96wz87Y00eU9XY3ffcffbfefcdecedWYQwzS8dYww84w0y6wwww8088Sw00844+www4/793/AMsdP3HOf3m33Ote13+3Ve0tPMOMMPOMsMsMMMMMMMMNOMM8MMMMM8vPMM+cMNsPkMMMdkMEe+NG/wDhTDBDDT9zDDDLPLLDDnDDDDDDDDDLLDDjDDDDHLDDTHjDDDXDL37DnjT5tL/37fnvLDbD3DDDhzHDTDXDTTDDDP8Axwwww0z484wwwwwwwy44www1wwwwwzw4wy8x+Q06850wxx08286444ww0wwwwwwww8w4wwxw0wwwwwwwwwwzwww0xyxw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",
      link: "/catalog/earrings",
      size: "large",
      discount: "25% OFF",
    },
    {
      id: "rings",
      title: "Diamond Rings",
      subtitle: "Symbols of eternal love",
      image:'/images/1_20260523_172728_0000.png',
      link: "/catalog/rings",
      size: "medium",
      discount: "30% OFF",
    },
    {
      id: "chains",
      title: "Gold Chains",
      subtitle: "Perfect for everyday elegance",
      image:
        "/images/1775903066309.png",
      link: "/catalog/chains",
      size: "medium",
      discount: "20% OFF",
    },
    {
      id: "necklaces",
      title: "Statement Necklaces",
      subtitle: "Make a bold impression",
      image:
        "/images/Dark Vintage Luxury Perfume Product Advertisement Instagram Post_20260513_174217_0000.png",
      link: "/catalog/necklaces",
      size: "large",
      discount: "35% OFF",
    },
    {
      id: "bangles",
      title: "Designer Bangles",
      subtitle: "Traditional meets modern",
      image:
        "/images/1_20260218_172614_0000.png",
      link: "/catalog/bangles",
      size: "medium",
      discount: "28% OFF",
    },
    {
      id: "pendants",
      title: "Elegant Pendants",
      subtitle: "Delicate beauty for every day",
      image:
        "/images/IMG_20260411_163355.jpg.jpeg",
      link: "/catalog/pendants",
      size: "medium",
      discount: "22% OFF",
    },
  ];
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Live Rates Section - Desktop */}
      <section className="hidden md:block bg-gray-50 dark:bg-gray-800 py-4 border-b border-rose-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-rose-100 dark:bg-gray-800/90 dark:border-gray-700"
            >
              <div className="flex items-center gap-6">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                    className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg"
                  ></motion.div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Live Rates
                  </span>
                </motion.div>

                <div className="flex items-center gap-6">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-500 font-medium dark:text-gray-400">
                        Gold (24K)
                      </div>
                      <motion.div
                        key={`gold-${rates.gold}`}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold text-amber-600"
                      >
                        ₹{rates.gold}
                        <span className="text-sm font-normal">/10gm</span>
                      </motion.div>
                    </div>
                    {rates.previousGold !== undefined &&
                      rates.gold !== rates.previousGold &&
                      (rates.gold > rates.previousGold ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ))}
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="w-px h-8 bg-gray-200 dark:bg-gray-700"
                  ></motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-500 font-medium dark:text-gray-400">
                        Silver
                      </div>
                      <motion.div
                        key={`silver-${rates.silver}`}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold text-neutral-400 dark:text-gray-400"
                      >
                        ₹{rates.silver}
                        <span className="text-sm font-normal">/1kg</span>
                      </motion.div>
                    </div>
                    {rates.previousSilver !== undefined &&
                      rates.silver !== rates.previousSilver &&
                      (rates.silver > rates.previousSilver ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ))}
                  </motion.div>
                </div>

                {hasMounted && (
                  <motion.div
                    variants={itemVariants}
                    className="text-xs text-gray-400 dark:text-gray-500"
                  >
                    Updated:{" "}
                    {new Date(rates.lastUpdated).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Rates Section - Mobile */}
      <section className="block md:hidden bg-gray-50 dark:bg-gray-800 py-4">
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
      <section className="py-6 bg-white dark:bg-gray-900 overflow-hidden">
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
                        className={`flex-shrink-0 w-[80%] mx-[0.5%] h-full rounded-xl shadow-2xl bg-white dark:bg-gray-800 relative transition-all duration-700 ${isCurrent
                          ? "scale-100 opacity-100 z-20"
                          : "scale-90 opacity-70 z-10"
                          }`}
                      >
                        {/* Content inside each slide */}
                        {/* In the slider section, update the image rendering to handle videos */}
                        <div className="relative w-full h-full">
                          {item.image.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={item.image}
                              className="absolute inset-0 w-full h-full object-cover"
                              autoPlay
                              loop
                              playsInline
                              controls
                            />
                          ) : (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg?height=450&width=800&text=Image+Error";
                              }}
                            />
                          )}
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Hero Slider - Fixed Black Bars */}
          <div className="md:hidden">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 mx-2">
              {slidesToShow.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                    }`}
                >
                  <div className="relative w-full h-full">
                    {/* Updated for Full Cover - No Black Bars */}
                    {item.image.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video
                          src={item.image}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent dark:from-black/80" />

                      {/* Text Content */}
                      <div className="absolute z-20 bottom-8 left-4 right-4 text-white text-center">
                        <h1 className="text-2xl font-light leading-tight mb-2">{item.title}</h1>
                        <p className="text-sm mb-4 opacity-90 font-light">{item.subtitle}</p>
                        <a href={item.link || "#"}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          >
                            Shop Now
                          </Button>
                        </a>
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
                <a href={collections[0].link} className="group block">
                  <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                    <img
                      src={collections[0].image || "/placeholder.svg"}
                      alt={collections[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Floating Discount Badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
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
                            {/* <span className="text-2xl font-bold">
                              {collections[0].price}
                            </span> */}
                            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full px-6 py-2 transition-all duration-300">
                              Explore Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Medium Items */}
              {collections.slice(1, 3).map((collection, index) => (
                <div key={collection.id} className="col-span-4">
                  <a href={collection.link} className="group block">
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
                          {/* <span className="text-lg font-bold">
                            {collection.price}
                          </span> */}
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}

              {/* Bottom Row - Three Equal Items */}
              {collections.slice(3, 6).map((collection, index) => (
                <div key={collection.id} className="col-span-4">
                  <a href={collection.link} className="group block">
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
                          {/* <span className="text-lg font-bold">
                            {collection.price}
                          </span> */}
                          <Button
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-1 text-xs"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Collections Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {collections.map((collection, index) => (
                <a
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
                        {/* <span className="text-xl font-bold">
                          {collection.price}
                        </span> */}
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-2"
                        >
                          Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Collections Grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              {collections.map((collection, index) => (
                <a
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
                        {/* <span className="text-xl font-bold">
                          {collection.price}
                        </span> */}
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 rounded-full px-4 py-2"
                        >
                          Explore
                        </Button>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wider uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 dark:text-gray-200">
              Why{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
                BALKRUSHNA JEWELLERS
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              75+ years of trust, quality craftsmanship, and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Certified Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All our jewelry is hallmarked and certified for purity and
                authenticity
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Expert Craftsmanship
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Skilled artisans with decades of experience in traditional and
                modern designs
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Lifetime Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Free cleaning, maintenance, and repair services for all our
                jewelry
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Gem className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Custom Designs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Personalized jewelry designs tailored to your preferences and
                occasions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-semibold text-sm tracking-wider uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 dark:text-gray-200">
              Complete{" "}
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent font-medium">
                Jewelry Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              From traditional gold schemes to modern digital gold investments
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 * index }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.035,
                  boxShadow: "0 12px 32px rgba(16,128,64,0.11)",
                }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`bg-gradient-to-br w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg
                  ${index === 0
                      ? "from-amber-500 to-yellow-600"
                      : index === 1
                        ? "from-blue-500 to-indigo-600"
                        : "from-purple-500 to-pink-600"
                    }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <a href={item.link}>
                  <Button className={item.btnClasses}>{item.btn}</Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why BALKRUSHNA JEWELLERS Section (ENHANCED) --- */}
      {/* <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-6 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wider uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 dark:text-gray-200">
              Why{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-medium">
                BALKRUSHNA JEWELLERS
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              75+ years of trust, quality craftsmanship, and exceptional service
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 * index }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.11)",
                }}
                className="text-center group"
                viewport={{ once: true }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl
                  ${index === 0
                      ? "bg-gradient-to-br from-red-500 to-rose-600"
                      : index === 1
                        ? "bg-gradient-to-br from-amber-500 to-yellow-600"
                        : index === 2
                          ? "bg-gradient-to-br from-green-500 to-emerald-600"
                          : "bg-gradient-to-br from-purple-500 to-indigo-600"
                    }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* --- What Our Customers Say Section --- */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 px-6 py-2 rounded-full mb-6">
              <Heart className="h-5 w-5 text-rose-500" />
              <span className="text-rose-600 dark:text-rose-400 font-semibold text-sm tracking-wider uppercase">
                Customer Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 dark:text-gray-200">
              What Our{" "}
              <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-purple-500 bg-clip-text text-transparent font-medium">
                Customers Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              Real experiences from our valued customers across Gujarat
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 * index }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 32px rgba(240,10,80,0.09)",
                }}
                className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatarClass} rounded-full flex items-center justify-center text-white font-semibold mr-4`}
                  >
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.place}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}