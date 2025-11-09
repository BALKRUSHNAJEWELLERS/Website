import fs from 'fs/promises'
import path from 'path'

export async function saveMediaFile(file: File): Promise<string> {
  try {
    if (process.env.NODE_ENV !== 'development') {
      // Convert file to base64 or use placeholder
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return `data:${file.type};base64,${buffer.toString('base64')}`;
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '')
    const filename = `${timestamp}-${originalName}`
    const filepath = path.join(uploadsDir, filename)

    // Write file
    await fs.writeFile(filepath, buffer)

    return `/uploads/${filename}`
  } catch (error) {
    console.error('Error saving media file:', error)
    throw new Error('Failed to save media file')
  }
}

// Keep existing deleteImageFile function, it should work for videos too
export async function deleteImageFile(filePath: string): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    // No-op in production
    return;
  }
  try {
    const filename = path.basename(filePath)
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filename)
    await fs.unlink(fullPath)
  } catch (error) {
    console.error('Error deleting file:', error)
    // Don't throw error for delete failures
  }
}

// Keep saveImageFile for backward compatibility
export { saveMediaFile as saveImageFile }