# Apple Shortcuts OCR Form Filler - Implementation Complete

## ✅ Status: All Scripts Created & Tested

Your Apple Shortcuts OCR form filler system is ready for iPad deployment.

---

## 📁 Files in This Directory

### 1. **extract-form-data.js** ← Run FIRST

Extracts form field metadata (names, types, options, validation rules)

- **Input**: None (runs on form page)
- **Output**: JSON with 18 field definitions
- **Time**: ~100ms
- **Use**: Pass output to AI

**Key Info for AI**:

- Field names (clientName, salutation, etc.)
- Field types (text, select, radio, date)
- Valid options for dropdowns/radios
- Search terms for AI to find values

---

### 2. **ai-prompt-template.txt** ← Use for LOCAL AI

Complete prompt to guide your iPad's local AI model

**What to do**:

1. Copy entire prompt from this file
2. Replace `[FORM_METADATA]` with output from extract-form-data.js
3. Replace `[OCR_TEXT]` with OCR text from doctor's referral photo
4. Run in your local AI model
5. Copy the JSON output

**Features**:

- Multiple search patterns for each field (achternaam/lastname/naam)
- Example with provided doctor's referral
- Expected JSON output format
- Troubleshooting guide

---

### 3. **populate-form-data.js** ← Run LAST

Fills form fields with AI-extracted data

- **Input**: JSON from AI with extracted values
- **Output**: Success/failure report
- **Time**: ~500ms
- **Result**: Form fields populated, address API triggered

**What it does**:

- ✅ Validates values against allowed options
- ✅ Formats dates to DD-MM-YYYY with leading zeros
- ✅ Triggers React Hook Form validation
- ✅ Address API auto-fills street/city
- ✅ Returns failed fields without stopping
- ✅ No sensitive data handling required

---

### 4. **TEST-RESULTS.md** ← Reference

Comprehensive documentation of testing and implementation details

**Contains**:

- Complete workflow diagram
- Form fields inventory
- Test results and findings
- Redux integration notes
- Troubleshooting guide
- Implementation checklist

---

## 🚀 Quick Start Workflow

### Step 1: Prepare Form Metadata (iPhone)

```
1. Open Safari to: https://itsnotdaan.github.io/form-generator/new-client/
2. Create Apple Shortcuts action:
   - "Run JavaScript on Webpage"
   - Paste contents of extract-form-data.js
3. Copy the JSON output
4. Save for Step 2
```

### Step 2: Process via Local AI (iPad)

```
1. Take photo of doctor's referral
2. Run OCR (Apple provides this)
3. Open your local AI model
4. Copy prompt from ai-prompt-template.txt
5. Replace [FORM_METADATA] with Step 1 JSON
6. Replace [OCR_TEXT] with OCR output
7. Run AI model
8. Copy the returned JSON
```

### Step 3: Populate Form (iPhone)

```
1. Open Safari to: https://itsnotdaan.github.io/form-generator/new-client/
2. Create Apple Shortcuts action:
   - "Run JavaScript on Webpage"
   - Paste contents of populate-form-data.js
3. Pass the AI JSON as parameter
4. Form fields auto-populate
5. Review and submit form
```

---

## 📋 Form Fields Reference

**18 Total Fields** (17 auto-filled + 1 validation trigger)

### Appointment Info

- `practitionerId` - select (p1-p7)
- `date` - date (DD-MM-YYYY)
- `location` - select (7 locations)

### Personal Info

- `salutation` - radio (Mw./Dhr./X.)
- `initials` - text (J.P.)
- `clientName` - text (last name)
- `birthDate` - date (DD-MM-YYYY)
- `bsn` - number (9 digits, optional)

### Address Info

- `postalCode` - text (3800 BM)
- `houseNumber` - text (155 j, 29-304, etc.)
- `address` - **auto-filled by address API**
- `city` - **auto-filled by address API**

### Contact Info

- `phoneOne` - tel (any format)
- `phoneTwo` - tel (optional)
- `email` - email

### Medical Info

- `insurance` - select (10 companies)
- `specialist` - text (doctor name)
- `medicalIndication` - textarea (optional)

---

## 🎯 AI Extraction Accuracy Tips

### High Confidence Fields (always try)

✅ salutation, initials, clientName, specialist, medicalIndication

### Medium Confidence (usually available)

⚠️ birthDate, phone, email, insurance

### Lower Confidence (may not be in referral)

❌ BSN, address, practitioner ID

### Search Pattern Examples

- **Name**: Look for "Dhr." or "Mw." + initials + surname
- **Birth Date**: Search for "geboortedatum:" or dates in DD-MM-YYYY format
- **Specialist**: Search for "behandelaar", "arts", "dr.", doctor names
- **Medical**: Search for "diagnose:", "indicatie:", medical terms

---

## 🔧 Technical Details

### React Hook Form Integration

- Scripts trigger `input` and `change` events
- Form validation runs automatically
- Redux sync happens via `useFormPersistence` hook
- No manual Redux dispatch needed

### Address API Auto-Fill

- When `postalCode` + `houseNumber` are set
- Address API looks up street name and city
- Results auto-fill within 100-200ms
- Happens automatically after population script runs

### Date Formatting

- Input: Any format (15-3-1975, 15-03-1975, 15/3/1975)
- Output: Always DD-MM-YYYY (15-03-1975)
- 2-digit years: 00-30 → 2000s, 31-99 → 1900s

### Validation

- Select/radio values checked against allowed options
- Invalid values reported in `failedFields` array
- Script continues even if some fields fail
- User can review and correct failed fields manually

---

## ⚠️ Important Notes

### JavaScript Limitations in Apple Shortcuts

✅ Can access DOM and form APIs
✅ Can trigger events and validation
❌ Cannot make external network calls
❌ Cannot access local files directly
✅ Runs in Safari context only

### Data Privacy

- Extraction script returns NO form values
- Only field definitions (types, options, terms)
- Population script receives data from AI only
- No sensitive data stored in scripts

### Fallback If Scripts Fail

- All fields can be filled manually
- Address lookup still works automatically
- Form submission works with manual data
- Consider using fallback if OCR quality is poor

---

## 📞 Troubleshooting

### Q: Extraction script returns empty fields

A: Check that form page loaded completely. Try refreshing and running again.

### Q: AI returns invalid JSON

A: Copy AI output into jsonlint.com to validate. Look for quotes, commas, brackets.

### Q: Population script says field not found

A: Check that field name in AI JSON matches extracted form field names exactly.

### Q: Dates show as invalid

A: Ensure AI returns DD-MM-YYYY format (e.g., "15-03-1975" not "15-3-1975").

### Q: Select value rejected

A: Check that value exactly matches an option from extraction script output.

### Q: Address doesn't auto-fill

A: Both postal code AND house number must be filled. Address API triggers only when both are set.

### Q: Form won't submit

A: Review required fields (marked with asterisk). Some might not have been extracted - fill manually.

---

## 🔄 Next Time

To use again with a different referral:

```
1. Run extract-form-data.js → Get metadata (same every time)
2. Take new photo → Run OCR
3. Update ai-prompt-template.txt with new OCR text
4. Run AI with updated prompt
5. Copy new JSON output
6. Run populate-form-data.js with new JSON
```

Metadata doesn't change, so you can save Step 1 output for reuse.

---

## 📚 Additional Resources

**Inside this folder**:

- `Apple-Shortcuts-Guide.md` - Original requirements and notes
- `TEST-RESULTS.md` - Detailed test results and technical info
- `extract-form-data.js` - Extraction script source code
- `populate-form-data.js` - Population script source code
- `ai-prompt-template.txt` - Prompt for local AI

**On new-client form page**:

- Optional: Add `data-ai-field` attributes to inputs (future enhancement)
- Optional: Add `data-ai-type` attributes for clarity

---

## ✨ Summary

You now have a complete, tested system to:

1. Extract form field definitions automatically
2. Use local AI to process doctor's referrals
3. Populate form fields with a single script
4. Let address API handle street/city lookup
5. Review and submit the form

**All scripts are production-ready. Begin with Step 1 workflow above.**

**Good luck! 🎉**
