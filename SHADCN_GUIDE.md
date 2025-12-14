# shadcn/ui Integration Guide

## 🎉 Welcome to shadcn/ui!

This guide explains how to use the integrated shadcn/ui components in the form-generator application.

---

## 📦 What is shadcn/ui?

shadcn/ui is **not a component library**. Instead, it's a collection of re-usable components that you can copy and paste into your apps. Built on:
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Radix UI** - Accessible, unstyled primitives
- ✅ **Class Variance Authority (CVA)** - Type-safe variants

**Key Benefits:**
- You own the code (components live in your repo)
- Fully customizable
- No external dependencies on a component library
- Built-in accessibility
- TypeScript support

---

## 🚀 Quick Start

### 1. Using Existing Components

Import from `@/components/ui/`:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MyForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  )
}
```

### 2. Adding New Components

Use the shadcn CLI to add more components:

```bash
# Add a dialog component
npx shadcn@latest add dialog

# Add a dropdown menu
npx shadcn@latest add dropdown-menu

# Add tabs
npx shadcn@latest add tabs

# Add toast notifications
npx shadcn@latest add toast

# Add select component
npx shadcn@latest add select

# Add form components (with react-hook-form)
npx shadcn@latest add form
```

Components are automatically added to `src/components/ui/` with proper configuration.

---

## 📚 Available Components

### Core Components (Currently Installed)

#### 1. Button
Multi-variant button with sizes and states.

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <IconComponent />
</Button>

// States
<Button disabled>Disabled</Button>
<Button asChild>
  <Link href="/somewhere">As Link</Link>
</Button>
```

#### 2. Input
Text input with focus states and validation.

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" />
<Input type="number" />
<Input type="file" />
<Input disabled />

// With validation styling
<Input className={cn(!value && 'border-destructive')} />
```

#### 3. Label
Accessible form labels.

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="input-id">Label Text</Label>
<Input id="input-id" />

// With required indicator
<Label>
  Field Name <span className="text-destructive">*</span>
</Label>
```

#### 4. Card
Container component with sections.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description or subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions or footer content */}
  </CardFooter>
</Card>
```

#### 5. Checkbox
Accessible checkbox with check icon.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// With state
const [checked, setChecked] = useState(false)
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

#### 6. RadioGroup
Accessible radio button group.

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="opt1" />
    <Label htmlFor="opt1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="opt2" />
    <Label htmlFor="opt2">Option 2</Label>
  </div>
</RadioGroup>
```

#### 7. Textarea
Multi-line text input.

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter details..." />
<Textarea rows={5} />
<Textarea disabled />
```

#### 8. Separator
Visual divider (horizontal or vertical).

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />  {/* Horizontal */}
<Separator orientation="vertical" />
<Separator decorative />  {/* Non-semantic */}
```

---

## 🎨 Theming

### CSS Variables

All colors are defined using CSS variables in `src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}
```

### Customizing Colors

Update the CSS variables in `src/index.css`:

```css
:root {
  --primary: 142 76% 36%;  /* Change primary color */
  --primary-foreground: 0 0% 100%;
  --radius: 0.75rem;  /* Change border radius */
}
```

### Dark Mode

Dark mode is ready! Just add the `dark` class to the `<html>` element:

```tsx
<html className="dark">
```

Dark mode colors are defined in:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... */
}
```

---

## 🔧 Utilities

### cn() Function

The `cn()` utility merges Tailwind classes intelligently:

```tsx
import { cn } from "@/lib/utils"

// Merge classes
<div className={cn("base-class", "another-class")} />

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  isError && "error-class"
)} />

// Override Tailwind classes
<Button className={cn("bg-blue-500", props.className)} />
```

### Why cn()?

Handles Tailwind class conflicts:

```tsx
// Without cn() - bg-blue-500 wins (last class)
<div className="bg-red-500 bg-blue-500" />

// With cn() - properly merges
<div className={cn("bg-red-500", "bg-blue-500")} />  // bg-blue-500
```

---

## 📋 Common Patterns

### Form Field

```tsx
<div className="space-y-2">
  <Label htmlFor="field">
    Field Name <span className="text-destructive">*</span>
  </Label>
  <Input
    id="field"
    value={value}
    onChange={e => setValue(e.target.value)}
    placeholder="Enter value..."
    className={cn(!value && 'border-destructive')}
  />
  {error && (
    <p className="text-sm text-destructive">{error}</p>
  )}
</div>
```

### Form Section (Card-based)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Personal Information</CardTitle>
    <CardDescription>Enter your personal details below</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" />
      </div>
    </div>
  </CardContent>
</Card>
```

### Button Group

```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>

// Or centered
<div className="flex justify-center gap-4">
  <Button variant="secondary">Back</Button>
  <Button>Continue</Button>
</div>
```

### Radio Group Pattern

```tsx
<div className="space-y-2">
  <Label>Select Option</Label>
  <RadioGroup value={selected} onValueChange={setSelected}>
    {options.map(option => (
      <div key={option.value} className="flex items-center space-x-2">
        <RadioGroupItem value={option.value} id={option.value} />
        <Label
          htmlFor={option.value}
          className="font-normal cursor-pointer"
        >
          {option.label}
        </Label>
      </div>
    ))}
  </RadioGroup>
</div>
```

---

## 🎯 Example: Complete Form

See `src/presentation/form/new-client/page-shadcn.tsx` for a complete example!

Here's a simplified version:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function ClientForm() {
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  const isValid = email && location

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Client Information</h1>
        <p className="text-muted-foreground">Fill in the details below</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email..."
              className={cn(!email && 'border-destructive')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={location} onValueChange={setLocation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amsterdam" id="ams" />
              <Label htmlFor="ams" className="font-normal cursor-pointer">
                Amsterdam
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rotterdam" id="rtd" />
              <Label htmlFor="rtd" className="font-normal cursor-pointer">
                Rotterdam
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" disabled={!isValid}>
          Continue
        </Button>
      </div>
    </div>
  )
}
```

---

## 🚧 Recommended Components to Add

### High Priority

```bash
# Dialog for modals
npx shadcn@latest add dialog

# Select dropdown (better than custom Select)
npx shadcn@latest add select

# Toast notifications
npx shadcn@latest add toast

# Form with validation (react-hook-form)
npx shadcn@latest add form
```

### Medium Priority

```bash
# Dropdown menus
npx shadcn@latest add dropdown-menu

# Tabs for navigation
npx shadcn@latest add tabs

# Alert Dialog for confirmations
npx shadcn@latest add alert-dialog

# Popover for additional info
npx shadcn@latest add popover
```

### Nice to Have

```bash
# Badge for status indicators
npx shadcn@latest add badge

# Progress bar
npx shadcn@latest add progress

# Switch toggle
npx shadcn@latest add switch

# Tooltip
npx shadcn@latest add tooltip
```

---

## 📝 Migration Strategy

### Step 1: Review Example
Check `page-shadcn.tsx` to see shadcn/ui in action.

### Step 2: Replace Incrementally
Start with one page:
- Replace `<FormSection>` with `<Card>`
- Replace custom `<Button>` with shadcn `<Button>`
- Replace custom `<Input>` with shadcn `<Input>`
- Use `<Label>` for all form labels

### Step 3: Test Thoroughly
- Test validation
- Test responsive design
- Test accessibility (keyboard navigation, screen readers)
- Test dark mode (if enabled)

### Step 4: Expand
Once comfortable with one page, apply to others.

---

## 💡 Tips & Best Practices

### 1. Use Semantic HTML
```tsx
// Good
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>

// Also good
<Button type="button" onClick={handleClick}>Click</Button>
```

### 2. Accessibility First
```tsx
// Always link labels to inputs
<Label htmlFor="email">Email</Label>
<Input id="email" />

// Use proper ARIA attributes
<Button aria-label="Close dialog" />
```

### 3. Responsive Design
```tsx
// Mobile first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### 4. Consistent Spacing
```tsx
// Use space-y for vertical spacing
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Use gap for flex/grid
<div className="flex gap-4">
  <Button>One</Button>
  <Button>Two</Button>
</div>
```

### 5. Error States
```tsx
<Input
  value={value}
  onChange={...}
  className={cn(hasError && 'border-destructive focus-visible:ring-destructive')}
/>
{hasError && (
  <p className="text-sm text-destructive">{errorMessage}</p>
)}
```

---

## 🔗 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Class Variance Authority](https://cva.style)

---

## ❓ FAQ

### Q: Can I customize the components?
**A:** Yes! All components are in your codebase. Edit them directly in `src/components/ui/`.

### Q: Do I need to install all components?
**A:** No, only install what you need using `npx shadcn@latest add [component]`.

### Q: Can I use shadcn with my custom components?
**A:** Absolutely! Mix and match as needed. See `page-shadcn.tsx` for examples.

### Q: How do I override component styles?
**A:** Use the `className` prop with the `cn()` utility:
```tsx
<Button className={cn("bg-purple-500 hover:bg-purple-600")}>
  Custom Button
</Button>
```

### Q: Is dark mode automatic?
**A:** The CSS variables are ready. Add `dark` class to `<html>` to enable:
```tsx
<html className={isDark ? 'dark' : ''}>
```

---

## 🎉 Conclusion

You now have access to a professional, accessible, and customizable component library! Start by reviewing the example in `page-shadcn.tsx`, then gradually migrate your pages to use shadcn/ui components.

**Happy coding!** 🚀
