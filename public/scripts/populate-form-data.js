/**
 * Apple Shortcuts - Populate Form Data Script
 *
 * This script populates form fields with data provided by Apple Shortcuts.
 * It can handle text inputs, textareas, radio buttons, checkboxes, and select fields.
 *
 * Usage in Apple Shortcuts:
 * 1. Prepare a JSON object with field data (see format below)
 * 2. Open Safari to the new-client form page
 * 3. Run this script using "Run JavaScript on Web Page" action
 * 4. Pass the JSON data as the first argument
 *
 * Expected JSON format:
 * {
 *   "input-voorletters": "J.A.",
 *   "input-achternaam": "van der Berg",
 *   "input-postcode": "1234AB",
 *   "input-huisnummer": "123",
 *   "input-straatnaam": "Hoofdstraat",
 *   "input-stad": "Amsterdam",
 *   "input-telefoon1": "06-12345678",
 *   "input-emailadres": "naam@voorbeeld.nl",
 *   "radio-locatie-amersfoort": true,
 *   "radio-aanhef-dhr": true
 * }
 *
 * You can also use field names instead of IDs:
 * {
 *   "initials": "J.A.",
 *   "lastName": "van der Berg",
 *   ...
 * }
 */

(function (formData) {
  // Parse formData if it's a string
  if (typeof formData === 'string') {
    try {
      formData = JSON.parse(formData);
    } catch (e) {
      return JSON.stringify({
        success: false,
        error: 'Invalid JSON data provided: ' + e.message,
      });
    }
  }

  if (!formData || typeof formData !== 'object') {
    return JSON.stringify({
      success: false,
      error: 'No form data provided or invalid format',
    });
  }

  var fieldsPopulated = [];
  var fieldsNotFound = [];

  // Helper function to set field value
  function setFieldValue(element, value) {
    if (!element) return false;

    var elementType = element.type || element.tagName.toLowerCase();

    // Handle different field types
    if (elementType === 'checkbox') {
      element.checked = !!value;
    } else if (elementType === 'radio') {
      if (value === true || value === element.value) {
        element.checked = true;
        // Trigger change event for React/state management
        element.dispatchEvent(new Event('change', {bubbles: true}));
      }
    } else if (elementType === 'select-one' || elementType === 'select') {
      element.value = value;
      element.dispatchEvent(new Event('change', {bubbles: true}));
    } else {
      // Text input, textarea, etc.
      element.value = value;
      // Trigger input event for React/state management
      var event = new Event('input', {bubbles: true});
      element.dispatchEvent(event);
    }

    return true;
  }

  // Iterate through provided form data
  for (var key in formData) {
    if (!formData.hasOwnProperty(key)) continue;

    var value = formData[key];
    var element = null;

    // Try to find element by ID
    element = document.getElementById(key);

    // Try to find by name if ID didn't work
    if (!element) {
      var elementsByName = document.getElementsByName(key);
      if (elementsByName.length > 0) {
        element = elementsByName[0];
      }
    }

    // Try to find by matching label text (case-insensitive)
    if (!element) {
      var labels = document.querySelectorAll('label');
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].innerText.trim().toLowerCase() === key.toLowerCase()) {
          var forAttr = labels[i].getAttribute('for');
          if (forAttr) {
            element = document.getElementById(forAttr);
            break;
          }
        }
      }
    }

    if (element) {
      if (setFieldValue(element, value)) {
        fieldsPopulated.push({
          key: key,
          element: element.id || element.name || 'unknown',
          value: value,
        });
      }
    } else {
      fieldsNotFound.push(key);
    }
  }

  return JSON.stringify(
    {
      success: true,
      fieldsPopulated: fieldsPopulated.length,
      fieldsNotFound: fieldsNotFound,
      details: fieldsPopulated,
    },
    null,
    2
  );
})(arguments[0]);
