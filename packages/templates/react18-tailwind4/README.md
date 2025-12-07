Phase 1: Foundation Setup
├── 1. Fix package.json & Install dependencies - done
├── 2. Configure Tailwind v4 properly - done
├── 3. Set up design tokens (colors, spacing, typography)-done
└── 4. Create base CSS structure -done

Phase 2: Core UI Components
├── 5. Button component (learn CVA pattern) - done
├── 6. Card component -done
├── 7. Input & Form components
└── 8. Modal/Dialog component

Phase 3: Layout System
├── 9. Layout wrapper
├── 10. Header with navigation
├── 11. Sidebar with nested navigation
├── 12. Breadcrumbs component
└── 13. Mobile responsive drawer

Phase 4: Feedback Components
├── 14. Toast notification system
├── 15. Alert component
└── 16. Loading states

Phase 5: State Management
├── 17. Zustand store setup
├── 18. Redux Toolkit setup
├── 19. When to use which
└── 20. Combining both stores

Phase 6: API Layer
├── 21. Axios instance setup
├── 22. API service pattern
├── 23. React Query integration
└── 24. Error handling

Phase 7: Advanced Patterns
├── 25. Custom hooks
├── 26. Context providers
├── 27. Compound components
└── 28. Performance optimization

Tree Shaking - Only Imported Code Gets Bundled
1. Vite analyzes your code
   └── Finds all import statements

2. Builds dependency graph
   └── What imports what?

3. Dead code elimination
   └── Removes unused exports

4. Final bundle
   └── Only contains actually used code

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Named export is preferred for utilities (better tree-shaking)
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// cn = className (common convention in React/Tailwind projects)
// Used by: shadcn/ui, Radix UI, and many others

// Default export - always imported
import cn from './utilCN';  // cn is always bundled

// Named export - can be tree-shaken if unused
import { cn } from './utilCN';  // Only bundled if actually used

_________________
y giving alias in both tsconfig(compile time) as well as vite (build time)is required
"paths": {
  "@config/*": [
    "src/config/local/*",    // Priority 1: Local overrides
    "src/config/default/*"   // Priority 2: Default configs
  ]
}"paths": {
  "@shared/*": [
    "../../packages/shared/src/*",  // Shared package
    "src/shared/*"                   // Local fallback
  ]
}


Why gradients don't work: Native <option> elements are rendered by the operating system (not the browser), so they only support basic CSS properties like background-color and color. Gradients, borders, padding variations, and complex styling are not supported by the OS-level dropdown rendering.