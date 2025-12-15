# Migration Template Guide

## ✅ Complete Examples Created

Two fully working example pages demonstrate the complete migration pattern using pure shadcn/ui components.

---

## 📄 Example 1: Overview Page (Simple Page Pattern)

**File:** `src/pages/index.tsx`

**Status:** ✅ 100% Pure shadcn/ui - No custom components

**Use this pattern for:**
- Help page
- 404 page
- Form selection page
- Any simple navigation/display page

**Key Features:**
- Card-based layout
- Button navigation
- lucide-react icons
- Responsive grid (1-2-3 columns)
- Hover effects

**Components Used (All shadcn/ui):**
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserPlus, Users, FileText, ClipboardList } from 'lucide-react';
```

---

## 📄 Example 2: New Client Form (Complex Form Pattern)

**File:** `src/pages/new-client/index.tsx`

**Status:** ✅ 95% Pure shadcn/ui - 2 custom wrappers to replace

**Use this pattern for:**
- Old client form
- All 7 intake forms (steunzolen, OSA, VLOS, OSB, OVAC, Pulman, Rebacare)
- Form results page

**Key Features:**
- 5 Card sections for organization
- Full form validation with error highlighting
- Step indicator (currentStep={1})
- Redux integration
- Responsive layout (1-3 columns)
- Error alerts

**Components Used:**
```tsx
// Pure shadcn/ui ✅
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom wrappers (TO REPLACE) ⚠️
import { DatePicker } from '@/presentation/components/ui/DatePicker';
import { Select } from '@/presentation/components/ui/Select';
```

---

## 🔄 How to Replace Custom Wrappers

### Replace DatePicker with Calendar + Popover

**Current (custom wrapper):**
```tsx
<DatePicker
  date={date ? new Date(date) : undefined}
  onDateChanged={(newDate) => setDate(newDate ? newDate.toISOString().split('T')[0] : '')}
  placeholder="Select date"
/>
```

**Replace with (pure shadcn/ui):**
```tsx
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const [date, setDate] = useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-full justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>
```

### Replace Select with shadcn Select

**Current (custom wrapper):**
```tsx
<Select
  value={practitionerId ? { label: "...", value: practitionerId } : null}
  onChange={(option) => setPractitionerId(option.value)}
  options={BEHANDELAARS}
  placeholder="Select practitioner"
/>
```

**Replace with (pure shadcn/ui):**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select value={practitionerId} onValueChange={setPractitionerId}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select practitioner" />
  </SelectTrigger>
  <SelectContent>
    {BEHANDELAARS.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 📋 Step-by-Step Migration for Remaining Pages

### For Old Client Page:
1. Copy `src/pages/new-client/index.tsx` to `src/pages/old-client/index.tsx`
2. Change title from "New Client" to "Existing Client"
3. Keep all same fields and validation
4. Replace custom DatePicker/Select with pure shadcn/ui (optional but recommended)
5. Test with `npm run dev`

### For Intake Forms (7 forms):
1. Copy `src/pages/new-client/index.tsx` as template
2. Change the form fields to match intake requirements:
   - OSA: specific OSA fields
   - VLOS: specific VLOS fields
   - etc.
3. Adjust currentStep={2} (these are step 2 in workflow)
4. Replace custom DatePicker/Select
5. Test each form

### For Simple Pages (Help, 404, Form Selection):
1. Copy `src/pages/index.tsx` as template
2. Replace content with appropriate page content
3. Adjust Card layouts as needed
4. No custom wrappers needed - already 100% shadcn/ui

---

## 🏗️ Final Cleanup Checklist

After migrating all pages:

- [ ] Remove `src/presentation/components/ui/DatePicker.tsx`
- [ ] Remove `src/presentation/components/ui/Select.tsx`
- [ ] Move `src/presentation/components/layout/*` to `src/components/layout/`
- [ ] Move `src/presentation/components/icons/*` to `src/components/icons/`
- [ ] Delete `src/presentation/components/ui/*` (all custom wrappers)
- [ ] Keep `src/presentation/form/constants/` and `src/presentation/form/types/`
- [ ] Keep `src/presentation/routes.ts` and `src/presentation/utils/`
- [ ] Update all imports from `@/presentation/components` to `@/components`
- [ ] Remove Chakra UI from package.json:
  ```bash
  npm uninstall @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion
  ```
- [ ] Test `npm run dev` - should work without errors
- [ ] Test `npm run build` - should compile successfully

---

## 🎯 Quick Reference

### shadcn/ui Components Available:
- ✅ Button (6 variants)
- ✅ Input
- ✅ Label
- ✅ Textarea
- ✅ Card (Header, Title, Description, Content, Footer)
- ✅ Checkbox
- ✅ RadioGroup, RadioGroupItem
- ✅ Separator
- ✅ Select (Trigger, Content, Item, Value)
- ✅ Calendar
- ✅ Popover (Trigger, Content)

### Layout Components (in src/components/layout):
- BaseLayout (with currentStep prop)
- PageHeader
- StepIndicator
- Link

### Icons (lucide-react):
- UserPlus, Users, FileText, ClipboardList
- AlertCircle, Check, ChevronRight
- CalendarIcon
- [many more available]

---

## 💡 Tips

1. **Always use `cn()` utility** for conditional classes:
   ```tsx
   import { cn } from "@/lib/utils"
   className={cn("base-class", condition && "conditional-class")}
   ```

2. **Error states** use `border-destructive`:
   ```tsx
   className={cn(!value && showWarnings && 'border-destructive')}
   ```

3. **Required fields** use red asterisk:
   ```tsx
   <Label>Field Name <span className="text-destructive">*</span></Label>
   ```

4. **Responsive layouts** use md breakpoint:
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   ```

5. **Keep business logic** - only change UI components:
   - Redux calls stay the same
   - Validation logic stays the same
   - Navigation stays the same
   - Only UI layer changes

---

## ✅ Success Criteria

Your migration is complete when:
- [ ] All 15 pages load without errors
- [ ] `npm run dev` works
- [ ] `npm run build` completes successfully
- [ ] No imports from `@chakra-ui/*`
- [ ] No imports from `@/presentation/components/ui/` custom wrappers
- [ ] All pages use shadcn/ui components
- [ ] Forms submit and validate correctly
- [ ] Navigation between pages works
- [ ] Step indicator shows correct step
- [ ] Mobile and desktop layouts work

---

## 📞 Support

If you encounter issues:
1. Check the example pages (`index.tsx`, `new-client/index.tsx`)
2. Verify imports match the examples
3. Check for typos in component names
4. Ensure all shadcn/ui components are installed
5. Clear `.next` cache: `rm -rf .next && npm run dev`

---

**Good luck with the migration! The hard work is done - just copy, adapt, and replace!** 🚀
