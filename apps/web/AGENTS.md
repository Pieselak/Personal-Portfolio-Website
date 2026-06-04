# Frontend Specification - React + Vite + TypeScript

## Project Overview
**Name:** web  
**Type:** Monorepo app (managed with pnpm & Turborepo)  
**Port:** 2000 (dev server)  
**Framework:** React 19.2 + TypeScript 5.9 + Vite 7.2

---

## Tech Stack

### Core Framework
- **React:** 19.2.0 (latest with concurrent features)
- **React DOM:** 19.2.0
- **React Router:** 7.13.2 (routing & navigation)
- **React Router DOM:** 7.9.6

### Build Tool & Development
- **Vite:** 7.2.2 (lightning-fast build tool)
- **@vitejs/plugin-react:** 5.1.0 (React Fast Refresh)
- **TypeScript:** ~5.9.3 (strict type checking)

### Styling
- **Tailwind CSS:** 4.1.17 (utility-first CSS)
- **@tailwindcss/vite:** 4.1.17 (Vite integration)
- **Custom CSS Variables:** oklch() color system (light/dark support ready)

### State Management
- **Zustand:** 5.0.14 (lightweight store management)
- **@tanstack/react-query:** 5.90.10 (server state & caching)
- **@tanstack/react-query-devtools:** 5.100.14 (development debugging)

### HTTP Client
- **Axios:** 1.14.0 (HTTP requests)
- **swagger-typescript-api:** 13.12.0 (auto-generated API types from swagger schema)

### Internationalization (i18n)
- **i18next:** 25.6.3 (multi-language support)
- **react-i18next:** 16.3.4 (React integration)
- **Supported Languages:** Dynamically loaded from `/locales/*.ts`
- **Persistence:** localStorage (key: "language")

### UI Components & Icons
- **lucide-react:** 1.7.0 (icon library)
- **country-flag-icons:** 1.6.1 (flag icons for languages)
- **framer-motion:** 12.23.24 (animations & transitions)
- **react-spinners:** 0.17.0 (loading indicators)

### Code Quality
- **ESLint:** 9.39.1 (linting)
- **@eslint/js:** 9.39.1
- **eslint-plugin-react-hooks:** 7.0.1
- **eslint-plugin-react-refresh:** 0.4.24
- **typescript-eslint:** 8.46.3 (TS support)

---

## Project Structure

```
apps/web/
├── src/
│   ├── App.tsx                  # Main app component with routing
│   ├── i18n.ts                  # i18next configuration & utilities
│   ├── index.css                # Global styles (Tailwind + CSS variables)
│   ├── main.tsx                 # Entry point
│   ├── app/
│   │   ├── api/                 # Auto-generated API client
│   │   ├── components/          # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/
│   │   │   └── User/            # Main layout
│   │   └── modules/             # Feature modules
│   │       ├── User/            # User-facing features
│   │       │   ├── Home/
│   │       │   ├── AboutMe/
│   │       │   ├── Projects/
│   │       │   ├── Glucose/
│   │       │   └── SelectLanguage/
│   │       ├── Admin/           # Admin panel features
│   │       ├── Auth/            # Authentication
│   │       ├── Common/          # Shared pages
│   │       │   ├── Loading/
│   │       │   ├── NotFound/
│   │       │   ├── Forbidden/
│   │       │   ├── Maintenance/
│   │       │   └── UnderConstruction/
│   │       └── Storage/         # Data persistence
│   └── locales/                 # i18n translation files
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── tsconfig.app.json            # App-specific TS config
├── tsconfig.node.json           # Build-specific TS config
├── eslint.config.js             # ESLint rules
├── .env & .env.example          # Environment variables
├── package.json                 # Dependencies
└── vercel.json                  # Vercel deployment config
```

---

## Routing Architecture

**Root Routes:** `/`  
**Main Layout:** `UserLayout` (wrapper for all routes)

### Route Structure
```
/
├── /home                      # Home page (UnderConstruction)
├── /about                     # About page (UnderConstruction)
├── /projects                  # Projects listing
│   └── /projects/:projectId   # Project details
├── /glucose/:section?         # Glucose tracker
├── /language                  # Language selector (initial setup)
├── /login                     # Login (placeholder)
├── /logout                    # Logout (placeholder)
├── /admin                     # Admin section
│   ├── /admin/dashboard       # Admin dashboard
│   ├── /admin/users           # User management
│   │   └── /admin/users/:userId
│   ├── /admin/projects        # Project management
│   │   └── /admin/projects/:projectId
│   └── /admin/settings        # Admin settings
├── /m                         # Maintenance page
├── /f                         # Forbidden page
├── /l                         # Loading page
└── /* (404)                   # Not found page
```

### Language Redirect Flow
- App checks for saved language on mount (`getSavedLanguageCode()`)
- If not set, redirects to `/language` selection
- Language persisted in localStorage
- Document lang attribute updated on change

---

## State Management Strategy

### Zustand Stores (Global State)
- Client-side application state
- User preferences, UI state, auth state

### React Query (Server State)
- API data caching & synchronization
- Automatic refetching & background updates
- Devtools integration available

### localStorage
- Language preference persistence
- Session/auth token storage (if implemented)

---

## API Integration

### Auto-Generated API Client
- **Generation:** `pnpm run generate:api`
- **Source:** `../api/src/swagger/api-schema.json`
- **Output:** `./src/app/api/generated-api.ts`
- **Library:** Axios-based
- **Class Name:** API

### API Base Configuration
- Configured via Axios instance in generated client
- Environment variables for API URL (`.env` file)

---

## Styling System

### Tailwind CSS 4
- Utility-first CSS framework
- Just-in-time compilation with Vite
- JIT mode enabled automatically

### Color System (CSS Variables - oklch)
```css
--background          /* oklch(0.97 0.00 247.80) - Primary BG */
--foreground          /* oklch(0.14 0 0) - Primary text */
--card                /* oklch(0.97 0.00 236.35) - Card BG */
--card-foreground     /* oklch(0.14 0 0) - Card text */
--primary             /* oklch(0.563 0.155 253.274) - Primary color (purple) */
--secondary           /* oklch(0.91 0.01 247.92) - Secondary color */
--muted               /* oklch(0.93 0.02 250.59) - Disabled/muted state */
--destructive         /* oklch(0.58 0.24 28.48) - Danger/error state */
--accent              /* oklch(0.82 0.07 249.33) - Accent highlights */
```

### Custom Fonts
- **Manrope** (200-800 weight)
- **Oswald** (200-700 weight)
- **Ubuntu** (300-700 weight)
- **Ubuntu Sans** (100-800 weight)

---

## Internationalization (i18n)

### Configuration
- **Engine:** i18next + react-i18next
- **Translation Files:** `/src/locales/*.ts` (eager-loaded)
- **Default Language:** "en"
- **Fallback:** First available language

### Language Metadata
Each translation file exports:
```typescript
{
  data: {
    name: string;      // Language display name
    flag: ReactIcon;   // Flag icon from country-flag-icons
  },
  // ... translation keys
}
```

### Available Languages
Auto-discovered from locale files in `/locales/`  
Access via: `getAvailableLanguages()` utility

### Usage in Components
```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  return <h1>{t('key')}</h1>;
}
```

---

## TypeScript Configuration

### Base Config (tsconfig.json)
- **Module Resolution:** Node
- **Target:** ES2020 (modern browsers)
- **Path Alias:** `@/*` → `./src/*`

### Compiler Options
- **strict:** true (strict type checking)
- **esModuleInterop:** true
- **skipLibCheck:** true
- **forceConsistentCasingInFileNames:** true

### Environment Type Definitions
- **@types/react:** 19.2.2
- **@types/react-dom:** 19.2.2
- **@types/react-router-dom:** 5.3.3
- **@types/node:** 24.12.0

---

## Scripts & Commands

### Development
```bash
pnpm dev              # Start Vite dev server (port 2000)
pnpm build            # TypeScript check + Vite production build
pnpm preview          # Preview production build locally
pnpm lint             # Run ESLint on codebase
```

### API Generation
```bash
pnpm generate:api     # Generate API client from Swagger schema
```

### Workspace Commands
```bash
pnpm install          # Install all dependencies (monorepo)
pnpm -r install       # Recursive install across monorepo
turbo run build       # Build all apps via Turborepo
turbo run dev         # Dev mode for all apps
```

---

## Environment Variables

### Required (.env)
```
VITE_API_URL=http://localhost:3000  # Backend API endpoint
```

### Common Vite Env Variables
- `VITE_*` prefix required for frontend exposure
- `import.meta.env.VITE_*` for access in code

---

## Development Workflow

### Hot Module Replacement (HMR)
- **Enabled by default** in Vite
- **React Fast Refresh** for component updates without full reload
- **Dev Port:** 2000

### ESLint Rules
- React hooks linting
- React refresh optimization hints
- Modern JavaScript practices

### Type Safety
- Full TypeScript compilation before build (`tsc -b`)
- No JavaScript output if type errors exist

---

## Performance Optimization

### Code Splitting
- Automatic with Vite (dynamic imports)
- React Router v7 lazy route loading
- Chunk optimization in production build

### Caching
- React Query built-in caching
- HTTP caching via Axios interceptors (if configured)
- localStorage for client state

### Bundle Analysis
- Use Vite's `--analyze` for bundle visualization
- Tree-shaking enabled by default

---

## Browser Support
- **Target:** Modern browsers (ES2020)
- **Tested:** Chrome, Firefox, Safari (latest versions)
- **Mobile:** Responsive design via Tailwind CSS

---

## Deployment

### Vercel Configuration
- Config file: `vercel.json`
- Framework: Vite (auto-detected)
- Build command: `pnpm build`
- Output directory: `dist`

### Build Output
- Static files in `dist/` directory
- Ready for CDN or static hosting

---

## Component Architecture Best Practices

### Component Organization
- **Page Components:** Located in `modules/*/` with `.page.tsx` suffix
- **Layout Components:** Located in `layouts/*/` for shared structure
- **UI Components:** Located in `components/` for reusable elements
- **Custom Hooks:** Located in `hooks/` for shared logic

### Component Naming Conventions
- Page components: `ComponentName.page.tsx`
- Layout components: `ComponentName.layout.tsx`
- Utility/helper files: `componentName.ts` or `.utils.ts`
- Styles: co-located with component or separate `.module.css`

### Component Patterns
```typescript
// Functional component with hooks
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return <div>{t('key')}</div>;
};
```

---

## Development Best Practices

### Import Paths
- **Always use `@` alias:** `import { Component } from '@/app/components'`
- **Avoid relative paths:** No `../../../` style imports
- **Index exports:** Create `index.ts` files for cleaner imports

### Code Quality
- Run `pnpm lint` before committing
- Fix ESLint warnings with `--fix` flag: `pnpm lint -- --fix`
- Use strict TypeScript: no `any` types without justification
- Write JSDoc comments for public functions

### API Integration
- Use React Query for server state management
- All API calls through generated client (`src/app/api/generated-api.ts`)
- Regenerate API after backend schema changes: `pnpm generate:api`
- Handle loading/error states properly

### Styling Guidelines
- Use Tailwind utility classes for styling
- CSS variables for theming (colors defined in `index.css`)
- Avoid inline styles unless dynamic
- Use `@apply` in CSS for custom component styles if needed

### State Management
- Use **Zustand** for global UI state (modals, sidebar, etc.)
- Use **React Query** for API/server state
- Use **React local state** (`useState`) for component-specific state
- Avoid over-engineering with too many stores

### Accessibility
- Use semantic HTML elements
- Add ARIA labels for icon buttons
- Ensure keyboard navigation support
- Test with screen readers for critical flows

---

## Error Handling & Logging

### Error Pages
- **404 Not Found:** `NotFoundPage` - caught by wildcard route
- **403 Forbidden:** `ForbiddenPage` - manual navigation to `/f`
- **Maintenance:** `ServerErrorPage` - manual navigation to `/m`
- **Loading:** `LoadingPage` - Suspense fallback and loading states

### Error Handling Patterns
```typescript
// With React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: fetchItems,
});

if (error) return <ErrorComponent />;
if (isLoading) return <LoadingComponent />;
```

---

## Module System

### Feature Modules
Each feature module under `modules/` contains:
- `*.page.tsx` - Main page component
- `components/` - Module-specific components
- `hooks/` - Module-specific hooks
- `services/` - Business logic
- `types/` - TypeScript interfaces
- `utils/` - Helper functions

### Module Example: Projects
```
modules/User/Projects/
├── ProjectsList.tsx           # Main page
├── ProjectsDetails.tsx        # Detail page
├── components/
│   ├── ProjectCard.tsx
│   └── ProjectFilter.tsx
├── hooks/
│   └── useProjects.ts
└── types/
    └── project.types.ts
```

---

## Future Enhancements
- React Compiler support (currently disabled due to perf impact)
- Type-aware ESLint rules (stricter type checking)
- PWA capabilities (if needed)
- CSS-in-JS solution (if needed)
- Component library extraction
- Storybook integration for component documentation
- E2E testing (Playwright/Cypress)
- Unit testing (Vitest)

---

## Notes for Agents

### Frontend Development Guidelines
- Always use `@` alias for imports: `@/app/...` instead of relative paths
- Run `pnpm generate:api` after backend swagger schema updates
- Ensure all components are exported from index files for cleaner imports
- Use React Router's `useNavigate` & `useLocation` for programmatic navigation
- Leverage React Query for server state to avoid Zustand overload
- Keep components functional and use hooks exclusively
- Follow ESLint rules for consistency
- Test i18n changes with `getAvailableLanguages()` to ensure translations load

### Common Issues & Solutions
- **API types out of sync:** Run `pnpm generate:api` to regenerate
- **i18n keys missing:** Check `/src/locales/*.ts` for translation keys
- **Styling issues:** Verify Tailwind config and CSS variables in `index.css`
- **TypeScript errors:** Run `tsc -b` to check compilation before build
- **HMR not working:** Restart dev server with `pnpm dev`

### Dependencies to Watch
- React Router v7 (newer routing patterns)
- React Query v5 (query key structure)
- Zustand (simple store API)
- Tailwind v4 (new features and performance)
