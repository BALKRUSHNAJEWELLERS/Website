import type { GoldSchemeDoc } from "@/types"

export const defaultGoldSchemes: GoldSchemeDoc[] = [
  {
    id: "suvarn-dar-bachat-yojana",
    name: "Suvarn Dar Bachat Yojana",
    duration: "6 to 24 Months",
    monthlyAmount: "Variable Installments",
    totalAmount: "See Installment Table",
    goldValue: "Book Gold at Lower Price",
    discount: "Save up to Rs. 1,07,000",
    features: [
      "Pre-book gold at a lower rate than today's market price.",
      "Save a significant amount on your wedding purchase.",
      "Protection from the daily rising price of gold.",
    ],
    color: "from-yellow-400 to-yellow-600",
    popular: true,
    image: "/Suvarn Dar Bachat Yojan.jpeg",
    rules: `1. This scheme applies only to 22 Karat (916) Hallmark jewelry.
2. GST and Making Charges (Mazdoori) must be paid separately at the time of purchase.
3. It is compulsory to complete the entire decided installment plan.
4. The full details, including the installment table and complete example, are available in the official scheme pamphlet (the uploaded image).`,
  },
  {
    id: "suvarna-vrudhi-scheme",
    name: "Suvarna Vrudhi Scheme",
    duration: "12 Months Minimum",
    monthlyAmount: "Gold Deposit",
    totalAmount: "100 gm (e.g.)",
    goldValue: "Extra 6 gm benefit",
    discount: "-",
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
8. If lost, a duplicate passbook can be issued only with proof and a Rs. 100 admin fee.
9. Customers must read all conditions carefully and clarify any doubts before enrolling.
10. Valid photo ID proof must be provided at the time of redemption.
11. Subject to Himatnagar jurisdiction.
12. Disputes will be resolved via arbitration. No legal claims allowed.`,
  },
  {
    id: "gift-voucher-500",
    name: "Gift Voucher Rs. 500",
    duration: "Valid: 1 Jan - 29 Feb / 1 Mar - 30 Apr",
    monthlyAmount: "Voucher Only",
    totalAmount: "-",
    goldValue: "Rs. 500 Off on Labour Charges",
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
]
