# Tailwind CSS Migration - Implementation Guide

This guide shows how to complete the remaining page migrations using the established patterns.

## 🎯 Current Status: ~40% Complete

**What's Done:**
- ✅ All UI components created (13 components)
- ✅ All layout components created
- ✅ 6 pages migrated (Overview, Steunzolen, Form Selection, Help, 404)
- ✅ Complete documentation

**What Remains:**
- ⏳ 6 intake forms (OSA, VLOS, OSB, OVAC, Pulman, Rebacare)
- ⏳ 3 core pages (New Client, Old Client, Form Results)

## 🚀 Quick Start: Migrating an Intake Form

### Step 1: Copy the Template
Start with the compact steunzolen form as your template:

```bash
cp src/presentation/form/intake-steunzolen/page-compact.tsx \
   src/presentation/form/intake-osa/page-tailwind.tsx
```

### Step 2: Update Imports
Replace the component name and any form-specific imports:

```tsx
// Change this
export const FormIntakeSteunzolenPageCompact = () => {

// To this
export const FormIntakeOsaPageTailwind = () => {
```

### Step 3: Update Form Fields
Replace form-specific state and fields with the ones from the original OSA page:

```tsx
// Original OSA form might have:
const [someOsaField, setSomeOsaField] = useState<string>('');

// Keep the structure but update field names
```

### Step 4: Replace Form Sections
Use the FormSection component pattern for all sections:

```tsx
<FormSection title={t('fieldLabel')} required={isRequired}>
  <Input 
    value={value} 
    onChange={e => setValue(e.target.value)} 
  />
</FormSection>
```

### Step 5: Test
```bash
# Update the page index to use the new component
# Then test locally
npm run dev
```

## 📋 Migration Checklist Template

For each page you migrate, check off these items:

### Before Starting
- [ ] Read the original page code
- [ ] Identify all form fields and state
- [ ] Note any special validation logic
- [ ] Check for any unique components

### During Migration
- [ ] Copy template file
- [ ] Update component name and exports
- [ ] Replace all form state variables
- [ ] Convert all form sections to FormSection pattern
- [ ] Replace all Chakra components with Tailwind equivalents
- [ ] Preserve validation logic
- [ ] Update submit handler

### Testing
- [ ] Page loads without errors
- [ ] All fields are visible and functional
- [ ] Validation works correctly
- [ ] Responsive design works (mobile/tablet/desktop)
- [ ] Form submits and navigates correctly
- [ ] Redux state updates properly

### Cleanup
- [ ] Remove any unused imports
- [ ] Format code (prettier)
- [ ] TypeScript compiles without errors
- [ ] Update page index file if needed

## 🎨 Component Mapping Reference

When migrating, replace Chakra components with these Tailwind equivalents:

### Layout Components
```tsx
// Chakra
<Flex w="full" direction="column" gap={4}>

// Tailwind
<div className="w-full flex flex-col gap-4">
```

```tsx
// Chakra
<Box bg="white" p={4} borderRadius="md">

// Tailwind
<div className="bg-white p-4 rounded-md">
```

```tsx
// Chakra
<SimpleGrid columns={{base: 1, md: 2}} spacing={4}>

// Tailwind
<SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
// OR
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Form Components
```tsx
// Chakra
<Input placeholder="..." value={v} onChange={fn} />

// Tailwind
<Input placeholder="..." value={v} onChange={fn} />
// (Same API!)
```

```tsx
// Chakra
<Textarea minH="100px" />

// Tailwind
<Textarea className="min-h-[100px]" />
```

```tsx
// Chakra
<RadioGroup value={v} onChange={fn}>
  <Stack spacing={2}>
    <Radio value="1">Option 1</Radio>
  </Stack>
</RadioGroup>

// Tailwind
<RadioGroup value={v} onChange={fn}>
  <div className="flex flex-col gap-2">
    <Radio value="1">Option 1</Radio>
  </div>
</RadioGroup>
```

```tsx
// Chakra
<Button variant="primary" onClick={fn}>

// Tailwind
<Button variant="primary" onClick={fn}>
// (Same API!)
```

### Text Components
```tsx
// Chakra
<Text fontWeight="bold" fontSize="lg">

// Tailwind
<p className="font-bold text-lg">
```

### Dividers
```tsx
// Chakra
<Divider />

// Tailwind
<FormDivider />
// OR
<div className="border-t border-gray-200" />
```

## 🔄 Common Patterns

### Pattern 1: Form Section with Single Input
```tsx
<FormSection title={t('shoeSize')} required>
  <Input
    placeholder={t('placeholder')}
    value={size}
    onChange={e => setSize(e.target.value)}
  />
</FormSection>
```

### Pattern 2: Form Section with Radio Group
```tsx
<FormSection title={t('selectOption')} bordered>
  <RadioGroup value={selected} onChange={setSelected}>
    <div className="flex flex-col gap-2">
      {OPTIONS.map(opt => (
        <Radio key={opt.value} value={opt.value} size="sm">
          {t(opt.label)}
        </Radio>
      ))}
    </div>
  </RadioGroup>
</FormSection>
```

### Pattern 3: Two-Column Input Grid
```tsx
<FormSection title={t('measurements')}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormControl>
      <FormLabel>{t('left')}</FormLabel>
      <Input type="number" value={left} onChange={e => setLeft(e.target.value)} />
    </FormControl>
    <FormControl>
      <FormLabel>{t('right')}</FormLabel>
      <Input type="number" value={right} onChange={e => setRight(e.target.value)} />
    </FormControl>
  </div>
</FormSection>
```

### Pattern 4: Textarea Section
```tsx
<FormSection title={t('notes')}>
  <Textarea
    placeholder={t('placeholder')}
    value={notes}
    onChange={e => setNotes(e.target.value)}
    className="min-h-[100px] md:min-h-[120px]"
  />
</FormSection>
```

### Pattern 5: Conditional Sections
```tsx
{!isTalonette && (
  <>
    <FormDivider />
    <FormSection title={t('options')} bordered>
      {/* content */}
    </FormSection>
  </>
)}
```

## 📝 Example Migration: Intake OSA

Here's a step-by-step example of how to migrate the OSA intake form:

### 1. Start with Template
```bash
cp src/presentation/form/intake-steunzolen/page-compact.tsx \
   src/presentation/form/intake-osa/page-tailwind.tsx
```

### 2. Update Component Name
```tsx
// Change
export const FormIntakeSteunzolenPageCompact = () => {

// To
export const FormIntakeOsaPageTailwind = () => {
```

### 3. Review Original OSA Form
Open `src/presentation/form/intake-osa/page.tsx` and identify:
- All state variables
- All form sections
- Validation logic
- Submit handler

### 4. Replace State Variables
Replace steunzolen-specific state with OSA-specific state:

```tsx
// Remove steunzolen state
// const [schoenmaat, setSchoenmaat] = useState<string>('');

// Add OSA state (from original file)
const [leftFoot, setLeftFoot] = useState<string>('');
const [rightFoot, setRightFoot] = useState<string>('');
// ... etc
```

### 5. Replace Form Sections
Keep using FormSection pattern but with OSA fields:

```tsx
<FormSection title={t('footMeasurements')} required>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormControl>
      <FormLabel>{t('leftFoot')}</FormLabel>
      <Input value={leftFoot} onChange={e => setLeftFoot(e.target.value)} />
    </FormControl>
    <FormControl>
      <FormLabel>{t('rightFoot')}</FormLabel>
      <Input value={rightFoot} onChange={e => setRightFoot(e.target.value)} />
    </FormControl>
  </div>
</FormSection>
```

### 6. Update Validation
```tsx
const getMissingFields = () => {
  const missing = [];
  
  // Add OSA-specific validation
  if (!leftFoot.trim()) {
    missing.push({fieldName: t('leftFoot'), fieldId: 'field-leftfoot'});
  }
  
  return missing;
};
```

### 7. Update Submit Handler
```tsx
const handleSubmit = () => {
  if (!areAllFieldsValid) {
    // ... validation error handling
    return;
  }

  // Update with OSA-specific Redux action
  dispatch(
    setIntakeOsaData({
      leftFoot,
      rightFoot,
      // ... other OSA fields
    })
  );

  router.push(Routes.form_results);
};
```

### 8. Test
```bash
npm run dev
# Navigate to /intake-osa
# Test all fields and validation
```

## 🎓 Pro Tips

1. **Reuse FormSection everywhere** - It's the key to consistency
2. **Keep spacing consistent** - Use `gap-4` and `gap-6` primarily
3. **Use responsive classes** - `base`, `md`, `lg` breakpoints
4. **Preserve validation logic** - Don't skip validation
5. **Test on mobile** - Responsive design is important
6. **Check TypeScript** - Run `npm run compile` frequently

## 🐛 Common Issues & Solutions

### Issue: Component not rendering
**Solution:** Check imports are from the correct path:
```tsx
import { Button } from '@/presentation/components/ui';
```

### Issue: Styling looks wrong
**Solution:** Make sure parent container has proper classes:
```tsx
<div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6">
```

### Issue: Grid not responsive
**Solution:** Use responsive column classes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Issue: TypeScript errors
**Solution:** Check that all props match component interfaces. Components are fully typed!

## 🎯 Next Pages to Migrate (In Priority Order)

### High Priority
1. **New Client Form** - Entry point to app
2. **Old Client Form** - Alternative entry point
3. **Form Results** - Critical for user workflow

### Medium Priority
4. **Intake OSA** - Large form but follows same pattern
5. **Intake VLOS** - Large form but follows same pattern
6. **Intake OSB** - Medium complexity

### Low Priority
7. **Intake OVAC** - Medium complexity
8. **Intake Pulman** - Simpler form
9. **Intake Rebacare** - Simplest form

## 📚 Resources

- **Component Documentation**: `TAILWIND_COMPONENTS.md`
- **Migration Status**: `MIGRATION_STATUS.md`
- **Template File**: `src/presentation/form/intake-steunzolen/page-compact.tsx`
- **Tailwind Docs**: https://tailwindcss.com/docs

## 🏁 When You're Done

Once all pages are migrated:

1. **Replace original files** with Tailwind versions
2. **Remove** `-tailwind` suffix from filenames
3. **Test** entire application flow
4. **Uninstall** Chakra UI dependencies
5. **Update** README.md
6. **Celebrate** 🎉 - You've modernized the entire UI!
