# Intake Forms - Pattern Analysis

Complete extraction of patterns from intake-vlos, intake-osa, intake-osb, and intake-steunzolen forms.

---

## 1. DescriptionBlock - Form Description & Pair Selection

### Pattern Overview

All four forms use identical DescriptionBlock structure with:

- Radio group for pair selection (whichPair)
- Textarea for medical indication (medicalIndication)
- 2-column FormBlock layout with dividers

### Schema Definition

```typescript
// Common across all forms
const formSchema = z.object({
  whichPair: z.string(),
  medicalIndication: z.string().optional(),
  // ... other fields
});

// Default values
defaultValues: {
  whichPair: PAIR_TYPE_OPTIONS[0]?.value || 'Eerste paar',
  medicalIndication: '',
  // ... other defaults
}
```

### JSX Implementation - VLOS

```tsx
{
  /* Paartype & indicatie */
}
<FormCard title={t('description')} description={t('whichPair')}>
  <FormBlock columns={2} dividers={true} alignItems="start">
    {/* Which Pair (Radio Group) */}
    <FormItemWrapper label={t('whichPair')}>
      <RadioGroup
        value={form.watch('whichPair')}
        onValueChange={val => form.setValue('whichPair', val)}
        className="w-2/3"
      >
        <div className="flex flex-col gap-3">
          {PAIR_TYPE_OPTIONS.map(option => (
            <Label
              key={option.value}
              className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
              htmlFor={`ov-${option.value}`}
            >
              <RadioGroupItem id={`ov-${option.value}`} value={option.value} />
              <span className="text-sm text-foreground">{t(option.label)}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </FormItemWrapper>

    {/* Medical Indication (Textarea) */}
    <FormItemWrapper label={t('medicalIndication')}>
      <Textarea
        id="medische-indicatie"
        placeholder={t('medicalIndicationPlaceholder')}
        value={form.watch('medicalIndication')}
        onChange={e => form.setValue('medicalIndication', e.target.value)}
        rows={4}
        className="w-2/3"
      />
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### JSX Implementation - OSA (Identical)

```tsx
{
  /* Paartype & indicatie */
}
<FormCard title={t('description')} description={t('whichPair')}>
  <FormBlock columns={2} dividers={true} alignItems="start">
    {/* Which Pair (Radio Group) */}
    <FormItemWrapper label={t('whichPair')}>
      <RadioGroup
        value={form.watch('whichPair')}
        onValueChange={val => form.setValue('whichPair', val)}
        className="w-2/3"
      >
        <div className="flex flex-col gap-3">
          {PAIR_TYPE_OPTIONS.map(option => (
            <Label
              key={option.value}
              className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
              htmlFor={`ov-${option.value}`}
            >
              <RadioGroupItem id={`ov-${option.value}`} value={option.value} />
              <span className="text-sm text-foreground">{t(option.label)}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </FormItemWrapper>

    {/* Medical Indication (Textarea) */}
    <FormItemWrapper label={t('medicalIndication')}>
      <Textarea
        id="medische-indicatie"
        placeholder={t('medicalIndicationPlaceholder')}
        value={form.watch('medicalIndication')}
        onChange={e => form.setValue('medicalIndication', e.target.value)}
        rows={4}
        className="w-2/3"
      />
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### JSX Implementation - OSB

```tsx
{
  /* Section 0.1: Description and which pair */
}
<FormCard title={t('description')} description={t('whichPair')}>
  <FormBlock columns={2} dividers={true} alignItems="start">
    {/* Which Pair (Radio Group) */}
    <FormItemWrapper label={t('whichPair')}>
      <RadioGroup
        value={form.watch('whichPair')}
        onValueChange={val => form.setValue('whichPair', val)}
        className="w-2/3"
      >
        <div className="flex flex-col gap-3">
          {PAIR_TYPE_OPTIONS.map(option => (
            <Label
              key={option.value}
              className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
              htmlFor={`osb-${option.value}`}
            >
              <RadioGroupItem id={`osb-${option.value}`} value={option.value} />
              <span className="text-sm text-foreground">{t(option.label)}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </FormItemWrapper>

    {/* Medical Indication (Textarea) */}
    <FormItemWrapper label={t('medicalIndication')}>
      <Textarea
        id="medische-indicatie"
        placeholder={t('medicalIndicationPlaceholder')}
        value={form.watch('medicalIndication')}
        onChange={e => form.setValue('medicalIndication', e.target.value)}
        rows={4}
        className="w-2/3"
      />
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### JSX Implementation - Steunzolen (Identical)

```tsx
{
  /* Paartype & indicatie */
}
<FormCard title={t('description')} description={t('whichPair')}>
  <FormBlock columns={2} dividers={true} alignItems="start">
    {/* Which Pair (Radio Group) */}
    <FormItemWrapper label={t('whichPair')}>
      <RadioGroup
        value={form.watch('whichPair')}
        onValueChange={val => form.setValue('whichPair', val)}
        className="w-2/3"
      >
        <div className="flex flex-col gap-3">
          {PAIR_TYPE_OPTIONS.map(option => (
            <Label
              key={option.value}
              className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
              htmlFor={`ov-${option.value}`}
            >
              <RadioGroupItem id={`ov-${option.value}`} value={option.value} />
              <span className="text-sm text-foreground">{t(option.label)}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </FormItemWrapper>

    {/* Medical Indication (Textarea) */}
    <FormItemWrapper label={t('medicalIndication')}>
      <Textarea
        id="medische-indicatie"
        placeholder={t('medicalIndicationPlaceholder')}
        value={form.watch('medicalIndication')}
        onChange={e => form.setValue('medicalIndication', e.target.value)}
        rows={4}
        className="w-2/3"
      />
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### Field Names

| Field               | Type              | Schema                  | Default                                          |
| ------------------- | ----------------- | ----------------------- | ------------------------------------------------ |
| `whichPair`         | string            | `z.string()`            | `PAIR_TYPE_OPTIONS[0]?.value \|\| 'Eerste paar'` |
| `medicalIndication` | string (optional) | `z.string().optional()` | `''`                                             |

### Constants Used

```typescript
// From @/domain/form/constants/formConstants
PAIR_TYPE_OPTIONS; // Array of {value, label} objects
```

### Variations Between Forms

| Aspect          | VLOS             | OSA              | OSB              | Steunzolen       |
| --------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| Radio ID prefix | `ov-`            | `ov-`            | `osb-`           | `ov-`            |
| Layout          | 2 cols, dividers | 2 cols, dividers | 2 cols, dividers | 2 cols, dividers |
| Alignment       | start            | start            | start            | start            |
| Radio rows      | 4                | 4                | 4                | 4                |
| Textarea rows   | 4                | 4                | 4                | 4                |
| Class width     | `w-2/3`          | `w-2/3`          | `w-2/3`          | `w-2/3`          |

**Identical Pattern**: All four forms implement the DescriptionBlock identically (except for the OSB radio ID prefix).

---

## 2. SideSelectionBlock - Side Selection with Optional Amputation

### Pattern Overview

Forms differ in their approach to side selection and amputation fields:

- **VLOS, OSA**: Use Checkbox for amputation (multiple selection)
- **OSB, Steunzolen**: Don't include side/amputation in the same block (handled separately)

### Schema Definition

```typescript
// VLOS & OSA
const formSchema = z.object({
  side: z.enum(['left', 'right', 'both'] as const),
  amputationLeftEnabled: z.boolean(),
  amputationRightEnabled: z.boolean(),
  // ... other fields
});

// OSB & Steunzolen
const formSchema = z.object({
  side: z.enum(['left', 'right', 'both'] as const).optional(),
  // NO amputation fields in OSB
});
```

### Default Values

```typescript
// VLOS & OSA
defaultValues: {
  side: 'both',
  amputationLeftEnabled: false,
  amputationRightEnabled: false,
  // ... other defaults
}

// OSB
defaultValues: {
  side: 'both',
  // ... other defaults
}
```

### JSX Implementation - VLOS

```tsx
{
  /* Side & Amputation */
}
<FormCard
  title={t('side') + ' & ' + t('amputation')}
  description={t('sideAmputationDescription')}
>
  <FormBlock columns={2} dividers={true} hoverEffect={false}>
    {/* Side Selection */}
    <FormItemWrapper label={t('side')}>
      <FormField
        control={form.control}
        name="side"
        render={({field}) => (
          <FormItem>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="side-both" />
                    <Label htmlFor="side-both">{t('both')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="side-left" />
                    <Label htmlFor="side-left">{t('left')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="side-right" />
                    <Label htmlFor="side-right">{t('right')}</Label>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </FormItemWrapper>

    {/* Amputation */}
    <FormItemWrapper label={t('amputation')}>
      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="amp-left"
            checked={form.watch('amputationLeftEnabled')}
            onCheckedChange={checked =>
              form.setValue('amputationLeftEnabled', !!checked)
            }
          />
          <Label htmlFor="amp-left" className="font-normal cursor-pointer">
            {t('left')}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="amp-right"
            checked={form.watch('amputationRightEnabled')}
            onCheckedChange={checked =>
              form.setValue('amputationRightEnabled', !!checked)
            }
          />
          <Label htmlFor="amp-right" className="font-normal cursor-pointer">
            {t('right')}
          </Label>
        </div>
      </div>
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### JSX Implementation - OSA

```tsx
{
  /* Side & Amputation */
}
<FormCard
  title={t('side') + ' & ' + t('amputation')}
  description={t('sideAmputationDescription')}
>
  <FormBlock columns={2} dividers={true} hoverEffect={false}>
    {/* Side Selection */}
    <FormItemWrapper label={t('side')}>
      <FormField
        control={form.control}
        name="side"
        render={({field}) => (
          <FormItem>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="side-both" />
                    <Label htmlFor="side-both">{t('both')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="side-left" />
                    <Label htmlFor="side-left">{t('left')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="side-right" />
                    <Label htmlFor="side-right">{t('right')}</Label>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </FormItemWrapper>

    {/* Amputation - Uses Switch instead of Checkbox */}
    <FormItemWrapper label={t('amputation')}>
      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="amp-left"
            checked={form.watch('amputationLeftEnabled')}
            onCheckedChange={checked =>
              form.setValue('amputationLeftEnabled', !!checked)
            }
          />
          <Label htmlFor="amp-left" className="font-normal cursor-pointer">
            {t('left')}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="amp-right"
            checked={form.watch('amputationRightEnabled')}
            onCheckedChange={checked =>
              form.setValue('amputationRightEnabled', !!checked)
            }
          />
          <Label htmlFor="amp-right" className="font-normal cursor-pointer">
            {t('right')}
          </Label>
        </div>
      </div>
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### JSX Implementation - OSB

```tsx
{
  /* Section 0.2: Left/Right/Both selector */
}
<FormCard title={t('side')} description={t('chooseSideDescription')}>
  <FormBlock columns={1} alignItems="center">
    <FormItemWrapper>
      <RadioGroup
        value={form.watch('side') || 'both'}
        onValueChange={val =>
          form.setValue('side', val as 'left' | 'right' | 'both')
        }
      >
        <div className="flex gap-6 justify-center">
          <Label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="both" />
            {t('both')}
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="left" />
            {t('left')}
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value="right" />
            {t('right')}
          </Label>
        </div>
      </RadioGroup>
    </FormItemWrapper>
  </FormBlock>
</FormCard>;
```

### Field Names

| Field                    | Type    | Schema                              | Applicable Forms           |
| ------------------------ | ------- | ----------------------------------- | -------------------------- |
| `side`                   | enum    | `z.enum(['left', 'right', 'both'])` | VLOS, OSA, OSB, Steunzolen |
| `amputationLeftEnabled`  | boolean | `z.boolean()`                       | VLOS, OSA only             |
| `amputationRightEnabled` | boolean | `z.boolean()`                       | VLOS, OSA only             |

### Variations Between Forms

| Aspect               | VLOS            | OSA             | OSB                       | Steunzolen |
| -------------------- | --------------- | --------------- | ------------------------- | ---------- |
| FormCard columns     | 2               | 2               | 1                         | N/A        |
| Radio layout         | flex-wrap gap-6 | flex-wrap gap-6 | flex gap-6 justify-center | N/A        |
| Amputation component | Checkbox        | Switch          | None                      | None       |
| Amputation layout    | flex gap-6      | flex gap-6      | N/A                       | N/A        |
| hoverEffect          | false           | false           | N/A                       | N/A        |
| alignItems           | start (default) | start (default) | center                    | N/A        |

**Key Variation**: OSA uses `Switch` for amputation (binary on/off state), while VLOS uses `Checkbox`. OSB and Steunzolen don't include amputation in side selection.

---

## 3. SpecialNotesBlock - Special Notes Textarea

### Pattern Overview

All four forms include a SpecialNotesBlock, but with subtle variations in JSX structure. This block appears at the end of the form, just before the submit section.

### Schema Definition

```typescript
// Common across all forms
const formSchema = z.object({
  specialNotes: z.string().optional(),
  // ... other fields
});

// Default values
defaultValues: {
  specialNotes: '',
}
```

### JSX Implementation - VLOS

```tsx
{
  /* Special Notes */
}
<FormCard title={t('specialNotes')}>
  <Textarea
    placeholder={t('specialNotesPlaceholder')}
    value={form.watch('specialNotes')}
    onChange={e => form.setValue('specialNotes', e.target.value)}
    rows={5}
  />
</FormCard>;
```

### JSX Implementation - OSA

```tsx
{
  /* Special Notes */
}
<Card>
  <CardHeader>
    <CardTitle>{t('specialNotes')}</CardTitle>
  </CardHeader>
  <CardContent>
    <Textarea
      placeholder={t('specialNotesPlaceholder')}
      value={form.watch('specialNotes')}
      onChange={e => form.setValue('specialNotes', e.target.value)}
      rows={5}
      className="resize-none"
    />
  </CardContent>
</Card>;
```

### JSX Implementation - OSB

```tsx
{
  /* Special Notes */
}
<FormCard title={t('specialNotes')}>
  <Textarea
    placeholder={t('specialNotesPlaceholder')}
    value={form.watch('specialNotes')}
    onChange={e => form.setValue('specialNotes', e.target.value)}
    rows={5}
  />
</FormCard>;
```

### JSX Implementation - Steunzolen

```tsx
{
  /* Special Notes */
}
<FormCard title={t('specialNotes')}>
  <FormBlock columns={1} dividers={false} hoverEffect={false}>
    <FormField
      control={form.control}
      name="specialNotes"
      render={({field}) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder={t('specialNotesPlaceholder')}
              rows={5}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </FormBlock>
</FormCard>;
```

### Field Names

| Field          | Type              | Schema                  | Default |
| -------------- | ----------------- | ----------------------- | ------- |
| `specialNotes` | string (optional) | `z.string().optional()` | `''`    |

### Constants Used

None - only uses translation keys:

- `t('specialNotes')` - Card title
- `t('specialNotesPlaceholder')` - Textarea placeholder

### Variations Between Forms

| Aspect        | VLOS               | OSA                | OSB                | Steunzolen  |
| ------------- | ------------------ | ------------------ | ------------------ | ----------- |
| Container     | FormCard           | Card + CardHeader  | FormCard           | FormCard    |
| FormBlock     | No                 | No                 | No                 | Yes (1 col) |
| FormField     | No                 | No                 | No                 | Yes         |
| Rows          | 5                  | 5                  | 5                  | 5           |
| resize-none   | No                 | Yes                | No                 | Yes         |
| FormMessage   | No                 | No                 | No                 | Yes         |
| Value binding | watch() + setValue | watch() + setValue | watch() + setValue | {...field}  |

**Pattern Summary**:

- **VLOS, OSB**: Direct `FormCard` + `Textarea` (simplest)
- **OSA**: Card component (custom card structure) + `Textarea`
- **Steunzolen**: `FormCard` + `FormBlock` + `FormField` (most complete with validation)

Recommended approach: **Steunzolen pattern** - most complete with FormField integration for better form validation and integration.

---

## Submission Handling

### VLOS & OSA

```typescript
const onSubmit = (data: FormData) => {
  if (clientData) {
    dispatch(setClientData({...clientData, intakeType: 'VLOS' | 'OSA'}));
  }

  dispatch(
    setIntakeVLOSData({
      whichPair: data.whichPair,
      medicalIndication: data.medicalIndication || '',
      side: data.side,
      amputationLeftEnabled: data.amputationLeftEnabled,
      amputationRightEnabled: data.amputationRightEnabled,
      specialNotes: data.specialNotes || '',
      // ... other fields
    }),
  );

  clearStorage();
  void router.push(Routes.form_results);
};
```

### OSB & Steunzolen

```typescript
const onSubmit = (data: FormData) => {
  if (clientData) {
    dispatch(setClientData({...clientData, intakeType: 'OSB' | 'Steunzolen'}));
  }

  dispatch(
    setIntakeOSBData({
      whichPair: data.whichPair,
      medicalIndication: data.medicalIndication || '',
      side: data.side || 'both',
      specialNotes: data.specialNotes || '',
      // ... other fields
    }),
  );

  clearStorage();
  void router.push(Routes.form_results);
};
```

---

## Key Learnings & Best Practices

### 1. Form Structure

- **DescriptionBlock**: Identical pattern across all forms using 2-column FormBlock
- **Field Validation**: All optional fields use `.optional()` but always provide defaults in form initialization
- **Storage Persistence**: All forms use `useFormPersistence` hook for localStorage auto-save

### 2. Component Choices

**Switch vs Checkbox in Amputation Field**:

- **VLOS**: Checkbox (allows multiple selections logically, but only 2 items)
- **OSA**: Switch (cleaner for binary on/off states)
- **Best Practice**: Use Switch for 1-2 boolean options per AGENTS.md guidelines

**Textarea Configuration**:

- Standard: `rows={5}`
- Some forms add `className="resize-none"` to disable manual resizing
- OSA uses Card + CardContent wrapper (different from FormCard)

### 3. Form Field Binding

**Three approaches observed**:

Method 1 (Simplest - VLOS/OSB):

```typescript
<Textarea
  value={form.watch('specialNotes')}
  onChange={e => form.setValue('specialNotes', e.target.value)}
/>
```

Method 2 (Card-based - OSA):

```typescript
<Card>
  <CardHeader><CardTitle>{t('specialNotes')}</CardTitle></CardHeader>
  <CardContent>
    <Textarea
      value={form.watch('specialNotes')}
      onChange={e => form.setValue('specialNotes', e.target.value)}
    />
  </CardContent>
</Card>
```

Method 3 (FormField - Steunzolen - Recommended):

```typescript
<FormField
  control={form.control}
  name="specialNotes"
  render={({field}) => (
    <FormItem>
      <FormControl>
        <Textarea {...field} />
      </FormControl>
      <FormMessage /> {/* Shows validation errors */}
    </FormItem>
  )}
/>
```

### 4. ID Naming Convention

- **VLOS/OSA/Steunzolen**: Use `ov-` prefix for pair selection radio IDs
- **OSB**: Uses `osb-` prefix (form-specific)
- **Pattern**: `{formPrefix}-{fieldValue}` or generic field names like `side-both`, `side-left`, `side-right`

### 5. Props & Styling

**FormBlock Props** (across patterns):

- `columns`: Typically 2 for DescriptionBlock, 1 for side selection (OSB), varies for others
- `dividers`: `true` for DescriptionBlock and side selection
- `alignItems`: `start` (default) or `center` (OSB side selection)
- `hoverEffect`: `false` for certain blocks (not applicable to all)

**FormItemWrapper Props**:

- Uses `label` prop for field labels
- Uses `className="w-2/3"` on containers for consistent sizing

---

## File locations for reference:

- [intake-vlos](src/pages/intake-vlos/index.tsx)
- [intake-osa](src/pages/intake-osa/index.tsx)
- [intake-osb](src/pages/intake-osb/index.tsx)
- [intake-steunzolen](src/pages/intake-steunzolen/index.tsx)
- [Form constants](src/domain/form/constants/formConstants.ts)
