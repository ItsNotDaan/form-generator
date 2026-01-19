/**
 * POPULATION SCRIPT FOR APPLE SHORTCUTS (AI MARKDOWN READY)
 *
 * 👇 ÉÉN PLEK: Vervang AI_TEXT_INPUT met je AI output (```json ... ```)
 */

(function () {
  // ============================================================================
  // 🟢 DATA INPUT: Input the textbox.
  // ============================================================================

  const PATIENT_DATA = {
    salutation: 'Dhr.',
    initials: 'W.J.',
    clientName: 'Roskamp',
    birthDate: '02-06-1936',
    bsn: '021348157',
    postalCode: '3781 AD',
    houseNumber: 'Hoofdstraat 155 j',
    phoneOne: '+31641242762',
    insurance: 'CZ',
    specialist: 'Dr. O.P. Bakker (REV)',
    medicalIndication:
      "Diagnose: diabetische voet\nToelichting op diagnose: diabetische voet, Simm's 3, status na neuropatisch ulcus onder hallux links en rechts. divergerende voeten, niet veilig te beschoeien in confectie of OSB\nFuncties en anatomische eigenschappen: sensibiliteitsstoornis, huidafwijking/kwetsbare huid, voetvormafwijking\nDoel schoenvoorziening: ontlasten, ondersteunen, beschermen, adequate pasvorm",
  };

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

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

  function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    try {
      dateStr = String(dateStr).trim();
      const parts = dateStr.split(/[-\/\s]+/);
      if (parts.length >= 3) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];
        day = String(day).padStart(2, '0');
        month = String(month).padStart(2, '0');
        if (year.length === 2) {
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

  function validateSelectValue(fieldName, value) {
    const validOptions = VALIDATION_MAPS[fieldName];
    if (!validOptions) return true;
    return validOptions.includes(value);
  }

  function triggerInputEvent(element) {
    const inputEvent = new Event('input', {bubbles: true});
    const changeEvent = new Event('change', {bubbles: true});
    element.dispatchEvent(inputEvent);
    element.dispatchEvent(changeEvent);
  }

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

  function setSelectValue(fieldName, value) {
    try {
      const trigger = document.querySelector(
        `button[data-field-name="${fieldName}"]`,
      );
      if (trigger) {
        trigger.click();
        setTimeout(() => {
          const option = document.querySelector(
            `[role="option"][data-value="${value}"]`,
          );
          if (option) option.click();
        }, 100);
        return true;
      }

      const nativeSelect = document.querySelector(
        `select[name="${fieldName}"]`,
      );
      if (nativeSelect) {
        nativeSelect.value = value;
        triggerInputEvent(nativeSelect);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  function setRadioValue(fieldName, value) {
    try {
      const radioGroup = document.querySelector(
        `[data-field-name="${fieldName}"]`,
      );
      if (radioGroup) {
        const radioItem = radioGroup.querySelector(
          `button[role="radio"][value="${value}"]`,
        );
        if (radioItem) {
          radioItem.click();
          return true;
        }
      }

      const radioButton = document.querySelector(
        `input[type="radio"][name="${fieldName}"][value="${value}"]`,
      );
      if (radioButton) {
        radioButton.checked = true;
        triggerInputEvent(radioButton);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  function setDatePickerValue(fieldName, value) {
    try {
      const datePicker = document.querySelector(
        `[data-field-name="${fieldName}"]`,
      );
      if (datePicker) {
        const input = datePicker.querySelector('input[type="text"]');
        if (input) {
          input.value = value;
          triggerInputEvent(input);
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

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

    for (const [fieldName, fieldValue] of Object.entries(extractedData)) {
      try {
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

        if (config.readOnly) {
          result.details[fieldName] = {
            status: 'skipped',
            reason: 'read-only field',
          };
          continue;
        }

        let success = false;
        let formattedValue = fieldValue;

        if (config.format === 'DD-MM-YYYY') {
          formattedValue = formatDateToDDMMYYYY(fieldValue);
          if (!formattedValue) {
            throw new Error(`Invalid date format: ${fieldValue}`);
          }
        }

        if (config.validate) {
          if (!validateSelectValue(fieldName, formattedValue)) {
            throw new Error(
              `Invalid value for ${fieldName}: ${formattedValue}`,
            );
          }
        }

        let formElement = document.querySelector(`[name="${fieldName}"]`);
        if (!formElement) {
          formElement = document.querySelector(
            `[data-field-name="${fieldName}"]`,
          );
        }

        if (config.type === 'radio') {
          success = setRadioValue(fieldName, formattedValue);
        } else if (config.type === 'select') {
          success = setSelectValue(fieldName, formattedValue);
        } else if (config.type === 'date' && fieldName === 'date') {
          success = setDatePickerValue(fieldName, formattedValue);
        } else if (config.type === 'textarea') {
          success = setTextareaValue(formElement, formattedValue);
        } else {
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
        result.details[fieldName] = {status: 'failed', error: error.message};
      }
    }

    return result;
  }

  // ============================================================================
  // EXECUTE
  // ============================================================================

  try {
    const result = populateForm(PATIENT_DATA);
    completion(result);
  } catch (error) {
    completion({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
})();
