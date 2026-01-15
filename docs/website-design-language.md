# Form Design Language

Shared patterns and component guidelines for form development. Use this as a reference when adjusting or creating new form sections.

## Core Principles

- Keep layouts structured with: `FormCard` (main sections) > `FormBlock` (grid layouts) > `FormItemWrapper` (individual fields).
- Use `FormCard` with optional toggle/switch for sections that can be enabled/disabled.
- Use `FormBlock` with configurable columns and dividers for grouping related fields.
- Use `FormItemWrapper` to wrap form labels and controls.
- Apply responsive grids that stack on mobile and display in columns on desktop.
- Use concise labels and keep helper text minimal.

## Component Structure

### FormCard

The top-level section wrapper for grouped content. Supports optional toggle functionality.

```tsx
<FormCard
  title={t('sectionTitle')}
  description={t('sectionDescription')}
  toggleAble={true}
  toggleLabel={t('enableSection')}
  toggleId="section-toggle"
  defaultOpen={false}
  onToggleChange={isOpen => {
    /* handle toggle */
  }}
>
  {/* FormBlock and FormItemWrapper children */}
</FormCard>
```

**Props:**

- `title` (string): Main section heading
- `description` (string, optional): Subtitle/description
- `toggleAble` (boolean): Whether to show a toggle switch
- `toggleLabel` (string): Label for the toggle
- `toggleId` (string): ID for the toggle switch
- `defaultOpen` (boolean): Default open/closed state
- `onToggleChange` (function): Callback when toggle state changes
- `centerTitle` (boolean): Center-align the title
- `contentClassName` (string): Custom classes for CardContent

### FormBlock

Grid layout container for organizing fields. Supports 1-4 columns with optional dividers.

```tsx
<FormBlock
  columns={2}
  dividers={true}
  title={t('blockTitle')}
  centerTitle={true}
  alignItems="start"
  hoverEffect={true}
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

- `columns` (1 | 2 | 3 | 4): Number of columns (defaults to 1)
- `dividers` (boolean): Show dividers between columns
- `hoverEffect` (boolean): Apply hover border effect
- `title` (string): Optional block title
- `subtitle` (string): Optional block subtitle
- `alignItems` ('start' | 'center' | 'end' | 'stretch'): Vertical alignment
- `centerTitle` (boolean): Center the title
- `responsive` (boolean): Use responsive grid
- `className` (string): Custom wrapper classes
- `contentClassName` (string): Custom grid classes

### FormItemWrapper

Wraps individual form fields with optional label.

```tsx
<FormItemWrapper label={t('fieldLabel')} requiredLabel={true}>
  <Input placeholder={t('placeholder')} />
</FormItemWrapper>
```

**Props:**

- `label` (string): Field label
- `requiredLabel` (boolean): Show required indicator
- `children`: Form control element

## Layout Patterns

### Basic Form Structure

```tsx
<FormCard title={t('title')} description={t('description')}>
  <FormBlock columns={2} dividers={true}>
    <FormItemWrapper label={t('field1')}>
      <Input />
    </FormItemWrapper>
    <FormItemWrapper label={t('field2')}>
      <Input />
    </FormItemWrapper>
  </FormBlock>
</FormCard>
```

### Single Column Layout

```tsx
<FormCard title={t('title')}>
  <FormBlock columns={1}>
    <FormItemWrapper label={t('field')}>
      <RadioGroup>{/* options */}</RadioGroup>
    </FormItemWrapper>
  </FormBlock>
</FormCard>
```

### Left/Right Column Panels

For paired fields (left/right measurements), use FormBlock with columns={2}:

```tsx
<FormCard title={t('measurements')}>
  <FormBlock columns={2} dividers={true}>
    <FormItemWrapper label={t('leftCm')}>
      <Input type="number" placeholder="cm" />
    </FormItemWrapper>
    <FormItemWrapper label={t('rightCm')}>
      <Input type="number" placeholder="cm" />
    </FormItemWrapper>
  </FormBlock>
</FormCard>
```

### Toggle Card (Enable/Disable Section)

```tsx
<FormCard
  title={t('insolesAndTalonette')}
  description={t('insolesAndTalonetteDescription')}
  toggleAble={true}
  toggleLabel={t('addInsolesOrTalonette')}
  toggleId="insolesToggle"
  defaultOpen={isEnabled}
  onToggleChange={isOpen => {
    form.setValue('insoleEnabled', isOpen);
    if (!isOpen) {
      // Clear related fields
      form.setValue('heelRaiseLeft', '');
      form.setValue('heelRaiseRight', '');
    }
  }}
>
  <FormBlock columns={2} dividers={true} title={t('talonetteSection')}>
    <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
      <Input type="number" placeholder="cm" />
    </FormItemWrapper>
    <FormItemWrapper label={t('insoleHeelRaiseRight')}>
      <Input type="number" placeholder="cm" />
    </FormItemWrapper>
  </FormBlock>
</FormCard>
```

### Multi-Column Grid (3+ Columns)

```tsx
<FormBlock columns={3} dividers={true} title={t('corrections')}>
  <FormItemWrapper label={t('midfootCorrection')}>
    <Select>
      <SelectTrigger />
    </Select>
  </FormItemWrapper>
  <FormItemWrapper label={t('forefootCorrection')}>
    <Select>
      <SelectTrigger />
    </Select>
  </FormItemWrapper>
  <FormItemWrapper label={t('forefootPad')}>
    <Select>
      <SelectTrigger />
    </Select>
  </FormItemWrapper>
</FormBlock>
```

### Checkbox/Switch Groups

```tsx
<FormBlock columns={2} dividers={true}>
  <FormItemWrapper>
    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30">
      <Checkbox checked={value} onCheckedChange={handleChange} />
      <span className="text-sm">{t('option')}</span>
    </Label>
  </FormItemWrapper>
</FormBlock>
```

### Radio Group Selection

```tsx
<FormItemWrapper label={t('whichPair')}>
  <RadioGroup value={value} onValueChange={setValue}>
    <div className="flex flex-col gap-3">
      {options.map(option => (
        <Label
          key={option.value}
          className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30"
        >
          <RadioGroupItem value={option.value} />
          <span className="text-sm">{option.label}</span>
        </Label>
      ))}
    </div>
  </RadioGroup>
</FormItemWrapper>
```

### Select/Dropdown Field

```tsx
<FormItemWrapper label={t('supplier')}>
  <Select value={value} onValueChange={handleChange}>
    <SelectTrigger className="w-2/3">
      <SelectValue placeholder={t('selectOption')} />
    </SelectTrigger>
    <SelectContent>
      {options.map(opt => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</FormItemWrapper>
```

### TextArea Field

```tsx
<FormItemWrapper label={t('medicalIndication')}>
  <Textarea
    placeholder={t('placeholder')}
    value={value}
    onChange={e => setValue(e.target.value)}
    rows={4}
    className="w-2/3"
  />
</FormItemWrapper>
```

### DatePicker Field

```tsx
<FormItemWrapper label={t('orderDate')}>
  <DatePicker
    value={selectedDate}
    onChange={handleDateChange}
    placeholder={t('selectDate')}
    disabled={date => date > new Date()}
    className="w-2/3"
  />
</FormItemWrapper>
```

## Component Styling

- **FormCard**: Uses Card component with CardHeader and CardContent
- **FormBlock**: Grid-based layout with `bg-secondary/2` background and optional hover border effect
- **FormItemWrapper**: Simple wrapper that preserves label positioning
- **Responsive**: FormBlock uses `lg:grid-cols-{n}` for responsive columns
- **Spacing**: `space-y-4` for vertical rhythm between FormBlocks
- **Hover Effects**: `hover:border-primary!` on FormBlock for interactive feedback

## Form State Management

All forms use React Hook Form with Zod schema validation:

```tsx
const formSchema = z.object({
  field1: z.string().optional(),
  field2: z.string().optional(),
  nested: z.object({
    subfield: z.string().optional(),
  }),
});

type FormData = z.infer<typeof formSchema>;

const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    /* ... */
  },
});
```

## Data Persistence

Forms support automatic persistence to localStorage:

```tsx
const {clearStorage} = useFormPersistence('formKey', form.watch, form.setValue);

const handleReset = () => {
  clearStorage();
  form.reset();
};
```

## Usage Checklist

- Use `FormCard` for major sections
- Use `FormBlock` for grouping related FormItemWrappers
- Use `FormItemWrapper` to wrap individual form controls with labels
- Use `toggleAble` on FormCard for optional sections
- Set `columns` on FormBlock based on layout needs (1-4)
- Use `dividers={true}` to separate columns visually
- Set `alignItems="start"` for top-aligned content, `"center"` for centered
- Add meaningful `description` to FormCard for user guidance
- Use responsive props for mobile-friendly layouts
- Keep form controls (`Input`, `Select`, `Textarea`, `RadioGroup`, `Checkbox`, `DatePicker`) as children of FormItemWrapper
- Set default values that match the schema
- Clear related fields when toggle states change
- Use date format DD-MM-YYYY for date inputs and display
- Add proper validation messages via FormMessage component
- Use `w-2/3` class on inputs to maintain consistent field widths
