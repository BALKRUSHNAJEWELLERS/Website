"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Zap,
  Phone,
  ChevronDown,
  ChevronUp,
  Award,
  Gem,
  Coins,
  HandCoins,
  Scale,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Custom gold gradient for text
const goldText = {
  background: "linear-gradient(135deg, #D4AF37 0%, #F9D423 50%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

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
  const keyFeatures: Feature[] = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Safety Guaranteed",
      description:
        "Your gold is securely vaulted with 24/7 monitoring and insurance coverage for complete peace of mind.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Instant Transactions",
      description:
        "Buy and sell Digital Gold instantly through our secure platform with real-time pricing.",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Growth Potential",
      description:
        "Benefit from gold's historical value appreciation with our flexible investment options.",
    },
    {
      icon: <Gem className="h-10 w-10" />,
      title: "Physical Redemption",
      description:
        "Convert your Digital Gold to exquisite 24K jewelry or coins at any Balkrushna showroom.",
    },
  ];

  const faqData = {
    buy: [
      {
        question: "What is Digital Gold?",
        answer:
          "Digital Gold is a modern way to invest in physical gold bullion stored securely on your behalf. Each gram you purchase corresponds to actual 24K gold in our vaults.",
      },
      {
        question: "How pure is the gold?",
        answer:
          "All Digital Gold is 99.99% pure 24 karat gold, certified and hallmarked by recognized authorities.",
      },
      {
        question: "What are the investment limits?",
        answer:
          "Start with just ₹500 or invest up to ₹5,00,000 per transaction. There's no upper limit to your total holdings.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "We charge only a minimal transparent fee that covers storage and insurance. No hidden costs.",
      },
    ],
    sell: [
      {
        question: "When can I sell my gold?",
        answer:
          "You can sell your holdings anytime after the initial 7-day cooling period for immediate liquidity.",
      },
      {
        question: "How are sale proceeds delivered?",
        answer:
          "Funds are transferred directly to your registered bank account within 1-2 business days.",
      },
      {
        question: "What are the tax implications?",
        answer:
          "GST is not applicable on sales. Capital gains tax may apply based on holding period - consult your tax advisor.",
      },
      {
        question: "Can I sell part of my holdings?",
        answer:
          "Yes, you can sell any fraction of your Digital Gold, down to 0.01 grams.",
      },
    ],
  };

  const [activeFaqTab, setActiveFaqTab] = useState<"buy" | "sell">("buy");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "917600093017";
    const fullMessage = `New Digital Gold Inquiry:\nName: ${inquiryName}\nEmail: ${inquiryEmail}\nMessage: ${inquiryMessage}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Luxurious color scheme
  const colors = {
    primary: "#D4AF37", // Gold
    secondary: "#996515", // Dark gold
    accent: "#C0A080", // Rose gold
    darkBg: "#1A1A1A",
    lightBg: "#F8F5F0",
    textDark: "#333333",
    textLight: "#F5F5F5",
  };

  return (
    <div className="min-h-screen font-inter bg-[#F8F5F0] dark:bg-[#1A1A1A] text-[#333333] dark:text-[#F5F5F5]">
      {/* Hero Section */}
      <motion.section
        className="relative py-28 md:py-36 rounded-b-3xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {/* Luxurious background with subtle overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611591437281-4608be122683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/80 via-[#D4AF37]/30 to-[#1A1A1A]/80"></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-7xl">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeInUp}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={fadeInUp}
            >
              <span style={goldText}>Invest in Digital Gold</span> <br />
              <span className="text-white">with Balkrushna Jewellery</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-white/90"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              The modern, secure way to own 24K pure gold with the trust of
              generations
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <a
                href="tel:+917600093017"
                className="inline-flex items-center justify-center rounded-full text-lg font-medium h-14 px-8 py-2 bg-[#D4AF37] hover:bg-[#C0A080] text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-white/50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call to Invest Now
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full text-lg font-medium h-14 px-8 py-2 border-2 border-white text-white hover:bg-white/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Explore Benefits
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* What is Digital Gold */}
      <motion.section
        id="about"
        className="py-20 bg-white dark:bg-[#222222]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center items-center p-8 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#D4AF37]/20 dark:from-[#333333] dark:to-[#996515]/30 shadow-xl hover:shadow-2xl transition-shadow duration-500"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkb0rGvEXK_lIMWw71VnKfepEfRhOXKmzWHlcIspvdEQds-OKTBSIBopbdyeP6niZoq8&usqp=CAU"
              alt="Gold Bar"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="flex items-center mb-4">
              <Coins className="h-8 w-8 text-[#D4AF37] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Digital Gold Investment
              </h2>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              At{" "}
              <span className="font-semibold text-[#D4AF37]">
                Balkrushna Jewellery
              </span>
              , we bridge tradition with innovation. Our Digital Gold platform
              combines the timeless value of gold with modern convenience and
              security.
            </p>

            <ul className="space-y-3">
              {[
                "24K pure gold stored in secure vaults",
                "Buy from ₹500, no upper limit",
                "Instant buy/sell at transparent rates",
                "Redeem as jewelry or coins anytime",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#D4AF37] mr-2">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        id="features"
        className="py-20 bg-gradient-to-b from-[#F5F0E6] to-[#E8DFC8] dark:from-[#222222] dark:to-[#1A1A1A]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <div className="inline-flex items-center justify-center bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 px-6 py-3 rounded-full mb-6">
              <Scale className="h-6 w-6 text-[#D4AF37] mr-2" />
              <span className="font-medium text-[#D4AF37]">WHY CHOOSE US</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Gold, Our Promise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine traditional gold investment wisdom with cutting-edge
              security and convenience.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
          >
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white dark:bg-[#252525] rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#D4AF37]/30"
                whileHover={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  scale: 1.02,
                }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    {React.cloneElement(
                      feature.icon as React.ReactElement<{
                        className?: string;
                      }>,
                      {
                        className:
                          "h-10 w-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300",
                      }
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQs Section */}
      <motion.section
        className="py-20 bg-white dark:bg-[#222222]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Questions Answered
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about investing in Digital Gold with
              Balkrushna.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div className="w-full lg:w-1/2" variants={fadeInUp}>
              <div className="flex w-full border border-gray-200 dark:border-[#333333] rounded-lg overflow-hidden mb-8">
                {(["buy", "sell"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveFaqTab(tab);
                      setOpenFAQIndex(null);
                    }}
                    className={`flex-1 py-4 font-semibold text-sm uppercase tracking-wider transition-colors duration-300 ${
                      activeFaqTab === tab
                        ? "bg-[#D4AF37] text-white"
                        : "bg-gray-100 dark:bg-[#333333] hover:bg-gray-200 dark:hover:bg-[#444444] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {tab === "buy" ? "Purchasing" : "Selling"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {faqData[activeFaqTab].map((faq, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                      openFAQIndex === index
                        ? "bg-[#F8F5F0] dark:bg-[#333333] shadow-lg"
                        : "bg-gray-50 dark:bg-[#252525] shadow-md hover:shadow-lg"
                    }`}
                    initial={false}
                    animate={{
                      backgroundColor:
                        openFAQIndex === index ? "#F8F5F0" : "#F5F5F5",
                      borderColor:
                        openFAQIndex === index ? "#D4AF37" : "transparent",
                    }}
                    whileHover={{
                      borderColor:
                        openFAQIndex !== index ? "#D4AF37/30" : "#D4AF37",
                    }}
                  >
                    <button
                      className="w-full flex justify-between items-center p-6 text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-semibold text-[#333333] dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <span className="flex-shrink-0 ml-4">
                        {openFAQIndex === index ? (
                          <ChevronUp className="h-5 w-5 text-[#D4AF37]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#D4AF37]" />
                        )}
                      </span>
                    </button>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: openFAQIndex === index ? 1 : 0,
                        height: openFAQIndex === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-700 dark:text-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-8 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#D4AF37]/20 dark:from-[#333333] dark:to-[#996515]/30 shadow-xl hover:shadow-2xl transition-all duration-500"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <img
                src={
                  activeFaqTab === "buy"
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHr-Gzhyu5vAdLi63X-2iAEJTQipovVpMiA&s"
                    : "https://cdn.prod.website-files.com/6000891868c08ec6ed8651e4/653ae8abd9b78b9129c84189_SellingGold.jpg"
                }
                alt={activeFaqTab === "buy" ? "Buying Gold" : "Selling Gold"}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        id="contact"
        className="py-20 bg-gradient-to-r from-[#F5F0E6] to-[#E8DFC8] dark:from-[#222222] dark:to-[#1A1A1A]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <div className="inline-flex items-center justify-center bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 px-6 py-3 rounded-full mb-6">
              <HandCoins className="h-6 w-6 text-[#D4AF37] mr-2" />
              <span className="font-medium text-[#D4AF37]">GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Gold Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? Our gold investment specialists are here to help.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleWhatsAppInquiry}
            className="bg-white dark:bg-[#252525] rounded-xl shadow-xl p-8 md:p-10 space-y-6"
            variants={fadeInUp}
            whileHover={{ y: -5 }}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-3 font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-[#444444] bg-white dark:bg-[#333333] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-3 font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-[#444444] bg-white dark:bg-[#333333] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-3 font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-[#444444] bg-white dark:bg-[#333333] focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#C0A080] text-white py-4 px-6 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <span>Send via WhatsApp</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </button>
          </motion.form>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-20 bg-gradient-to-b from-[#D4AF37] to-[#996515] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            className="inline-flex items-center justify-center bg-white/20 px-6 py-3 rounded-full mb-8"
            variants={fadeInUp}
          >
            <Award className="h-6 w-6 text-white mr-2" />
            <span className="font-medium">TRUSTED BY THOUSANDS</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            Secure Your Future with <br /> Digital Gold Today
          </motion.h2>

          <motion.p
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Join the smart investors who trust Balkrushna Jewellery for their
            gold investments.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <a
              href="tel:+917600093017"
              className="inline-flex items-center justify-center rounded-full text-lg font-medium h-14 px-8 py-2 bg-white text-[#996515] hover:bg-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now +91 76000 93017
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full text-lg font-medium h-14 px-8 py-2 border-2 border-white text-white hover:bg-white/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Get Personalized Advice
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
