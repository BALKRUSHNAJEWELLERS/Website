"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90">Get in touch with BALKRUSHNA JEWELLERS</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Cards */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <a href="tel:+917600093017" className="text-orange-600 hover:text-orange-700 text-lg font-medium">
                        +91 7600 093 017
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <a href="mailto:info@balkrushnajewellers.com" className="text-orange-600 hover:text-orange-700">
                        info@balkrushnajewellers.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Gandhi Rd, Ganotri Society,  
                        <br />
                        Himatnagar, Gujarat 380001
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Store Hours</h3>
                      <div className="text-gray-600 dark:text-gray-300 space-y-1">
                        <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                        <p>Sunday: 11:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button size="icon" variant="outline" className="hover:bg-blue-600 hover:text-white bg-transparent">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="hover:bg-pink-600 hover:text-white bg-transparent">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="hover:bg-blue-400 hover:text-white bg-transparent">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9234567890123!2d72.9608747!3d23.598162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM1JzUzLjQiTiA3MsKwNTcnMzkuMSJF!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BALKRUSHNA JEWELLERS Location"
                  ></iframe>

                  {/* Clickable overlay for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => window.open(`https://www.google.com/maps?q=23.598162,72.9608747`, "_blank")}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => window.open(`https://www.google.com/maps?q=23.598162,72.9608747`, "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white p-4 z-40 md:hidden">
        <div className="flex justify-center">
          <a href="tel:+917600093017">
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
