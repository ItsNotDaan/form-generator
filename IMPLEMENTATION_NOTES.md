# Implementation Notes: Form Flow

## Overview
This document describes the implementation of the complete form flow from new client creation to JSON output.

## Flow Description

### 1. New Client Form (`/new-client`)
- User fills in all required client information
- Data is saved to Redux store (`formData.client`)
- Upon clicking "Save & Continue", user is redirected to `/form-selection`

### 2. Form Selection (`/form-selection`)
- Displays all available intake forms:
  - VLOS
  - Pulman
  - Rebacare
  - OSB (SOS)
  - OVAC
  - Steunzolen
- Shows client information (initials + name)
- Redirects to `/new-client` if no client data exists

### 3. Intake Forms (e.g., `/intake-vlos`)
- User fills in the selected intake form
- Data is saved to Redux store (e.g., `formData.intakeVLOS`)
- Upon clicking "Save & Continue", user is redirected to `/form-results`

### 4. Results Page (`/form-results`)
- Displays all submitted data in readable format
- Shows JSON output with:
  - All client data
  - All intake form data (whichever forms were filled)
  - All constants from `formConstants.ts`
  - Generation timestamp
- Features:
  - "Copy JSON" button to copy to clipboard
  - JSON displayed in formatted, readable view
  - Navigation buttons to fill another form or return to overview
- Redirects to `/new-client` if no client data exists

## Technical Implementation

### State Management
- All form data is stored in Redux using `@reduxjs/toolkit`
- Store structure:
  ```typescript
  {
    formData: {
      client: ClientData | null,
      intakeVLOS: IntakeVLOSData | null,
      intakePulman: IntakePulmanData | null,
      intakeRebacare: IntakeRebacareData | null,
      intakeOSB: IntakeOSBData | null,
      intakeOVAC: IntakeOVACData | null,
      intakeSteunzolen: IntakeSteunzolenData | null
    }
  }
  ```

### JSON Generation
The JSON output includes:
1. All client data
2. All filled intake form data
3. All constants from `formConstants.ts` (practitioners, options, etc.)
4. Generation timestamp

### Files Modified/Created

#### New Files:
- `src/pages/form-selection/index.tsx` - Page route for form selection
- `src/presentation/form/form-selection/page.tsx` - Form selection component
- `src/pages/form-results/index.tsx` - Page route for results
- `src/presentation/form/form-results/page.tsx` - Results page component

#### Modified Files:
- `src/presentation/form/new-client/page.tsx` - Changed navigation to form-selection
- `src/presentation/form/intake-vlos/page.tsx` - Changed navigation to form-results
- `src/presentation/routes.ts` - Added new routes
- `locales/nl/form.json` - Added translations for new pages

## Testing

### Manual Testing Steps:
1. Navigate to `/new-client`
2. Fill in all required fields
3. Click "Save & Continue" → Should redirect to `/form-selection`
4. Click on "Intakeformulier VLOS" → Should redirect to `/intake-vlos`
5. Fill in VLOS form
6. Click "Save & Continue" → Should redirect to `/form-results`
7. Verify all data is displayed correctly
8. Verify JSON is shown with proper formatting
9. Click "Copy JSON" → Should show success toast
10. Paste clipboard content → Should contain complete JSON

### Dev Server Testing:
The dev server runs successfully with all new pages compiling without errors.

## Notes

### Pre-existing Issues:
- `intake-osb/page.tsx` has type errors (not related to this PR)
- `intake-ovac/page.tsx` has type errors (not related to this PR)
- These prevent the production build from succeeding but do not affect the functionality of the new pages

### Future Improvements:
- Add validation for all intake forms before allowing navigation to results
- Add ability to edit forms after viewing results
- Add PDF generation from JSON data
- Add server-side persistence of form data
- Add loading states during navigation
