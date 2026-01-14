# Project Restructuring Summary

## Date: 2026-01-14

## Overview

Reorganized the project structure to consolidate form-related functionality into a unified domain structure under `src/domain/form/`.

## New Structure

```
src/domain/form/
├── index.ts                    # Main barrel export
├── types/
│   ├── index.ts               # Types barrel export
│   ├── formData.ts           # All form type definitions
│   └── formDataTemplates.generated.ts  # Auto-generated empty templates
├── constants/
│   ├── index.ts              # Constants barrel export
│   └── formConstants.ts      # Form constants and options
├── normalizers/
│   ├── index.ts              # Normalizers barrel export
│   └── formDataNormalizer.ts # Form data normalization utilities
└── generators/
    ├── index.ts              # Generators barrel export
    └── codeGenerator.ts      # Medical code generation logic
```

## Changes Made

### 1. File Migrations

- **Moved** `src/components/form/types/formData.ts` → `src/domain/form/types/formData.ts`
- **Moved** `src/lib/constants/formConstants.ts` → `src/domain/form/constants/formConstants.ts`
- **Moved** `src/utils/formDataNormalizer.ts` → `src/domain/form/normalizers/formDataNormalizer.ts`
- **Moved** `src/utils/codeGenerator.ts` → `src/domain/form/generators/codeGenerator.ts`
- **Created** `src/domain/form/types/formDataTemplates.generated.ts` (generated templates)

### 2. Backward Compatibility

All old file locations now contain re-export stubs with deprecation warnings:

- `src/components/form/types/formData.ts` → re-exports from new location
- `src/lib/constants/formConstants.ts` → re-exports from new location
- `src/utils/codeGenerator.ts` → re-exports from new location
- `src/utils/formDataNormalizer.ts` → re-exports from new location
- `src/utils/formDataTemplates.generated.ts` → re-exports from new location

### 3. Import Path Updates

Updated imports in the following files to use new paths:

- `src/domain/store/slices/formData.ts`
- `src/pages/form-results/index.tsx`
- `src/pages/check-foliepas/index.tsx`
- `src/pages/intake-osa/index.tsx`
- `src/pages/intake-osb/index.tsx`
- `src/pages/intake-ovac/index.tsx`
- `src/pages/intake-pulman/index.tsx`
- `src/pages/intake-rebacare/index.tsx`
- `src/pages/intake-steunzolen/index.tsx`
- `src/pages/intake-vlos/index.tsx`
- `src/pages/new-client/index.tsx`
- `src/pages/old-client/index.tsx`
- `src/pages/test/index.tsx`

### 4. Build Script Updates

- Updated `scripts/generate-empty-data.ts` to generate files in new location:
  - Source: `src/domain/form/types/formData.ts`
  - Output: `src/domain/form/types/formDataTemplates.generated.ts`

### 5. Barrel Exports

Created index.ts files for clean imports:

- `src/domain/form/index.ts` - exports all form functionality
- `src/domain/form/types/index.ts`
- `src/domain/form/constants/index.ts`
- `src/domain/form/normalizers/index.ts`
- `src/domain/form/generators/index.ts`

## Benefits

1. **Better Organization**: All form-related code is now co-located in a single domain
2. **Clear Separation**: Types, constants, normalizers, and generators are organized in logical subdirectories
3. **Easier Imports**: Can import everything from `@/domain/form` or specific submodules
4. **Maintainability**: Related code is easier to find and modify
5. **Clean Codebase**: No deprecated files or duplicate code

## Migration Path

For developers:

1. **Update imports gradually** from old paths to new paths:
   - Old: `import { ClientData } from '@/components/form/types/formData'`
   - New: `import { ClientData } from '@/domain/form/types'`
   - Even simpler: `import { ClientData } from '@/domain/form'`

2. **Remove old re-export files** once all imports are migrated:
   - `src/components/form/types/formData.ts`
   - `src/lib/constants/formConstants.ts`
   - `src/utils/codeGenerator.ts`
   - `src/utils/formDataNormalizer.ts`
   - `src/utils/formDataTemplates.generated.ts`

## Verification

- ✅ Build successful: `npm run build:prod`
- ✅ All imports resolved correctly
- ✅ Old deprecated files removed
- ✅ Generated templates working correctly
- ✅ Clean directory structure

## Cleanup Completed

All deprecated re-export files and the old generated file have been removed:

- ✅ Removed `src/components/form/types/formData.ts`
- ✅ Removed `src/lib/constants/formConstants.ts`
- ✅ Removed `src/utils/codeGenerator.ts`
- ✅ Removed `src/utils/formDataNormalizer.ts`
- ✅ Removed `src/utils/formDataTemplates.generated.ts` (old location)
- ✅ Removed empty directories
- ✅ Updated `.gitignore` to reflect new generated file location

All imports now use the new `src/domain/form/` structure.
The generated templates file is now properly located at `src/domain/form/types/formDataTemplates.generated.ts`.

## Next Steps

1. Consider moving other domain-specific code into similar structures (e.g., `src/domain/auth`, `src/domain/user`)
2. Update TypeScript path mappings if needed for cleaner imports
3. Remove deprecated re-export files after migration period
