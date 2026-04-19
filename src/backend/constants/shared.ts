// ============================================================================
// SHARED / GLOBAL CONSTANTS
// Global constants used across multiple forms, plus normalization constants.
// ============================================================================

// ============================================================================
// GLOBAL/SHARED CONSTANTS
// ============================================================================

/** Practitioners */
export const PRACTITIONERS = [
  {
    label: 'Johan Bonekamp',
    value: 'johanBonekamp',
  },
  {
    label: 'Job de Graaff',
    value: 'jobDeGraaff',
  },
  {
    label: 'Daan Heetkamp',
    value: 'daanHeetkamp',
  },
  {
    label: 'Michel Heetkamp',
    value: 'michelHeetkamp',
  },
  {
    label: 'Anne Hummelen',
    value: 'anneHummelen',
  },
  {
    label: 'Mia Rietberg',
    value: 'miaRietberg',
  },
  {
    label: 'Norah Schrijver',
    value: 'norahSchrijver',
  },
];

/** Insurance Companies */
export const INSURANCE_COMPANIES = [
  {label: 'Menzis', value: 'menzis'},
  {label: 'Achmea', value: 'achmea'},
  {label: 'VGZ', value: 'vgz'},
  {label: 'CZ', value: 'cz'},
  {label: 'Salland', value: 'salland'},
  {
    label: 'Zorg en Zekerheid',
    value: 'zorgEnZekerheid',
  },
  {label: 'ASR', value: 'asr'},
  {label: 'DSW', value: 'dsw'},
  {label: 'ONVZ', value: 'onvz'},
  {label: 'Caresq', value: 'caresq'},
];

/** Medial/Lateral Options - Global constant used across multiple form fields */
export type MedialLateralType =
  | 'none'
  | 'medial'
  | 'lateral'
  | 'lateralAndMedial';
export const MEDIAL_LATERAL_OPTIONS = [
  {label: 'none', value: 'none' as const},
  {label: 'medial', value: 'medial' as const},
  {label: 'lateral', value: 'lateral' as const},
  {
    label: 'lateralAndMedial',
    value: 'lateralAndMedial' as const,
  },
];

/** Medial/Lateral Options without 'none' - for fields that require a selection */
export const MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE =
  MEDIAL_LATERAL_OPTIONS.filter(opt => opt.value !== 'none');

/** Locations */
export type Location =
  | 'flevoziekenhuis'
  | 'flevomotion'
  | 'nijverheidswegNoord'
  | 'meanderMc'
  | 'amsterdamMc'
  | 'holten'
  | 'markelo';
export const LOCATION_OPTIONS = [
  {
    label: 'Flevoziekenhuis',
    value: 'flevoziekenhuis',
  },
  {label: 'Flevomotion', value: 'flevomotion'},
  {
    label: 'Nijverheidsweg Noord',
    value: 'nijverheidswegNoord',
  },
  {label: 'Meander MC', value: 'meanderMc'},
  {label: 'Amsterdam MC', value: 'amsterdamMc'},
  {label: 'Holten', value: 'holten'},
  {label: 'Markelo', value: 'markelo'},
];

/** Salutation */
export type Salutation = 'mw' | 'dhr' | 'x';
export const SALUTATION_OPTIONS = [
  {label: 'Mw.', value: 'mw'},
  {label: 'Dhr.', value: 'dhr'},
  {label: 'X.', value: 'x'},
];

/** Side - Generic, used across forms */
export type Side = 'both' | 'left' | 'right';
export const SIDE_OPTIONS = [
  {label: 'both', value: 'both'},
  {label: 'left', value: 'left'},
  {label: 'right', value: 'right'},
];

/** Yes/No */
export type YesNo = 'yes' | 'no';
export const YES_NO_OPTIONS = [
  {label: 'yes', value: 'yes'},
  {label: 'no', value: 'no'},
];

// ============================================================================
// NORMALIZATION CONSTANTS
// ============================================================================

/** Boolean to string conversion values */
export const BOOLEAN_TRUE_VALUE = 'Ja';
export const BOOLEAN_FALSE_VALUE = '';

/** Yes/No string variants for normalization */
export const YES_VARIANTS = ['yes', 'ja', 'true'];
export const NO_VARIANTS = ['no', 'nee', 'false'];

/** Field suffix rules for auto-appending units */
export const FIELD_SUFFIX_RULES: Record<string, string> = {
  shaftHeight: 'Cm',
  enclosure: 'Mm',
  // Add more patterns as needed
};
