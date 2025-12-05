# Medical Code Generation System - Implementation Summary

## Overview

This document describes the implementation of the medical code generation system for VLOS and OSA intake forms, which generates codes 1-17 based on form data for Word document mail merge.

## Implementation Date

Completed: 2024

## Features Implemented

### 1. Code Generation Utility (`src/utils/codeGenerator.ts`)

**Purpose:** Core logic for generating medical codes based on intake form data.

**Key Functions:**

- `generateCodes(clientData, intakeData)` - Main entry point that returns `{codes, warnings}`
- `generateVLOSCodes()` - Handles VLOS codes (1, 2, 9, 15, 16, 17)
- `generateOSACodes()` - Handles OSA codes (3-8, 9, 15, 16, 17) with schachthoogte thresholds
- `initializeCodes()` - Initializes all 34 boolean code fields to false
- `hasOmsluiting()` - Checks if any omsluiting option is selected (triggers code 17)
- `isEerstePaar()` - Determines if it's eerste paar vs herhaling/reserve/privé

**Code Logic:**

#### VLOS Codes

- **Code 1:** VLOS eerste paar (odd code)
- **Code 2:** VLOS herhaling/reserve/privé paar (even code)
- **Code 9:** Proefschoen (auto-generated with VLOS)
- **Code 15:** Zoolverstijving (if enabled)
- **Code 16:** Ezelsoor mediaal/lateraal (if enabled)
- **Code 17:** Koker tussen voering (if any omsluiting selected)

#### OSA Codes (based on schachthoogte)

- **Codes 3/4:** Laag OSA (<12cm) - eerste/herhaling
- **Codes 5/6:** Half-hoog OSA (12-18cm) - eerste/herhaling
- **Codes 7/8:** Hoog OSA (>18cm) - eerste/herhaling
- **Code 9:** Proefschoen (auto-generated with OSA)
- **Code 15:** Zoolverstijving (if enabled)
- **Code 16:** Ezelsoor mediaal/lateraal (if enabled)
- **Code 17:** Koker tussen voering (if any omsluiting selected)

#### Placeholder Codes

- **Codes 10, 11, 14, 16a:** Reserved for future use

**Output Format:**

```typescript
interface GeneratedCodes {
  code01Links: boolean;
  code01Rechts: boolean;
  code02Links: boolean;
  code02Rechts: boolean;
  // ... all codes 1-17 for both sides (34 total)
}

interface CodeGenerationResult {
  codes: GeneratedCodes;
  warnings: string[];
}
```

### 2. Ezelsoor Field Addition

**Files Modified:**

- `src/presentation/form/constants/formConstants.ts`

  - Added `EzelsoorType = 'Mediaal' | 'Lateraal'`
  - Added `EZELSOOR_TYPE_OPTIES` constant

- `src/presentation/form/types/formData.ts`

  - Added to `IntakeVLOSData`:
    - `ezelsoorLinksEnabled: boolean`
    - `ezelsoorRechtsEnabled: boolean`
    - `ezelsoorLinksType?: string`
    - `ezelsoorRechtsType?: string`

- `src/presentation/form/intake-vlos/page.tsx`
  - Added Ezelsoor UI section with ja/nee radio groups
  - Added mediaal/lateraal dropdown per side
  - Integrated with form state management

### 3. OSA Intake Form

**Files Created:**

- `src/presentation/form/intake-osa/page.tsx` - OSA form component (mirrors VLOS structure)
- `src/pages/intake-osa/index.tsx` - Next.js page wrapper

**Files Modified:**

- `src/presentation/form/types/formData.ts`

  - Created `IntakeOSAData` type alias (identical to `IntakeVLOSData`)
  - Added to `ClientData.intakeType` union: `'OSA'`
  - Added to `FormSubmissionData`: `intakeOSA?: IntakeOSAData`

- `src/domain/store/slices/formData.ts`

  - Added `intakeOSA: IntakeOSAData | null` to state
  - Added `setIntakeOSAData` action
  - Updated `clearFormData` and `clearIntakeForms` to clear OSA data

- `src/presentation/routes.ts`

  - Added `form_intake_osa: '/intake-osa'` route

- `src/presentation/form/form-selection/page.tsx`
  - Added OSA button to intake form selection grid

### 4. Code Generation Integration

**Files Modified:**

- `src/presentation/form/form-results/page.tsx`
  - Imported `generateCodes` from utils
  - Called code generation for VLOS/OSA forms
  - Spread individual code boolean keys into JSON output (Word compatibility)
  - Added warnings display in Alert box above form data
  - Added `intakeOSA` to results display

### 5. Translations

**File Modified:**

- `locales/nl/form.json`
  - Added `intakeOsa: "Intakeformulier OSA"`
  - Added `ezelsoor: "Ezelsoor"`
  - Added `codeWarnings: "Code generatie waarschuwingen"`

## Technical Details

### Code Generation Rules

1. **Eerste vs Herhaling:**

   - "Eerste paar" → Odd codes (1, 3, 5, 7)
   - "Herhalings paar", "Reserve paar", "Privé paar" → Even codes (2, 4, 6, 8)

2. **Side-Specific:**

   - Each code has separate boolean for Links and Rechts
   - Multiple codes can be active per side simultaneously

3. **Schachthoogte Thresholds (OSA only):**

   - `< 12 cm` → Laag (codes 3/4)
   - `12-18 cm` → Half-hoog (codes 5/6)
   - `> 18 cm` → Hoog (codes 7/8)

4. **Automatic Codes:**

   - Code 9 (proefschoen) always generated with VLOS or OSA
   - Code 17 (koker) generated if any omsluiting option selected

5. **Validation Warnings:**
   - Missing schachthoogte for OSA
   - Ezelsoor enabled but no type selected
   - Missing intake data

### Word Document Compatibility

The code generation produces flat boolean keys for Word mail merge:

```json
{
  "code01Links": true,
  "code01Rechts": false,
  "code02Links": false,
  "code02Rechts": true
  // ... etc for all 34 code fields
}
```

This allows Word templates to use simple merge fields like `{code01Links}` which will display as `true` or `false`.

## Files Created/Modified Summary

### Created Files (3):

1. `/src/utils/codeGenerator.ts` (372 lines)
2. `/src/presentation/form/intake-osa/page.tsx` (1050+ lines)
3. `/src/pages/intake-osa/index.tsx` (3 lines)

### Modified Files (7):

1. `/src/presentation/form/constants/formConstants.ts` - Added ezelsoor constants
2. `/src/presentation/form/types/formData.ts` - Added OSA and ezelsoor types
3. `/src/domain/store/slices/formData.ts` - Added OSA Redux state/actions
4. `/src/presentation/form/intake-vlos/page.tsx` - Added Ezelsoor section
5. `/src/presentation/routes.ts` - Added OSA route
6. `/src/presentation/form/form-selection/page.tsx` - Added OSA button
7. `/src/presentation/form/form-results/page.tsx` - Integrated code generation
8. `/locales/nl/form.json` - Added translations

## Testing Recommendations

1. **VLOS First Pair:**

   - Verify code 1 (Links/Rechts) generates for "Eerste paar"
   - Verify code 9 auto-generates
   - Test zoolverstijving → code 15
   - Test ezelsoor → code 16
   - Test omsluiting → code 17

2. **VLOS Repeat Pair:**

   - Verify code 2 generates for "Herhalings paar"

3. **OSA with Different Heights:**

   - Test schachthoogte < 12cm → codes 3/4
   - Test schachthoogte 12-18cm → codes 5/6
   - Test schachthoogte > 18cm → codes 7/8
   - Verify code 9 auto-generates

4. **Side Selection:**

   - Test "Beide" → codes for both sides
   - Test "Links" → only Links codes
   - Test "Rechts" → only Rechts codes

5. **Validation Warnings:**
   - Test missing schachthoogte in OSA
   - Test ezelsoor enabled without type
   - Verify warnings display in results page

## Future Enhancements

- Implement OSB and OVAC specific codes (mentioned as future work)
- Implement placeholder codes (10, 11, 14, 16a) when requirements are defined
- Add unit tests for code generation logic
- Add visual code summary table in results page
- Export to Word document directly (not just JSON)

## Notes

- OSA and VLOS forms share identical structure (IntakeOSAData = IntakeVLOSData)
- Code generation only runs for VLOS and OSA intake types
- All 34 code boolean keys are always present in output (even if false)
- Warnings are non-blocking - codes still generate with partial data
