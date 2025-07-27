import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import { ProductDoc } from "../../../../types";
import { deleteImageFile, saveImageFile } from "../../../../lib/image-utils";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection<ProductDoc>("products");
    const products = await productsCollection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection<ProductDoc>("products");

    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const category = (formData.get("category") as string) || "";
    const price = parseFloat((formData.get("price") as string) || "0");
    const metal = (formData.get("metal") as string) || "";
    const purity = (formData.get("purity") as string) || "";
    const weight = (formData.get("weight") as string) || "";
    const inStock = (formData.get("inStock") as string) === "true";
    const file = formData.get("file") as File | null;
    const imageLink = (formData.get("imageLink") as string) || "";
    const productId = (formData.get("id") as string) || uuidv4();

    let imageUrl: string = "";

    if (file) {
      imageUrl = await saveImageFile(file);
    } else if (imageLink) {
      imageUrl = imageLink;
    } else {
      return NextResponse.json(
        {
          error:
            "Please provide an image by uploading a file or pasting a link.",
        },
        { status: 400 }
      );
    }

    const product: ProductDoc = {
      id: productId,
      name,
      category,
      price,
      metal,
      purity,
      weight,
      inStock,
      image: imageUrl,
    };

    await productsCollection.insertOne(product);
    return NextResponse.json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection<ProductDoc>("products");

    const formData = await request.formData();

    const productId = formData.get("id") as string;
    const name = (formData.get("name") as string) || "";
    const category = (formData.get("category") as string) || "";
    const price = parseFloat((formData.get("price") as string) || "0");
    const metal = (formData.get("metal") as string) || "";
    const purity = (formData.get("purity") as string) || "";
    const weight = (formData.get("weight") as string) || "";
    const inStock = (formData.get("inStock") as string) === "true";
    const file = formData.get("file") as File | null;
    const imageLink = (formData.get("imageLink") as string) || "";

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required for update." },
        { status: 400 }
      );
    }

    const existingProduct = await productsCollection.findOne({ id: productId });
    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    let newImageUrl: string = existingProduct.image; // Start with the current image URL from DB

    if (file) {
      // New file uploaded: save it, delete old one if it was an uploaded file
      newImageUrl = await saveImageFile(file);
      if (
        existingProduct.image &&
        existingProduct.image.startsWith("/uploads/") &&
        existingProduct.image !== newImageUrl
      ) {
        await deleteImageFile(existingProduct.image);
      }
    } else if (imageLink) {
      // Image link provided (and no new file): use the link, delete old uploaded file if exists
      newImageUrl = imageLink;
      if (
        existingProduct.image &&
        existingProduct.image.startsWith("/uploads/") &&
        existingProduct.image !== newImageUrl
      ) {
        await deleteImageFile(existingProduct.image);
      }
    } else if (existingProduct.image && !file && !imageLink) {
      // No new file and no new link, but old item had an image. Keep the old one.
      newImageUrl = existingProduct.image;
    } else {
      newImageUrl = "";
    }

    const updatedProduct: ProductDoc = {
      id: productId,
      name,
      category,
      price,
      metal,
      purity,
      weight,
      inStock,
      image: newImageUrl, // Use the determined image URL
    };

    await productsCollection.updateOne(
      { id: productId },
      { $set: updatedProduct }
    );
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection<ProductDoc>("products");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    const productToDelete = await productsCollection.findOne({ id });
    if (!productToDelete) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const deleteResult = await productsCollection.deleteOne({ id });

    if (deleteResult.deletedCount > 0) {
      // Only delete file if it was an uploaded file (starts with /uploads/)
      if (
        productToDelete.image &&
        productToDelete.image.startsWith("/uploads/")
      ) {
        await deleteImageFile(productToDelete.image);
      }
      return NextResponse.json({ message: "Product deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product." },
      { status: 500 }
    );
  }
}
