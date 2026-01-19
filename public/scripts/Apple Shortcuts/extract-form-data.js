/**
 * EXTRACTION SCRIPT FOR APPLE SHORTCUTS
 *
 * Purpose: Extract form field metadata from the new-client form
 * This script scans the new-client form and returns structured metadata about each field
 * that the AI can use to understand what data to extract from OCR text.
 *
 * Output Format: JSON array of field metadata objects
 *
 * Usage:
 * 1. Run this script via Apple Shortcuts' "Run JavaScript on Webpage" action
 * 2. The script returns a JSON string that can be passed to the AI
 * 3. Do NOT include current form values - only field definitions
 *
 * Field Type Reference:
 * - "text": Text input fields (initials, clientName, specialist, etc.)
 * - "email": Email input fields
 * - "tel": Telephone input fields
 * - "date": Date input fields (DD-MM-YYYY format)
 * - "number": Numeric input fields (BSN)
 * - "select": Dropdown fields with predefined options
 * - "radio": Radio button groups with predefined options
 * - "textarea": Multi-line text input
 *
 * Note: The "options" array is only populated for select/radio fields
 * and contains the exact values the AI should return.
 */

(function () {
  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  // Define all expected form fields and their metadata
  // This serves as the source of truth for field extraction
  const FORM_FIELDS = [
    // APPOINTMENT INFORMATION SECTION
    {
      name: 'practitionerId',
      type: 'select',
      required: true,
      section: 'appointmentInformation',
      options: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
      optionLabels: {
        p1: 'Johan Bonekamp',
        p2: 'Job de Graaff',
        p3: 'Daan Heetkamp',
        p4: 'Michel Heetkamp',
        p5: 'Anne Hummelen',
        p6: 'Mia Rietberg',
        p7: 'Norah Schrijver',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      section: 'appointmentInformation',
      format: 'DD-MM-YYYY',
      aiSearchTerms: ['date', 'datum', 'measurement date', 'appointment date'],
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      section: 'appointmentInformation',
      options: [
        'Flevoziekenhuis',
        'Flevomotion',
        'Nijverheidsweg Noord',
        'Meander MC',
        'Amsterdam MC',
        'Holten',
        'Markelo',
      ],
      aiSearchTerms: [
        'location',
        'locatie',
        'behandelplaats',
        'hospital',
        'centrum',
        'ziekenhuis',
      ],
    },

    // PERSONAL INFORMATION SECTION
    {
      name: 'salutation',
      type: 'radio',
      required: true,
      section: 'personalInformation',
      options: ['Mw.', 'Dhr.', 'X.'],
      aiSearchTerms: ['salutation', 'aanhef', 'title', 'mw', 'dhr'],
    },
    {
      name: 'initials',
      type: 'text',
      required: true,
      section: 'personalInformation',
      maxLength: null,
      aiSearchTerms: [
        'initials',
        'initialen',
        'voornamen',
        'first name initials',
      ],
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
      section: 'personalInformation',
      maxLength: null,
      aiSearchTerms: [
        'last name',
        'lastname',
        'clientname',
        'achternaam',
        'surname',
        'naam',
        'family name',
      ],
    },
    {
      name: 'birthDate',
      type: 'date',
      required: true,
      section: 'personalInformation',
      format: 'DD-MM-YYYY',
      maxLength: 10,
      aiSearchTerms: [
        'birth date',
        'birthdate',
        'geboortedatum',
        'date of birth',
        'dob',
      ],
    },
    {
      name: 'bsn',
      type: 'number',
      required: false,
      section: 'personalInformation',
      maxLength: 9,
      aiSearchTerms: [
        'bsn',
        'burgerservicenummer',
        'citizen service number',
        'tax number',
      ],
    },

    // ADDRESS INFORMATION SECTION
    {
      name: 'postalCode',
      type: 'text',
      required: true,
      section: 'addressInformation',
      maxLength: null,
      aiSearchTerms: [
        'postal code',
        'postalcode',
        'postcode',
        'zip code',
        'postcodeplaats',
      ],
    },
    {
      name: 'houseNumber',
      type: 'text',
      required: true,
      section: 'addressInformation',
      maxLength: null,
      aiSearchTerms: [
        'house number',
        'housenumber',
        'huisnummer',
        'number',
        'address number',
        'street number',
      ],
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      section: 'addressInformation',
      readOnly: true,
      autoFill: true,
      aiSearchTerms: [
        'street',
        'streetname',
        'straatinformatie',
        'straatnaam',
        'address line',
      ],
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      section: 'addressInformation',
      readOnly: true,
      autoFill: true,
      aiSearchTerms: ['city', 'stad', 'plaats', 'city name', 'town'],
    },

    // CONTACT INFORMATION SECTION
    {
      name: 'phoneOne',
      type: 'tel',
      required: true,
      section: 'contactInformation',
      maxLength: null,
      aiSearchTerms: [
        'phone',
        'phone one',
        'telephone',
        'telefoonnummer',
        'phone number',
        'tel',
        'contact number',
      ],
    },
    {
      name: 'phoneTwo',
      type: 'tel',
      required: false,
      section: 'contactInformation',
      maxLength: null,
      aiSearchTerms: [
        'phone two',
        'second phone',
        'alternate phone',
        'additional phone',
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      section: 'contactInformation',
      maxLength: null,
      aiSearchTerms: ['email', 'e-mail', 'mail', 'emailadres', 'email address'],
    },

    // INSURANCE AND MEDICAL INFORMATION SECTION
    {
      name: 'insurance',
      type: 'select',
      required: true,
      section: 'insuranceAndMedical',
      options: [
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
      aiSearchTerms: [
        'insurance',
        'insurance company',
        'verzekeraar',
        'verzekering',
        'health insurance',
      ],
    },
    {
      name: 'specialist',
      type: 'text',
      required: true,
      section: 'insuranceAndMedical',
      maxLength: null,
      aiSearchTerms: [
        'specialist',
        'behandelaar',
        'doctor',
        'referring doctor',
        'arts',
        'dr',
      ],
    },
    {
      name: 'medicalIndication',
      type: 'textarea',
      required: false,
      section: 'insuranceAndMedical',
      maxLength: null,
      aiSearchTerms: [
        'medical indication',
        'diagnose',
        'diagnosis',
        'indication',
        'indication medical',
        'toelichting',
      ],
    },
  ];

  // ============================================================================
  // FIELD SELECTOR STRATEGIES
  // ============================================================================

  /**
   * STRATEGY A (PRIMARY): Find field by name attribute
   * Used by React Hook Form - most reliable method
   * Example: document.querySelector('input[name="clientName"]')
   */

  /**
   * STRATEGY B (ALTERNATIVE FALLBACK):
   * If form fields are updated to include data-ai-field attributes, use this instead:
   * Example: document.querySelector('[data-ai-field="clientName"]')
   *
   * Implementation in new-client/index.tsx:
   * <Input
   *   {...field}
   *   data-ai-field="clientName"
   *   data-ai-type="text"
   *   placeholder={t('lastNamePlaceholder')}
   * />
   *
   * Then modify selectFormElement() to check data attribute:
   * const formElement = document.querySelector(`[data-ai-field="${field.name}"]`);
   */

  // ============================================================================
  // MAIN EXTRACTION FUNCTION
  // ============================================================================

  /**
   * Extract form field metadata from the DOM
   * Verifies fields exist and returns complete metadata
   *
   * Currently uses STRATEGY A (name attribute)
   * If needed, can be modified to use STRATEGY B (data-ai-field attribute)
   */
  function extractFormMetadata() {
    const metadata = [];
    const errors = [];

    for (const field of FORM_FIELDS) {
      try {
        // STRATEGY A: Find field by name attribute (primary)
        // This works because React Hook Form registers fields with name attributes
        let formElement = document.querySelector(`[name="${field.name}"]`);

        // STRATEGY B FALLBACK (if implemented):
        // Uncomment to use data-ai-field attribute instead
        // if (!formElement) {
        //   formElement = document.querySelector(`[data-ai-field="${field.name}"]`);
        // }

        if (formElement) {
          // Build metadata object
          const fieldMetadata = {
            name: field.name,
            type: field.type,
            required: field.required,
            section: field.section,
            format: field.format || null,
            maxLength: field.maxLength || null,
            readOnly: field.readOnly || false,
            autoFill: field.autoFill || false,
            aiSearchTerms: field.aiSearchTerms || [],
          };

          // Add options for select/radio fields
          if (field.type === 'select' || field.type === 'radio') {
            fieldMetadata.options = field.options;
            if (field.optionLabels) {
              fieldMetadata.optionLabels = field.optionLabels;
            }
          }

          metadata.push(fieldMetadata);
        } else {
          errors.push(`Field not found in DOM: ${field.name}`);
        }
      } catch (error) {
        errors.push(`Error processing field ${field.name}: ${error.message}`);
      }
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      fieldsFound: metadata.length,
      totalFieldsExpected: FORM_FIELDS.length,
      metadata: metadata,
      errors: errors.length > 0 ? errors : null,
    };
  }

  // ============================================================================
  // RETURN RESULT (Apple Shortcuts Pattern)
  // ============================================================================

  try {
    const result = extractFormMetadata();
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
