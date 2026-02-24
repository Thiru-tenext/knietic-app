import { NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";
import fs from "fs/promises";

export async function POST(req: Request) {
  try {
    const props = await req.json();

    console.log("Starting Remotion bundle...");
    const bundleLocation = await bundle({
      entryPoint: path.resolve("./remotion/index.ts"),
    });

    console.log("Selecting composition...");
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "KineticText",
      inputProps: props,
    });

    // Override the composition duration and dimensions if provided by the client
    if (props.durationInFrames) {
      composition.durationInFrames = Math.max(15, props.durationInFrames);
    }
    
    if (props.resolution) {
      const [w, h] = props.resolution.split('x');
      composition.width = parseInt(w, 10);
      composition.height = parseInt(h, 10);
    }

    const outputLocation = path.join(os.tmpdir(), `remotion-${Date.now()}.mp4`);
    
    console.log("Rendering media...");
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: props,
    });

    console.log("Reading generated MP4...");
    const fileBuffer = await fs.readFile(outputLocation);
    
    // Clean up in background
    fs.unlink(outputLocation).catch(console.error);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="kinetic-video.mp4"',
      },
    });
  } catch (error: any) {
    console.error("Failed to render video:", error);
    return NextResponse.json(
      { error: "Failed to render video", details: error.message },
      { status: 500 }
    );
  }
}
