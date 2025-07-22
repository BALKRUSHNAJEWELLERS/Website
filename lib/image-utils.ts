import * as fs from 'fs/promises'; // Use fs/promises for async operations
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Make sure uuid is installed

export const deleteImageFile = async (imageUrl: string): Promise<void> => {
    if (!imageUrl || !imageUrl.startsWith('/uploads/')) {
        return; // Only delete files uploaded to our /public/uploads directory
    }
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    try {
        await fs.unlink(filePath);
        console.log(`Deleted image file: ${filePath}`);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            console.warn(`Attempted to delete non-existent file: ${filePath}`);
        } else {
            console.error(`Error deleting image file ${filePath}:`, error);
        }
    }
};

export const saveImageFile = async (file: File): Promise<string> => {
    // Generate a unique file name
    const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, uniqueFileName);

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Read the file content as an ArrayBuffer, then convert to Node.js Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write the buffer to the file system
    await fs.writeFile(filePath, buffer);

    // Return the public URL path
    return `/uploads/${uniqueFileName}`;
};