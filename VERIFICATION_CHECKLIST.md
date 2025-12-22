# Verification Checklist

## Quick Test Instructions

### Test 1: Check Foliepas Form (Primary Request)
1. Navigate to the check-foliepas form
2. Fill in some fields (side, reading corrections, enclosure, etc.)
3. Wait 1 second (for debounce)
4. Open DevTools > Application > Local Storage
5. Verify entry exists: `form_autosave_checkFoliepas`
6. Refresh the page (F5 or Cmd+R)
7. ✅ Verify all filled data is restored
8. Submit the form successfully
9. Check DevTools again
10. ✅ Verify the localStorage entry is removed

### Test 2: Multiple Forms
1. Fill out intake-vlos form partially
2. Navigate to intake-osa form
3. Fill out intake-osa form partially
4. Refresh the page
5. ✅ Verify both forms retain their data independently

### Test 3: TTL (Time To Live)
1. Open DevTools console
2. Run: `localStorage.setItem('form_autosave_test', JSON.stringify({data:{test:1},timestamp:Date.now()-8*24*60*60*1000}))`
3. Refresh the page
4. Run: `localStorage.getItem('form_autosave_test')`
5. ✅ Verify it returns null (expired data cleaned up)

### Test 4: Debounce Timing
1. Open check-foliepas form
2. Open DevTools console
3. Type in a field and wait 500ms
4. Check localStorage immediately (should have data)
5. Type again without waiting
6. Check localStorage within 500ms (should not update yet)
7. ✅ Verify debounce is working

## Technical Verification

### Code Review
- [ ] All form imports include `useFormPersistence`
- [ ] All forms call `clearStorage()` in `onSubmit`
- [ ] `_app.tsx` calls `cleanupExpiredStorage()` on mount
- [ ] Hook properly uses `form.watch` and `form.setValue`
- [ ] LocalStorage helper has error handling

### File Checks
```bash
# Verify files exist
ls -l src/utils/localStorageHelper.ts
ls -l src/hooks/useFormPersistence.ts
ls -l FORM_PERSISTENCE.md
ls -l IMPLEMENTATION_SUMMARY.md

# Verify forms have persistence
grep -l "useFormPersistence" src/pages/*/index.tsx | wc -l
# Should output: 9

# Verify clearStorage is called
grep -l "clearStorage()" src/pages/*/index.tsx | wc -l
# Should output: 9
```

### Browser DevTools Check
After filling out a form:
1. Application tab > Local Storage
2. Look for keys starting with `form_autosave_`
3. Inspect the value - should be JSON with `data` and `timestamp`

## Edge Cases to Test

### Storage Quota
1. Fill localStorage to near quota
2. Try saving form data
3. ✅ Should fail gracefully without breaking the form

### Private Browsing
1. Open in private/incognito mode
2. Fill out form
3. ✅ Should work or fail gracefully

### Multiple Tabs
1. Open same form in two tabs
2. Fill data in tab 1
3. Refresh tab 2
4. ✅ Tab 2 should load saved data

### Network Issues
1. Go offline
2. Fill out form
3. ✅ Should still save to localStorage
4. Go online and submit
5. ✅ Should clear localStorage after submit

## Performance Check

- [ ] No noticeable lag when typing
- [ ] Debounce prevents excessive localStorage writes
- [ ] Page load time not significantly affected
- [ ] Form submission speed unchanged

## Accessibility

- [ ] No impact on screen readers
- [ ] Keyboard navigation still works
- [ ] Form validation not affected
- [ ] Error messages still display correctly

## Clean Up

After testing:
```bash
# Clear test data
localStorage.clear()
# or in console
Object.keys(localStorage).filter(k => k.startsWith('form_autosave_')).forEach(k => localStorage.removeItem(k))
```

## Sign Off

- [ ] All tests pass
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Ready for review
