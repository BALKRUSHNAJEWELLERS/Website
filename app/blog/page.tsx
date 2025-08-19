"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, ArrowRight, Mail, Menu, X, ChevronRight } from "lucide-react"
// Removed Next.js specific imports
// import Image from "next/image"
// import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Updated blogPosts with unique and content-related placeholder images
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
      image: "https://placehold.co/600x400/F5D76E/4A2C00?text=Digital+Gold", // Digital gold theme
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
      image: "https://placehold.co/600x400/C8E6C9/2E7D32?text=Diamond+Ring", // Diamond theme
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
      image: "https://placehold.co/600x400/A7C7E7/1A237E?text=Market+Trends", // Stock chart/trends theme
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
      image: "https://placehold.co/600x400/E8DED3/795548?text=Jewelry+Care", // Cleaning/care theme
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
      image: "https://placehold.co/600x400/FFECB3/FB8C00?text=Jewelry+Designs", // Design/style theme
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
      image: "https://placehold.co/600x400/FFF8DC/FFC107?text=Gold+Purity", // Gold purity theme
      readTime: "6 min read",
    },
     {
      id: "7",
      title: "The Allure of Antique Jewelry: A Timeless Investment",
      excerpt: "Delve into the history and investment potential of antique and vintage jewelry pieces.",
      content: "Full article content here...",
      author: "History Enthusiast",
      date: "2023-12-20",
      category: "Investment",
      image: "https://placehold.co/600x400/D2B48C/5C4033?text=Antique+Jewelry", // Antique style theme
      readTime: "8 min read",
    },
    {
      id: "8",
      title: "Ethical Sourcing: Ensuring Your Diamonds are Conflict-Free",
      excerpt: "Understand the importance of ethical sourcing in the diamond industry and how to choose responsibly.",
      content: "Full article content here...",
      author: "Ethical Sourcing Team",
      date: "2023-12-18",
      category: "Education",
      image: "https://placehold.co/600x400/A2D2FF/006BA6?text=Ethical+Diamonds", // Ethical theme
      readTime: "7 min read",
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-zinc-900 dark:to-zinc-800">
        {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-500/20 via-amber-300/30 to-amber-500/20 dark:from-amber-900/40 dark:via-amber-800/30 dark:to-amber-900/40 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/800x600/transparent/E5A82B?text=')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-400/30 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 dark:text-amber-100 mb-6"
          >
            BALKRUSHNA JWELLERS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-amber-800/90 dark:text-amber-200/90 max-w-3xl mx-auto"
          >
            Expert insights, tips, and trends from the world of jewelry
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filter */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Search */}
            <motion.div 
              variants={fadeIn}
              className="relative flex-1"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg border-2 border-amber-200 focus:border-amber-400 dark:border-amber-800 dark:bg-zinc-800 dark:text-white"
              />
            </motion.div>
          </div>

          {/* Categories */}
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 ${selectedCategory === category 
                    ? "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 border-0" 
                    : "border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/30"}`}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-8 flex items-center">
              <span className="w-8 h-px bg-amber-400 mr-4"></span>
              Featured Article
              <span className="w-8 h-px bg-amber-400 ml-4"></span>
            </h2>
            
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-2 border-amber-200 dark:border-amber-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                      // Fallback for image loading error
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Not+Found'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-amber-50 to-white dark:from-zinc-900 dark:to-zinc-800">
                    <Badge className="mb-4 bg-amber-500 hover:bg-amber-600 text-white">{filteredPosts[0].category}</Badge>
                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">{filteredPosts[0].title}</h3>
                    <p className="text-amber-800/80 dark:text-amber-200/80 mb-6">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-amber-700/80 dark:text-amber-300/80">
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
                      <a href={`/blog/${filteredPosts[0].id}`}>
                        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                          <Button className="bg-amber-600 hover:bg-amber-700 group">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Slice from index 0 if no featured post, otherwise slice from index 1 */}
          {filteredPosts.slice(filteredPosts.length > 0 ? 1 : 0).map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn}
              custom={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border border-amber-200 dark:border-amber-800 h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    // Fallback for image loading error
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/CCCCCC/FFFFFF?text=Image+Not+Found'; }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500/90 hover:bg-amber-600 text-white">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-amber-800/80 dark:text-amber-200/80 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-amber-700/80 dark:text-amber-300/80 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-200 dark:border-amber-800">
                    <span className="text-sm text-amber-600 dark:text-amber-400">{post.readTime}</span>
                    <a href={`/blog/${post.id}`}>
                      <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm" className="text-amber-600 dark:text-amber-400 group p-0 hover:bg-transparent">
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-amber-500" />
            </div>
            <p className="text-xl text-amber-800/80 dark:text-amber-200/80 mb-6">No articles found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Newsletter Signup (Placeholder for now) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-24 mb-16 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-zinc-700 dark:to-zinc-800 p-8 rounded-lg shadow-inner flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">Stay Updated!</h3>
            <p className="text-amber-800 dark:text-amber-200 text-lg">Subscribe to our newsletter for the latest insights.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-md border-amber-300 dark:border-amber-700 focus:ring-amber-500 focus:border-amber-500 dark:bg-zinc-900 dark:text-white"
            />
            <Button className="bg-amber-600 hover:bg-amber-700 py-3 px-6 rounded-md shadow-lg flex items-center justify-center gap-2">
              Subscribe <Mail className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
