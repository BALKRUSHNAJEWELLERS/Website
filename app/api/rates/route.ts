import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

interface MetalRateDoc {
  _id?: string;
  gold: number;
  silver: number;
  lastUpdated: string;
  previousGold?: number; // Ensure this is included
  previousSilver?: number; // Ensure this is included
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    // Fetch the specific document containing the latest and previous rates
    const rates = await db.collection<MetalRateDoc>("rates").findOne({ _id: "default-rates" });

    if (!rates) {
      // Return default rates if none found, ensuring previous values are set
      return NextResponse.json({
        gold: 6250,
        silver: 78,
        lastUpdated: new Date().toISOString(),
        previousGold: 6250, // Default for previous if no record exists
        previousSilver: 78, // Default for previous if no record exists
      });
    }

    return NextResponse.json({
      gold: rates.gold,
      silver: rates.silver,
      lastUpdated: rates.lastUpdated,
      previousGold: rates.previousGold,
      previousSilver: rates.previousSilver,
    });
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}