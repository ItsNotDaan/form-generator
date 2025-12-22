# Form Data Persistence Implementation

## Overview

This implementation adds automatic form data persistence to localStorage for all forms in the application. The data is automatically saved with a debounce delay and includes TTL (Time To Live) for automatic cleanup.

## Features

- **Automatic Saving**: Form data is saved to localStorage automatically with 500ms debounce
- **No Visual Feedback**: Saves silently in the background without user notification
- **TTL/Expiration**: Data older than 7 days is automatically removed
- **Restore on Refresh**: Form data is restored when the page is refreshed
- **Cleanup on Submit**: Saved data is cleared when the form is successfully submitted

## Technical Details

### Files Created

1. **`src/utils/localStorageHelper.ts`**
   - Core localStorage utilities with TTL support
   - Functions: `saveToLocalStorage`, `loadFromLocalStorage`, `removeFromLocalStorage`, `cleanupExpiredStorage`
   - TTL: 7 days by default

2. **`src/hooks/useFormPersistence.ts`**
   - React Hook for form persistence
   - Debounce: 500ms
   - Integrates with React Hook Form
   - Returns `clearStorage` function for cleanup

### Files Modified

1. **`src/pages/_app.tsx`**
   - Added cleanup call on app initialization
   - Removes expired localStorage entries on each app load

2. **Form Pages** (all intake forms and client forms):
   - `src/pages/check-foliepas/index.tsx`
   - `src/pages/intake-vlos/index.tsx`
   - `src/pages/intake-osa/index.tsx`
   - `src/pages/intake-osb/index.tsx`
   - `src/pages/intake-ovac/index.tsx`
   - `src/pages/intake-pulman/index.tsx`
   - `src/pages/intake-rebacare/index.tsx`
   - `src/pages/intake-steunzolen/index.tsx`
   - `src/pages/new-client/index.tsx`
   - `src/pages/old-client/index.tsx`

## Usage

The persistence is automatically enabled for all forms. Each form has its own storage key:

- `checkFoliepas` - Check Foliepas form
- `intakeVLOS` - Intake VLOS form
- `intakeOsa` - Intake OSA form
- `intakeOsb` - Intake OSB form
- `intakeOvac` - Intake OVAC form
- `intakePulman` - Intake Pulman form
- `intakeRebacare` - Intake Rebacare form
- `intakeSteunzolen` - Intake Steunzolen form
- `newclient` - New Client form
- `oldclient` - Old Client form

## Configuration

To modify the behavior, edit these constants:

### Debounce Delay
In `src/hooks/useFormPersistence.ts`:
```typescript
const DEBOUNCE_MS = 500; // Change to desired milliseconds
```

### TTL (Time To Live)
In `src/utils/localStorageHelper.ts`:
```typescript
const TTL_DAYS = 7; // Change to desired number of days
```

## Storage Keys

All localStorage keys are prefixed with `form_autosave_` to avoid conflicts. For example:
- `form_autosave_checkFoliepas`
- `form_autosave_intakeVLOS`

## Data Structure

Each stored entry contains:
```typescript
{
  data: FormData,      // The actual form data
  timestamp: number    // Unix timestamp in milliseconds
}
```

## Cleanup Mechanism

1. **On App Load**: `cleanupExpiredStorage()` runs automatically
2. **On Form Submit**: `clearStorage()` is called for that specific form
3. **TTL Check**: Every time data is loaded, it checks if expired

## Browser Compatibility

Uses standard `localStorage` API, supported in all modern browsers. Falls back gracefully if localStorage is unavailable (e.g., in private browsing mode).

## Testing

To test the implementation:

1. Fill out a form (e.g., Check Foliepas)
2. Refresh the page
3. Verify the form data is restored
4. Submit the form
5. Refresh again and verify the data is cleared

## Future Enhancements

Possible improvements:
- Add visual indicator for auto-save status (optional)
- Configurable TTL per form
- Export/import form data
- Sync across tabs using `storage` event
