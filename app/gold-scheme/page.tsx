"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Info,
  TrendingUp,
  Banknote,
  Gem,
} from "lucide-react";

import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { defaultGoldSchemes } from "@/lib/default-gold-schemes";

interface Scheme {
  id: string;
  name: string;
  duration: string;
  monthlyAmount: string;
  totalAmount: string;
  goldValue: string;
  discount: string;
  features: string[];
  color: string;
  popular: boolean;
  rules: string;
  image?: string;
}

export default function GoldSchemeSingleCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>(defaultGoldSchemes);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch("/api/admin/gold-schemes", {
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          setSchemes(data.length > 0 ? data : defaultGoldSchemes);
        }
      } catch (error) {
        console.error("Failed to fetch gold schemes:", error);
        setSchemes(defaultGoldSchemes);
      }
    };

    fetchSchemes();
  }, []);

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    if (element) {
      const printHiddenElements = element.querySelectorAll(".print\\:hidden");
      printHiddenElements.forEach(
        (el) => ((el as HTMLElement).style.display = "none")
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("gold_scheme_details.pdf");

      printHiddenElements.forEach(
        (el) => ((el as HTMLElement).style.display = "")
      );
    }
  };

  return (
    <div
      ref={componentRef}
      className="p-4 sm:p-6 space-y-10 max-w-5xl mx-auto"
    >
      <div className="flex justify-end print:hidden">
        <Button onClick={handleDownloadPdf} className="bg-yellow-600 hover:bg-yellow-700">
          Download PDF
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="relative shadow-xl">
              {scheme.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader
                className={`bg-gradient-to-r ${scheme.color} text-white rounded-t-lg`}
              >
                <CardTitle className="text-center">
                  <div className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Gem className="w-6 h-6" />
                    {scheme.name}
                  </div>
                  <div className="text-lg opacity-90">{scheme.duration}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {scheme.monthlyAmount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    per month / gold deposit
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <Banknote className="w-4 h-4" /> Total Investment:
                    </span>
                    <span className="font-semibold">{scheme.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Gold Return:
                    </span>
                    <span className="font-semibold text-green-600">
                      {scheme.goldValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Bonus/Benefit:
                    </span>
                    <span className="font-semibold text-orange-600">
                      {scheme.discount}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {scheme.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Dialog
                  open={openIndex === index}
                  onOpenChange={(o) => setOpenIndex(o ? index : null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full bg-gradient-to-r ${scheme.color} hover:opacity-90 text-white`}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border border-yellow-400 shadow-xl rounded-xl bg-white dark:bg-zinc-900">
                    <DialogHeader className="text-center">
                      <div className="flex flex-col items-center gap-2 mb-4">
                        <Info className="w-8 h-8 text-yellow-600" />
                        <DialogTitle className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                          {scheme.image
                            ? "Scheme Pamphlet"
                            : "Terms & Conditions"}
                        </DialogTitle>
                      </div>
                    </DialogHeader>

                    {scheme.image ? (
                      <div className="flex justify-center">
                        <img
                          src={scheme.image}
                          alt={`${scheme.name} Details`}
                          className="rounded-lg shadow-md max-w-full h-auto"
                        />
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-3 px-2">
                        {scheme.rules.split("\n").map((line, ruleIdx) => {
                          const dotIndex = line.indexOf(".");

                          return (
                            <p key={ruleIdx} className="flex gap-2 items-start">
                              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                                {dotIndex > -1 ? `${line.slice(0, dotIndex)}.` : ""}
                              </span>
                              <span>
                                {dotIndex > -1 ? line.slice(dotIndex + 1).trim() : line}
                              </span>
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
