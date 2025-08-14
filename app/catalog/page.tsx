"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  image?: string;
  rating?: number;
  reviews?: number;
  metal?: string;
  purity?: string;
  weight?: string;
  description?: string;
  price?: number; // Assuming price might be available for sorting/display
  // category-specific fields from your original code
  style?: string;
  accentStones?: string;
  diamondShape?: string;
  color?: string;
  size?: string;
  priceRange?: string; // For filtering
  [key: string]: any;
}

// Global category list from your code
const categories = [
  { value: "all", label: "All Collections" },
  { value: "Ring", label: "Ring" },
  { value: "Necklaces", label: "Necklaces" },
  { value: "Earring", label: "Earring" },
  { value: "Bracelets", label: "Bracelets" },
  { value: "Pendants", label: "Pendants" },
];

// Your original category-specific filter definitions
const categoryFilterDefinitions: Record<
  string,
  Record<string, { label: string; options: string[] }>
> = {
  all: {
    metal: {
      label: "Metal",
      options: ["Gold", "Silver", "Platinum", "Rose Gold"],
    },
    purity: { label: "Purity", options: ["18K", "22K", "24K"] },
    priceRange: {
      label: "Price",
      options: ["< $500", "$500 - $1500", "> $1500"],
    },
  },
  Ring: {
    style: {
      label: "Style",
      options: ["Solitaire", "Pavé", "Halo", "Vintage"],
    },
    accentStones: {
      label: "Accent Stones",
      options: ["Lab Diamond", "Black Diamond", "Emerald", "None"],
    },
    diamondShape: {
      label: "Diamond Shape",
      options: ["Round", "Oval", "Princess", "Emerald"],
    },
    metal: {
      label: "Metal",
      options: ["White Gold", "Rose Gold", "Yellow Gold", "Platinum"],
    },
    priceRange: {
      label: "Price",
      options: ["< $500", "$500 - $1500", "> $1500"],
    },
  },
  Necklaces: {
    style: { label: "Style", options: ["Pendant", "Choker", "Long"] },
    metal: { label: "Metal", options: ["Gold", "Silver", "Platinum"] },
    color: { label: "Color", options: ["White", "Yellow", "Rose"] },
  },
  Earring: {
    style: { label: "Style", options: ["Stud", "Hoop", "Drop"] },
    metal: { label: "Metal", options: ["Gold", "Silver", "Platinum"] },
  },
  Bracelets: {
    style: { label: "Style", options: ["Bangle", "Chain", "Cuff"] },
    metal: { label: "Metal", options: ["Gold", "Silver", "Platinum"] },
  },
  Pendants: {
    style: { label: "Style", options: ["Iconic", "Minimal", "Statement"] },
    metal: { label: "Metal", options: ["Gold", "Silver", "Platinum"] },
  },
};

// A simple SVG icon for the star rating
const StarIcon = () => (
  <svg
    className="w-4 h-4 text-amber-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [filterSearch, setFilterSearch] = useState<Record<string, string>>({});

  // Fetch products from your API endpoint
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/products");
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);

        const initial: Record<string, Record<string, string[]>> = {};
        Object.keys(categoryFilterDefinitions).forEach((cat) => {
          initial[cat] = {};
          Object.keys(categoryFilterDefinitions[cat]).forEach((k) => {
            initial[cat][k] = [];
          });
        });
        setSelectedFilters(initial);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Your original helper functions for filtering
  const toggleFilter = (category: string, filterKey: string, value: string) => {
    setSelectedFilters((prev) => {
      const categoryFilters = { ...(prev[category] || {}) };
      const current = new Set(categoryFilters[filterKey] || []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      categoryFilters[filterKey] = Array.from(current);
      return { ...prev, [category]: categoryFilters };
    });
  };

  const clearCategoryFilters = (category: string) => {
    setSelectedFilters((prev) => {
      const copy = { ...prev };
      if (!copy[category]) return prev;
      Object.keys(copy[category]).forEach((k) => (copy[category][k] = []));
      return copy;
    });
  };

  const resetAll = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
    setSelectedFilters((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((cat) => {
        Object.keys(copy[cat]).forEach((k) => (copy[cat][k] = []));
      });
      return copy;
    });
  };

  const activeFiltersForCategory = useMemo(() => {
    return selectedFilters[selectedCategory] || {};
  }, [selectedFilters, selectedCategory]);

  // Your original main filtering logic
  useEffect(() => {
    let cur = [...products];

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      cur = cur.filter((p) => {
        return (
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
        );
      });
    }

    if (selectedCategory !== "all") {
      cur = cur.filter((p) => p.category === selectedCategory);
    }

    const defs =
      categoryFilterDefinitions[selectedCategory] ||
      categoryFilterDefinitions["all"];
    const selections = activeFiltersForCategory || {};

    Object.keys(defs || {}).forEach((filterKey) => {
      const picks: string[] = selections[filterKey] || [];
      if (picks.length === 0) return;

      cur = cur.filter((product) => {
        return Object.entries(selections).every(([filterKey, picks]) => {
          if (!picks || picks.length === 0) return true;
          const rawVal = (product[filterKey] || "").toString().toLowerCase();
          // Normalize filter values for case and basic format (strip spaces, optionally strip K)
          return picks.some((p) => {
            let filterVal = p.toLowerCase().replace(/\s+/g, "");
            let prodVal = rawVal.replace(/\s+/g, "");
            // Handle '22K' vs '22'
            filterVal = filterVal === "22k" ? "22" : filterVal;
            prodVal = prodVal === "22k" ? "22" : prodVal;
            return prodVal.includes(filterVal) || filterVal.includes(prodVal);
          });
        });
      });
    });

    cur.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "reviews":
          return (b.reviews || 0) - (a.reviews || 0);
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    setFilteredProducts(cur);
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedFilters,
    sortBy,
    activeFiltersForCategory,
  ]);

  const anyFilterActiveForCategory = useMemo(() => {
    const sel = selectedFilters[selectedCategory] || {};
    return Object.values(sel).some((arr) => arr && arr.length > 0);
  }, [selectedFilters, selectedCategory]);

  const getFilteredOptions = (category: string, key: string) => {
    const def =
      categoryFilterDefinitions[category] || categoryFilterDefinitions["all"];
    const opts = def[key]?.options || [];
    const q = (filterSearch[`${category}.${key}`] || "").trim().toLowerCase();
    if (!q) return opts;
    return opts.filter((o) => o.toLowerCase().includes(q));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-2/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md">
                  <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2853&auto=format&fit=crop"
          alt="Elegant jewelry on display"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-shadow">
              Balkrushna Jewellery
            </h1>
            <p className="mt-4 text-lg md:text-xl text-stone-200 max-w-2xl mx-auto text-shadow-sm">
              Modern craft, heirloom quality. Discover timeless pieces for every
              story.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <section className="top-6 z-30 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-xl border border-amber-100 p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            <div className="relative lg:col-span-1">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, style, metal..."
                className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-4 pr-10 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
              />
              <svg
                className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Popularity</option>
              </select>
              <button
                onClick={resetAll}
                className="w-full rounded-xl px-4 py-3 border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors sm:col-auto"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(
              categoryFilterDefinitions[selectedCategory] ||
                categoryFilterDefinitions["all"]
            ).map(([filterKey, def]) => (
              <div
                key={filterKey}
                className="bg-stone-100/50 rounded-lg p-3 border border-stone-200/60"
              >
                <h4 className="text-sm font-semibold text-stone-700 mb-2">
                  {def.label}
                </h4>
                <input
                  placeholder={`Search ${def.label}...`}
                  value={filterSearch[`${selectedCategory}.${filterKey}`] || ""}
                  onChange={(e) =>
                    setFilterSearch((s) => ({
                      ...s,
                      [`${selectedCategory}.${filterKey}`]: e.target.value,
                    }))
                  }
                  className="w-full border border-stone-300 rounded-md px-3 py-1.5 text-sm mb-2 focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                  {getFilteredOptions(selectedCategory, filterKey).map(
                    (opt) => {
                      const isActive = (
                        selectedFilters[selectedCategory]?.[filterKey] || []
                      ).includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            toggleFilter(selectedCategory, filterKey, opt)
                          }
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                            isActive
                              ? "bg-amber-500 text-white border-amber-500 font-semibold shadow-sm"
                              : "bg-white text-stone-600 border-stone-300 hover:border-amber-400 hover:text-amber-600"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </div>

          {anyFilterActiveForCategory && (
            <div className="mt-4 pt-4 border-t border-stone-200/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-stone-600 mr-2">
                  Active:
                </span>
                {Object.entries(activeFiltersForCategory).flatMap(
                  ([key, values]) =>
                    (values || []).map((val: string) => (
                      <button
                        key={`${key}-${val}`}
                        onClick={() => toggleFilter(selectedCategory, key, val)}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs border border-amber-200 hover:bg-amber-200 transition"
                      >
                        <span className="font-medium">{val}</span>
                        <span className="opacity-70 text-base">×</span>
                      </button>
                    ))
                )}
              </div>
              <button
                onClick={() => clearCategoryFilters(selectedCategory)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs border border-red-200 hover:bg-red-200 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="flex justify-end mb-4"></div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/50">
              <h3 className="text-2xl font-serif text-stone-800 mb-3">
                No Pieces Found
              </h3>
              <p className="text-stone-500 mb-6">
                Try adjusting your filters or reset to view the full collection.
              </p>
              <button
                onClick={resetAll}
                className="px-6 py-3 bg-amber-500 text-white rounded-full font-semibold shadow-md hover:bg-amber-600 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
             <section className="text-center mb-8 w-92">
                    <h2 className="inline-block pb-1 select-none text-amber-600 font-semibold tracking-wide text-5xl">
                      ≿━━━━༺❀༻━━━━≾ Collections ≿━━━━༺❀༻━━━━≾
                    </h2>
                  </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group bg-white dark:bg-stone-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl border border-amber-100 dark:border-stone-700 hover:border-amber-300 transition-all duration-300 flex flex-col"
                  style={{ minHeight: "320px", maxHeight: "370px" }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[1/1] overflow-hidden rounded-t-md bg-amber-50 dark:bg-stone-700">
                    <Image
                      src={
                        product.image ||
                        "https://placehold.co/400x400/f7f5f2/333333?text=Jewelry"
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {product.rating && product.rating >= 4.8 && (
                      <div className="absolute top-2 left-2 bg-white/90 dark:bg-stone-900/80 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold shadow border border-amber-200 dark:border-stone-600">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  
                 

                  {/* Content */}
                  <div className="p-3 flex-grow flex flex-col bg-white dark:bg-stone-800">
                    {/* Category + Rating */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-stone-700 text-amber-700 text-[10px] font-semibold uppercase">
                        {product.category}
                      </span>
                      {product.rating && (
                        <span className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 font-medium">
                          <StarIcon />
                          <span>{product.rating}</span>
                        </span>
                      )}
                    </div>

                    {/* Name + Metal & Purity in one row */}
                    <div className="flex items-center justify-between flex-wrap gap-1 mb-3">
                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-600 transition">
                        {product.name}
                      </h3>
                      {/* <div className="text-sm font-semibold text-stone-700 dark:text-stone-300"> */}
                      {product.metal}
                      {product.purity && (
                        <span className="mx-1">•{product.purity}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-2 border-t border-stone-100 dark:border-stone-700 flex items-center justify-between">
                      <Link
                        href={`/product/${product.id}`}
                        className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-semibold shadow hover:bg-amber-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            </>
          )}
        </section>

        {/* <section className="mt-16 md:mt-24">
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-serif mb-3">Custom Creations</h2>
            <p className="mb-6 text-stone-300 max-w-2xl mx-auto">
              Have a unique vision? Our artisans can bring your dream piece to
              life. Contact us for a private consultation.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-stone-900 rounded-full font-bold hover:bg-stone-200 transition-colors shadow-lg"
            >
              Book an Appointment
            </Link>
          </div>
        </section> */}
      </main>
    </div>
  );
}
