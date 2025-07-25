"use client";

import React, { useState } from "react";
import {
  Shield,
  TrendingUp,
  Zap,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Define interfaces for features and benefits for better type safety and readability
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function DigitalGoldPage() {
  // Key Features tailored to Balkrushna Jewellery's offerings
  const keyFeatures: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />, // Adjusted icon color for contrast
      title: "Safety Guaranty",
      description:
        "Your gold is safely kept with the company, ensuring maximum security for your investment.",
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />, // Adjusted icon color for contrast
      title: "Safely Buy and Sale",
      description:
        "Customers can securely buy and sell Digital Gold through Balkrushna Jewellery application, ensuring safe transactions every time.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />, // Adjusted icon color for contrast
      title: "Benefits from Lease",
      description:
        "Customers can lease their Digital Gold and receive an annual benefit of 3% extra weight added to their purchase quantity. This enhances the value of your investment over time.",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />, // Adjusted icon color for contrast
      title: "Easily Redeem with Physical Gold",
      description:
        "Customers can easily redeem their Digital Gold at any Balkrushna Jewellery showroom and receive a 24-karat pure gold coin.",
    },
  ];

  // FAQ data for different categories
  const faqData = {
    buy: [
      {
        question: "What is Digital Gold?",
        answer:
          "Digital Gold refers to the buying of gold through digital means. Customers have the option to purchase and sell their digital gold electronically without the need to visit the jeweler's showroom.",
      },
      {
        question: "What is the purity of Digital Gold?",
        answer:
          "Digital Gold offered by Balkrushna Jewellery is 24 karat pure gold.",
      },
      {
        question:
          "What is the Minimum & Maximum Value of Digital Gold I can buy?",
        answer:
          "You can buy Digital Gold online with a minimum investment of ₹500 and up to ₹5,00,000.",
      },
      {
        question: "Is GST levied at the time of purchase of Digital Gold?",
        answer:
          "Yes, GST is applicable as per government regulations at the time of purchase.",
      },
    ],
    sell: [
      {
        question: "Is there any Lock-in Period for the sale of Digital Gold?",
        answer:
          "Yes. Customers can sell Digital Gold only after 7 days of purchase.",
      },
      {
        question:
          "How long will it take to get the money credited to my bank account?",
        answer:
          "Typically, the money is credited to your bank account within 2-3 business days after the sale is confirmed.",
      },
      {
        question:
          "Is GST Levied at the time of selling Digital Gold by the Customer?",
        answer: "No, GST is not levied when you sell Digital Gold.",
      },
      {
        question: "Can I sell partial quantity of my Digital Gold?",
        answer:
          "Yes, you can sell any partial quantity of your Digital Gold holdings.",
      },
    ],
    lease: [
      {
        question: "What is benefit of giving gold on lease?",
        answer:
          "Customer earns 3% per year interest on weight of gold put on lease.",
      },
      {
        question: "Is there any minimum period to give digital gold on lease?",
        answer:
          "Yes, the minimum period to give digital gold on lease is 30 days.",
      },
      {
        question:
          "Can customer terminate lease before 365 days? And What will be repercussion of this?",
        answer:
          "Yes, a customer can terminate the lease before 365 days. However, the 3% annual benefit will be pro-rated based on the actual lease duration.",
      },
      {
        question: "Is my leased gold safe?",
        answer:
          "Absolutely, your leased gold remains securely stored and is fully insured.",
      },
    ],
  };

  const [activeFaqTab, setActiveFaqTab] = useState("buy");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // State for form inputs
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const GoldBarSVG = () => (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkb0rGvEXK_lIMWw71VnKfepEfRhOXKmzWHlcIspvdEQds-OKTBSIBopbdyeP6niZoq8&usqp=CAU"
      alt="Gold Bar"
      className="w-full h-auto"
    />
  );

  const tabImages: Record<string, string> = {
    buy: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHr-Gzhyu5vAdLi63X-2iAEJTQipovVpMiA&s",
    sell: "https://cdn.prod.website-files.com/6000891868c08ec6ed8651e4/653ae8abd9b78b9129c84189_SellingGold.jpg",
    lease:
      "https://www.thepurplemermaid.com/cdn/shop/products/gold-name-ring-with-diamonds_grande.jpg?v=1630764999",
  };

  const GoldBarImage = ({ src }: { src: string }) => (
    <img src={src} alt="Gold Bar" className="w-full h-full" />
  );

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const phoneNumber = "917600093017"; // Replace with YOUR_MOBILE_NUMBER (e.g., 919876543210 for India). DO NOT include '+' or '00'.
    
    // Construct the message with all form fields
    const fullMessage = 
      `Inquiry from Balkrushna Jewellery Website:\n` +
      `Name: ${inquiryName}\n` +
      `Email: ${inquiryEmail}\n` +
      `Message: ${inquiryMessage}`;
    
    // Encode the message for URL. Using encodeURIComponent is critical.
    const encodedMessage = encodeURIComponent(fullMessage);
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // --- Debugging Step (Check your browser's console) ---
    console.log("Generated WhatsApp URL:", whatsappUrl);
    console.log("Full Message being encoded:", fullMessage);
    // --- End Debugging Step ---

    // Open WhatsApp in a new tab. The user will still need to click 'Send' in WhatsApp.
    window.open(whatsappUrl, "_blank"); 
  };

  return (
    <div className="min-h-screen font-inter bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-yellow-900 py-20 transition-colors duration-500 rounded-b-3xl shadow-lg border-b border-yellow-300 dark:border-zinc-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Invest in{" "}
              <span className="text-orange-700 dark:text-yellow-400">
                Digital Gold
              </span>{" "}
              with Balkrushna Jewellery
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A convenient and secure way to invest in 24 karat pure gold,
              starting from just ₹500.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917600093017"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 py-2 bg-white text-orange-600 hover:bg-gray-100 shadow-lg transform hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call to Invest Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 py-2 border-2 border-white text-white hover:bg-white hover:text-orange-600 bg-transparent shadow-lg transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Digital Gold? Section */}
      <section className="py-16 bg-blue-50 dark:bg-zinc-900 border-b border-blue-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side: Gold Image */}
            <div className="flex justify-center items-center p-4 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-zinc-700 dark:to-yellow-800 shadow-xl">
              <GoldBarSVG />
            </div>
            {/* Right side: Text Description */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                What is Digital Gold?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Digital Gold is a convenient and secure way to invest in 24
                karat pure gold. At{" "}
                <span className="font-semibold text-orange-600 dark:text-yellow-400">
                  Balkrushna Jewellery
                </span>
                , you can buy Digital Gold online with a minimum investment of
                ₹500 and up to ₹5,00,000.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                When you buy Digital Gold, you invest online without needing to
                keep the physical gold with you. It’s a simple and safe
                investment option. Additionally, you can lease your Digital Gold
                on the{" "}
                <span className="font-semibold text-orange-600 dark:text-yellow-400">
                  Balkrushna Jewellery
                </span>{" "}
                application to receive an extra 3% gold weight added to your
                purchase quantity, making your investment even more valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-amber-50 dark:bg-gray-900 border-b border-amber-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the core advantages of investing in Digital Gold with
              Balkrushna Jewellery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50 dark:bg-zinc-900 border-b border-blue-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side: FAQ Tabs and Questions */}
            <div className="w-full md:w-1/2">
              {/* Tab Buttons as per image */}
              <div className="flex justify-start mb-8 space-x-4">
                <div className="grid grid-cols-3 w-full border border-gray-300 dark:border-zinc-600 rounded-lg overflow-hidden">
                  {["buy", "sell", "lease"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveFaqTab(tab);
                        setOpenFAQIndex(null);
                      }}
                      className={`flex-1 flex items-center justify-center py-3 text-base font-semibold transition-colors duration-300
                      ${
                        activeFaqTab === tab
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600"
                      }`}
                    >
                      {/* Icons similar to the image, if you have specific icon components for these */}
                      {tab === "buy" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a1.5 1.5 0 0 0 2.12 0l2.78-2.78c.27-.27.27-.72 0-.99L21.53 7.64a.75.75 0 0 0-1.06 0l-3.25 3.25a.75.75 0 0 1-1.06 0l-2.92-2.92a.75.75 0 0 0-1.06 0l-2.92 2.92a.75.75 0 0 1-1.06 0L5.47 3.84a.75.75 0 0 0-1.06 0L1.72 6.53c-.27.27-.27.72 0 .99l2.78 2.78a1.5 1.5 0 0 0 2.12 0l8.69-8.69Z" />
                          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.233a2.25 2.25 0 0 1-2.25 2.25H5.068a2.25 2.25 0 0 1-2.25-2.25V13.677c.03-.028.06-.056.091-.086L12 5.432Z" />
                        </svg>
                      )}
                      {tab === "sell" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L12 4.06l-3.97 3.97a.75.75 0 0 1-1.06-1.06l4.5-4.5Z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M12 2.25a.75.75 0 0 1 .75.75v16.19l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {tab === "lease" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 5.625c0-1.15.93-2.08 2.08-2.08H5.25a.75.75 0 0 0 0-1.5H3.58C1.65 1.995 0 3.65 0 5.625v12.75C0 20.35 1.65 22 3.58 22h16.84c1.93 0 3.58-1.65 3.58-3.625V5.625c0-1.975-1.65-3.625-3.58-3.625h-1.67a.75.75 0 0 0 0 1.5h1.67c1.15 0 2.08.93 2.08 2.08v12.75c0 1.15-.93 2.08-2.08 2.08H3.58c-1.15 0-2.08-.93-2.08-2.08V5.625ZM8.75 14.25a.75.75 0 0 1-.75-.75V8.25a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-.75.75ZM15.25 14.25a.75.75 0 0 1-.75-.75V8.25a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-.75.75Z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M12 11.25a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Questions */}
              <div className="space-y-4">
                {faqData[activeFaqTab as keyof typeof faqData].map(
                  (faq, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        {openFAQIndex === index ? (
                          <ChevronUp className="h-6 w-6 text-orange-500" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-orange-500" />
                        )}
                      </div>
                      {openFAQIndex === index && (
                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right side: Dynamic Gold Image */}
            <div className="hidden md:flex w-full md:w-1/2 justify-center items-center p-4 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-zinc-700 dark:to-yellow-800 shadow-xl">
              <GoldBarImage src={tabImages[activeFaqTab]} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Form Section */}
      <section className="py-16 bg-orange-50 dark:bg-gray-900 border-b border-orange-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Inquiry
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? Fill out the form below and we'll get back to you
              shortly.
            </p>
          </div>

          <form
            onSubmit={handleWhatsAppInquiry}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-8 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                placeholder="John Doe"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required // Make name required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                placeholder="john.doe@example.com"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required // Make email required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                placeholder="I'd like to know more about..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                required // Make message required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300 shadow-md transform hover:scale-105"
            >
              Send Inquiry via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Trust Indicators Section */}

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-white via-yellow-100 to-white text-black dark:from-zinc-800 dark:via-yellow-900 dark:to-zinc-800 dark:text-white rounded-t-3xl shadow-lg">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Digital Gold Journey Today!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of smart investors who choose Balkrushna Jewellery
            for secure and convenient digital gold investment.
          </p>
          <a
            href="tel:+917600093017"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 py-2 bg-white text-orange-600 hover:bg-gray-100 shadow-lg transform hover:scale-105"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now for Invest
          </a>
        </div>
      </section>
    </div>
  );
}