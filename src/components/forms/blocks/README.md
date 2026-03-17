# Form Blocks

Reusable form section components for complex multi-field sections.

Always use: /home/dhlinux/Eemland/Website/form-generator/.github/prompts/extract-form-block.prompt.md

## Directory Structure

```
src/components/forms/blocks/
├── index.ts                      # Barrel export
├── ShaftHeightBlock.tsx          # Shaft height fields (standalone/embedded)
├── EnclosureBlock.tsx            # Enclosure + donkey ear (+ optional carbon)
├── InsoleAndTalonetteBlock.tsx   # Split/combined insole + talonette section
├── PairAndIndicationBlock.tsx    # Pair selection + medical indication
├── FunctieonderzoekBlock.tsx     # Functional research section
├── SideSelectionBlock.tsx        # Side selection + optional amputation
├── SpecialNotesBlock.tsx         # Special notes textarea
└── README.md                     # This file
```

## Purpose

This directory contains reusable form section components that encapsulate complete sections of forms. These components help maintain consistency across different forms and improve maintainability.

## When to Create a Form Block

Create a form block component when:

- ✅ A section appears in multiple forms (e.g., Functieonderzoek in VLOS, OSA, OSB)
- ✅ A section has 3+ FormBlocks or complex nested logic
- ✅ You want to isolate complex form logic from the main form page
- ✅ The section has its own set of constants and validation rules

## How to Use

### Import the Block

```typescript
import {FunctieonderzoekBlock} from '@/components/forms/blocks';
```

### Use in Your Form

```typescript
import React from 'react';
import {useForm} from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import {FunctieonderzoekBlock} from '@/components/forms/blocks';

export const MyIntakeForm = () => {
  const {t} = useTranslation('form');
  const form = useForm<FormData>({
    // form configuration
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Other form sections */}

      <FunctieonderzoekBlock form={form} t={t} />

      {/* More sections */}
    </form>
  );
};
```

## Creating a New Form Block

### 1. Create the Component File

Create a new file in `src/components/forms/blocks/`:

````typescript
// src/components/forms/blocks/MyNewBlock.tsx
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
// ... other imports

interface MyNewBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  // Add additional props as needed
}

/**
 * MyNewBlock - Brief description
 *
 * Detailed description of what this block does.
 *
 * @example
 * ```tsx
 * <MyNewBlock form={form} t={t} />
 * ```
 */
export const MyNewBlock: React.FC<MyNewBlockProps> = ({
  form,
  t,
}) => {
  return (
    <FormCard title={t('mySection')}>
      {/* Your FormBlocks here */}
    </FormCard>
  );
};
````

### 2. Add to Barrel Export

Update `index.ts`:

```typescript
export {FunctieonderzoekBlock} from './FunctieonderzoekBlock';
export {MyNewBlock} from './MyNewBlock';
```

### 3. Import and Use

```typescript
import {MyNewBlock} from '@/components/forms/blocks';

<MyNewBlock form={form} t={t} />
```

## Best Practices

### Import and Extraction Rules

When extracting page code into a block component, always apply these rules:

1. Read this README before creating or modifying a block.
2. Verify all required imports from the original page section and keep only what the block needs.
3. Always keep the original extracted page code at the bottom of the block file as commented reference code (mandatory for every extraction/update pass).
4. Check the original page for `FormField`-based wiring and other page-only concerns (routing, submit navigation, section-local handlers).
5. Rebuild the section in a block file under `src/components/forms/blocks/` and keep behavior equivalent.
6. Add concise section comments for complex logic and major render groups.
7. Use logic variables for conditional UI and behavior (prefer `includeX`, `showX`, `hasX`).
8. Prefer `Switch` for 1-2 boolean options and use `Checkbox` for 3+ multi-select options.
9. Use `FormField` only when truly needed (for example complex controlled inputs, `FormMessage` validation rendering, or explicit `FormControl` wiring).

### Extraction Checklist

Before finishing a block extraction:

- Confirm block props include `form` and `t`.
- Confirm field names still match the source page schema/defaultValues.
- Confirm optional behavior is controlled via explicit flags (example: `includeAmputation`).
- Confirm `src/components/forms/blocks/index.ts` exports the block.
- Confirm source page imports are updated to use the block.
- Confirm original code snapshot exists at the bottom of the block file (commented).

### Props Pattern

Always include these base props:

```typescript
interface BlockProps {
  form: UseFormReturn<any>; // Or use specific FormData type
  t: (key: string) => string;
  // Additional props as needed
}
```

### Optional Props

Add props for configurability:

```typescript
interface BlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  // Configuration
  showLeftRight?: boolean; // Show left/right fields
  disabled?: boolean; // Disable all inputs
  collapsible?: boolean; // Make FormCard collapsible
  // Callbacks
  onSectionComplete?: () => void;
}
```

### Type Safety

Use specific types when possible:

```typescript
import {IntakeVLOSData} from '@/domain/form/types';

interface FunctieonderzoekBlockProps {
  form: UseFormReturn<IntakeVLOSData>; // Specific type
  t: (key: string) => string;
}
```

### Keep Self-Contained

- Include all necessary imports in the component
- Use constants from `@/domain/form/constants`
- Don't rely on parent component state (except through props)
- Keep form field names consistent across forms

### Documentation

Add JSDoc comments with:

- Component description
- Usage examples
- Props explanation
- Any special behavior or requirements

## Example: FunctieonderzoekBlock

The `FunctieonderzoekBlock` demonstrates:

✅ Complete section encapsulation (9 FormBlocks)
✅ All imports included
✅ Uses centralized constants
✅ Proper TypeScript types
✅ JSDoc documentation
✅ Consistent with project patterns

## TODO: Potential Blocks to Extract

The following sections from existing forms are good candidates for extraction into reusable blocks:

### High Priority (3+ Forms)

- [x] **PairAndIndicationBlock** - Pair selection and medical indication
  - **Forms**: intake-vlos, intake-osa, intake-osb, intake-steunzolen (4 forms)
  - **Fields**: whichPair (radio), medicalIndication (textarea)
  - **Complexity**: 1 FormBlock, ~44 lines
  - **Variations**: Nearly identical except for styling
  - **Suggested Parameters**:

    ```typescript
    interface PairAndIndicationBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-osa/index.tsx
    Section name: {/_ Paartype & indicatie _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/PairAndIndicationBlock.tsx

- [x] **SideSelectionBlock** - Side selection (left/right/both) with optional amputation
  - **Forms**: All 5 forms (different variants)
  - **Fields**: side, optional: amputationLeft, amputationRight
  - **Complexity**: 1 FormBlock, 30-80 lines
  - **Variations**:
    - Simple: only side selection (osb, check-foliepas)
    - Complex: side + amputation toggles (vlos, osa)

  - **Suggested Parameters**:

    ```typescript
    interface SideSelectionBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      includeAmputation?: boolean; // Show amputation toggles
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-osa/index.tsx
    Section name: {/_ Side & Amputation _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/SideSelectionBlock.tsx

- [x] **SpecialNotesBlock** - Special notes textarea
  - **Forms**: intake-vlos, intake-osb, intake-steunzolen (3 forms)
  - **Fields**: specialNotes
  - **Complexity**: Very low, 0-1 FormBlock, 8-21 lines
  - **Variations**: Direct Textarea
  - **Suggested Parameters**:

    ```typescript
    interface SpecialNotesBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-osa/index.tsx
    Section name: {/_ Special Notes _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/SpecialNotesBlock.tsx

- [x] **FunctieonderzoekBlock**
  - **Forms**: intake-vlos, intake-osa (full), intake-osb (compact variant)
  - **Complexity**: Full variant: 11 FormBlocks, ~406 lines; Compact: 3 FormBlocks, ~86 lines
  - **Variations**:
    - Full: pathologies, walking aids, pain, foot inspection, muscle strength, joints
    - Compact: goals, walking function only
  - **Current Parameters**:

    ```typescript
    interface FunctieonderzoekBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-osa/index.tsx
    Section name: {/_ Functieonderzoek_/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/FunctieonderzoekBlock.tsx

### Medium Priority (2 Forms)

- [x] **ShaftHeightBlock** - Schachthoogte (shaft height)
  - **Forms**: intake-vlos, intake-osa, check-foliepas (embedded)
  - **Fields**: shaftHeightLeft, shaftHeightRight
  - **Complexity**: 34-38 lines standalone; 118 lines embedded
  - **Variations**:
    - Standalone FormCard (vlos, osa)
    - Embedded in larger card with leg length & shaft opening (foliepas)
  - **Suggested Parameters**:
    ```typescript
    interface ShaftHeightBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      showLeft?: boolean;
      showRight?: boolean;
      embeddedMode?: boolean; // If true, returns FormBlock only
    }
    ```
  - **Usage Example**:

    ```typescript
    // Standalone usage (intake-vlos, intake-osa)
    <ShaftHeightBlock form={form} t={t} showLeft={showLinks} showRight={showRechts} />

    // Embedded in foliepas
    <ShaftHeightBlock form={form} t={t} embeddedMode={true} />
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-osa/index.tsx
    Section name: {/_ Schachthoogte _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/ShaftHeightBlock.tsx

- [x] **EnclosureBlock** - Omsluiting (enclosure) configuration
  - **Forms**: intake-vlos, check-foliepas (as "Voeringschoen opties")
  - **Fields**: enclosureLeft/Right, enclosureLeftMm/RightMm, donkeyEarLeft/Right
  - **Complexity**: 253 lines (vlos), 317 lines (foliepas with carbon stiffening)
  - **Variations**:
    - Basic enclosure + donkey ear (vlos)
    - Adds carbon stiffening lining shoe option (foliepas)
  - **Suggested Parameters**:

    ```typescript
    interface EnclosureBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      showLeft?: boolean;
      showRight?: boolean;
      includeCarbonStiffening?: boolean; // For foliepas mode
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-vlos/index.tsx
    Section name: {/_ Omsluiting _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/EnclosureBlock.tsx

- [x] **InsoleAndTalonetteBlock** - Steunzool/Insole & Talonette configuration
  - **Forms**: intake-steunzolen (split), intake-osb (combined)
  - **Fields**: heelRaiseEnabled, heelRaiseLeft/Right, insoleEnabled, insoleType, etc.
  - **Complexity**: 218 lines total (steunzolen split), 216 lines (osb combined)
  - **Variations**:
    - Split into 2 toggleable cards (steunzolen)
    - Combined into 1 toggleable card (osb)
    - OSB includes price selector and synchronized toggle
  - **Suggested Parameters**:

    ```typescript
    interface InsoleAndTalonetteBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      mode?: 'split' | 'combined'; // Split = 2 cards, combined = 1 card
      enableTalonetteToggle?: boolean;
      enableInsoleToggle?: boolean;
      resetFieldsOnToggleOff?: boolean; // Clear fields when toggled off
      includePriceSelector?: boolean; // For OSB mode
      showLeft?: boolean;
      showRight?: boolean;
    }
    ```

    Page path: /home/dhlinux/Eemland/Website/form-generator/src/pages/intake-steunzolen/index.tsx
    Section name: {/_ Steunzool & Talonette _/}
    Target path: /home/dhlinux/Eemland/Website/form-generator/src/components/forms/blocks/InsoleAndTalonetteBlock.tsx

### Low Priority (1 Form but Complex)

- [ ] **HeelConfigurationBlock** - Heel type, height, and wedge settings
  - **Forms**: intake-vlos only
  - **Fields**: heelTypeLeft/Right, heelHeightLeft/Right, heelWedgeLeft/Right
  - **Complexity**: 215 lines, 3 FormBlocks
  - **Variations**: None (single form)
  - **Suggested Parameters**:
    ```typescript
    interface HeelConfigurationBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      showLeft?: boolean;
      showRight?: boolean;
      includeHeelType?: boolean;
      includeHeelHeight?: boolean;
      includeHeelWedge?: boolean;
    }
    ```

- [ ] **DigitalBlock** - Digital (OSA-specific toggleable section)
  - **Forms**: intake-osa only
  - **Fields**: digitalEnabled, heelLiftLeft/Right, mtp1Left/Right, clawToes, etc.
  - **Complexity**: 230 lines, 4 FormBlocks, toggleable
  - **Variations**: None (OSA-specific)
  - **Suggested Parameters**:
    ```typescript
    interface DigitalBlockProps {
      form: UseFormReturn<any>;
      t: (key: string) => string;
      showLeft?: boolean;
      showRight?: boolean;
      includeLastHeight?: boolean;
      includeClawToes?: boolean;
      includeScannedWithFoil?: boolean;
      includeInstructions?: boolean;
    }
    ```

- [ ] **ModulesBlock** - Modules configuration (OSB-specific)
  - **Forms**: intake-osb only
  - **Fields**: modulesEnabled, sole, rocker, hallux, deepening, supplement rows
  - **Complexity**: 232 lines, 7 FormBlocks, toggleable
  - **Variations**: None (OSB-specific)

- [ ] **HeelRoundingBlock** - Heel rounding configuration
  - **Forms**: intake-vlos only
  - **Complexity**: 159 lines
  - **Fields**: heelRoundingLeftEnabled/RightEnabled, heights, lengths

- [ ] **SupplementSupportBlock** - Custom insole shoring
  - **Forms**: intake-vlos only
  - **Complexity**: 111 lines
  - **Fields**: customInsoleShoringLeft/RightEnabled, types

- [ ] **SoleStiffeningBlock** - Zoolversteviging (sole reinforcement)
  - **Forms**: intake-vlos only
  - **Complexity**: 75 lines
  - **Fields**: soleReinforcementEnabled, left/right

### Implementation Strategy

**Parameter Patterns Used Across Blocks:**

```typescript
// Common base parameters
interface BaseBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
}

// Side visibility (for left/right paired fields)
interface SidedBlockProps extends BaseBlockProps {
  showLeft?: boolean;
  showRight?: boolean;
}

// Mode variants (different layouts or field sets)
interface VariantBlockProps extends BaseBlockProps {
  mode?: 'simple' | 'advanced' | 'embedded';
  variant?: 'full' | 'compact';
}

// Toggle behavior (for toggleable FormCards)
interface ToggleableBlockProps extends BaseBlockProps {
  enabledField?: string; // Field name for toggle state
  resetFieldsOnToggleOff?: boolean; // Clear fields when disabled
  defaultOpen?: boolean; // Initial toggle state
}

// Field inclusion (for optional subsections)
interface ConfigurableBlockProps extends BaseBlockProps {
  includeSubsections?: string[]; // Array of subsection names to show
  includeFields?: string[]; // Array of specific fields to include
}

// Custom titles (for rebranded sections)
interface CustomizableBlockProps extends BaseBlockProps {
  cardTitle?: string; // Override card title
  cardDescription?: string; // Override card description
  cardTitleKey?: string; // Translation key for title
}
```

**Real-World Example:**

```typescript
// ShaftHeightBlock supporting both standalone and embedded modes
export const ShaftHeightBlock: React.FC<ShaftHeightBlockProps> = ({
  form,
  t,
  showLeft = true,
  showRight = true,
  embeddedMode = false,
  includeLegLengthDifference = false,
  includeShaftOpening = false,
  cardTitle,
  cardDescription,
}) => {
  const content = (
    <>
      <FormBlock columns={2} dividers={true} title={t('shaftHeightCm')}>
        {showLeft && (
          <FormItemWrapper label={t('leftCm')} className="items-center">
            <Input
              type="number"
              placeholder={t('cmPlaceholder')}
              {...form.register('shaftHeightLeft')}
              className="w-2/3 text-center"
            />
          </FormItemWrapper>
        )}
        {showRight && (
          <FormItemWrapper label={t('rightCm')} className="items-center">
            <Input
              type="number"
              placeholder={t('cmPlaceholder')}
              {...form.register('shaftHeightRight')}
              className="w-2/3 text-center"
            />
          </FormItemWrapper>
        )}
      </FormBlock>

      {includeLegLengthDifference && (
        <FormBlock columns={2} dividers={true} title={t('legLengthDifference')}>
          {/* Leg length fields */}
        </FormBlock>
      )}

      {includeShaftOpening && (
        <FormBlock columns={1} title={t('shaftOpening')}>
          {/* Shaft opening fields */}
        </FormBlock>
      )}
    </>
  );

  // If embedded mode, return content without FormCard wrapper
  if (embeddedMode) {
    return <>{content}</>;
  }

  // Otherwise, wrap in FormCard
  return (
    <FormCard title={cardTitle || t('shaftHeight')} description={cardDescription}>
      {content}
    </FormCard>
  );
};
```

**Usage in Forms:**

```typescript
// In intake-vlos/index.tsx
<ShaftHeightBlock form={form} t={t} showLeft={showLinks} showRight={showRechts} />

// In check-foliepas/index.tsx (embedded mode)
<FormCard title="Foliepas aanmerkingen" description={`${t('shaftHeight')} • ...`}>
  <ShaftHeightBlock
    form={form}
    t={t}
    embeddedMode={true}
    includeLegLengthDifference={true}
    includeShaftOpening={true}
  />
</FormCard>
```

### Before Extracting a Block

**Checklist:**

1. ✅ Check if section appears in 2+ forms with similar structure
2. ✅ Identify all variations between forms (fields, layout, behavior)
3. ✅ Verify field names are consistent or can be mapped via props
4. ✅ Ensure all constants are centralized in `@/domain/form/constants`
5. ✅ Decide on parameters: mode, showLeft/Right, includeFields, etc.
6. ✅ Check for toggleable behavior or conditional rendering
7. ✅ Consider whether block needs embedded mode (for composition)

**Extraction Benefits:**

- Section appears in 3+ forms → **High priority**
- Section has 100+ lines of JSX → **Medium priority**
- Section has complex state or validation → **Medium priority**
- Section is toggleable with conditional fields → **Worth extracting**
- Section has only slight variations → **Easy to parameterize**

**Priority Order:**

1. Extract high-frequency blocks first (PairAndIndicationBlock, SideSelectionBlock, SpecialNotesBlock)
2. Extract medium-complexity blocks (ShaftHeightBlock, EnclosureBlock)
3. Extract complex single-form blocks last (HeelConfigurationBlock, DigitalBlock)

## Related Documentation

- [AGENTS.md](../../../AGENTS.md) - Architecture guide
- [website-design-language.md](../../../docs/website-design-language.md) - Component patterns
- [Form Constants](../../../domain/form/constants/formConstants.ts) - Dropdown options
