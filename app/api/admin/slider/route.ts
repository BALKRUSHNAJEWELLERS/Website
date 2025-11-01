import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { SliderItemDoc } from '../../../../types';
import { deleteImageFile, saveImageFile, saveMediaFile } from "../../../../lib/image-utils"
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const sliderCollection = db.collection<SliderItemDoc>('sliderItems');
        const sliderItems = await sliderCollection.find({}).toArray();
        return NextResponse.json(sliderItems);
    } catch (error) {
        console.error("Failed to fetch slider items:", error);
        return NextResponse.json({ error: 'Failed to fetch slider items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { db } = await connectToDatabase();
        const sliderCollection = db.collection<SliderItemDoc>('sliderItems');

        const formData = await request.formData();

        const title = formData.get('title') as string || '';
        const subtitle = formData.get('subtitle') as string || '';
        const link = formData.get('link') as string || '';
        const file = formData.get('file') as File | null; // This will be the uploaded file
        const imageLink = formData.get('imageLink') as string || ''; // This will be the pasted URL
        const itemId = formData.get('id') as string || uuidv4();

        let imageUrl: string = '';

        if (file) {
            imageUrl = await saveMediaFile(file); // This should handle both images and videos
        } else if (imageLink) {
            imageUrl = imageLink;
        } else {
            return NextResponse.json({ error: 'Please provide an image by uploading a file or pasting a link.' }, { status: 400 });
        }

        const sliderItem: SliderItemDoc = {
            id: itemId,
            title,
            subtitle,
            link,
            image: imageUrl,
        };

        await sliderCollection.insertOne(sliderItem);
        return NextResponse.json({ message: 'Slider item created successfully' });
    } catch (error) {
        console.error("Error creating slider item:", error);
        return NextResponse.json({ error: 'Failed to create slider item.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { db } = await connectToDatabase();
        const sliderCollection = db.collection<SliderItemDoc>('sliderItems');

        const formData = await request.formData();

        const itemId = formData.get('id') as string;
        const title = formData.get('title') as string || '';
        const subtitle = formData.get('subtitle') as string || '';
        const link = formData.get('link') as string || '';
        const file = formData.get('file') as File | null;
        const imageLink = formData.get('imageLink') as string || ''; // New: Image link from form

        if (!itemId) {
            return NextResponse.json({ error: 'Slider item ID is required for update.' }, { status: 400 });
        }

        const existingItem = await sliderCollection.findOne({ id: itemId });
        if (!existingItem) {
            return NextResponse.json({ error: 'Slider item not found.' }, { status: 404 });
        }

        let newImageUrl: string = existingItem.image; // Start with the current image URL from DB

        if (file) {
            // New file uploaded: save it, delete old one if it was an uploaded file
            newImageUrl = await saveImageFile(file);
            if (existingItem.image && existingItem.image.startsWith('/uploads/') && existingItem.image !== newImageUrl) {
                await deleteImageFile(existingItem.image);
            }
        } else if (imageLink) {
            // Image link provided (and no new file): use the link, delete old uploaded file if exists
            newImageUrl = imageLink;
            if (existingItem.image && existingItem.image.startsWith('/uploads/') && existingItem.image !== newImageUrl) {
                await deleteImageFile(existingItem.image);
            }
        } else if (existingItem.image && !file && !imageLink) {
            // No new file and no new link, but old item had an image. Keep the old one.
            // This case handles where user simply updates text fields without touching image.
            newImageUrl = existingItem.image;
        } else {
            // If neither file nor link is provided, and it's a new item or old item had no image, clear it.
            newImageUrl = "";
        }

        const updatedSliderItem: SliderItemDoc = {
            id: itemId,
            title,
            subtitle,
            link,
            image: newImageUrl, // Use the determined image URL
        };

        await sliderCollection.updateOne(
            { id: itemId },
            { $set: updatedSliderItem }
        );
        return NextResponse.json({ message: 'Slider item updated successfully' });
    } catch (error) {
        console.error("Error updating slider item:", error);
        return NextResponse.json({ error: 'Failed to update slider item.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { db } = await connectToDatabase();
        const sliderCollection = db.collection<SliderItemDoc>('sliderItems');

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Slider item ID is required.' }, { status: 400 });
        }

        const itemToDelete = await sliderCollection.findOne({ id });
        if (!itemToDelete) {
            return NextResponse.json({ error: 'Slider item not found.' }, { status: 404 });
        }

        const deleteResult = await sliderCollection.deleteOne({ id });

        if (deleteResult.deletedCount > 0) {
            // Only delete file if it was an uploaded file (starts with /uploads/)
            if (itemToDelete.image && itemToDelete.image.startsWith('/uploads/')) {
                await deleteImageFile(itemToDelete.image);
            }
            return NextResponse.json({ message: 'Slider item deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Slider item not found.' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting slider item:", error);
        return NextResponse.json({ error: 'Failed to delete slider item.' }, { status: 500 });
    }
}