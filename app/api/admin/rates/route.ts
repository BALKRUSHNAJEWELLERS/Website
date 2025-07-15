import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const rates = await db.collection("rates").findOne({}, { sort: { _id: -1 } })

    if (!rates) {
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
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { gold, silver } = await request.json()
    const { db } = await connectToDatabase()

    const updatedRates = {
      gold: Number.parseFloat(gold),
      silver: Number.parseFloat(silver),
      lastUpdated: new Date().toISOString(),
    }

    await db.collection("rates").insertOne(updatedRates)

    return NextResponse.json(updatedRates)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update rates" }, { status: 500 })
  }
}
