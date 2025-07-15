import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({}).toArray()

    return NextResponse.json(
      products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        metal: product.metal,
        purity: product.purity,
        weight: product.weight,
        inStock: product.inStock,
      })),
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, category, price, image, metal, purity, weight, inStock } = await request.json()
    const { db } = await connectToDatabase()

    const newProduct = {
      name,
      category,
      price: Number.parseFloat(price),
      image,
      metal,
      purity,
      weight,
      inStock: Boolean(inStock),
      createdAt: new Date(),
    }

    const result = await db.collection("products").insertOne(newProduct)

    return NextResponse.json({
      id: result.insertedId.toString(),
      ...newProduct,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, category, price, image, metal, purity, weight, inStock } = await request.json()
    const { db } = await connectToDatabase()

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          category,
          price: Number.parseFloat(price),
          image,
          metal,
          purity,
          weight,
          inStock: Boolean(inStock),
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}
