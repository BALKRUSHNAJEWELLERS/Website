import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const sliderItems = await db.collection("slider").find({}).toArray()

    return NextResponse.json(
      sliderItems.map((item) => ({
        id: item._id.toString(),
        image: item.image,
        title: item.title,
        subtitle: item.subtitle,
        link: item.link,
      })),
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch slider items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { image, title, subtitle, link } = await request.json()
    const { db } = await connectToDatabase()

    const newItem = {
      image,
      title,
      subtitle,
      link,
      createdAt: new Date(),
    }

    const result = await db.collection("slider").insertOne(newItem)

    return NextResponse.json({
      id: result.insertedId.toString(),
      ...newItem,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create slider item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, image, title, subtitle, link } = await request.json()
    const { db } = await connectToDatabase()

    await db.collection("slider").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          image,
          title,
          subtitle,
          link,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update slider item" }, { status: 500 })
  }
}
