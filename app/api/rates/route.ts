import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const rates = await db.collection("rates").findOne({}, { sort: { _id: -1 } })

    if (!rates) {
      // Return default rates if none found
      return NextResponse.json({
        gold: 6250,
        silver: 78,
        lastUpdated: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      gold: rates.gold,
      silver: rates.silver,
      lastUpdated: rates.lastUpdated,
    })
  } catch (error) {
    console.error("Failed to fetch rates:", error)
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 })
  }
}
