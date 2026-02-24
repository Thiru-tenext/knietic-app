# Kinetic Typography - Maintenance & Upgrade Guide

## Overview

This guide helps you understand, maintain, and upgrade the Kinetic Typography SaaS application.

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture documentation.

## Configuration

### Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in required variables for your environment
3. Restart the development server

See [Environment Configuration](./ENV_GUIDE.md) for detailed instructions.

### Key Configuration Files

- `src/config/environment.ts` - Environment variable definitions
- `src/config/app.ts` - Application-level configuration
- `src/constants/` - Application constants organized by domain

## Adding New Features

### 1. Adding a New API Endpoint

```typescript
// 1. Create the route handler
// app/api/your-route/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, withCors } from '@/src/middleware';
import { API_ROUTES, HTTP_STATUS } from '@/src/constants/api';
import { logger } from '@/src/lib/logger';

async function handler(req: NextRequest) {
  try {
    logger.info('Processing your-route');
    
    if (req.method === 'POST') {
      const body = await req.json();
      // Process request
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  } catch (error) {
    logger.error('Error in your-route', error as Error);
    throw error;
  }
}

export const POST = withErrorHandling(withCors(handler));
```

### 2. Adding New Constants

```typescript
// src/constants/your-domain.ts
export const YOUR_CONSTANTS = {
  VALUE_1: 'value',
  VALUE_2: 123,
} as const;

// Then export from src/constants/index.ts
export * from './your-domain';
```

### 3. Adding a New Service

```typescript
// src/services/your-service.ts
import { logger } from '@/src/lib/logger';

class YourService {
  async performOperation(): Promise<Result> {
    logger.info('Starting operation');
    // Implementation
    return result;
  }
}

export const yourService = new YourService();
```

### 4. Adding Validation Rules

```typescript
// src/lib/validation.ts - add your function
export function validateYourField(value: string): { valid: boolean; error?: string } {
  if (!value) return { valid: false, error: 'Required' };
  // Your validation logic
  return { valid: true };
}
```

## Common Tasks

### Update API Endpoint

1. Locate the route file in `app/api/`
2. Update the handler function
3. Update corresponding service in `src/services/`
4. Update tests if they exist
5. Update documentation

### Add New File Format Support

1. Update `UPLOAD_CONFIG` in `src/constants/api.ts`
2. Update storage provider in `src/services/storage.service.ts`
3. Add validation in `src/lib/validation.ts`
4. Test with new format

### Change Default Behavior

1. Find the constant in `src/constants/`
2. Update the value
3. Test the change
4. Document the change

### Switch to Real Implementation

Example: Move from mock AI to OpenAI

1. Add API key to `.env.local`: `OPENAI_API_KEY=sk-...`
2. Set `ENABLE_MOCK_API=false` in `.env.local`
3. Set `ENABLE_AI_ENHANCEMENT=true` in `.env.local`
4. Update `src/services/ai.service.ts` to implement actual API calls
5. Test thoroughly

## Debugging

### Enable Debug Logging

```typescript
// src/config/environment.ts
DEBUG=true
NODE_ENV=development
```

### Common Issues

#### Service not initialized
- Check environment variables in `.env.local`
- Check logging output to see which provider is being used
- Use mock mode to test without external APIs

#### Validation keeps failing
- Check validation rules in `src/lib/validation.ts`
- Add logger calls to see what's being validated
- Check constants for length/size limits

#### API requests timing out
- Check `API_TIMEOUT_MS` in `.env.local`
- Check network connectivity
- Check API service status

#### Storage upload failing
- Check `STORAGE_PROVIDER` setting
- Check storage credentials in environment
- Verify file size under `UPLOAD_CONFIG.MAX_FILE_SIZE`

## Performance Optimization

### 1. Caching

Move configuration to use cache:

```typescript
import { apiClient } from '@/src/lib/api-client';

const response = await apiClient.get('/api/projects', {
  cache: true,
  cacheDuration: 300000, // 5 minutes
});
```

### 2. Batch Operations

Use batch processing for multiple files:

```typescript
import { BATCH_CONFIG } from '@/src/constants/api';

const chunks = chunkArray(files, BATCH_CONFIG.MAX_BATCH_SIZE);
for (const chunk of chunks) {
  await processChunk(chunk);
}
```

### 3. Lazy Loading

Load services only when needed:

```typescript
// Instead of importing at top
import { beatAnalysisService } from '@/src/services';

// If available
const analyzeBeat = async () => {
  if (config.features.beatAnalysis) {
    return beatAnalysisService.analyzeBeat(input);
  }
};
```

## Monitoring & Logging

### What to Monitor

1. API response times
2. Error rates by endpoint
3. Service availability (AI, storage, etc.)
4. File upload success/failure rates
5. Video rendering times

### How to Add Monitoring

```typescript
import { logger } from '@/src/lib/logger';

// Log operation with timing
const start = Date.now();
const result = await someOperation();
const duration = Date.now() - start;

logger.performance('operation-name', duration, { 
  success: !!result 
});
```

## Deployment Checklist

- [ ] All environment variables configured
- [ ] API keys for external services added
- [ ] Database configured and migrated
- [ ] Static files optimized
- [ ] Error tracking (Sentry, etc.) configured
- [ ] Monitoring/logging set up
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] Tests passing
- [ ] Build succeeds without errors
- [ ] Documentation updated

## Updates & Dependencies

### When to Update

- Security patches: immediately
- Major version changes: test thoroughly
- Minor updates: safe to update
- Patch updates: safe to update

### Before Updating

```bash
# Run tests first
npm test

# Create backup
git commit -am "before-dependency-update"

# Check breaking changes
npm outdated
```

### How to Update

```bash
# Update specific package
npm install package@latest

# Update all packages
npm update

# Or use npm-check-updates
npx ncu -u
```

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Remotion Documentation](https://www.remotion.dev/docs)
- [React Documentation](https://react.dev)

## Contributing

When making changes:

1. Follow existing code style
2. Add appropriate logging
3. Add/update types
4. Test your changes
5. Update documentation
6. Write meaningful commit messages

## Troubleshooting

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed troubleshooting guide.
