/**
 * Apple Shortcuts - Extract Form Data Script
 *
 * This script extracts all form field data from the new-client form page.
 * It captures field labels, values, types, and other metadata for use with Apple Shortcuts.
 *
 * Usage in Apple Shortcuts:
 * 1. Open Safari to the new-client form page
 * 2. Run this script using "Run JavaScript on Web Page" action
 * 3. The script returns a JSON array with all form field data
 */

(function () {
  var result = [];

  // Extract all possible input fields
  var elements = document.querySelectorAll('input, textarea, select');

  for (let element of elements) {
    // Skip hidden fields and submit buttons
    if (
      element.type === 'hidden' ||
      element.type === 'submit' ||
      element.type === 'button'
    ) {
      continue;
    }

    // Try to find a label via 'for' attribute or via a parent <label>
    var labelText = '';
    if (element.id) {
      var label = document.querySelector('label[for="' + element.id + '"]');
      if (label) {
        labelText = label.innerText.trim();
      }
    }
    if (!labelText) {
      var parentLabel = element.closest('label');
      if (parentLabel) {
        labelText = parentLabel.innerText.trim();
      }
    }

    // Try to find label from parent FormControl structure (Chakra UI)
    if (!labelText) {
      var parentBox = element.closest('[id^="field-"]');
      if (parentBox) {
        var boxLabel = parentBox.querySelector('label');
        if (boxLabel) {
          labelText = boxLabel.innerText.trim();
        }
      }
    }

    // Get field value based on type
    var fieldValue = null;
    if (element.type === 'checkbox') {
      fieldValue = element.checked;
    } else if (element.type === 'radio') {
      if (element.checked) {
        fieldValue = element.value;
      } else {
        continue; // Skip unchecked radio buttons
      }
    } else {
      fieldValue = element.value || null;
    }

    // Get the field container ID for better identification
    var fieldContainerId = null;
    var parentBox = element.closest('[id^="field-"]');
    if (parentBox) {
      fieldContainerId = parentBox.id;
    }

    result.push({
      tag: element.tagName.toLowerCase(),
      type: element.type || null,
      name: element.name || null,
      id: element.id || null,
      fieldContainerId: fieldContainerId,
      placeholder: element.placeholder || null,
      label: labelText || null,
      value: fieldValue,
      required: element.required || false,
      readonly: element.readOnly || false,
      disabled: element.disabled || false,
    });
  }

  // Return the result
  return JSON.stringify(result, null, 2);
})();
