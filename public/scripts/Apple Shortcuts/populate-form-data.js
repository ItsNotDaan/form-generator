/**
 * POPULATION SCRIPT FOR APPLE SHORTCUTS
 *
 * Purpose: Populate form fields with extracted data from OCR + AI processing
 * This script receives JSON data (from AI extraction) and fills the new-client form fields
 *
 * Input Format: JSON object with field names as keys and extracted values
 * Example: {"clientName": "van Dijk", "initials": "J.P.", "salutation": "Dhr.", ...}
 *
 * Output Format: JSON object with success status and array of failed fields (if any)
 * Example: {"success": true, "failedFields": [], "populatedCount": 15}
 *
 * Usage:
 * 1. Pass extracted JSON data from AI to this script
 * 2. Run via Apple Shortcuts' "Run JavaScript on Webpage" action
 * 3. The script returns status and logs any failed field population attempts
 * 4. Address API will auto-populate street/city when postal code + house number are set
 *
 * Key Features:
 * - Simulates input/change events to trigger React Hook Form validation
 * - Validates select/radio values against allowed options from metadata
 * - Formats dates to DD-MM-YYYY with leading zeros
 * - Skips read-only/auto-fill fields
 * - Returns array of failed fields without stopping execution
 * - Preserves phone number format as received from AI
 */

(function () {
  // ============================================================================
  // CONFIGURATION & CONSTANTS
  // ============================================================================

  // Validation maps for select/radio fields
  // Built from field metadata to ensure values are valid
  const VALIDATION_MAPS = {
    practitionerId: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
    location: [
      'Flevoziekenhuis',
      'Flevomotion',
      'Nijverheidsweg Noord',
      'Meander MC',
      'Amsterdam MC',
      'Holten',
      'Markelo',
    ],
    salutation: ['Mw.', 'Dhr.', 'X.'],
    insurance: [
      'Menzis',
      'Achmea',
      'VGZ',
      'CZ',
      'Salland',
      'Zorg en Zekerheid',
      'ASR',
      'DSW',
      'ONVZ',
      'Caresq',
    ],
  };

  // Field configuration with formatting rules
  const FIELD_CONFIG = {
    practitionerId: {type: 'select', validate: true},
    date: {type: 'date', format: 'DD-MM-YYYY', validate: false},
    location: {type: 'select', validate: true},
    salutation: {type: 'radio', validate: true},
    initials: {type: 'text', validate: false},
    clientName: {type: 'text', validate: false},
    birthDate: {type: 'date', format: 'DD-MM-YYYY', validate: false},
    bsn: {type: 'number', validate: false},
    postalCode: {type: 'text', validate: false},
    houseNumber: {type: 'text', validate: false},
    address: {type: 'text', readOnly: true, validate: false},
    city: {type: 'text', readOnly: true, validate: false},
    phoneOne: {type: 'tel', validate: false},
    phoneTwo: {type: 'tel', validate: false},
    email: {type: 'email', validate: false},
    insurance: {type: 'select', validate: true},
    specialist: {type: 'text', validate: false},
    medicalIndication: {type: 'textarea', validate: false},
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Format date to DD-MM-YYYY with leading zeros
   * Handles various input formats: "15-3-1975" -> "15-03-1975"
   */
  function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return '';

    try {
      // Remove any extra whitespace
      dateStr = String(dateStr).trim();

      // Split by common separators
      const parts = dateStr.split(/[-\/\s]+/);

      if (parts.length >= 3) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];

        // Pad day and month with leading zeros
        day = String(day).padStart(2, '0');
        month = String(month).padStart(2, '0');

        // Ensure year is 4 digits
        if (year.length === 2) {
          // Assume 1900s for years 00-30, 2000s for 31-99
          const yearNum = parseInt(year);
          year = yearNum > 30 ? '19' + year : '20' + year;
        }

        return `${day}-${month}-${year}`;
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Validate select/radio value against allowed options
   */
  function validateSelectValue(fieldName, value) {
    const validOptions = VALIDATION_MAPS[fieldName];
    if (!validOptions) return true; // No validation map, accept value

    return validOptions.includes(value);
  }

  /**
   * Trigger input event to notify React Hook Form of changes
   */
  function triggerInputEvent(element) {
    const inputEvent = new Event('input', {bubbles: true});
    const changeEvent = new Event('change', {bubbles: true});

    element.dispatchEvent(inputEvent);
    element.dispatchEvent(changeEvent);
  }

  /**
   * Set input field value and trigger events
   */
  function setInputValue(element, value) {
    if (!element) return false;

    try {
      element.value = value;
      triggerInputEvent(element);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Set select field value and trigger events
   */
  function setSelectValue(element, value) {
    if (!element) return false;

    try {
      element.value = value;
      triggerInputEvent(element);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Set radio button value
   */
  function setRadioValue(fieldName, value) {
    try {
      const radioButton = document.querySelector(
        `input[type="radio"][name="${fieldName}"][value="${value}"]`,
      );

      if (!radioButton) return false;

      radioButton.checked = true;
      triggerInputEvent(radioButton);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Set textarea value and trigger events
   */
  function setTextareaValue(element, value) {
    if (!element) return false;

    try {
      element.value = value;
      triggerInputEvent(element);
      return true;
    } catch (error) {
      return false;
    }
  }

  // ============================================================================
  // MAIN POPULATION FUNCTION
  // ============================================================================

  /**
   * Populate form with extracted data
   */
  function populateForm(extractedData) {
    const result = {
      success: true,
      populatedCount: 0,
      failedFields: [],
      timestamp: new Date().toISOString(),
      details: {},
    };

    if (!extractedData || typeof extractedData !== 'object') {
      result.success = false;
      result.error = 'Invalid input: extractedData must be a JSON object';
      return result;
    }

    // Process each field
    for (const [fieldName, fieldValue] of Object.entries(extractedData)) {
      try {
        // Skip null/undefined/empty values
        if (
          fieldValue === null ||
          fieldValue === undefined ||
          fieldValue === ''
        ) {
          result.details[fieldName] = {
            status: 'skipped',
            reason: 'empty value',
          };
          continue;
        }

        const config = FIELD_CONFIG[fieldName];
        if (!config) {
          result.details[fieldName] = {
            status: 'skipped',
            reason: 'unknown field',
          };
          continue;
        }

        // Skip read-only/auto-fill fields
        if (config.readOnly) {
          result.details[fieldName] = {
            status: 'skipped',
            reason: 'read-only field',
          };
          continue;
        }

        let success = false;
        let formattedValue = fieldValue;

        // Format date fields
        if (config.format === 'DD-MM-YYYY') {
          formattedValue = formatDateToDDMMYYYY(fieldValue);
          if (!formattedValue) {
            throw new Error(`Invalid date format: ${fieldValue}`);
          }
        }

        // Validate select/radio values
        if (config.validate) {
          if (!validateSelectValue(fieldName, formattedValue)) {
            throw new Error(
              `Invalid value for ${fieldName}: ${formattedValue}. Expected one of: ${VALIDATION_MAPS[fieldName].join(', ')}`,
            );
          }
        }

        // Find field element
        const formElement = document.querySelector(`[name="${fieldName}"]`);

        // Populate based on field type
        if (config.type === 'radio') {
          success = setRadioValue(fieldName, formattedValue);
        } else if (config.type === 'select') {
          success = setSelectValue(formElement, formattedValue);
        } else if (config.type === 'textarea') {
          success = setTextareaValue(formElement, formattedValue);
        } else {
          // Text, email, tel, number, date
          success = setInputValue(formElement, formattedValue);
        }

        if (success) {
          result.populatedCount++;
          result.details[fieldName] = {
            status: 'success',
            value: formattedValue,
            type: config.type,
          };
        } else {
          throw new Error('Failed to set field value');
        }
      } catch (error) {
        result.failedFields.push({
          fieldName: fieldName,
          attemptedValue: fieldValue,
          error: error.message,
        });

        result.details[fieldName] = {
          status: 'failed',
          error: error.message,
        };
      }
    }

    return result;
  }

  // ============================================================================
  // PARSE INPUT AND EXECUTE
  // ============================================================================

  try {
    // Get input from Apple Shortcuts via arguments[0]
    let extractedData = arguments[0];

    // Parse if string
    if (typeof extractedData === 'string') {
      extractedData = JSON.parse(extractedData);
    }

    if (!extractedData) {
      completion(
        JSON.stringify({
          success: false,
          error: 'No data provided',
        }),
      );
      return;
    }

    const result = populateForm(extractedData);
    completion(JSON.stringify(result));
  } catch (error) {
    completion(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    );
  }
})();
