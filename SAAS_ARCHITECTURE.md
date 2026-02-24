# Kinetic Typography - AI-Powered Commercial Ad Generator SaaS

## 🎬 Product Overview

Kinetic Typography is a complete SaaS system that automates the creation of professional kinetic typography commercial advertisements. Users upload creative assets (logo, images, video, music, script), and the system uses AI and automation to generate a fully rendered MP4 video.

### Key Features
- **Upload Interface**: Simple multi-step form for assets
- **Beat-Synced Animation**: Music analysis automatically detects beats
- **AI Creative Direction**: Generates premium scripts and animation timelines
- **Visual Timeline Editor**: Full control to manually edit generated timelines
- **One-Click Rendering**: Remotion renders videos frame-by-frame
- **Cloud-Ready**: Designed for scalable SaaS deployment

---

## 🏗️ System Architecture

### 1. Frontend
- **Landing Page** (`app/page.tsx`): Marketing site
- **Studio Dashboard** (`app/studio/page.tsx`): Project management hub
- **Upload Form** (`app/components/ProjectUploadForm.tsx`): 3-step file upload & metadata
- **Timeline Editor** (`app/components/TimelineEditor.tsx`): JSON-based visual editor

### 2. Backend API Endpoints

#### `/api/upload` - File Upload
```typescript
POST /api/upload
// Accepts: multipart/form-data with logo, music, product images/videos
// Returns: URLs for all uploaded files
// Status: ✅ MOCK - Needs: AWS S3 / GCS / Cloudinary
```

#### `/api/beat-analysis` - Music Analysis
```typescript
POST /api/beat-analysis
// Input: { musicFileUrl, fps }
// Output: { tempo, beats[], energyLevels[], peakFrames[] }
// Status: ✅ MOCK - Needs: FFmpeg + librosa Python service OR Spotify Web API
```

#### `/api/script-enhancement` - AI Rewriting
```typescript
POST /api/script-enhancement
// Input: { originalScript, stylePrompt }
// Output: { enhancedScript, emphasizedWords[] }
// Status: ✅ MOCK - Needs: OpenAI GPT-4o API
// Example System Prompt: Included in route file
```

#### `/api/generate-timeline` - Master AI Timeline Generator
```typescript
POST /api/generate-timeline
// Input: enhanced script, beat analysis, assets, style prompt
// Output: Structured JSON animation timeline
// Status: ✅ MOCK - Needs: OpenAI GPT-4o or Claude 3.5 Sonnet
// Includes: MASTER_SYSTEM_PROMPT with exact output schema
```

#### `/api/projects` - Project Management
```typescript
GET    /api/projects           // List user's projects
POST   /api/projects           // Create new project (orchestrates all steps)
PUT    /api/projects/:id       // Update project timeline
DELETE /api/projects/:id       // Delete project
// Status: ✅ MOCK - Needs: PostgreSQL / MongoDB / Firebase
```

#### `/api/render` - Video Rendering
```typescript
POST /api/render
// Input: AnimationTimeline JSON
// Output: MP4 video file
// Status: ✅ Uses Remotion (already configured)
```

---

## 📦 Data Models

### AnimationTimeline
```typescript
{
  id: string
  projectName: string
  video: {
    fps: number              // 30
    width: number           // 1080
    height: number          // 1920
    totalFrames: number     // 600
    background: { type: 'solid'|'gradient'|'video', color?, ... }
  }
  audio: {
    musicUrl: string
    beats: number[]         // Frame numbers [15, 30, 45, ...]
    tempo: number          // BPM
  }
  scenes: Scene[]
}
```

### Scene
```typescript
{
  id: string
  startFrame: number
  endFrame: number
  layers: (TextLayer | ImageLayer | VideoLayer | LogoLayer)[]
  transition?: { type: 'fade'|'flash'|'wipe'|'zoom', duration: number }
}
```

### Layer (Text Example)
```typescript
{
  type: 'text'
  content: string
  animation: {
    type: 'slideUp'|'fadeIn'|'scaleImpact'|'letterByLetter'|'beatBounce'
    duration: number    // frames
    easing: 'easeOut'|'easeInOut'|'easeIn'|'linear'
  }
  style: {
    fontSize: number
    color: string      // hex like #ffffff
    fontWeight: string
    position: 'center'|'top'|'bottom'|'left'|'right'
    opacity: number
    letterSpacing?: number
  }
  beatSync: boolean    // Animates on beat frames
  startFrame?: number
}
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
# **YOU_NEED_TO_ADD_API_KEY_HERE** - Replace all below

# AI Service (choose one)
OPENAI_API_KEY=sk-proj-xxxxxxxxxx
# OR
ANTHROPIC_API_KEY=sk-ant-xxxxxx

# Cloud Storage (choose one)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_S3_BUCKET=kinetic-typography-videos
# OR
GOOGLE_CLOUD_STORAGE_BUCKET=your-bucket
# OR
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

# Music Analysis (Python microservice)
LIBROSA_SERVICE_URL=http://localhost:5000

# Database (choose one)
DATABASE_URL=postgresql://user:password@localhost:5432/kinetic_typography
# OR
MONGODB_URI=mongodb+srv://user:password@cluster...
# OR
FIREBASE_PROJECT_ID=xxxxx
FIREBASE_PRIVATE_KEY=xxxxx

# Auth (optional, for production)
NEXTAUTH_SECRET=xxxxx
NEXTAUTH_URL=http://localhost:3000

# Optional: FFmpeg API
FFMPEG_API_URL=http://localhost:8080
```

### 3. Start Development Server
```bash
npm run dev
# Visit http://localhost:3000/studio to create projects
```

---

## 🔑 API Key Setup Guide

### OpenAI GPT-4o (for AI features)
1. Go to https://platform.openai.com/api/keys
2. Create new API key
3. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
4. Uncomment AI calls in:
   - `/api/script-enhancement/route.ts`
   - `/api/generate-timeline/route.ts`

### AWS S3 (for file uploads)
```bash
# Install AWS SDK
npm install @aws-sdk/client-s3

# Create S3 bucket
# Get credentials from AWS IAM
# Add to .env.local
```

Example implementation:
```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });
const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET,
  Key: `uploads/${file.name}`,
  Body: fileBuffer,
  ContentType: file.type,
});
await s3.send(command);
```

### FFmpeg for Beat Detection
Option 1: Self-hosted Python service
```bash
pip install librosa soundfile
# Run Python service on port 5000
# Endpoint: POST /analyze_music
# Returns: { tempo, beats, energyLevels }
```

Option 2: Use Spotify Web API
```typescript
// Requires Spotify authentication
// Get BPM from Spotify instead of analyzing locally
```

### Database (PostgreSQL Example)
```bash
# Install
npm install @prisma/client
npx prisma init

# Create schema (prisma/schema.prisma)
model Project {
  id        String   @id @default(cuid())
  userId    String
  name      String
  timeline  Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

# Migrate
npx prisma migrate dev

# Add to data layer
```

---

## 📊 Workflow Breakdown

### User Flow
```
1. User visits /studio
   ↓
2. Clicks "New Project"
   ↓
3. Uploads:
   - Project name
   - Marketing script
   ↓
4. Adds files:
   - Logo (optional PNG/SVG)
   - Music (required MP3/WAV)
   - Product images (optional)
   ↓
5. Sets creative direction:
   - Style prompt (e.g., "Apple-style, dark, premium")
   ↓
6. Submits → Backend processes ALL steps:
   a) Upload files to cloud storage
   b) Analyze music beats (FFmpeg/librosa)
   c) Enhance script (OpenAI GPT-4)
   d) Generate timeline (OpenAI GPT-4 Master Prompt)
   e) Store project in database
   f) Return to user
   ↓
7. User sees editing interface:
   - Timeline editor
   - Scene/layer management
   - Beat synchronization
   ↓
8. User can:
   - Edit JSON timeline directly
   - Adjust timings/animations
   - Change colors/fonts
   ↓
9. Click "Render Video":
   - Send timeline to Remotion
   - Renders MP4 (frame-by-frame)
   - Downloads file
```

### Backend Processing Flow
```
Frontend Form Data
       ↓
  /api/upload → Cloud Storage → File URLs
       ↓ (URLs returned)
  /api/beat-analysis → FFmpeg/librosa → Beat data
       ↓ (Beat data returned)
  /api/script-enhancement → OpenAI GPT-4 → Enhanced script + keywords
       ↓ (Enhanced content returned)
  /api/generate-timeline → OpenAI GPT-4 (MASTER PROMPT) → JSON Timeline
       ↓ (Timeline returned)
  /api/projects (POST) → Database → Project ID
       ↓ (Project created)
       
User can then:
  /api/projects/:id (PUT) → Update timeline after manual edits
       ↓
  /api/render (POST) → Remotion → MP4 video
       ↓
  Download MP4
```

---

## 🎓 Implementation Checklist

### Phase 1: Core Infrastructure
- [x] Types/schemas defined
- [x] API routes created (with mock data)
- [x] UI components built (upload form, editor)
- [x] Studio dashboard implemented
- [ ] **ACTION**: Set up database (PostgreSQL/MongoDB/Firebase)
- [ ] **ACTION**: Implement authentication (NextAuth/Auth0)

### Phase 2: AI Integration
- [ ] **ACTION**: Add OpenAI API key
- [ ] **ACTION**: Uncomment AI calls in `/api/script-enhancement`
- [ ] **ACTION**: Uncomment AI calls in `/api/generate-timeline`
- [ ] Test MASTER_SYSTEM_PROMPT with real API

### Phase 3: Music Analysis
- [ ] **ACTION**: Set up FFmpeg service OR librosa Python service
- [ ] **ACTION**: Replace mock beat analysis with real implementation
- [ ] Test with sample music files

### Phase 4: File Upload
- [ ] **ACTION**: Choose cloud storage (S3/GCS/Cloudinary)
- [ ] Implement upload handler
- [ ] Generate signed URLs
- [ ] Store URLs in database

### Phase 5: Rendering
- [ ] Test Remotion with sample timeline
- [ ] Verify video output quality
- [ ] Optimize rendering performance
- [ ] Store rendered videos in cloud

### Phase 6: Production
- [ ] Deploy to Vercel/AWS/GCP
- [ ] Set up CI/CD pipeline
- [ ] Configure monitoring/logging
- [ ] Implement payment system
- [ ] Set up customer support

---

## 🧪 Testing

### Test Create Project Flow
```bash
# 1. Start dev server
npm run dev

# 2. Navigate to http://localhost:3000/studio
# 3. Create new project
# 4. Fill in form (mock data)
# 5. Watch network requests in DevTools
# 6. Check responses in /api/* endpoints
```

### Test Timeline Editor
```typescript
// In browser console at /studio with project loaded:
// Edit scene start frame:
// Timeline updates appear in right panel
// Try adding/deleting scenes
// Export JSON to verify structure
```

---

## 📈 Performance & Scalability

### Optimization Tips
1. **Caching**: Cache beat analysis results for same music
2. **Queue System**: Use Bull/RabbitMQ for video rendering jobs
3. **CDN**: Serve videos via CloudFront/Cloudflare
4. **Database Indexing**: Index by userId, status, createdAt
5. **API Rate Limiting**: Implement to prevent abuse

### Expected Performance
- Beat analysis: 2-5 seconds
- Script enhancement: 3-10 seconds
- Timeline generation: 10-30 seconds
- Video rendering: 30-120 seconds (depending on duration)
- **Total time**: ~1-3 minutes from upload to finished video

---

## 🐛 Troubleshooting

### "Process failed" on timeline generation
- Check OPENAI_API_KEY is set correctly
- Verify API key has sufficient credits
- Check request payload matches schema in code

### Videos not rendering
- Verify Remotion bundle is valid
- Check temporary file permissions
- Look at server logs for frame-by-frame errors

### Beat analysis returning incorrect data
- Ensure music file format is correct (MP3/WAV)
- Check FFmpeg/librosa service is running
- Verify BPM detection logic

### File uploads failing
- Check cloud storage credentials
- Verify S3 bucket policy allows uploads
- Check file size limits (<100MB recommended)

---

## 📚 References

- [Remotion Docs](https://www.remotion.dev)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Librosa (Python Audio)](https://librosa.org)

---

## 📝 License

This is a SaaS template. Customize and deploy for your business model.

---

## 💡 Future Enhancements

1. **Template Library**: Pre-built scene templates
2. **Voice-over**: Text-to-speech integration
3. **Multi-language**: Auto-translate scripts
4. **A/B Testing**: Generate variations automatically
5. **Analytics**: Track video performance metrics
6. **API Access**: Let users generate videos programmatically
7. **White-label**: Rebrand for agencies
8. **Mobile App**: iOS/Android for on-the-go editing
9. **Collaboration**: Real-time team editing
10. **Stock Assets**: Built-in library of music, images, videos

---

**Built with Next.js, TypeScript, Tailwind CSS, Remotion, and AI 🚀**
