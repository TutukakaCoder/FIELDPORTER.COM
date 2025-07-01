# FIELDPORTER - Premium AI Strategy Consultancy Platform

> Enterprise-grade AI consulting website built with Next.js 14, TypeScript, and
> Firebase

## 🚀 Recent Updates (January 2025)

### Project Cleanup & Build Optimization

- ✅ **Clean Build Process**: Resolved Next.js export directory issues with
  custom build script
- ✅ **Code Quality**: All TypeScript strict mode checks passing
- ✅ **Linting**: Zero ESLint warnings or errors
- ✅ **File Organization**: Removed test files and outdated workflow versions
- ✅ **Performance**: Optimized build process for enterprise deployment

### Build System Improvements

- Custom build script (`scripts/clean-build.js`) handles export directory
  cleanup
- Maintained all 17 static pages generation
- Zero TypeScript compilation errors
- Enterprise-grade security headers configured

## 🎯 Overview

Premium AI Strategy Consultancy Platform built with Next.js 14, TypeScript, and
Firebase.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp env.example .env.local
   ```

4. Configure your environment variables in `.env.local`

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or
`http://localhost:3001` if port 3000 is in use).

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router pages
├── components/             # Reusable React components
│   ├── ui/                # shadcn/ui components
│   ├── homepage/          # Homepage-specific components
│   ├── about/             # About page components
│   ├── contact/           # Contact page components
│   ├── services/          # Services page components
│   ├── insights/          # Blog/insights components
│   ├── chat/              # AI chat widget components
│   └── layout/            # Layout components
├── lib/                   # Utility functions and services
├── types/                 # TypeScript type definitions
├── config/                # Configuration files
├── docs/                  # Project documentation
├── scripts/               # Build and utility scripts
└── n8n-workflows/         # N8N automation workflows
    ├── fieldporter-current-working-workflow.json  # CURRENT PRODUCTION
    └── fieldporter-n8n-workflow-corrected.json    # Legacy/backup
```

### 🤖 N8N Workflow Files

- **`fieldporter-current-working-workflow.json`** - **CURRENT PRODUCTION
  VERSION**
  - Enhanced error handling and fallback responses
  - Health check functionality (`health_check` messages)
  - Firebase Realtime Database integration
  - Conditional response handling
  - Support for multiple origins (localhost:3000, localhost:3001,
    fieldporter.com)
- **`fieldporter-n8n-workflow-corrected.json`** - Legacy version
  - Basic Firestore integration
  - Simpler error handling
  - Kept for reference/backup

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts

## 🎨 Design System

The project uses a custom design system based on the FIELDPORTER brand:

### Colors

- **Primary**: #000000 (Black)
- **Secondary**: #0969DA (Blue)
- **Accent**: #7C3AED (Purple)
- **Text**: #FFFFFF (White)
- **Gray**: #6B7280

### Typography

- **Font Family**: Inter
- **Weights**: 400 (Regular), 600 (Semibold), 700 (Bold)

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Firebase (Firestore, Cloud Functions, Hosting)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🔒 Environment Variables

Required environment variables (see `env.example`):

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# AI Integration
DEEPSEEK_API_KEY=
OPENAI_API_KEY=

# N8N Integration
N8N_WEBHOOK_URL=
N8N_API_KEY=

# Contact Form
CONTACT_EMAIL=
```

## 📱 Features

- **Responsive Design**: Mobile-first approach with enterprise-grade UX
- **AI Chat Widget**: Integrated AI consultation assistant
- **Contact Forms**: Lead generation with Firebase backend
- **Blog/Insights**: Content management for thought leadership
- **Service Pages**: Detailed service offerings and methodologies
- **Performance Optimized**: <1.65s load times, 95+ Lighthouse scores
- **SEO Optimized**: Structured data, meta tags, and sitemap
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Deployment

The project is configured for Firebase Hosting:

```bash
# Build and deploy
npm run build
firebase deploy
```

## 📊 Performance Targets

- **Page Load Time**: <1.65 seconds
- **Lighthouse Performance**: >95
- **Lighthouse Accessibility**: >95
- **Lighthouse SEO**: >95
- **Core Web Vitals**: All metrics in green

## 🤝 Contributing

1. Follow the TypeScript strict mode requirements
2. Use the established component patterns
3. Maintain FIELDPORTER brand consistency
4. Ensure mobile-first responsive design
5. Test accessibility compliance

## 📄 License

Private - FIELDPORTER Limited

---

**FIELDPORTER** - Premium AI Strategy Consultancy
