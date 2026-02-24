import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract files from form data
    const logo = formData.get('logo') as File | null;
    const music = formData.get('music') as File | null;
    const productImages = formData.getAll('productImages') as File[];
    const productVideos = formData.getAll('productVideos') as File[];

    if (!music) {
      return NextResponse.json(
        { error: 'Music file is required' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Helper function to save file
    const saveFile = async (file: File) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      return {
        url: `/uploads/${filename}`,
        size: file.size,
        name: file.name
      };
    };

    // Save all files
    const logoData = logo ? await saveFile(logo) : null;
    const musicData = await saveFile(music);

    const imagesData = await Promise.all(
      productImages.map(img => saveFile(img))
    );

    const videosData = await Promise.all(
      productVideos.map(vid => saveFile(vid))
    );

    const uploadedAssets = {
      logo: logoData ? {
        url: logoData.url,
        format: logo ? (logo.type === 'image/svg+xml' ? 'svg' as const : 'png' as const) : 'png' as const,
        size: logoData.size,
      } : null,
      productImages: imagesData,
      productVideos: videosData.map(v => ({ ...v, duration: 0 })),
      music: {
        url: musicData.url,
        format: music.name.includes('.wav') ? 'wav' as const : 'mp3' as const,
        duration: 0,
        size: musicData.size,
      },
    };

    return NextResponse.json({
      success: true,
      data: uploadedAssets,
      message: 'Files uploaded successfully to local storage',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files', details: String(error) },
      { status: 500 }
    );
  }
}
