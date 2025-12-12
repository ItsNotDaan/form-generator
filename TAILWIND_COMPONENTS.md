# Tailwind CSS Reusable Components Guide

This document explains the reusable component pattern implemented with Tailwind CSS, addressing the requirement for component reusability across pages (e.g., "steunzolen" components).

## Component Library Structure

```
src/presentation/components/
├── ui/              # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── FormControl.tsx
│   ├── FormLabel.tsx
│   ├── Radio.tsx
│   ├── RadioGroup.tsx
│   ├── Checkbox.tsx
│   ├── Alert.tsx
│   ├── FormSection.tsx
│   ├── FormDivider.tsx
│   └── index.ts
├── layout/          # Layout components
│   ├── BaseLayout.tsx
│   ├── PageHeader.tsx
│   ├── Link.tsx
│   └── index.ts
└── icons/           # Icon components
    └── LeftArrowIcon.tsx
```

## Key Benefits

### 1. Component Reusability
Components can be imported and reused across all pages:

```tsx
import { Button, FormSection, Input } from '@/presentation/components/ui';

// Use anywhere!
<FormSection title="Shoe Size" required>
  <Input placeholder="Enter size..." />
</FormSection>
```

### 2. Consistent Styling
All components follow the design system defined in `tailwind.config.js`:
- Colors: brand, gray, green, red, blue, etc.
- Spacing: 1-22 (4px-88px)
- Border radius: 0.5-2 (2px-8px)
- Shadows: custom shadows from Chakra theme

### 3. TypeScript Support
All components are fully typed for better DX:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
```

## Component Examples

### Button Component
```tsx
<Button variant="primary" size="md" onClick={handleSubmit}>
  Save
</Button>

<Button variant="secondary" className="p-4">
  Secondary Action
</Button>
```

**Variants:**
- `primary` - Brand color with shadow
- `secondary` - Gray with shadow  
- `outline` - Border only
- `ghost` - No background

### FormSection Component
**The secret to reusability!** Wrap form sections for consistent structure:

```tsx
<FormSection title="Medical Indication" required>
  <Textarea placeholder="Enter details..." />
</FormSection>

<FormSection title="Price Options" bordered>
  <RadioGroup value={price} onChange={setPrice}>
    {/* Radio options */}
  </RadioGroup>
</FormSection>
```

**Props:**
- `title` - Section heading
- `required` - Shows asterisk (*)
- `bordered` - Adds border and padding
- `className` - Additional styling

### RadioGroup Pattern
```tsx
<RadioGroup value={selected} onChange={setSelected}>
  <div className="flex flex-col gap-2">
    <Radio value="option1">Option 1</Radio>
    <Radio value="option2" size="sm">Option 2</Radio>
  </div>
</RadioGroup>
```

### Alert Component
```tsx
<Alert status="warning">
  <AlertIcon status="warning" />
  <div>
    <p className="font-bold">Missing Fields</p>
    <ul>{/* list items */}</ul>
  </div>
</Alert>
```

**Status types:** `info`, `warning`, `success`, `error`

## Reusing Across Pages

The `FormSection` component makes it easy to reuse entire form sections across different intake pages:

### Example: Steunzolen Form

```tsx
// intake-steunzolen/page.tsx
<FormSection title={t('whichPair')} bordered>
  <RadioGroup value={welkPaar} onChange={setWelkPaar}>
    {PAARTYPE_OPTIES.map(opt => (
      <Radio key={opt.value} value={opt.value}>
        {t(opt.value)}
      </Radio>
    ))}
  </RadioGroup>
</FormSection>
```

**This exact pattern can be copied to:**
- `/intake-osa`
- `/intake-vlos`
- `/intake-pulman`
- Any other intake form!

### Common Reusable Sections

1. **Medical Indication Section**
```tsx
<FormSection title={t('medicalIndication')}>
  <Textarea
    placeholder={t('placeholder')}
    value={value}
    onChange={e => setValue(e.target.value)}
    className="min-h-[100px]"
  />
</FormSection>
```

2. **Price Selection Section**
```tsx
<FormSection title={t('price')} required bordered>
  <RadioGroup value={price} onChange={setPrice}>
    {/* price options */}
  </RadioGroup>
</FormSection>
```

3. **Two-Column Input Fields**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <FormControl>
    <FormLabel>{t('left')}</FormLabel>
    <Input type="number" value={left} onChange={handleLeft} />
  </FormControl>
  <FormControl>
    <FormLabel>{t('right')}</FormLabel>
    <Input type="number" value={right} onChange={handleRight} />
  </FormControl>
</div>
```

## Layout Components

### BaseLayout
Main page wrapper with header and navigation:

```tsx
<BaseLayout 
  title={t('pageTitle')}
  showBackButton={true}
  onBackButtonClicked={() => router.back()}
>
  {/* Your page content */}
</BaseLayout>
```

### PageHeader
Automatically included in BaseLayout. Shows:
- Back button (optional)
- Page title (centered)
- EEMLAND logo (right)
- Responsive design (mobile/desktop)

## Utility Classes

Common Tailwind patterns used throughout:

```tsx
// Container with padding and gap
className="flex flex-col gap-4 p-4 md:p-6"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Border and rounded
className="border border-gray-200 rounded-md p-4"

// Responsive text
className="text-base md:text-lg font-bold"

// Full width with responsive max-width
className="w-full sm:w-auto"
```

## Migration Pattern

To migrate a Chakra UI page to Tailwind:

1. **Replace imports:**
```tsx
// Before
import { Box, Flex, Button, Input } from '@chakra-ui/react';

// After
import { Button, Input } from '@/presentation/components/ui';
```

2. **Replace layout:**
```tsx
// Before
<Flex w="full" direction="column" gap={4}>

// After
<div className="w-full flex flex-col gap-4">
```

3. **Use FormSection for structure:**
```tsx
// Before
<Box>
  <Text fontWeight="bold">{title}</Text>
  <Input />
</Box>

// After
<FormSection title={title}>
  <Input />
</FormSection>
```

4. **Replace Chakra props with Tailwind classes:**
- `w="full"` → `className="w-full"`
- `bg="white"` → `className="bg-white"`
- `p={4}` → `className="p-4"`
- `gap={6}` → `className="gap-6"`
- `borderRadius="md"` → `className="rounded-md"`

## Performance Benefits

- **Smaller bundle:** Tailwind purges unused CSS (typically 5-10KB in production)
- **No runtime:** No CSS-in-JS runtime overhead
- **Faster builds:** Static CSS compilation
- **Better caching:** CSS file can be cached separately

## Next Steps

1. Migrate remaining intake forms using the patterns above
2. Create additional reusable components as needed
3. Document any custom patterns specific to your forms
4. Remove Chakra UI dependencies once migration is complete
