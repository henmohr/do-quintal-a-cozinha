# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Do Quintal à Cozinha** (From Backyard to Kitchen) - A community platform for rural women producers from MMTR-SE (Movimento da Mulher Trabalhadora Rural de Sergipe).

The platform empowers rural women entrepreneurs by providing:

- **Product Showcase**: Display agricultural products, handicrafts, and processed goods
- **Recipe Library**: Share traditional Brazilian recipes from the community
- **Community Stories**: Highlight inspiring stories of rural women producers
- **Direct Communication**: Connect producers with customers via WhatsApp integration

## Essential Commands

### Development

```bash
# Install dependencies (use npm, per project convention)
npm install

# Start development server
npm run dev

# Database operations
npx prisma migrate dev        # Create and apply new migration
npx prisma migrate deploy      # Apply pending migrations (production)
npx prisma generate           # Generate Prisma client
npx prisma studio             # Open Prisma Studio GUI

# Code quality
npm run lint                  # Run ESLint

# Build for production
npm run build
npm start

# Component documentation
npm run storybook             # Start Storybook dev server
npm run build-storybook       # Build Storybook static files
```

### Docker (Optional)

```bash
# Start with Docker Compose (development)
docker compose -f docker/desenvolvimento/docker-compose.yml up -d

# Access at http://localhost:3001 (hot-reload enabled)
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15.2.2 with App Router
- **Language**: TypeScript with strict mode
- **UI Runtime**: React 19.0.0
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4.1.5 with @tailwindcss/postcss
- **UI Components**: Shadcn/ui + Radix UI primitives
- **State Management**: TanStack React Query 5.71.5
- **AI Services**: Groq SDK (audio transcription)
- **Icons**: Material-UI Icons + Lucide React
- **Testing**: Storybook 8.6.12 + Vitest 3.1.2 + Playwright

### Key Directories

```
src/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Main public routes (grouped)
│   │   ├── page.tsx              # Home page with section grid
│   │   ├── sobre/                # About MMTR-SE
│   │   ├── nossa-historia/       # Community stories
│   │   │   └── [id]/             # Individual story detail
│   │   ├── nossa-producao/       # Product showcase
│   │   │   └── [id]/             # Individual product detail
│   │   ├── nossas-receitas/      # Recipe library
│   │   │   └── [id]/             # Individual recipe detail
│   │   ├── nosso-espaco/         # Physical space information
│   │   └── onde-estamos/         # Location information
│   ├── api/                      # API Routes
│   │   ├── product/              # Product CRUD operations
│   │   ├── profile/              # Producer profile management
│   │   ├── whatsapp/             # WhatsApp integration redirect
│   │   ├── email/                # Email mailto redirect
│   │   └── transcription/        # Audio-to-text (Groq Whisper)
│   ├── actions/                  # Server Actions
│   │   ├── get-all-recipes.ts
│   │   ├── get-recipe-by-id.ts
│   │   ├── get-all-products.ts
│   │   ├── get-product-by-id.ts
│   │   ├── get-all-stories.ts
│   │   └── get-story-by-id.ts
│   ├── layout.tsx                # Root layout with providers
│   ├── providers.tsx             # React Query provider setup
│   └── globals.css               # Global styles + Tailwind base
├── components/                   # React Components
│   ├── ui/                       # Base UI primitives (shadcn/ui)
│   │   ├── button.tsx            # Button with variants
│   │   ├── card.tsx              # Card container
│   │   ├── carousel.tsx          # Embla carousel wrapper
│   │   ├── dialog.tsx            # Modal dialog
│   │   ├── drawer.tsx            # Mobile drawer (Radix)
│   │   ├── accordion.tsx         # Expandable sections
│   │   ├── badge.tsx             # Tag/status badges
│   │   ├── input.tsx             # Form input
│   │   ├── label.tsx             # Form label
│   │   ├── separator.tsx         # Visual divider
│   │   └── skeleton.tsx          # Loading placeholder
│   ├── header/                   # Site header with navigation
│   ├── footer/                   # Site footer with links
│   ├── main-nav/                 # Desktop navigation menu
│   ├── mobile-nav/               # Mobile drawer navigation
│   ├── recipe-grid.tsx           # Recipe card grid display
│   ├── recipe-detail.tsx         # Full recipe view
│   ├── recipe-header.tsx         # Recipe page header
│   ├── recipe-search.tsx         # Recipe search bar
│   ├── featured-recipes.tsx      # Featured recipe carousel
│   ├── product-grid.tsx          # Product card grid display
│   ├── product-filters.tsx       # Category/price filters
│   ├── story-card.tsx            # Story card display
│   ├── story-detail.tsx          # Full story view
│   └── search-bar.tsx            # Generic search component
├── hooks/                        # Custom React hooks
│   ├── use-get-all-recipes.ts    # React Query hook for recipes
│   ├── use-get-recipe-by-id.ts   # Single recipe fetcher
│   ├── use-get-all-products.ts   # React Query hook for products
│   ├── use-get-product-by-id.ts  # Single product fetcher
│   ├── use-get-all-stories.ts    # React Query hook for stories
│   ├── use-get-story-by-id.ts    # Single story fetcher
│   └── use-mobile.ts             # Mobile breakpoint detection
├── lib/                          # Utilities
│   ├── prisma.ts                 # Prisma client singleton
│   └── utils.ts                  # Helper functions (cn, etc.)
├── types/                        # TypeScript type definitions
│   ├── recipe.ts
│   └── story.ts
├── config/                       # App configuration
│   └── site.ts                   # Site metadata
├── data/                         # Static/mock data
│   └── stories.fixtures.ts
└── stories/                      # Storybook stories
    └── assets/
```

### Database Schema

**Core Models:**

```prisma
Profile (Producer/Artisan)
  ├── id: String (UUID)
  ├── name: String
  ├── phone_number: String (unique)
  ├── social_name: String?
  ├── instagram: String?
  └── Product[] (1-to-many)

Product
  ├── id: String (UUID)
  ├── product_name: String
  ├── description: String?
  ├── price: Decimal? (converted to number in server actions)
  ├── category: Category (AGRICOLA | ARTESANATO | PROCESSADO)
  ├── ProductMedia[] (many-to-many via junction)
  └── Profile (many-to-1)

Recipe
  ├── id: String (UUID)
  ├── title: String
  ├── description: String
  ├── preparation_time_in_minutes: Int
  ├── cooking_time_in_minutes: Int
  ├── number_of_servings: Int
  ├── difficulty: RecipeDifficulty (EASY | INTERMEDIARY | HARD)
  ├── ingredients: Json (array stored as JSON)
  ├── RecipeStep[] (1-to-many)
  ├── RecipeMedia[] (many-to-many via junction)
  ├── created_at: DateTime
  └── updated_at: DateTime

Media (Shared across Products/Recipes)
  ├── id: String (UUID)
  ├── url: String
  ├── media_type: MediaType (AUDIO | IMAGE | VIDEO)
  ├── ProductMedia[]
  └── RecipeMedia[]

RecipeStep
  ├── id: Int (autoincrement)
  ├── step_number: Int
  ├── instruction: String
  └── recipe_id: String (FK to Recipe)
```

**Junction Tables:**
- `ProductMedia`: Links products to media (composite PK: productId + mediaId)
- `RecipeMedia`: Links recipes to media (composite PK: recipeId + mediaId)

**Key Constraints:**
- All primary keys use UUIDs (except RecipeStep with autoincrement)
- Foreign keys cascade on delete
- phone_number has unique constraint
- Timestamps: created_at, updated_at on Recipe

### Important Patterns

#### **1. Data Flow Architecture**

```
Client Component (page.tsx, marked "use client")
    ↓
React Query Hook (use-get-all-recipes.ts)
    ↓
Server Action (get-all-recipes.ts, marked "use server")
    ↓
Prisma Database Query (src/lib/prisma.ts singleton)
    ↓
SQLite Database (prisma/dev.db)
```

#### **2. Server Actions Pattern**

Located in `src/app/actions/`. All marked with `"use server"` directive.

Example:
```typescript
"use server";

export async function getAllRecipes(options?: {
  search?: string;
  difficulty?: RecipeDifficulty;
}) {
  const where: any = {};

  if (options?.search) {
    where.title = { contains: options.search };
  }

  if (options?.difficulty) {
    where.difficulty = options.difficulty;
  }

  return prisma.recipe.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      preparation_time_in_minutes: true,
      cooking_time_in_minutes: true,
      number_of_servings: true,
      difficulty: true,
      media: {
        select: {
          media: {
            select: { url: true }
          }
        }
      }
    }
  });
}
```

#### **3. Prisma Decimal Serialization**

**CRITICAL**: Prisma's `Decimal` type cannot be serialized for Client Components.

**Problem**: When passing Prisma query results with `Decimal` fields to Client Components, Next.js throws:
```
Only plain objects can be passed to Client Components from Server Components.
Decimal objects are not supported.
```

**Solution**: Convert `Decimal` to `number` in server actions before returning:

```typescript
"use server";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      product_name: true,
      price: true, // Prisma Decimal type
    }
  });

  // Convert Decimal to number for client component serialization
  return products.map(product => ({
    ...product,
    price: product.price ? Number(product.price) : null
  }));
}
```

**Key Points:**
- Always convert `Decimal` fields to `number` in server actions
- Do the conversion before returning data to client components
- Preserve `null` values (don't convert `null` to `0`)
- This applies to all Prisma types that aren't plain objects (Date, Decimal, etc.)

#### **4. React Query Hooks Pattern**

Located in `src/hooks/`. Wraps server actions with React Query.

Example:
```typescript
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "@/app/actions/get-all-recipes";

export function useGetAllRecipes(options?: { search?: string }) {
  return useQuery({
    queryKey: ['recipes', options],
    queryFn: () => getAllRecipes(options),
    staleTime: 60_000, // 1 minute
  });
}
```

#### **5. API Routes Pattern**

RESTful endpoints in `src/app/api/`. All routes include CORS headers.

**Standard Response Format:**
- Success: `new Response(JSON.stringify(data), { status: 200 })`
- Created: `new Response(JSON.stringify(data), { status: 201 })`
- Bad Request: `new Response(JSON.stringify({ error: "Message" }), { status: 400 })`
- Not Found: `new Response(JSON.stringify({ error: "Not found" }), { status: 404 })`
- Server Error: `new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })`

#### **6. Component Architecture**

**Layered Structure:**
1. **UI Primitives**: Base components from shadcn/ui (Button, Card, etc.)
2. **Feature Components**: Domain-specific (RecipeGrid, ProductCard)
3. **Layout Components**: Site structure (Header, Footer, Nav)
4. **Page Components**: Full-page layouts with data fetching

**Props Interface Pattern:**
```typescript
interface RecipeGridProps {
  recipes: Recipe[];
  isLoading: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
}
```

**Loading State Pattern:**
```typescript
if (isLoading) {
  return <SkeletonLoader count={6} />;
}

if (recipes.length === 0) {
  return <EmptyState message="Nenhuma receita encontrada" />;
}

return <GridLayout items={recipes} />;
```

#### **7. Styling Architecture**

- **Utility-First**: Tailwind CSS classes
- **CSS Variables**: Theme colors in `globals.css` using OKLch color space
- **Dark Mode**: Supported via `.dark` class
- **Custom Utilities**: `container-wrapper`, `container` for consistent layout
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl, 2xl)

Example:
```typescript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
```

#### **8. Integration Patterns**

**WhatsApp Integration:**
```typescript
// GET /api/whatsapp?product={productId}
// Redirects to: https://wa.me/{phoneNumber}?text={encodedMessage}
```

**Audio Transcription:**
```typescript
// POST /api/transcription
// Body: { url: string, language: "pt" }
// Uses: Groq Whisper (whisper-large-v3-turbo)
```

**Email Integration:**
```typescript
// GET /api/email?subject={subject}
// Redirects to: mailto:{email}?subject={encodedSubject}
```

### Environment Configuration

Required variables in `.env`:

```bash
# Database
DATABASE_URL="file:./dev.db"

# AI Services
GROQ_API_KEY="gsk_..."

# API Authentication
API_KEY="dona-fatima-api-..."
```

Optional:
```bash
# Docker environment
PRODUCTION_APP=aplicacao-pwa
UX_APP=testando-ux
DEV_PATH=${PWD}
```

## Development Guidelines

### Code Implementation Guidelines

Follow these rules when writing code:

- **Early Returns**: Use early returns for cleaner code flow
- **Styling**: Always use Tailwind classes; avoid CSS-in-JS or style tags
- **Class Conditionals**: Use `cn()` utility from `@/lib/utils` for conditional classes
- **Naming**:
  - Variables/functions: camelCase
  - Event handlers: `handle` prefix (handleClick, handleSubmit)
  - Components: PascalCase
  - Files: kebab-case (recipe-grid.tsx)
- **Accessibility**: Include tabindex, aria-label, keyboard handlers (onClick + onKeyDown)
- **Package Manager**: Use `npm` (not pnpm or yarn)

### Prisma Guidelines

- Schema location: `prisma/schema.prisma`
- Database client: `src/lib/prisma.ts` (singleton pattern)
- Table naming: PascalCase in schema (generates camelCase fields)
- Never use raw SQL queries
- Migration workflow:
  1. Modify `schema.prisma`
  2. Run `npx prisma migrate dev --name descriptive_name`
  3. Run `npx prisma generate`
- Never use `npx prisma db push` in development

### Clean Code Guidelines

#### Constants Over Magic Numbers

Replace hard-coded values with named constants:

```typescript
// Bad
if (recipes.length > 3) { ... }

// Good
const MAX_FEATURED_RECIPES = 3;
if (recipes.length > MAX_FEATURED_RECIPES) { ... }
```

#### Meaningful Names

Variables and functions should reveal intent:

```typescript
// Bad
const d = 60; // elapsed time in minutes

// Good
const prepTimeInMinutes = 60;
```

#### Smart Comments

**Core Principles:**
- Don't comment on what code does - make code self-documenting
- Explain WHY something is done a certain way
- Document business logic, security decisions, and non-obvious patterns

**Function Documentation (JSDoc):**

```typescript
/**
 * Transcribes audio files to text using Groq's Whisper model.
 *
 * Uses whisper-large-v3-turbo for Portuguese language transcription.
 * Optimized for Brazilian Portuguese dialects from rural regions.
 *
 * @param audioUrl - Public URL to audio file (must be accessible)
 * @param language - Language code (default: "pt" for Portuguese)
 * @returns Transcribed text or error message
 */
```

**Business Logic Comments:**

```typescript
// BUSINESS RULE: Products cascade delete when profile is removed
// This ensures no orphaned products remain when a producer leaves the platform
await prisma.product.deleteMany({
  where: { profile_id: profileId }
});
```

**Architecture Decision Comments:**

```typescript
// Pattern: Using React Query for server state management instead of Redux
// Rationale: Simpler API, automatic caching, and better TypeScript support
// All data fetching goes through server actions wrapped in useQuery hooks
```

**Actionable TODOs:**

```typescript
// TODO(ISSUE-123): Implement pagination for recipe listing
// Currently loads all recipes at once. Target: 20 recipes per page
// Priority: P1 (performance critical for 100+ recipes)
```

**What to Avoid:**
- Obvious comments: `// Create a new product`, `// Loop through recipes`
- Redundant comments that restate the code
- Outdated comments that don't match current implementation
- Vague TODOs without context

#### Single Responsibility

Each function should do exactly one thing:

```typescript
// Bad
function handleProductSubmit() {
  validateForm();
  uploadImages();
  saveToDatabase();
  sendNotification();
}

// Good
function handleProductSubmit() {
  const validation = validateProductForm(formData);
  if (!validation.success) return;

  await saveProduct(formData);
}
```

#### DRY (Don't Repeat Yourself)

Extract repeated code into reusable functions:

```typescript
// Reusable formatting function
function formatRecipeTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}
```

#### Clean Structure

- Keep related code together
- Group by feature, not by type
- Components near their hooks and types
- Consistent file/folder naming (kebab-case)

#### Encapsulation

- Hide implementation details
- Expose clear interfaces
- Use TypeScript types to define contracts

```typescript
// Clear interface for component props
interface ProductCardProps {
  product: Product;
  onContactClick: (product: Product) => void;
  showPrice?: boolean;
}
```

### Component Development Approach

When implementing features:

1. **Think First**: Describe your plan step-by-step
2. **Best Practices**: Write correct, DRY code following conventions
3. **Readability**: Prioritize readable code over premature optimization
4. **Complete Implementation**: Fully implement requested functionality
5. **No Placeholders**: Leave NO todos, placeholders, or missing pieces
6. **Verification**: Ensure code is complete and thoroughly verified
7. **Imports**: Include all required imports with proper naming
8. **Quality Check**: Run lint after implementation

### Linting Strategy

```bash
# Lint entire codebase
npm run lint

# Lint specific file (use when making targeted changes)
npm run lint -- src/components/recipe-grid.tsx
```

## API Documentation

**IMPORTANT**: This project uses **Scalar** for API documentation with an OpenAPI 3.0 specification.

### Documentation Location

- **OpenAPI Spec**: `public/openapi.json`
- **Format**: OpenAPI 3.0 (JSON)
- **Viewer**: Scalar (interactive API documentation)

### Keeping Documentation Updated

**CRITICAL**: Whenever you make changes to API routes, you MUST update the OpenAPI specification:

1. **After adding/modifying endpoints**: Update schemas, request/response examples in `public/openapi.json`
2. **After adding fields to models**: Add the field to all relevant request/response schemas
3. **After adding validation**: Document new error responses and validation rules
4. **After changing behavior**: Update endpoint descriptions and examples

### OpenAPI Structure

The spec includes:
- **Complete API reference**: All endpoints with request/response schemas
- **Authentication**: API key header authentication
- **Request examples**: Multiple examples for different scenarios
- **Response examples**: Success and error responses with status codes
- **Schema definitions**: Reusable component schemas in `components.schemas`
- **Validation errors**: Comprehensive error examples for bad requests

### Example: Adding a New Field

When adding a field (e.g., `price` to Product):
1. Add to request body schema in POST/PUT endpoints
2. Add to response schema in GET endpoints
3. Add to examples in all relevant operations
4. Add validation error example if applicable
5. Update the component schema definition
6. Test the spec is valid JSON (no syntax errors)

## API Routes Reference

**Note**: This is a quick reference. For comprehensive documentation with request/response schemas, examples, and validation rules, see `public/openapi.json`.

### Product Management

**POST /api/product**
- Create new product
- Required: `phone_number`, `product_name`, `category`
- Optional: `description`, `price`, `media[]`
- Returns: Product object (201) or error (400/500)

**GET /api/product**
- Query by: `phone_number` OR `product_id`
- Returns: Product array or single product (200) or error (400)

**GET /api/product/[product_id]**
- Fetch specific product with media
- Returns: Product with media URLs (200) or error (404)

### Profile Management

**POST /api/profile**
- Create producer profile
- Required: `phone_number`, `name`
- Optional: `social_name`, `instagram`
- Returns: Profile (201) or error (400/500)

**GET /api/profile/[phone_number]**
- Fetch profile by phone number
- Returns: Profile with products (200) or error (404)

### Integration Endpoints

**GET /api/whatsapp**
- WhatsApp contact redirect
- Query: `product={productId}` OR `profile={profileId}`
- Redirects to: `https://wa.me/{phone}?text={message}`

**GET /api/email**
- Email redirect
- Query: `subject={text}` (optional)
- Redirects to: `mailto:{email}?subject={subject}`

**POST /api/transcription**
- Audio to text transcription
- Body: `{ url: string, language?: string }`
- Uses: Groq Whisper (whisper-large-v3-turbo)
- Returns: Transcription text (200) or error (400/500)

## Build and Deployment

### Next.js Configuration

**Output Mode**: `standalone` (self-contained bundle)
**Trailing Slash**: Enabled for all routes
**CORS**: Enabled for `/api/*` routes
**Remote Images**: Whitelisted domains:
  - typebot.luisotee.com
  - storage.luisotee.com

### Docker Deployment

**Environments:**
- Development: `docker/desenvolvimento/` (port 3001, hot-reload)
- Pre-production: `docker/pre-producao/`
- Production: `docker/producao/`

**Development with Docker:**
```bash
docker compose -f docker/desenvolvimento/docker-compose.yml up -d
```

**Environment variables in Docker:**
- `WATCHPACK_POLLING=true` (enables hot-reload)
- All `.env` variables passed through

### TypeScript Configuration

- Target: ES2017
- Strict mode: Enabled
- Path alias: `@/*` → `./src/*`
- Module resolution: bundler
- JSX: preserve (handled by Next.js)

## Testing

### Storybook

Component documentation and visual testing:

```bash
npm run storybook              # Start dev server (port 6006)
npm run build-storybook        # Build static files
```

**Configuration:**
- Integrated with Vitest for component testing
- Browser testing via Playwright
- Chrome/Chromium headless mode

### Testing Setup

- **Framework**: Vitest 3.1.2
- **Browser Provider**: Playwright
- **Coverage**: v8
- **Stories**: Located in `src/stories/`

## Key Features

### 1. Product Showcase
- Three categories: AGRICOLA (agricultural), ARTESANATO (handicraft), PROCESSADO (processed)
- Grid display with images and descriptions
- WhatsApp integration for direct producer contact
- Category filtering and search
- Producer information with each product

### 2. Recipe Library
- Traditional Brazilian recipes
- Metadata: prep time, cook time, servings, difficulty
- Step-by-step instructions with numbering
- Ingredient lists (JSON format)
- Featured recipe carousel on homepage
- Full-text search by recipe title
- Image gallery with carousel

### 3. Community Stories
- Profiles of rural women entrepreneurs
- Biographical narratives
- Regional categorization
- Search by name/description
- Featured images

### 4. Navigation & Layout
- Responsive design (mobile-first)
- Mobile: Drawer navigation
- Desktop: Horizontal navigation menu
- Footer with complete site map
- Active route highlighting
- Accessibility features (skip links, ARIA labels)

## Additional Notes

### Accessibility

The platform prioritizes accessibility:
- Skip to main content link
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus-visible styling
- Semantic HTML structure
- Color contrast compliance

### Performance Optimizations

- React Query caching (60s stale time for recipes, 5min for products)
- Next.js Image component with lazy loading
- Automatic code splitting via App Router
- Tailwind CSS purging
- Standalone build output for efficient deployment

### Image Handling

- Remote images via Next.js Image component
- Whitelisted domains in next.config.ts
- Lazy loading by default
- Responsive sizes attribute
- Fallback to placeholder for missing images
- Object-fit: cover for consistent aspect ratios

### Database Seeding

Sample data available via `prisma/seed.js`:
- Example recipes: Feijoada, Brigadeiro, Pão de Açúcar, Moqueca
- Includes full recipe details (steps, ingredients, media)
- Run with: `npx prisma db seed`
