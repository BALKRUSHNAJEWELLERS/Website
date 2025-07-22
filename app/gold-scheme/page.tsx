"use client";

import { useState, useRef } from "react";
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
  Download, // Changed Printer to Download icon
  Gift,
} from "lucide-react";
// Removed useReactToPrint
// import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";

// Import html2canvas and jspdf
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Scheme {
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
}

export default function GoldSchemeSingleCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement>(null); // This ref will point to the content to be converted to PDF

  // Removed handlePrint from useReactToPrint
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: 'Gold Scheme Details',
  //   removeAfterPrint: true,
  // });

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    if (element) {
      // Temporarily hide the print/download button and any other elements not meant for the PDF
      const printHiddenElements = element.querySelectorAll('.print\\:hidden');
      printHiddenElements.forEach(el => (el as HTMLElement).style.display = 'none');

      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better quality PDF
        useCORS: true, // If you have images from other origins
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('gold_scheme_details.pdf');

      // Restore the visibility of hidden elements
      printHiddenElements.forEach(el => (el as HTMLElement).style.display = '');
    }
  };

  const schemes: Scheme[] = [
    {
      name: "Suvarna Dar Savings Scheme",
      duration: "12 Months",
      monthlyAmount: "₹1,000",
      totalAmount: "₹12,000",
      goldValue: "₹13,200",
      discount: "10%",
      features: [
        "No making charges on all items",
        "Free jewelry cleaning & polishing",
        "Priority customer service",
        "Flexible payment dates",
      ],
      color: "from-yellow-400 to-yellow-600",
      popular: true,
      rules: `1. Redemption is allowed only for gold ornaments under this scheme.
2. Once registered, scheme terms cannot be changed.
3. Redemption is not permitted for any other BKJ schemes or silver items.
4. Redemption is allowed only against a purchase at our showroom. No cash claims.
5. Customers must redeem their account within 3 months of maturity. Redemption is allowed only during declared showroom hours.
6. In case of any contact detail changes, inform the showroom within 7 days.
7. Passbook is a required document for redemption, considered legal proof. It must be signed and well maintained.
8. During redemption, the original passbook must be submitted, and amounts must match the entries.
9. Passbook must be signed by both customer and showroom staff at registration.
10. If passbook is lost, a duplicate can be issued with valid ID proof and a loss affidavit. A ₹100 fee will apply.
11. Read all terms in the passbook carefully before joining the scheme and clarify doubts.
12. Valid photo ID proof must be shown at redemption (DL, Passport, Ration Card, Voter ID, or PAN).
13. Subject to Himatnagar jurisdiction.
14. Any disputes will be resolved by arbitration; no legal claims should arise.`,
    },
    {
      name: "Suvarna Vrudhi Scheme",
      duration: "12 Months Minimum",
      monthlyAmount: "Gold Deposit",
      totalAmount: "100 gm (e.g.)",
      goldValue: "Extra 6 gm benefit",
      discount: "—",
      features: [
        "Returns based on gold weight",
        "Minimum deposit 100 gm",
        "Extra 6 gm after 1 year",
        "Showroom redemption only",
      ],
      color: "from-yellow-500 to-orange-600",
      popular: false,
      rules: `1. Investors must deposit the gold deposit slip at the time of redemption.
2. Redemption is not permitted for any other BKJ schemes or silver items. Only valid against showroom purchases.
3. No cash claims will be entertained.
4. In case of any contact detail change, the customer must notify the showroom within 7 days.
5. The passbook is a required legal document for redemption. It must be signed and well maintained.
6. At redemption, the original passbook must be submitted, and values must match.
7. The passbook must be signed by both customer and showroom staff at time of registration.
8. If lost, a duplicate passbook can be issued only with proof and a ₹100 admin fee.
9. Customers must read all conditions carefully and clarify any doubts before enrolling.
10. Valid photo ID proof must be provided at the time of redemption.
11. Subject to Himatnagar jurisdiction.
12. Disputes will be resolved via arbitration. No legal claims allowed.`,
    },
    {
      name: "Gift Voucher ₹500",
      duration: "Valid: 1 Jan – 29 Feb / 1 Mar – 30 Apr",
      monthlyAmount: "Voucher Only",
      totalAmount: "—",
      goldValue: "₹500 Off on Labour Charges",
      discount: "One-time use",
      features: [
        "Applicable only on jewellery products",
        "Valid only during mentioned period",
        "Not redeemable for cash",
        "Original voucher must be presented",
      ],
      color: "from-green-400 to-yellow-400",
      popular: false,
      rules: `1. Voucher cannot be used on gold or silver coins.
2. Only valid on jewellery products.
3. Must be redeemed within mentioned dates.
4. One voucher applicable per item only.
5. Applicable only on labour charges, not total amount.
6. Non-transferable; only original buyer may redeem.
7. Cannot be combined with other offers or discounts.
8. Cannot be redeemed for cash or any monetary value.
9. Original voucher must be presented at time of redemption.
10. Lost or stolen vouchers will not be replaced or refunded.
11. Must be used within the specified validity period.
12. Read and understand all terms before use.
13. Any dispute will be resolved via arbitration only.
14. Subject to Himatnagar jurisdiction.`,
    },
  ];

  return (
    <div ref={componentRef} className="p-4 sm:p-6 space-y-10 max-w-5xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2">
        {schemes.map((scheme, index) => (
          <motion.div
            key={index}
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
                          Terms & Conditions
                        </DialogTitle>
                      </div>
                    </DialogHeader>
                    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-3 px-2">
                      {scheme.rules.split("\n").map((line, ruleIdx) => (
                        <p key={ruleIdx} className="flex gap-2 items-start">
                          <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                            {line.split(".")[0]}.
                          </span>
                          <span>
                            {line.substring(line.indexOf(".") + 1).trim()}
                          </span>
                        </p>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">Compare Schemes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-yellow-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 text-left">Feature</th>
                {schemes.map((scheme, idx) => (
                  <th key={idx} className="px-4 py-2 text-left">
                    {scheme.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Duration</td>
                {schemes.map((s, i) => (
                  <td key={i} className="px-4 py-2">
                    {s.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Amount Type</td>
                {schemes.map((s, i) => (
                  <td key={i} className="px-4 py-2">
                    {s.monthlyAmount}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Total Investment</td>
                {schemes.map((s, i) => (
                  <td key={i} className="px-4 py-2">
                    {s.totalAmount}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Gold Return</td>
                {schemes.map((s, i) => (
                  <td key={i} className="px-4 py-2">
                    {s.goldValue}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Bonus/Benefit</td>
                {schemes.map((s, i) => (
                  <td key={i} className="px-4 py-2">
                    {s.discount}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="flex justify-center gap-4 pt-6 print:hidden">
        <button
          onClick={handleDownloadPdf} // Call the new PDF download function
          className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md text-sm font-medium shadow transition"
        >
          <Download className="w-4 h-4 mr-2" /> {/* Changed icon */}
          Download PDF
        </button>
      </div>
    </div>
  );
}