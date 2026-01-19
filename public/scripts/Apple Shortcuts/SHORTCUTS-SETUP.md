# Apple Shortcuts Setup Guide

## Required Apple Shortcuts Actions

This guide shows exactly how to set up the three shortcuts needed for the OCR form filler system.

---

## Prerequisites

1. ✅ Enable "Allow Running Scripts" in Settings → Shortcuts → Advanced
2. ✅ Have Safari browser on your device
3. ✅ Access to local AI model (Apple Intelligence or similar)
4. ✅ Camera access for OCR

---

## Shortcut 1: Extract Form Metadata

**Name**: "Extract Form Fields"

**Actions**:

```
1. Open URLs
   → URL: https://itsnotdaan.github.io/form-generator/new-client/
   → Show Safari Reader: No

2. Run JavaScript on Web Page
   → JavaScript: [Paste entire contents of extract-form-data.js]
   → URL: Safari Web Page

3. Get Text from Input
   → Input: JavaScript Result

4. Copy to Clipboard
   → Text

5. Show Result
   → Text
```

**Output**: JSON with 18 form field definitions

**When to run**: Only once at the start (or when form changes)

---

## Shortcut 2: Process with AI (Manual Step)

This is not a Shortcut - it's a manual process:

1. Take photo of doctor's referral
2. Use system OCR (Share Sheet → Extract Text)
3. Open your local AI app
4. Copy prompt from `ai-prompt-template.txt`
5. Replace `[FORM_METADATA]` with JSON from Shortcut 1
6. Replace `[OCR_TEXT]` with extracted text from photo
7. Run AI
8. Copy the JSON output from AI

**Output**: JSON with extracted field values

---

## Shortcut 3: Populate Form

**Name**: "Populate Form from AI"

**Actions**:

```
1. Get Clipboard
   → (This should contain AI output JSON)

2. Open URLs
   → URL: https://itsnotdaan.github.io/form-generator/new-client/
   → Show Safari Reader: No

3. Wait
   → Duration: 2 seconds
   → (Give form time to load)

4. Run JavaScript on Web Page
   → JavaScript: [See below for modified script]
   → URL: Safari Web Page

5. Show Result
   → JavaScript Result
```

**JavaScript for Action 4**:

```javascript
// Get the AI JSON from clipboard (passed as Shortcuts variable)
const aiData = `SHORTCUT_INPUT`;

// Parse it
const extractedData = JSON.parse(aiData);

// Now run the populate script with this data
[PASTE ENTIRE populate-form-data.js HERE, but wrap the function and call it with extractedData]
```

**Alternative simplified version**:

```javascript
(function () {
  // Paste AI JSON output here as a variable
  const extractedData = JSON.parse(`SHORTCUT_INPUT`);

  // [PASTE REST OF populate-form-data.js HERE]
  // But modify the last part to use extractedData instead of arguments[0]
})();
```

---

## Complete Workflow Example

### Full Step-by-Step Process

#### Part 1: One-Time Setup

1. **Create Shortcut 1: Extract Form Fields**
   - Open Shortcuts app
   - Create new shortcut
   - Add actions as shown above
   - Paste contents of `extract-form-data.js`
   - Save as "Extract Form Fields"

2. **Run Shortcut 1**
   - Opens form page in Safari
   - Extracts form metadata
   - Copies JSON to clipboard
   - **Save this JSON** - you'll reuse it every time

3. **Prepare AI Prompt Template**
   - Open `ai-prompt-template.txt`
   - Replace `[FORM_METADATA]` with the JSON from step 2
   - **Save this modified prompt** - you'll reuse it with different OCR texts

#### Part 2: For Each New Referral

4. **Take Photo of Doctor's Referral**
   - Use iPad camera
   - Make sure text is clear and readable
   - Good lighting, no glare

5. **Extract Text via OCR**
   - Open photo in Photos app
   - Tap "Live Text" button
   - Select all text
   - Copy to clipboard

6. **Run Local AI Model**
   - Open your AI app
   - Paste the prompt template (from step 3)
   - Replace `[OCR_TEXT]` with the clipboard text
   - Run AI model
   - **Copy the JSON output**

7. **Create Shortcut 3: Populate Form**
   - Create new shortcut
   - Add actions as shown above
   - Modify populate script to accept clipboard input
   - Save as "Populate Form from AI"

8. **Run Shortcut 3**
   - Have AI JSON output in clipboard
   - Run shortcut
   - Opens form page
   - Populates all fields automatically
   - Shows success/failure report

9. **Review and Submit**
   - Check populated fields
   - Fill any missing required fields
   - Address should auto-populate
   - Click "Continue" when ready

---

## Simplified Alternative: Single Combined Shortcut

Instead of separate shortcuts, you can create one "Master OCR Form Filler":

**Actions**:

```
1. Take Photo
   → Camera or Photo Library

2. Extract Text from Image
   → (Uses system OCR)

3. Open URLs
   → https://itsnotdaan.github.io/form-generator/new-client/

4. Run JavaScript on Web Page
   → Extract metadata script

5. Set Variable "FormMetadata"
   → JavaScript Result

6. Set Variable "OCRText"
   → Text from step 2

7. Ask for Input
   → Type: Text
   → Prompt: "Paste AI extracted JSON here"
   → (User runs AI manually and pastes result)

8. Run JavaScript on Web Page
   → Populate form script with input from step 7

9. Show Result
```

This requires one manual step (running AI) but combines everything else.

---

## JavaScript Script Modifications for Shortcuts

### For Populate Script in Shortcuts Context

The population script needs to receive data from Shortcuts. Here's how:

**Original**:

```javascript
(function (formDataInput) {
  // ...script...
})(arguments[0]);
```

**Modified for Shortcuts**:

```javascript
(function () {
  // Shortcuts will replace SHORTCUT_INPUT with the AI JSON
  const formDataInput = JSON.parse(`SHORTCUT_INPUT`);

  // ...rest of script stays the same...

  // At the end, return result
  return JSON.stringify(result);
})();
```

Then in Shortcuts, pass the clipboard (AI output) as the `SHORTCUT_INPUT` value.

---

## Testing Your Shortcuts

### Test Shortcut 1 (Extract)

1. Run the shortcut
2. Should open form page
3. Should return JSON with 18 fields
4. Check that `metadata` array has entries

**Expected output**:

```json
{
  "success": true,
  "fieldsFound": 18,
  "metadata": [...]
}
```

### Test Shortcut 3 (Populate) with Mock Data

1. Copy this to clipboard:

```json
{
  "salutation": "Dhr.",
  "clientName": "TestPerson",
  "initials": "T.P."
}
```

2. Run the shortcut
3. Form should open with fields filled

**Expected result**: Fields populate, no errors

---

## Advanced: Shortcut Input/Output

### Passing Data Between Shortcuts

**From Shortcut 1 to AI**:

```
Run Shortcut 1 → Get JSON → Copy to Clipboard → Paste in AI prompt
```

**From AI to Shortcut 3**:

```
AI returns JSON → Copy JSON → Run Shortcut 3 → Read from Clipboard
```

**Alternative: Using Shortcuts Variables**:

```
1. Run Shortcut 1 → Save to Variable "FormMetadata"
2. Take Photo → Extract Text → Save to Variable "OCRText"
3. Show Alert: "Run AI with these inputs, then paste JSON result"
4. Ask for Input → Save to Variable "AIResult"
5. Run Shortcut 3 with Variable "AIResult"
```

---

## Common Shortcuts Issues

### Issue: JavaScript doesn't run

**Solution**: Check Settings → Shortcuts → Advanced → Allow Running Scripts is ON

### Issue: Form page doesn't load

**Solution**: Add "Wait 2 seconds" action after "Open URLs"

### Issue: Can't pass data to JavaScript

**Solution**: Use Shortcuts variables or clipboard as intermediary

### Issue: JSON parsing errors

**Solution**: Validate AI output at jsonlint.com before pasting into shortcut

### Issue: Script returns "No data provided"

**Solution**: Make sure clipboard contains valid JSON before running populate shortcut

---

## Security Notes

- ✅ Scripts only run in Safari on your device
- ✅ No data sent to external servers
- ✅ All processing happens locally
- ✅ AI processing on device (if using Apple Intelligence)
- ⚠️ Review form data before submitting
- ⚠️ Scripts require "Allow Running Scripts" permission

---

## Tips for Best Results

1. **Photo Quality**: Take clear, well-lit photos of referrals
2. **OCR Accuracy**: Review OCR text before sending to AI
3. **AI Prompts**: Use the complete prompt template for best results
4. **Manual Review**: Always review populated fields before submitting
5. **Save Templates**: Save the metadata JSON and prompt template for reuse
6. **Test First**: Test with mock data before using real referrals

---

## Workflow Diagram

```
┌─────────────────┐
│  Take Photo     │
│  of Referral    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OCR Extract    │
│  Text           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Run Shortcut 1 │
│  Extract Fields │ ← One-time or when form updates
└────────┬────────┘
         │
         ▼ FormMetadata JSON
┌─────────────────┐
│  AI Processing  │
│  (Manual)       │ ← Paste prompt + metadata + OCR text
└────────┬────────┘
         │
         ▼ Extracted JSON
┌─────────────────┐
│  Run Shortcut 3 │
│  Populate Form  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Review & Submit│
│  Form           │
└─────────────────┘
```

---

## Summary

You need to create:

1. ✅ Shortcut to extract form metadata (one-time)
2. ✅ Manual AI processing step (each referral)
3. ✅ Shortcut to populate form (each referral)

All scripts are ready in this folder. Just copy them into Shortcuts app and follow the workflow!

**Start with creating Shortcut 1, test it, then move to Shortcut 3.**
