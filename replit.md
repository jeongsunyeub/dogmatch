# Dog Breed Face Matching Application

## Overview

This is a full-stack web application that analyzes user-uploaded photos to determine which dog breed they most resemble. The app uses a React frontend with a Node.js/Express backend, featuring a mobile-first design with multi-language support (Korean, English, Japanese, Chinese). Users can upload photos, receive AI-powered breed matching results, and view detailed breed information. The app includes a language selector allowing users worldwide to access the service in their preferred language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom color scheme and Korean/English font support
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First**: Responsive design optimized for mobile devices

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **File Processing**: Multer for file uploads, Sharp for image processing
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful API endpoints for breed data and image analysis

### Database Schema
- **Users**: Basic user authentication (id, username, password)
- **Analysis Results**: Stores face analysis results and breed matches
- **Dog Breeds**: Comprehensive breed information including characteristics, care instructions, and personality traits

## Key Components

### Core Features
1. **Multi-Language Support**: Language selector with Korean, English, Japanese, and Chinese translations
2. **Image Upload & Analysis**: Users can upload photos via drag-and-drop or file selection
3. **Face Feature Extraction**: Simulated AI analysis of facial features (shape, eyes, nose, jawline, expression)
4. **Breed Matching**: Algorithm matches facial features to dog breed characteristics
5. **Results Display**: Shows top matches with confidence scores and detailed breed information
6. **Breed Gallery**: Displays various dog breeds with images and basic information

### UI Components
- **Language Selector**: Dropdown with flag icons for Korean, English, Japanese, and Chinese
- **Upload Section**: Drag-and-drop file upload with image validation
- **Loading Section**: Animated loading state during analysis
- **Results Section**: Match results with confidence scores and breed details
- **Breed Info Section**: Detailed breed characteristics and care information
- **Gallery Section**: Grid display of different dog breeds

### Data Flow
1. User uploads image → Frontend validates file
2. Image sent to backend → Multer processes upload
3. Sharp resizes/optimizes image → Simulated AI analysis
4. Features extracted → Breed matching algorithm runs
5. Results stored in database → Response sent to frontend
6. Frontend displays results → User can view detailed breed information

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Backend Dependencies
- **express**: Web framework
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL database connection
- **multer**: File upload handling
- **sharp**: Image processing
- **nanoid**: Unique ID generation
- **zod**: Runtime type validation

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Development mode with error overlays

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Database**: Drizzle push for schema deployment
- **Deployment**: Single node process serving static files and API

### Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Session**: PostgreSQL session store with connect-pg-simple
- **CORS**: Configured for development and production environments
- **Static Files**: Express serves built frontend from dist/public

## Data Flow

1. **Image Upload**: User selects/drops image → Frontend validation → FormData creation
2. **Backend Processing**: Express receives multipart form → Multer saves to memory → Sharp processes image
3. **AI Analysis**: Simulated feature extraction → Breed matching algorithm → Confidence scoring
4. **Data Storage**: Results saved to PostgreSQL → Session ID generated for retrieval
5. **Frontend Display**: Results fetched → UI updates with breed matches → Detailed info available

## External Dependencies

### Database
- **PostgreSQL**: Primary database for user data, analysis results, and breed information
- **Drizzle**: ORM for type-safe database operations and migrations

### Third-Party Services
- **Image Processing**: Sharp for server-side image optimization
- **File Upload**: Multer for handling multipart form data
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Deployment Strategy

The application is designed for deployment on platforms like Replit, with a single build process that creates both frontend and backend bundles. The production setup serves static files from the Express server while handling API requests.

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
- July 04, 2025. Added multi-language support (Korean, English, Japanese, Chinese) with language selector and comprehensive i18n system
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```