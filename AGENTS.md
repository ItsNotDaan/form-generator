# Development Agents & Architecture Guide

Comprehensive guide for development agents working on the Form Generator project. This document covers architecture patterns, design principles, component structure, and best practices.

## Project Overview

The Form Generator is a Next.js application for building and managing intake and form pages for Eemland Schoentechniek. The site is deployed as a static export to GitHub Pages with full internationalization (Dutch/English) support.

**Key Facts:**

- Framework: Next.js 14+ (static export)
- Styling: Tailwind CSS v4 with custom design tokens
- State Management: Redux Toolkit with redux-persist
- Forms: React Hook Form + Zod validation
- Components: shadcn/ui + custom form components
- Internationalization: next-translate (i18n)
- Deployment: GitHub Pages (gh-pages)

## Architecture Overview

### Domain-Driven Design

The project follows a domain-driven architecture with all form-related functionality consolidated under `src/domain/form/`:

```
src/domain/form/
├── index.ts                              # Barrel export
├── types/
│   ├── index.ts
│   ├── formData.ts                      # All form type definitions (single source of truth)
│   └── formDataTemplates.generated.ts   # Auto-generated empty templates
├── constants/
│   ├── index.ts
│   └── formConstants.ts                 # Form constants and dropdown options
├── normalizers/
│   ├── index.ts
│   └── formDataNormalizer.ts           # Data transformation utilities
└── generators/
    ├── index.ts
    └── codeGenerator.ts                # Medical code generation logic
```

**Import Pattern:**

```typescript
// Prefer barrel exports for clean imports
import {ClientData, IntakeVLOSData} from '@/domain/form';
import {normalizeFormData} from '@/domain/form/normalizers';
import {FORM_OPTIONS} from '@/domain/form/constants';
```

### Project Structure

```
src/
├── components/          # UI components and layout wrappers
│   ├── layout/         # Layout components (FormSection, BaseLayout, PageHeader)
│   ├── ui/             # Form UI components (Input, Select, Checkbox, etc.)
│   └── icons/          # SVG icon components
├── pages/              # Next.js routes (one form per page)
├── domain/             # Business logic and data models
├── store/              # Redux state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── lib/                # Library utilities and constants
```

## Component Architecture

All forms follow a strict hierarchical component structure documented in [website-design-language.md](docs/website-design-language.md).

### Component Hierarchy

```
FormSection (spacing wrapper)
└── FormCard (collapsible section with toggle support)
    └── FormBlock (grid layout container)
        └── FormItemWrapper (label + control)
            └── Form Control (Input, Select, Checkbox, RadioGroup, Textarea, DatePicker)
```

### FormCard - Section Container

Top-level section wrapper with optional toggle functionality.

**Usage:**

```tsx
<FormCard
  title={t('sectionTitle')}
  description={t('sectionDescription')}
  toggleAble={true}
  toggleLabel={t('enableSection')}
  toggleId="section-toggle"
  defaultOpen={false}
  onToggleChange=(isOpen) => {
    form.setValue('sectionEnabled', isOpen);
  }
>
  {/* FormBlocks and content */}
</FormCard>
```

**Props:**

- `title` (string): Section heading
- `description` (string, optional): Subtitle
- `toggleAble` (boolean): Show toggle switch
- `toggleLabel` (string): Toggle label text
- `toggleId` (string): Unique toggle identifier
- `defaultOpen` (boolean): Initial open state
- `onToggleChange` (fn): Callback on toggle
- `centerTitle` (boolean): Center-align title
- `contentClassName` (string): Custom content classes

### FormBlock - Grid Container

Grid layout for organizing fields 1-4 columns wide.

**Usage:**

```tsx
<FormBlock
  columns={2}
  dividers={true}
  title={t('blockTitle')}
  alignItems="start"
>
  <FormItemWrapper label={t('field1')}>
    <Input />
  </FormItemWrapper>
  <FormItemWrapper label={t('field2')}>
    <Input />
  </FormItemWrapper>
</FormBlock>
```

**Props:**

- `columns` (1 | 2 | 3 | 4): Column count (responsive on mobile)
- `dividers` (boolean): Show vertical dividers
- `hoverEffect` (boolean): Apply hover border effect
- `title` (string): Optional block title
- `alignItems` ('start' | 'center' | 'end' | 'stretch'): Vertical alignment
- `responsive` (boolean): Use responsive grid
- `className` (string): Custom wrapper classes
- `contentClassName` (string): Custom grid classes

### FormItemWrapper - Field Wrapper

Wraps individual form controls with labels.

**Usage:**

```tsx
<FormItemWrapper label={t('fieldLabel')} requiredLabel={true}>
  <Input placeholder={t('placeholder')} />
</FormItemWrapper>
```

**Props:**

- `label` (string): Field label text
- `requiredLabel` (boolean): Show required indicator
- `children`: Form control element (Input, Select, etc.)

### Form Controls

Available form controls for use within FormItemWrapper:

| Component    | Purpose                       | Example                                           |
| ------------ | ----------------------------- | ------------------------------------------------- |
| `Input`      | Text/number input             | `<Input type="number" placeholder="cm" />`        |
| `Select`     | Dropdown selection            | `<Select value={v} onValueChange={setV}>...`      |
| `RadioGroup` | Single choice selection       | `<RadioGroup value={v} onValueChange={setV}>...`  |
| `Checkbox`   | Boolean toggle                | `<Checkbox checked={v} onCheckedChange={setV} />` |
| `Textarea`   | Multi-line text               | `<Textarea rows={4} />`                           |
| `DatePicker` | Date selection                | `<DatePicker value={d} onChange={setD} />`        |
| `Switch`     | Boolean toggle (switch style) | `<Switch checked={v} onCheckedChange={setV} />`   |

## Design System

### Tailwind Configuration

The project uses Tailwind CSS v4 with custom design tokens in [src/index.css](src/index.css).

**Spacing Scale:**

```css
--spacing-0: 0px /* 0 */ --spacing-1: 4px /* sm */ --spacing-2: 8px /* md */
  --spacing-3: 12px /* lg */ --spacing-4: 16px /* xl */ --spacing-6: 24px
  /* 2xl */ --spacing-8: 32px /* 3xl */ --spacing-12: 48px /* 4xl */;
```

**Border Radius:**

```css
--radius-sm: 0.375rem /* 6px */ --radius-md: 0.5rem /* 8px */ --radius: 0.75rem
  /* 12px */ --radius-lg: 1rem /* 16px */ --radius-radio: 14px
  /* Radio/checkboxes */;
```

**Color Scheme:**

- Uses CSS custom properties (variables) for theming
- Supports light/dark mode with theme-provider
- See [src/index.css](src/index.css) for complete color palette

### Responsive Design Rules

**Breakpoints:**

- Mobile (default): single column
- `md` breakpoint: 2+ columns
- `lg` breakpoint: 3+ columns

**Spacing Constants:**

- Between FormCards: `space-y-6` (24px)
- Between FormBlocks: `space-y-4` (16px)
- Between FormItems: Inherits from FormBlock/FormCard
- Field width: `w-2/3` for consistent input sizing

**Mobile Optimization:**

```tsx
// Use responsive classes for mobile-first design
<FormBlock columns={1} className="lg:col-span-2" />

// Stack on mobile, grid on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
```

## Form State Management

### Data Flow

All forms use **React Hook Form** with **Zod** schema validation for type-safe form handling.

**Complete Form Example:**

```typescript
// 1. Define schema with Zod
const formSchema = z.object({
  clientName: z.string().min(1, 'Name required'),
  clientEmail: z.string().email('Invalid email'),
  measurements: z.object({
    leftCm: z.string().optional(),
    rightCm: z.string().optional(),
  }),
  insoleEnabled: z.boolean().default(false),
  heelRaiseLeft: z.string().optional(),
  heelRaiseRight: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// 2. Initialize form with validation
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    clientName: '',
    clientEmail: '',
    measurements: { leftCm: '', rightCm: '' },
    insoleEnabled: false,
    heelRaiseLeft: '',
    heelRaiseRight: '',
  },
});

// 3. Use form in JSX
<form onSubmit={form.handleSubmit(onSubmit)}>
  <FormCard title="Client Info">
    <FormBlock columns={2}>
      <FormItemWrapper label="Name" requiredLabel={true}>
        <Input {...form.register('clientName')} />
      </FormItemWrapper>
      <FormItemWrapper label="Email" requiredLabel={true}>
        <Input type="email" {...form.register('clientEmail')} />
      </FormItemWrapper>
    </FormBlock>
  </FormCard>

  <FormCard
    title="Insoles"
    toggleAble={true}
    toggleId="insoleToggle"
    defaultOpen={form.watch('insoleEnabled')}
    onToggleChange={(isOpen) => {
      form.setValue('insoleEnabled', isOpen);
      if (!isOpen) {
        form.setValue('heelRaiseLeft', '');
        form.setValue('heelRaiseRight', '');
      }
    }}
  >
    <FormBlock columns={2} dividers={true}>
      <FormItemWrapper label="Heel Raise Left (cm)">
        <Input type="number" {...form.register('heelRaiseLeft')} />
      </FormItemWrapper>
      <FormItemWrapper label="Heel Raise Right (cm)">
        <Input type="number" {...form.register('heelRaiseRight')} />
      </FormItemWrapper>
    </FormBlock>
  </FormCard>

  <button type="submit">Submit</button>
</form>

// 4. Handle submission
const onSubmit = (data: FormData) => {
  // Redux action to store form data
  dispatch(setFormData(data));
};
```

### Redux Form State

Redux stores form data with auto-persistence to localStorage:

```typescript
// src/domain/store/slices/formData.ts
const initialState: FormState = {
  clientData: getFormDataTemplate('ClientData'),
  intakeVLOS: getFormDataTemplate('IntakeVLOSData'),
  // ... other form types
};
```

**Using Redux Form Data:**

```typescript
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setFormData, clearFormData} from '@/domain/store/slices/formData';

export const MyForm = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.formData.intakeVLOS);

  const handleSave = (data: IntakeVLOSData) => {
    dispatch(setFormData({formType: 'IntakeVLOS', data}));
  };

  const handleClear = () => {
    dispatch(clearFormData('IntakeVLOS'));
  };
};
```

### Form Data Persistence

Enable automatic persistence with `useFormPersistence` hook:

```typescript
import { useFormPersistence } from '@/hooks/useFormPersistence';

export const MyForm = () => {
  const form = useForm<FormData>({ /* config */ });

  // Auto-persist to localStorage on form changes
  const { clearStorage } = useFormPersistence('my-form-key', form.watch, form.setValue);

  const handleReset = () => {
    clearStorage();
    form.reset();
  };

  return (/* form JSX */);
};
```

## Type Safety & Code Generation

### Single Source of Truth

All form types are defined in **one location**: [src/domain/form/types/formData.ts](src/domain/form/types/formData.ts)

```typescript
// src/domain/form/types/formData.ts
export interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface IntakeVLOSData extends ClientData {
  measurements: {
    leftCm: string;
    rightCm: string;
  };
  insoleEnabled: boolean;
  heelRaiseLeft?: string;
  heelRaiseRight?: string;
}

// ... all 9 form types defined here
```

### Automatic Template Generation

The build system automatically generates empty data templates from type definitions:

```bash
# Manual generation
npm run generate:empty-data

# Automatic (runs before build)
npm run build:prod    # Runs prebuild:prod script
npm run build:acc     # Runs prebuild:acc script
npm run build:develop # Runs prebuild:develop script
```

This generates [src/domain/form/types/formDataTemplates.generated.ts](src/domain/form/types/formDataTemplates.generated.ts):

```typescript
export const formDataTemplates = {
  ClientData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: undefined,
  },
  IntakeVLOSData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: undefined,
    measurements: {
      leftCm: '',
      rightCm: '',
    },
    insoleEnabled: false,
    heelRaiseLeft: undefined,
    heelRaiseRight: undefined,
  },
  // ... all 9 form types
};
```

**⚠️ DO NOT EDIT**: `formDataTemplates.generated.ts` is auto-generated. Modify `formData.ts` instead and run `npm run generate:empty-data`.

### Adding New Form Fields

**Process:**

1. Edit [src/domain/form/types/formData.ts](src/domain/form/types/formData.ts)
2. Add new field to interface:
   ```typescript
   export interface IntakeVLOSData extends ClientData {
     // ... existing fields
     newField: string; // Add new field
   }
   ```
3. Run `npm run generate:empty-data`
4. Commit both files (formData.ts and formDataTemplates.generated.ts)

## Form Data Normalization

### Normalizing for Output

Use `formDataNormalizer` to clean and prepare form data for export/JSON output:

```typescript
import {normalizeFormData} from '@/domain/form/normalizers';

const rawFormData = {
  firstName: 'John',
  lastName: '',
  email: 'john@example.com',
  measurements: {
    leftCm: '',
    rightCm: '5',
  },
};

const normalized = normalizeFormData(rawFormData);
// Returns only non-empty values:
// {
//   firstName: 'John',
//   email: 'john@example.com',
//   measurements: { rightCm: '5' }
// }
```

**Features:**

- Removes empty/null/undefined values
- Filters out falsy values
- Preserves object nesting structure
- Adds metadata (timestamps, build SHA)

## Code Organization Best Practices

### File Structure Patterns

**Component Files:**

```typescript
// src/components/ui/my-component.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

/**
 * MyComponent provides... (JSDoc description)
 *
 * @example
 * <MyComponent title="Label" onChange={handleChange} />
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

**Type Definition Files:**

```typescript
// src/domain/form/types/myTypes.ts
export interface MyType {
  id: string;
  name: string;
  metadata?: Record<string, unknown>;
}

export type MyEnum = 'option1' | 'option2' | 'option3';

export const myTypeGuard = (value: unknown): value is MyType => {
  return typeof value === 'object' && value !== null && 'id' in value;
};
```

**Utility Files:**

```typescript
// src/utils/my-util.ts
/**
 * Utility function description
 * @param input - Input parameter description
 * @returns Return value description
 */
export const myUtil = (input: string): string => {
  // Implementation
  return input;
};
```

**Barrel Exports:**

```typescript
// src/components/ui/index.ts
export {Input} from './input';
export {Select, SelectTrigger, SelectContent, SelectItem} from './select';
export {Checkbox} from './checkbox';
export {Button} from './button';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `FormCard`, `Input`, `PageHeader`)
- **Files**: kebab-case (e.g., `form-card.tsx`, `input.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useFormPersistence`, `useCallback`)
- **Utilities**: camelCase (e.g., `normalizeFormData`, `getAssetPath`)
- **Types**: PascalCase (e.g., `FormData`, `ClientData`, `IntakeVLOSData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `FORM_OPTIONS`, `DEFAULT_LOCALE`)
- **CSS Classes**: kebab-case (e.g., `form-card`, `input-field`, `grid-column`)
- **IDs**: kebab-case (e.g., `insole-toggle`, `client-section`)

## Internationalization (i18n)

### Translation Files

Located in `locales/{locale}/` with JSON structure:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "close": "Close"
  },
  "form": {
    "formTitle": "Intake Form",
    "clientSection": "Client Information",
    "firstName": "First Name",
    "measurements": "Measurements"
  }
}
```

### Using Translations in Components

```typescript
import { useTranslation } from 'next-translate';

export const MyForm = () => {
  const { t } = useTranslation('form'); // Use 'form' namespace

  return (
    <FormCard title={t('formTitle')} description={t('clientSection')}>
      <FormItemWrapper label={t('firstName')}>
        <Input />
      </FormItemWrapper>
    </FormCard>
  );
};
```

**Keys:**

- Use namespaces: `'form'`, `'common'`
- Dot notation for nested keys: `t('form.section.field')`
- Create keys for all user-facing text
- Keep keys lowercase and descriptive

## Building & Deployment

### Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Run TypeScript compiler check
npm run compile

# Run linting
npm run lint
npm run fix  # Auto-fix linting issues
```

### Production Build

```bash
# Build for production (auto-runs generate:empty-data)
npm run build

# Build for specific environment
npm run build:prod     # Production environment
npm run build:acc      # Acceptance environment
npm run build:develop  # Development/test environment
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
# Automatically builds and pushes /out to gh-pages branch

# Start production server (requires prior build)
npm run start:prod
npm run start:acc
npm run start:develop
```

**Base Path:**

- Site deployed under `/form-generator` (see [next.config.js](next.config.js))
- Use `getAssetPath()` for static asset URLs with proper base path

## Performance Optimization

### Code Splitting

- Next.js automatically splits pages into separate bundles
- Use dynamic imports for heavy components:
  ```typescript
  import dynamic from 'next/dynamic';
  const HeavyComponent = dynamic(() => import('./HeavyComponent'));
  ```

### Image Optimization

- Place images in `public/images/`
- Use `getAssetPath()` for URLs with base path:

  ```typescript
  import { getAssetPath } from '@/utils/assetPath';

  <img src={getAssetPath('/images/logo.png')} alt="Logo" />
  ```

### Form Performance

- Use `watch()` sparingly (triggers re-render)
- Memoize complex components:
  ```typescript
  export const MyComponent = React.memo(props => {
    return /* JSX */;
  });
  ```
- Debounce frequent field updates

### Redux Store

- Store only form data, not derived state
- Use selectors for computed values
- Connection via redux-persist for localStorage sync

## Testing & Validation

### Type Safety

- Compile TypeScript before commit:
  ```bash
  npm run compile
  ```
- Use strict mode in tsconfig.json
- Create interfaces for all data structures

### Form Validation

- Use Zod schemas for client-side validation
- Define schemas co-located with form components
- Reuse schemas for both form and data processing

**Example Zod Schema:**

```typescript
import {z} from 'zod';

const clientDataSchema = z.object({
  firstName: z.string().min(1, 'First name required').max(50),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  measurements: z.object({
    leftCm: z
      .string()
      .refine(
        val => val === '' || !isNaN(parseFloat(val)),
        'Must be a valid number',
      ),
    rightCm: z
      .string()
      .refine(
        val => val === '' || !isNaN(parseFloat(val)),
        'Must be a valid number',
      ),
  }),
});
```

### Linting

- ESLint configured with gts rules
- Run linter before commit:
  ```bash
  npm run lint
  npm run fix  # Auto-fix issues
  ```

## Common Patterns

### Toggle Section Pattern

```tsx
// Section that can be enabled/disabled
<FormCard
  title={t('optionalSection')}
  toggleAble={true}
  toggleLabel={t('enableSection')}
  toggleId="optional-toggle"
  defaultOpen={form.watch('sectionEnabled')}
  onToggleChange={isOpen => {
    form.setValue('sectionEnabled', isOpen);
    if (!isOpen) {
      // Clear related fields when toggling off
      form.setValue('field1', '');
      form.setValue('field2', '');
    }
  }}
>
  {/* Section content */}
</FormCard>
```

### Left/Right Measurement Pattern

```tsx
// Paired measurements (left/right, top/bottom)
<FormBlock columns={2} dividers={true} title={t('measurements')}>
  <FormItemWrapper label={t('leftCm')}>
    <Input type="number" placeholder="cm" {...form.register('leftCm')} />
  </FormItemWrapper>
  <FormItemWrapper label={t('rightCm')}>
    <Input type="number" placeholder="cm" {...form.register('rightCm')} />
  </FormItemWrapper>
</FormBlock>
```

### Radio Group Selection Pattern

```tsx
// Single-choice selection with custom styling
<FormItemWrapper label={t('selectOption')}>
  <RadioGroup value={value} onValueChange={setValue}>
    <div className="flex flex-col gap-3">
      {options.map(option => (
        <Label
          key={option.value}
          className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30"
        >
          <RadioGroupItem value={option.value} id={option.value} />
          <span className="text-sm">{option.label}</span>
        </Label>
      ))}
    </div>
  </RadioGroup>
</FormItemWrapper>
```

### Conditional Section Pattern

```tsx
// Show/hide sections based on other field values
{
  form.watch('intakeType') === 'vlos' && (
    <FormCard title={t('vlosSpecific')}>{/* VLOS-specific content */}</FormCard>
  );
}
```

## Git Workflow

### Branching

- Main branch: `main` (production-ready)
- Feature branches: `feature/short-description`
- Fix branches: `fix/issue-description`

### Commits

- Write clear commit messages
- Include issue references when applicable
- Keep commits atomic and focused

**Example:**

```
feat: add heel raise measurement fields for VLOS form

- Add heelRaiseLeft and heelRaiseRight to IntakeVLOSData type
- Generate updated templates
- Add UI for heel raise inputs in FormBlock with 2 columns
- Update translation keys

Closes #123
```

### Pull Requests

- Provide clear PR description
- Reference related issues
- Ensure lint and type checks pass
- Request reviews from team members

## MCP Servers & AI Integration

### What is MCP?

**Model Context Protocol (MCP)** is an open protocol that enables AI assistants to securely connect to external data sources and tools. The shadcn MCP Server allows AI assistants to interact with component registries and the shadcn CLI for browsing, searching, and installing components.

### shadcn MCP Server

The shadcn MCP server provides AI assistants with:

- **Browse Components** - List all available components, blocks, and templates from configured registries
- **Search Across Registries** - Find specific components by name or functionality
- **Install with Natural Language** - Add components using conversational prompts
- **Support for Multiple Registries** - Access shadcn/ui, private registries, and third-party sources

### VS Code Configuration

To enable the shadcn MCP server in VS Code with GitHub Copilot:

1. Create or update `.vscode/mcp.json`:

```json
{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

2. Open `.vscode/mcp.json` and click **Start** next to the shadcn server
3. Verify the server is running (you should see a green indicator)

### Quick Start Commands

Once configured, you can use natural language with GitHub Copilot to:

```
// Browse available components
Show me all available components in the shadcn registry

// Install specific components
Add the button, dialog and card components to my project

// Create components from templates
Create a contact form using components from the shadcn registry
```

### Registry Configuration

Registries are configured in [components.json](components.json):

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

You can add custom registries for:

- Private company component libraries
- Third-party registries
- Namespaced registries (using `@` prefix)

## Resources

- [website-design-language.md](docs/website-design-language.md) - Component patterns and examples
- [RESTRUCTURING.md](RESTRUCTURING.md) - Domain architecture migration details
- [README.md](README.md) - Project setup and deployment instructions
- [tsconfig.json](tsconfig.json) - TypeScript configuration
- [next.config.js](next.config.js) - Next.js configuration with base path setup

## Quick Reference Checklist

When implementing a new form:

- [ ] Define all types in `src/domain/form/types/formData.ts`
- [ ] Run `npm run generate:empty-data` to create templates
- [ ] Create page in `src/pages/{form-name}/index.tsx`
- [ ] Use `FormCard` > `FormBlock` > `FormItemWrapper` hierarchy
- [ ] Define Zod schema for validation
- [ ] Add i18n keys to `locales/*/form.json`
- [ ] Use Redux to store form state
- [ ] Enable form persistence with `useFormPersistence`
- [ ] Use `getAssetPath()` for static assets
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Run `npm run compile` and `npm run lint` before commit
- [ ] Deploy via `npm run deploy`

## Support & Questions

For architecture questions or pattern clarification, refer to:

1. Existing form pages in `src/pages/intake-*/`
2. Component examples in [website-design-language.md](docs/website-design-language.md)
3. Type definitions in `src/domain/form/types/`
4. State management in `src/domain/store/`
