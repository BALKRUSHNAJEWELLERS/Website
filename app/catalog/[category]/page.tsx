"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  metal: string;
  purity: string;
  weight: string;
  description: string;
}

const categoryTitles: Record<string, string> = {
  rings: "Rings Collection",
  necklaces: "Necklaces Collection",
  earrings: "Earrings Collection",
  bracelets: "Bracelets Collection",
  pendants: "Pendants Collection",
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/admin/products");
        const data = await response.json();

        // Filter products by category
        const categoryProducts = data.filter(
          (product: Product) => product.category === category
        );
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Fallback to empty array on error
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Metal filter
    if (selectedMetal !== "all") {
      filtered = filtered.filter(
        (product) => product.metal.toLowerCase() === selectedMetal.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedMetal, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-6">
          <Link href="/catalog">
            <Button
              variant="outline"
              className="mb-4 rounded-full bg-transparent text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {categoryTitles[category] || "Collection"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {filteredProducts.length} {category} in this collection
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-0 shadow-sm overflow-hidden"
            >
            {/* Update the product image rendering in the category page */}
              <div className="relative overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  {product.image && product.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={product.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <CardContent className="p-3">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white text-center line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No {category} found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any {category} matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedMetal("all");
                }}
                className="rounded-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
