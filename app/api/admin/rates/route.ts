import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

interface MetalRateDoc {
  _id?: string;
  gold: number;
  silver: number;
  lastUpdated: string;
  previousGold?: number; // Added to store the previous gold rate
  previousSilver?: number; // Added to store the previous silver rate
}

// GET (no change needed here for the comparison logic, as it fetches the single 'default-rates' document)
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const ratesCollection = db.collection<MetalRateDoc>('rates');

    const rates = await ratesCollection.findOne({ _id: "default-rates" });

    if (rates) {
      return NextResponse.json(rates);
    } else {
      // Initialize with default values if no rates are found
      return NextResponse.json({
        gold: 6250,
        silver: 78,
        lastUpdated: new Date().toISOString(),
        previousGold: 6250, // Initialize previous with current default
        previousSilver: 78, // Initialize previous with current default
      });
    }
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}

// PUT (Modified to store previous rates)
export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const ratesCollection = db.collection<MetalRateDoc>('rates');

    const body = await request.json();
    const { gold, silver } = body;

    // Fetch the existing rates to determine the "previous" values
    const existingRates = await ratesCollection.findOne({ _id: "default-rates" });

    const newRates: MetalRateDoc = {
      _id: "default-rates",
      gold: parseFloat(gold),
      silver: parseFloat(silver),
      lastUpdated: new Date().toISOString(),
      // Set previous gold/silver to the current gold/silver from existingRates
      previousGold: existingRates ? existingRates.gold : parseFloat(gold),
      previousSilver: existingRates ? existingRates.silver : parseFloat(silver),
    };

    await ratesCollection.updateOne(
      { _id: "default-rates" },
      { $set: newRates },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Rates updated successfully', newRates }); // Return newRates for immediate feedback
  } catch (error) {
    console.error("Failed to update rates:", error);
    return NextResponse.json({ error: 'Failed to update metal rates' }, { status: 500 });
  }
}