# Project Structure Guide

## Architecture Overview

The project follows a clean, scalable architecture with clear separation of concerns:

```
src/
├── config/              # Configuration management
│   ├── environment.ts   # Environment variables with validation
│   ├── app.ts          # Application configuration
│   └── index.ts        # Config exports
│
├── constants/           # Application constants
│   ├── video.ts        # Video-related constants
│   ├── api.ts          # API-related constants
│   ├── ui.ts           # UI-related constants
│   ├── prompts.ts      # AI prompt templates
│   └── index.ts        # Constants exports
│
├── lib/                 # Utility libraries
│   ├── logger.ts       # Logging utility
│   ├── errors.ts       # Custom error classes
│   ├── validation.ts   # Input validation
│   ├── api-client.ts   # HTTP client with retries
│   ├── format.ts       # Formatting utilities
│   └── index.ts        # Lib exports
│
├── middleware/          # API middlewares
│   ├── api.ts          # Common API middlewares
│   └── index.ts        # Middleware exports
│
├── services/            # Business logic layer
│   ├── storage.service.ts          # File storage abstraction
│   ├── ai.service.ts               # AI/LLM abstraction
│   ├── music-analysis.service.ts   # Music analysis abstraction
│   ├── beat-analysis.service.ts    # Beat analysis service
│   ├── script-enhancement.service.ts # Script enhancement
│   └── index.ts                    # Services exports
│
└── types/               # TypeScript type definitions
    ├── animation.ts    # Animation and timeline types
    ├── project.ts      # Project types
    ├── upload.ts       # Upload and form types
    └── index.ts        # Types exports

app/                     # Next.js app directory
├── api/                 # API routes
├── components/          # React components
├── studio/              # Studio pages
└── layout.tsx           # Root layout
```

## Key Principles

### 1. Configuration Management
- All configuration comes from `src/config/`
- Environment variables are validated at startup
- Use `getConfig()` to access app configuration
- `getEnv()` for specific environment variables

### 2. Constants
- No magic numbers or hardcoded strings
- All constants in `src/constants/`
- Organized by domain (video, api, ui, prompts)
- Easier to maintain and update

### 3. Error Handling
- Custom error classes in `src/lib/errors.ts`
- Consistent error responses
- Automatic logging of errors

### 4. Validation
- Centralized validation in `src/lib/validation.ts`
- Reusable validation functions
- Batch field validation support

### 5. Services Layer
- Business logic isolated from API routes
- Support for multiple providers (storage, AI, music analysis)
- Easy to switch implementations (mock → real)
- Dependency injection through constructors

### 6. API Client
- Built-in retry logic with exponential backoff
- Automatic caching for GET requests
- Request timeout handling
- Consistent error responses

### 7. Logging
- Structured logging with context
- Different log levels (DEBUG, INFO, WARN, ERROR)
- Performance metrics tracking

## Usage Examples

### Using Configuration
```typescript
import { getConfig, getEnv } from '@/src/config';

const config = getConfig();
console.log(config.app.name);

const apiUrl = getEnv('NEXT_PUBLIC_API_URL');
```

### Using Services
```typescript
import { beatAnalysisService } from '@/src/services';

const result = await beatAnalysisService.analyzeBeat({
  musicFileUrl: 'https://...',
  fps: 30,
});
```

### Error Handling
```typescript
import { ValidationError, AppError } from '@/src/lib/errors';

try {
  throw new ValidationError('Invalid input', { field: ['error message'] });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.fields);
  }
}
```

### Using Validation
```typescript
import { validateProjectName, validateFields } from '@/src/lib/validation';

const validation = validateProjectName('My Project');
if (!validation.valid) {
  console.log(validation.error);
}

// Batch validation
const result = validateFields(formData, {
  name: validateProjectName,
  script: validateScript,
  email: validateEmail,
});
```

### Using API Client
```typescript
import { apiClient } from '@/src/lib/api-client';

const response = await apiClient.post('/api/projects', {
  name: 'New Project',
  script: 'Lorem ipsum...'
});

if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

## Migration Guide

### From Old Structure to New
1. Move types to `src/types/`
2. Use constants from `src/constants/`
3. Replace hardcoded values with constants
4. Use services for business logic
5. Use validation utilities for input validation
6. Use error classes for better error handling
7. Use apiClient for HTTP requests
8. Use logger for all logging

### Example Migration
```typescript
// Before
const API_URL = 'http://localhost:3000';
const MAX_FILE_SIZE = 500 * 1024 * 1024;

// After
import { getEnv } from '@/src/config';
import { UPLOAD_CONFIG } from '@/src/constants/api';

const apiUrl = getEnv('NEXT_PUBLIC_API_URL');
const maxFileSize = UPLOAD_CONFIG.MAX_FILE_SIZE;
```

## Best Practices

1. **Always validate user input** using validation utilities
2. **Use services for business logic** instead of putting it in components
3. **Log important operations** using the logger utility
4. **Use meaningful error classes** for different error scenarios
5. **Use constants** instead of hardcoding values
6. **Handle errors properly** and provide meaningful messages
7. **Keep components focused** on UI logic only
8. **Use configuration** for environment-specific settings

## Next Steps for Production

1. Implement actual storage provider (S3, Cloudinary, etc.)
2. Implement AI service integration (OpenAI, Claude, etc.)
3. Implement music analysis service (Librosa, Spotify, etc.)
4. Set up database for project persistence
5. Add authentication and authorization
6. Add rate limiting at route level
7. Add caching strategy for expensive operations
8. Add monitoring and error tracking (Sentry, etc.)
9. Set up CI/CD pipeline
10. Add comprehensive tests
