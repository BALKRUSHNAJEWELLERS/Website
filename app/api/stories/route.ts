import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import type { ProductDoc } from "../../../types";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection<ProductDoc>("products");

    // Get all products with images, sorted by creation date (newest first)
    const products = await productsCollection
      .find({ image: { $exists: true, $ne: "" } })
      .sort({ createdAt: -1 })
      .toArray();

    // Group by category and get the latest product for each category
    const categoryMap = new Map<string, ProductDoc>();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });

    // Convert to story format
    const stories = Array.from(categoryMap.values()).map((product) => ({
      id: product.category.toLowerCase().replace(/\s+/g, "-"),
      image: product.image,
      title:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
      link: `/catalog/${product.category.replace(/\s+/g, "-")}`,
      category: product.category,
    }));

    return NextResponse.json(stories);
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
