
 
 
/**
* POPULATION SCRIPT FOR APPLE SHORTCUTS (ASYNC SELECT FIX)
* Fixes: Select menus opening but not selecting (Timing & Text Matching)
*/

(async function () {
  // 🟢 DATA INPUT: Direct from Dictionary
  const PATIENT_DATA = ❑Dictionary; 

  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  const FIELD_CONFIG = {
    practitionerId: {type: 'select'},
    date: {type: 'date', format: 'DD-MM-YYYY'},
    location: {type: 'select'},
    salutation: {type: 'radio'},
    initials: {type: 'text'},
    clientName: {type: 'text'},
    birthDate: {type: 'date', format: 'DD-MM-YYYY'},
    bsn: {type: 'number'},
    postalCode: {type: 'text'},
    houseNumber: {type: 'text'},
    address: {type: 'text', readOnly: true},
    city: {type: 'text', readOnly: true},
    phoneOne: {type: 'tel'},
    phoneTwo: {type: 'tel'},
    email: {type: 'email'},
    insurance: {type: 'select'},
    specialist: {type: 'text'},
    medicalIndication: {type: 'textarea'},
  };

  // ============================================================================
  // UTILITY FUNCTIONS (ASYNC VERSION)
  // ============================================================================

  // Helper: Wacht x milliseconden
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function formatDateToDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    try {
      dateStr = String(dateStr).trim();
      const parts = dateStr.split(/[-\/\s]+/);
      if (parts.length >= 3) {
        let day = parts[0]; let month = parts[1]; let year = parts[2];
        day = String(day).padStart(2, '0');
        month = String(month).padStart(2, '0');
        if (year.length === 2) {
            year = parseInt(year) > 30 ? '19' + year : '20' + year;
        }
        return `${day}-${month}-${year}`;
      }
      return '';
    } catch (e) { return ''; }
  }

  function triggerInputEvent(element) {
    element.dispatchEvent(new Event('input', {bubbles: true}));
    element.dispatchEvent(new Event('change', {bubbles: true}));
    element.dispatchEvent(new Event('blur', {bubbles: true}));
  }

  function setInputValue(element, value) {
    if (!element) return false;
    element.value = value;
    triggerInputEvent(element);
    return true;
  }

  // 🔧 Verbeterde Select Functie
  async function setSelectValue(fieldName, value) {
    // 1. Zoek custom dropdown button
    const trigger = document.querySelector(`button[data-field-name="${fieldName}"]`);

    if (trigger) {
      // Open menu
      trigger.click();

      // ⏳ WACHT even tot animatie klaar is (kritiek voor 'opens but not selects')
      await sleep(600); 

      // Zoek optie: eerst op data-value
      let option = document.querySelector(`[role="option"][data-value="${value}"]`);

      // Fallback: Zoek op tekst (case-insensitive) als value niet werkt
      if (!option) {
        const allOptions = Array.from(document.querySelectorAll('[role="option"]'));
        const searchStr = String(value).toLowerCase().trim();

        option = allOptions.find(opt => {
            const text = opt.textContent.toLowerCase().trim();
            const val = (opt.getAttribute('data-value') || '').toLowerCase();
            return text === searchStr || val === searchStr || text.includes(searchStr);
        });
      }

      if (option) {
        option.click();
        await sleep(200); // Wacht even na klik
        return true;
      } else {
        console.log(`❌ Optie niet gevonden voor ${fieldName}: ${value}`);
        // Probeer menu te sluiten door ernaast te klikken (optioneel)
        document.body.click();
        return false;
      }
    }

    // 2. Native Select Fallback
    const nativeSelect = document.querySelector(`select[name="${fieldName}"]`);
    if (nativeSelect) {
      nativeSelect.value = value;
      triggerInputEvent(nativeSelect);
      return true;
    }

    return false;
  }

  async function setRadioValue(fieldName, value) {
    const radioGroup = document.querySelector(`[data-field-name="${fieldName}"]`);
    if (radioGroup) {
        const btn = radioGroup.querySelector(`button[role="radio"][value="${value}"]`);
        if (btn) { btn.click(); return true; }
    }
    const input = document.querySelector(`input[type="radio"][name="${fieldName}"][value="${value}"]`);
    if (input) { input.checked = true; triggerInputEvent(input); return true; }
    return false;
  }

  function setDatePickerValue(fieldName, value) {
    const picker = document.querySelector(`[data-field-name="${fieldName}"]`);
    if (picker) {
        const input = picker.querySelector('input');
        if (input) { input.value = value; triggerInputEvent(input); return true; }
    }
    return false;
  }

  // ============================================================================
  // MAIN POPULATION LOOP
  // ============================================================================
  async function populateForm(data) {
    const result = { success: true, populatedCount: 0, details: {} };

    for (const [fieldName, fieldValue] of Object.entries(data)) {
        if (!fieldValue) continue;

        const config = FIELD_CONFIG[fieldName];
        if (!config) continue;

        let val = String(fieldValue);
        if (config.format === 'DD-MM-YYYY') val = formatDateToDDMMYYYY(val);

        let success = false;

        // Selecteer juiste setter
        if (config.type === 'select') {
            success = await setSelectValue(fieldName, val); // AWAIT is belangrijk hier!
        } else if (config.type === 'radio') {
            success = await setRadioValue(fieldName, val);
        } else if (config.type === 'date') {
            success = setDatePickerValue(fieldName, val);
        } else {
            // Text inputs / Textareas
            let el = document.querySelector(`[name="${fieldName}"], [data-field-name="${fieldName}"]`);
            success = setInputValue(el, val);
        }

        if (success) result.populatedCount++;
        result.details[fieldName] = success ? 'ok' : 'failed';
    }
    return result;
  }

  // ============================================================================
  // EXECUTE (ASYNC WRAPPER)
  // ============================================================================
  try {
    const result = await populateForm(PATIENT_DATA);
    completion(result);
  } catch (error) {
    completion({ success: false, error: error.message });
  }

})();
 

