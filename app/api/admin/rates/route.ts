import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

interface MetalRateDoc {
  _id?: string;
  gold: number;
  silver: number;
  lastUpdated: string;
}


// GET
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const ratesCollection = db.collection<MetalRateDoc>('rates');

    const rates = await ratesCollection.findOne({ _id: "default-rates" });

    if (rates) {
      return NextResponse.json(rates);
    } else {
      return NextResponse.json({
        gold: 6250,
        silver: 78,
        lastUpdated: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}


// PUT
export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const ratesCollection = db.collection<MetalRateDoc>('rates');

    const body = await request.json();
    const { gold, silver } = body;

    const newRates: MetalRateDoc = {
      _id: "default-rates",
      gold: parseFloat(gold),
      silver: parseFloat(silver),
      lastUpdated: new Date().toISOString(),
    };

    await ratesCollection.updateOne(
      { _id: "default-rates" },
      { $set: newRates },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Rates updated successfully' });
  } catch (error) {
    console.error("Failed to update rates:", error);
    return NextResponse.json({ error: 'Failed to update metal rates' }, { status: 500 });
  }
}

