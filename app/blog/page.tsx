"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Gold Investment Guide: Why Digital Gold is the Future",
      excerpt:
        "Discover the benefits of digital gold investment and how it compares to traditional gold buying methods.",
      content: "Full article content here...",
      author: "BALKRUSHNA Team",
      date: "2024-01-15",
      category: "Investment",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "How to Choose the Perfect Diamond Ring",
      excerpt: "A comprehensive guide to selecting the ideal diamond ring, covering the 4 Cs and more.",
      content: "Full article content here...",
      author: "Jewelry Expert",
      date: "2024-01-10",
      category: "Jewelry Guide",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Gold Price Trends: What to Expect in 2024",
      excerpt: "Analysis of current gold market trends and predictions for the upcoming year.",
      content: "Full article content here...",
      author: "Market Analyst",
      date: "2024-01-05",
      category: "Market Analysis",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Caring for Your Precious Jewelry: Maintenance Tips",
      excerpt: "Essential tips to keep your gold and diamond jewelry looking pristine for years to come.",
      content: "Full article content here...",
      author: "Care Specialist",
      date: "2024-01-01",
      category: "Care & Maintenance",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "4 min read",
    },
    {
      id: "5",
      title: "Traditional vs Modern Jewelry Designs: Finding Your Style",
      excerpt:
        "Explore the differences between traditional and contemporary jewelry designs to find your perfect style.",
      content: "Full article content here...",
      author: "Design Expert",
      date: "2023-12-28",
      category: "Design Trends",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "5 min read",
    },
    {
      id: "6",
      title: "Understanding Gold Purity: 18K vs 22K vs 24K",
      excerpt: "Learn about different gold purities and which one is best for different types of jewelry.",
      content: "Full article content here...",
      author: "Gold Expert",
      date: "2023-12-25",
      category: "Education",
      image: "/placeholder.svg?height=300&width=400",
      readTime: "6 min read",
    },
  ]

  const categories = [
    "all",
    "Investment",
    "Jewelry Guide",
    "Market Analysis",
    "Care & Maintenance",
    "Design Trends",
    "Education",
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jewelry Blog</h1>
          <p className="text-xl md:text-2xl opacity-90">Expert insights, tips, and trends from the world of jewelry</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={filteredPosts[0].image || "/placeholder.svg"}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <Badge className="mb-4 bg-orange-500">{filteredPosts[0].category}</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{filteredPosts[0].title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {filteredPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(filteredPosts[0].date).toLocaleDateString()}
                      </div>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                    <Link href={`/blog/${filteredPosts[0].id}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-orange-100 text-orange-800">{post.category}</Badge>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No articles found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16">
          
          <Card className="py-16 bg-gradient-to-r from-white via-yellow-100 to-white text-black">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-lg mb-6 opacity-90">
                Subscribe to our newsletter for the latest jewelry insights and trends
              </p>
              <div className="max-w-md mx-auto flex gap-4">
                <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900" />
                <Button className="bg-white text-orange-600 hover:bg-gray-100">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
