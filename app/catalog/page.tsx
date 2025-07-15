"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  metal: string
  purity: string
  weight: string
  inStock: boolean
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMetal, setSelectedMetal] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Mock data - in real app, this would come from API
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products") // ✅ new // ← replace with your actual API route
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  fetchProducts()
}, [])
  // Filter and search logic
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Metal filter
    if (selectedMetal !== "all") {
      filtered = filtered.filter((product) => product.metal === selectedMetal)
    }

    // Price range filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number)
      filtered = filtered.filter((product) => {
        if (max) {
          return product.price >= min && product.price <= max
        } else {
          return product.price >= min
        }
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedMetal, priceRange, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Jewelry Catalog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Discover our exquisite collection of premium jewelry</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jewelry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="rings">Rings</SelectItem>
              <SelectItem value="necklaces">Necklaces</SelectItem>
              <SelectItem value="earrings">Earrings</SelectItem>
              <SelectItem value="bracelets">Bracelets</SelectItem>
              <SelectItem value="pendants">Pendants</SelectItem>
            </SelectContent>
          </Select>

          {/* Metal */}
          <Select value={selectedMetal} onValueChange={setSelectedMetal}>
            <SelectTrigger>
              <SelectValue placeholder="Metal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metals</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-10000">Under ₹10,000</SelectItem>
              <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
              <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
              <SelectItem value="50000">Above ₹50,000</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-red-500 text-white">
                    Out of Stock
                  </Badge>
                </div>
              )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{product.metal}</Badge>
                <Badge variant="outline">{product.purity}</Badge>
                <Badge variant="outline">{product.weight}</Badge>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-orange-600">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No products found matching your criteria</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedMetal("all")
              setPriceRange("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
