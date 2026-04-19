// ============================================================================
// OSB FORM CONSTANTS
// Constants used in the OSB (Orthopedisch Schoeisel Bestelling) form.
// ============================================================================

/** Pair Type - Used in multiple forms */
export type PairTypeOption =
  | 'firstPair'
  | 'repeatPair'
  | 'sparePair'
  | 'privatePair';
export const PAIR_TYPE_OPTIONS = [
  {label: 'firstPair', value: 'firstPair'},
  {label: 'repeatPair', value: 'repeatPair'},
  {label: 'sparePair', value: 'sparePair'},
  {label: 'privatePair', value: 'privatePair'},
];

/** Goal options - GEEN L/R) */
export type GoalOption =
  | 'goalFit'
  | 'goalStability'
  | 'goalIncreaseWalkingDistance'
  | 'goalArchSupport';
export const GOAL_OPTIONS = [
  {
    label: 'Pasvorm',
    value: 'goalFit',
    fullKey: 'goalFit',
  },
  {
    label: 'Stabiliteit',
    value: 'goalStability',
    fullKey: 'goalStability',
  },
  {
    label: 'Loop afstand vergroten',
    value: 'goalIncreaseWalkingDistance',
    fullKey: 'goalIncreaseWalkingDistance',
  },
  {
    label: 'Ondersteuning gewelf',
    value: 'goalArchSupport',
    fullKey: 'goalArchSupport',
  },
];

/** Walking function options */
export type WalkingFunctionOption =
  | 'walkingFunctionPassive'
  | 'walkingFunctionActive'
  | 'walkingFunctionShortTransfers';
export const WALKING_FUNCTION_OPTIONS = [
  {
    label: 'Passief',
    value: 'walkingFunctionPassive',
    fullKey: 'walkingFunctionPassive',
  },
  {
    label: 'Actief',
    value: 'walkingFunctionActive',
    fullKey: 'walkingFunctionActive',
  },
  {
    label: 'Korte transfers',
    value: 'walkingFunctionShortTransfers',
    fullKey: 'walkingFunctionShortTransfers',
  },
];

/** Walking function indication options (OSB specific) */
export type WalkingFunctionIndicationOption =
  | 'walkingFunctionPassive'
  | 'walkingFunctionShortTransfers'
  | 'walkingFunctionActive'
  | 'other';
export const WALKING_FUNCTION_INDICATION_OPTIONS = [
  {
    label: 'Passief',
    value: 'walkingFunctionPassive',
    fullKey: 'walkingFunctionPassive',
  },
  {
    label: 'Korte Transfers',
    value: 'walkingFunctionShortTransfers',
    fullKey: 'walkingFunctionShortTransfers',
  },
  {
    label: 'Actief',
    value: 'walkingFunctionActive',
    fullKey: 'walkingFunctionActive',
  },
  {
    label: 'Anders',
    value: 'other',
    fullKey: 'walkingFunctionOther',
  },
];

/** Suppliers */
export type SupplierOption = 'neskrid' | 'tom' | 'myfoot' | 'durea';
export const SUPPLIER_OPTIONS = [
  {label: 'Neskrid', value: 'neskrid'},
  {label: 'Tom', value: 'tom'},
  {label: 'Myfoot', value: 'myfoot'},
  {label: 'Durea', value: 'durea'},
];

/** Basiscode SOS */
export type BaseCodeOption = 'basicCode42' | 'basicCode40';
export const BASE_CODE_OPTIONS = [
  {label: '42', value: 'basicCode42'},
  {label: '40', value: 'basicCode40'},
];

/** Supplement options met codes (in tabel met L/R) */
export const SUPPLEMENT_OPTIONS = [
  {key: 'individueel', label: 'Supplement individueel', code: 43},
  {key: 'afwikkelrol_eenvoudig', label: 'Afwikkelrol eenvoudig', code: 46},
  {
    key: 'afwikkelrol_gecompliceerd',
    label: 'Afwikkelrol gecompliceerd',
    code: 47,
  },
  {key: 'zoolverstijving', label: 'Zoolverstijving', code: 57},
] as const;
export type SupplementOption = (typeof SUPPLEMENT_OPTIONS)[number];

/** Hallux valgus mm options */
export type HalluxMmOption = 'no' | 'halluxMm3' | 'halluxMm8';
export const HALLUX_MM_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: '3 mm', value: 'halluxMm3'},
  {label: '8 mm', value: 'halluxMm8'},
];

/** Forefoot deepening mm options */
export type DeepeningMmOption = 'no' | 'deepeningMm3' | 'deepeningMm5';
export const DEEPENING_MM_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: '3 mm', value: 'deepeningMm3'},
  {label: '5 mm', value: 'deepeningMm5'},
];
