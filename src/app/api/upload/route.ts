import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'image' // 'image' or 'cv'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    let allowedTypes: string[]
    let maxSize: number
    let uploadSubDir: string
    let filePrefix: string
    let allowedExtensions: string[] = []

    // Configure based on upload type
    if (type === 'cv') {
      allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      allowedExtensions = ['.pdf', '.doc', '.docx']
      maxSize = 10 * 1024 * 1024 // 10MB for CVs
      uploadSubDir = 'cvs'
      filePrefix = 'cv'
    } else if (type === 'media') {
      // Media upload (images and videos)
      allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/mpeg'
      ]
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.ogv', '.mov', '.avi', '.mpeg', '.mkv']
      maxSize = 100 * 1024 * 1024 // 100MB for media files
      uploadSubDir = 'media'
      filePrefix = 'media'
    } else {
      // Default: image upload
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
      maxSize = 5 * 1024 * 1024 // 5MB for images
      uploadSubDir = 'products'
      filePrefix = 'product'
    }

    // Validate file type - check both MIME type and extension
    const originalFileName = file.name.toLowerCase()
    const fileExtension = '.' + originalFileName.split('.').pop()
    const hasValidMimeType = allowedTypes.includes(file.type)
    const hasValidExtension = allowedExtensions.includes(fileExtension)
    
    if (!hasValidMimeType && !hasValidExtension) {
      return NextResponse.json(
        { error: `Invalid file type for ${type}. Allowed types: ${allowedExtensions.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.` },
        { status: 400 }
      )
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const ext = file.name.split('.').pop()
    const fileName = `${filePrefix}_${Date.now()}.${ext}`
    
    // Define upload directory
    const uploadDir = (type === 'cv' || type === 'media') 
      ? join(process.cwd(), 'public', 'uploads', uploadSubDir)
      : join(process.cwd(), 'public', 'images', uploadSubDir)
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Write file to public directory
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // Return the public URL
    let imageUrl: string
    if (type === 'cv') {
      imageUrl = `/uploads/${uploadSubDir}/${fileName}`
    } else if (type === 'media') {
      imageUrl = `/uploads/${uploadSubDir}/${fileName}`
    } else {
      imageUrl = `/images/${uploadSubDir}/${fileName}`
    }
    
    return NextResponse.json({ 
      success: true,
      imageUrl 
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}
