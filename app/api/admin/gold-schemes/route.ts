import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { deleteImageFile, saveImageFile } from "@/lib/image-utils"
import { defaultGoldSchemes } from "@/lib/default-gold-schemes"
import type { GoldSchemeDoc } from "@/types"
import { v4 as uuidv4 } from "uuid"

async function getCollection() {
  const { db } = await connectToDatabase()
  return db.collection<GoldSchemeDoc>("goldSchemes")
}

async function seedDefaultSchemesIfEmpty() {
  const collection = await getCollection()
  const count = await collection.countDocuments()

  if (count === 0) {
    const now = new Date().toISOString()
    await collection.insertMany(
      defaultGoldSchemes.map((scheme, index) => ({
        ...scheme,
        createdAt: now,
        updatedAt: now,
        sortOrder: index,
      }))
    )
  }

  return collection
}

function parseFeatures(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return []

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean)
    }
  } catch {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

async function schemeFromFormData(
  formData: FormData,
  existingScheme?: GoldSchemeDoc | null
): Promise<GoldSchemeDoc> {
  const file = formData.get("file") as File | null
  const imageLink = (formData.get("imageLink") as string) || ""
  let image = existingScheme?.image || ""

  if (file) {
    image = await saveImageFile(file)

    if (
      existingScheme?.image &&
      existingScheme.image.startsWith("/uploads/") &&
      existingScheme.image !== image
    ) {
      await deleteImageFile(existingScheme.image)
    }
  } else if (imageLink) {
    image = imageLink

    if (
      existingScheme?.image &&
      existingScheme.image.startsWith("/uploads/") &&
      existingScheme.image !== image
    ) {
      await deleteImageFile(existingScheme.image)
    }
  }

  const now = new Date().toISOString()

  return {
    id: (formData.get("id") as string) || uuidv4(),
    name: (formData.get("name") as string) || "",
    duration: (formData.get("duration") as string) || "",
    monthlyAmount: (formData.get("monthlyAmount") as string) || "",
    totalAmount: (formData.get("totalAmount") as string) || "",
    goldValue: (formData.get("goldValue") as string) || "",
    discount: (formData.get("discount") as string) || "",
    features: parseFeatures(formData.get("features")),
    color: (formData.get("color") as string) || "from-yellow-400 to-yellow-600",
    popular: (formData.get("popular") as string) === "true",
    rules: (formData.get("rules") as string) || "",
    image,
    createdAt: existingScheme?.createdAt || now,
    updatedAt: now,
  }
}

export async function GET() {
  try {
    const collection = await seedDefaultSchemesIfEmpty()
    const schemes = await collection.find({}).sort({ createdAt: 1 }).toArray()

    return NextResponse.json(schemes)
  } catch (error) {
    console.error("Failed to fetch gold schemes:", error)
    return NextResponse.json(
      { error: "Failed to fetch gold schemes" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const collection = await seedDefaultSchemesIfEmpty()
    const formData = await request.formData()
    const scheme = await schemeFromFormData(formData)

    await collection.insertOne(scheme)
    return NextResponse.json({ message: "Gold scheme created successfully" })
  } catch (error) {
    console.error("Failed to create gold scheme:", error)
    return NextResponse.json(
      { error: "Failed to create gold scheme" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const collection = await seedDefaultSchemesIfEmpty()
    const formData = await request.formData()
    const id = formData.get("id") as string

    if (!id) {
      return NextResponse.json(
        { error: "Gold scheme ID is required" },
        { status: 400 }
      )
    }

    const existingScheme = await collection.findOne({ id })
    const scheme = await schemeFromFormData(formData, existingScheme)

    await collection.updateOne({ id }, { $set: scheme }, { upsert: true })
    return NextResponse.json({ message: "Gold scheme updated successfully" })
  } catch (error) {
    console.error("Failed to update gold scheme:", error)
    return NextResponse.json(
      { error: "Failed to update gold scheme" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const collection = await seedDefaultSchemesIfEmpty()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Gold scheme ID is required" },
        { status: 400 }
      )
    }

    const scheme = await collection.findOne({ id })
    await collection.deleteOne({ id })

    if (scheme?.image && scheme.image.startsWith("/uploads/")) {
      await deleteImageFile(scheme.image)
    }

    return NextResponse.json({ message: "Gold scheme deleted successfully" })
  } catch (error) {
    console.error("Failed to delete gold scheme:", error)
    return NextResponse.json(
      { error: "Failed to delete gold scheme" },
      { status: 500 }
    )
  }
}
