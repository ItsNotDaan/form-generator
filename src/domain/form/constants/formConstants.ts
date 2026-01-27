// ============================================================================
// CENTRALIZED FORM CONSTANTS
// ============================================================================
// This file organizes all form constants by subject/form for clarity and maintainability.
// Each form section contains all necessary types and options.

// ============================================================================
// GLOBAL/SHARED CONSTANTS
// ============================================================================

/** Practitioners */
export const PRACTITIONERS = [
  {label: 'Johan Bonekamp', value: 'p1', translationKey: 'johanBonekamp'},
  {label: 'Job de Graaff', value: 'p2', translationKey: 'jobDeGraaff'},
  {label: 'Daan Heetkamp', value: 'p3', translationKey: 'daanHeetkamp'},
  {label: 'Michel Heetkamp', value: 'p4', translationKey: 'michelHeetkamp'},
  {label: 'Anne Hummelen', value: 'p5', translationKey: 'anneHummelen'},
  {label: 'Mia Rietberg', value: 'p6', translationKey: 'miaRietberg'},
  {label: 'Norah Schrijver', value: 'p7', translationKey: 'norahSchrijver'},
];

/** Insurance Companies */
export const INSURANCE_COMPANIES = [
  {label: 'Menzis', value: 'Menzis', translationKey: 'menzis'},
  {label: 'Achmea', value: 'Achmea', translationKey: 'achmea'},
  {label: 'VGZ', value: 'VGZ', translationKey: 'vgz'},
  {label: 'CZ', value: 'CZ', translationKey: 'cz'},
  {label: 'Salland', value: 'Salland', translationKey: 'salland'},
  {
    label: 'Zorg en Zekerheid',
    value: 'Zorg en Zekerheid',
    translationKey: 'zorgEnZekerheid',
  },
  {label: 'ASR', value: 'ASR', translationKey: 'asr'},
  {label: 'DSW', value: 'DSW', translationKey: 'dsw'},
  {label: 'ONVZ', value: 'ONVZ', translationKey: 'onvz'},
  {label: 'Caresq', value: 'Caresq', translationKey: 'caresq'},
];

/** Locations */
export type Location =
  | 'Flevoziekenhuis'
  | 'Flevomotion'
  | 'Nijverheidsweg Noord'
  | 'Meander MC'
  | 'Amsterdam MC'
  | 'Holten'
  | 'Markelo';
export const LOCATION_OPTIONS = [
  {
    label: 'Flevoziekenhuis',
    value: 'Flevoziekenhuis',
    translationKey: 'flevoziekenhuis',
  },
  {label: 'Flevomotion', value: 'Flevomotion', translationKey: 'flevomotion'},
  {
    label: 'Nijverheidsweg Noord',
    value: 'Nijverheidsweg Noord',
    translationKey: 'nijverheidswegNoord',
  },
  {label: 'Meander MC', value: 'Meander MC', translationKey: 'meanderMc'},
  {label: 'Amsterdam MC', value: 'Amsterdam MC', translationKey: 'amsterdamMc'},
  {label: 'Holten', value: 'Holten', translationKey: 'holten'},
  {label: 'Markelo', value: 'Markelo', translationKey: 'markelo'},
];

/** Salutation */
export type Salutation = 'Mw.' | 'Dhr.' | 'X.';
export const SALUTATION_OPTIONS = [
  {label: 'Mw.', value: 'Mw.', translationKey: 'mw'},
  {label: 'Dhr.', value: 'Dhr.', translationKey: 'dhr'},
  {label: 'X.', value: 'X.', translationKey: 'x'},
];

/** Side - Generic, used across forms */
export type Side = 'both' | 'left' | 'right';
export const SIDE_OPTIONS = [
  {label: 'both', value: 'both', translationKey: 'both'},
  {label: 'left', value: 'left', translationKey: 'left'},
  {label: 'right', value: 'right', translationKey: 'right'},
];

/** Yes/No */
export type YesNo = 'ja' | 'nee';
export const YES_NO_OPTIONS = [
  {label: 'yes', value: 'ja', translationKey: 'yes'},
  {label: 'no', value: 'nee', translationKey: 'no'},
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

// ============================================================================
// VLOS FORM CONSTANTS
// ============================================================================

/** Shaft opening options (waarden in cm) */
export type ShaftOpening = '0.5' | '0.8' | '1' | '1.5' | '2';
export const SHAFT_OPENING_OPTIONS = [
  {label: '0.5', value: '0.5', translationKey: 'shaftOpening05'},
  {label: '0.8', value: '0.8', translationKey: 'shaftOpening08'},
  {label: '1', value: '1', translationKey: 'shaftOpening1'},
  {label: '1.5', value: '1.5', translationKey: 'shaftOpening15'},
  {label: '2', value: '2', translationKey: 'shaftOpening2'},
];

/** Heel type options */
export type HeelType =
  | 'Sleehak Vlak'
  | 'Opbouwhak'
  | 'Leer/Poro'
  | 'Uitholling'
  | 'Vlak'
  | 'Blokhak'
  | 'Kernbekleding';
export const HEEL_TYPE_OPTIONS = [
  {label: 'Sleehak Vlak', value: 'Sleehak Vlak', translationKey: 'sleeHakFlat'},
  {label: 'Opbouwhak', value: 'Opbouwhak', translationKey: 'builUpHeel'},
  {label: 'Leer/Poro', value: 'Leer/Poro', translationKey: 'leatherPoro'},
  {label: 'Uitholling', value: 'Uitholling', translationKey: 'excavation'},
  {label: 'Vlak', value: 'Vlak', translationKey: 'flat'},
  {label: 'Blokhak', value: 'Blokhak', translationKey: 'blockHeel'},
  {
    label: 'Kernbekleding',
    value: 'Kernbekleding',
    translationKey: 'coreLining',
  },
];

/** Walking sole options */
export type WalkingSole =
  | 'Lavero Soft 6mm'
  | 'Star-o-last 6mm'
  | 'Astrostar 6mm'
  | 'Autoband profiel 6mm';
export const WALKING_SOLE_OPTIONS = [
  {
    label: 'Lavero Soft 6 mm',
    value: 'Lavero Soft 6 mm',
    translationKey: 'laveroSoft6mm',
  },
  {
    label: 'Star-o-last 6 mm',
    value: 'Star-o-last 6 mm',
    translationKey: 'staroLast6mm',
  },
  {
    label: 'Astrostar 6 mm',
    value: 'Astrostar 6 mm',
    translationKey: 'astrostar6mm',
  },
  {
    label: 'Autoband profiel 6 mm',
    value: 'Autoband profiel 6 mm',
    translationKey: 'autobandProfiel6mm',
  },
];

/** Closure options */
export type Closure = 'Haken/Ringen' | 'Klittenband';
export const CLOSURE_OPTIONS = [
  {label: 'Haken/Ringen', value: 'Haken/Ringen', translationKey: 'hooksRings'},
  {label: 'Klittenband', value: 'Klittenband', translationKey: 'velcro'},
];

/** Heel wedge types */
export type HeelWedgeType = 'medial' | 'lateral' | 'LateraalEnMediaal';
export const HEEL_WEDGE_TYPE_OPTIONS = [
  {label: 'medial', value: 'medial', translationKey: 'medial'},
  {label: 'lateral', value: 'lateral', translationKey: 'lateral'},
  {
    value: 'LateraalEnMediaal',
    label: 'lateralAndMedial',
    translationKey: 'lateralAndMedial',
  },
];

/** Donkey ear types */
export type DonkeyEarType = 'medial' | 'lateral';
export const DONKEY_EAR_TYPE_OPTIONS = [
  {label: 'medial', value: 'medial', translationKey: 'medial'},
  {label: 'lateral', value: 'lateral', translationKey: 'lateral'},
  {
    label: 'lateralAndMedial',
    value: 'LateraalEnMediaal',
    translationKey: 'lateralAndMedial',
  },
];

/** Enclosure - Used in VLOS */
export type EnclosureKey =
  | 'hoge'
  | 'lavero'
  | 'multivorm'
  | 'plastazote'
  | 'orca';

export type OmsluitingKey =
  | 'hoge'
  | 'lavero'
  | 'multivorm'
  | 'plastazote'
  | 'orca';

export type EnclosureOption = {
  key: OmsluitingKey;
  label: string;
  translationKey: string; // For UI translation
  needsMm: boolean;
  defaultMm?: string;
  // Export keys - English flattened names used in JSON export
  exportKeyLeft: string; // e.g., 'enclosureLeftCm' or 'multivormLeftMm'
  exportKeyRight: string; // e.g., 'enclosureRightCm' or 'multivormRightMm'
  // Legacy keys for backward compatibility (UI still uses these)
  fullKeyLinks: string;
  fullKeyRechts: string;
  mmKeyLinks: string;
  mmKeyRechts: string;
};

export const ENCLOSURE_OPTIONS: EnclosureOption[] = [
  {
    key: 'hoge',
    label: 'Hoogte van omsluiting (cm)',
    translationKey: 'enclosureHeight',
    needsMm: true,
    exportKeyLeft: 'enclosureLeftCm',
    exportKeyRight: 'enclosureRightCm',
    fullKeyLinks: 'omsluitingLinksHoge',
    fullKeyRechts: 'omsluitingRechtsHoge',
    mmKeyLinks: 'omsluitingMmLinksHoge',
    mmKeyRechts: 'omsluitingMmRechtsHoge',
  },
  {
    key: 'lavero',
    label: 'Lavero omsluiting (mm)',
    translationKey: 'laveroEnclosure',
    needsMm: true,
    defaultMm: '4',
    exportKeyLeft: 'laveroLeftMm',
    exportKeyRight: 'laveroRightMm',
    fullKeyLinks: 'omsluitingLinksLavero',
    fullKeyRechts: 'omsluitingRechtsLavero',
    mmKeyLinks: 'omsluitingMmLinksLavero',
    mmKeyRechts: 'omsluitingMmRechtsLavero',
  },
  {
    key: 'multivorm',
    label: 'Multivorm omsluiting (mm)',
    translationKey: 'multivormEnclosure',
    needsMm: true,
    defaultMm: '3',
    exportKeyLeft: 'multivormLeftMm',
    exportKeyRight: 'multivormRightMm',
    fullKeyLinks: 'omsluitingLinksMultivorm',
    fullKeyRechts: 'omsluitingRechtsMultivorm',
    mmKeyLinks: 'omsluitingMmLinksMultivorm',
    mmKeyRechts: 'omsluitingMmRechtsMultivorm',
  },
  {
    key: 'plastazote',
    label: 'Plastazote (mm)',
    translationKey: 'plastazoteEnclosure',
    needsMm: true,
    defaultMm: '3',
    exportKeyLeft: 'plastazoteLeftMm',
    exportKeyRight: 'plastazoteRightMm',
    fullKeyLinks: 'omsluitingLinksPlastazote',
    fullKeyRechts: 'omsluitingRechtsPlastazote',
    mmKeyLinks: 'omsluitingMmLinksPlastazote',
    mmKeyRechts: 'omsluitingMmRechtsPlastazote',
  },
  {
    key: 'orca',
    label: 'Orca omsluiting',
    translationKey: 'orcaEnclosure',
    needsMm: false,
    exportKeyLeft: 'orcaLeft',
    exportKeyRight: 'orcaRight',
    fullKeyLinks: 'omsluitingLinksOrca',
    fullKeyRechts: 'omsluitingRechtsOrca',
    mmKeyLinks: 'omsluitingMmLinksOrca',
    mmKeyRechts: 'omsluitingMmRechtsOrca',
  },
];

// ============================================================================
// PULMAN & REBACARE FORM CONSTANTS
// ============================================================================

/** Pulman types */
export type PulmanType = 'New Harlem' | 'Harlem Extra';
export const PULMAN_TYPE_OPTIONS = [
  {label: 'New Harlem', value: 'New Harlem', translationKey: 'newHarlem'},
  {label: 'Harlem Extra', value: 'Harlem Extra', translationKey: 'harlemExtra'},
];

/** Schoenmaten (37-48) */
export const SHOE_SIZES = Array.from({length: 12}, (_, i) =>
  (37 + i).toString(),
);
export type ShoeSize = (typeof SHOE_SIZES)[number];

// ============================================================================
// OSA FORM CONSTANTS
// ============================================================================

/** OSA Functieonderzoek - Ziektebeelden (Medical Conditions) */
export const PATHOLOGIES_OPTIONS = [
  {
    label: 'diabetes',
    value: 'diabetes',
    translationKey: 'diabetes',
    key: 'diabetes',
  },
  {
    label: 'polyNeuropathie',
    value: 'polyNeuropathie',
    translationKey: 'polyNeuropathie',
    key: 'polyNeuropathie',
  },
  {label: 'reuma', value: 'reuma', translationKey: 'reuma', key: 'reuma'},
  {label: 'ms', value: 'ms', translationKey: 'ms', key: 'ms'},
  {label: 'hmsn', value: 'hmsn', translationKey: 'hmsn', key: 'hmsn'},
  {
    label: 'degeneratie',
    value: 'degeneratie',
    translationKey: 'degeneratie',
    key: 'degeneratie',
  },
  {
    label: 'artrose',
    value: 'artrose',
    translationKey: 'artrose',
    key: 'artrose',
  },
];

/** OSA Functieonderzoek - Loopafstand hulpmiddelen (Walking Distance Aids) */
export const WALKING_DISTANCE_AIDS_OPTIONS = [
  {
    label: 'steunzolen',
    value: 'steunzolen',
    translationKey: 'supportSoles',
    key: 'steunzolen',
  },
  {
    label: 'rollator',
    value: 'rollator',
    translationKey: 'rollator',
    key: 'rollator',
  },
  {label: 'stok', value: 'stok', translationKey: 'cane', key: 'stok'},
  {
    label: 'elKousen',
    value: 'elKousen',
    translationKey: 'compressionStockings',
    key: 'elKousen',
  },
  {
    label: 'knieBrace',
    value: 'knieBrace',
    translationKey: 'kneeBrace',
    key: 'knieBrace',
  },
  {
    label: 'fysio',
    value: 'fysio',
    translationKey: 'physiotherapy',
    key: 'fysio',
  },
  {
    label: 'pedicure',
    value: 'pedicure',
    translationKey: 'pedicure',
    key: 'pedicure',
  },
];

/** OSA Functieonderzoek - Inspectie voeten (Foot Inspection) */
export const FOOT_INSPECTION_OPTIONS = [
  {label: 'oedeem', value: 'oedeem', translationKey: 'edema', key: 'oedeem'},
  {
    label: 'wisselend',
    value: 'wisselend',
    translationKey: 'variable',
    key: 'wisselend',
  },
  {
    label: 'structureel',
    value: 'structureel',
    translationKey: 'structural',
    key: 'structureel',
  },
  {
    label: 'dunneKwetsbareHuid',
    value: 'dunneKwetsbareHuid',
    translationKey: 'thinFragileSkin',
    key: 'dunneKwetsbareHuid',
  },
  {
    label: 'drogeHuid',
    value: 'drogeHuid',
    translationKey: 'drySkin',
    key: 'drogeHuid',
  },
  {
    label: 'doorbloedingsstoornis',
    value: 'doorbloedingsstoornis',
    translationKey: 'circulationDisorder',
    key: 'doorbloedingsstoornis',
  },
  {
    label: 'halluxValgus',
    value: 'halluxValgus',
    translationKey: 'halluxValgus',
    key: 'halluxValgus',
  },
  {label: 'bunion', value: 'bunion', translationKey: 'bunion', key: 'bunion'},
  {
    label: 'pesPlanoValgus',
    value: 'pesPlanoValgus',
    translationKey: 'pesPlanoValgus',
    key: 'pesPlanoValgus',
  },
  {
    label: 'pesCavo',
    value: 'pesCavo',
    translationKey: 'pesCavo',
    key: 'pesCavo',
  },
  {
    label: 'klauwtenen',
    value: 'klauwtenen',
    translationKey: 'clawToes',
    key: 'klauwtenen',
  },
];

/** OSA Digitaal - Leesthoogte options */
export const LAST_HEIGHT_OPTIONS = [
  {label: '15cm', value: '15', translationKey: 'lastHeight15cm'},
  {label: '20cm', value: '20', translationKey: 'lastHeight20cm'},
  {label: '25cm', value: '25', translationKey: 'lastHeight25cm'},
];

/** OSA Digitaal - MTP1 diep options */
export const MTP1_DEEP_OPTIONS = [
  {label: 'Nee', value: 'No', translationKey: 'no'},
  {label: '4cm', value: '4', translationKey: 'mtp1Deep4cm'},
  {label: '8cm', value: '8', translationKey: 'mtp1Deep8cm'},
];

/** Foliepas Leestcorrectie opties */
export const LAST_CORRECTION_OPTIONS = [
  {
    label: 'Openstand (zie Foliepas)',
    value: 'openstandLastCorrection',
    translationKey: 'openstandLastCorrection',
  },
  {
    label: 'Schachthoogte',
    value: 'shaftHeightLastCorrection',
    translationKey: 'shaftHeightLastCorrection',
  },
  {
    label: 'Achter innemen (zie Foliepas)',
    value: 'achterInnemenLastCorrection',
    translationKey: 'rearTakeInLastCorrection',
  },
  {
    label: 'Enkels aanpassen (zie Foliepas)',
    value: 'ankleAdjustmentLastCorrection',
    translationKey: 'ankleAdjustmentLastCorrection',
  },
];

// ============================================================================
// OSB FORM CONSTANTS
// ============================================================================

/** Pair Type - Used in multiple forms */
export type PairTypeOption =
  | 'Eerste paar'
  | 'Herhalings paar'
  | 'Reserve paar'
  | 'Privé paar';
export const PAIR_TYPE_OPTIONS = [
  {label: 'firstPair', value: 'Eerste paar', translationKey: 'firstPair'},
  {label: 'repeatPair', value: 'Herhalings paar', translationKey: 'repeatPair'},
  {label: 'sparePair', value: 'Reserve paar', translationKey: 'sparePair'},
  {label: 'privatePair', value: 'Privé paar', translationKey: 'privatePair'},
];

/** Goal options - GEEN L/R) */
export type GoalOption =
  | 'Pasvorm'
  | 'Stabiliteit'
  | 'Loop afstand vergroten'
  | 'Ondersteuning gewelf';
export const GOAL_OPTIONS = [
  {
    label: 'Pasvorm',
    value: 'Pasvorm',
    translationKey: 'goalFit',
    fullKey: 'goalFit',
  },
  {
    label: 'Stabiliteit',
    value: 'Stabiliteit',
    translationKey: 'goalStability',
    fullKey: 'goalStability',
  },
  {
    label: 'Loop afstand vergroten',
    value: 'Loop afstand vergroten',
    translationKey: 'goalIncreaseWalkingDistance',
    fullKey: 'goalIncreaseWalkingDistance',
  },
  {
    label: 'Ondersteuning gewelf',
    value: 'Ondersteuning gewelf',
    translationKey: 'goalArchSupport',
    fullKey: 'goalArchSupport',
  },
];

/** Walking function options */
export type WalkingFunctionOption = 'Passief' | 'Actief' | 'Korte transfers';
export const WALKING_FUNCTION_OPTIONS = [
  {
    label: 'Passief',
    value: 'Passief',
    translationKey: 'walkingFunctionPassive',
    fullKey: 'walkingFunctionPassive',
  },
  {
    label: 'Actief',
    value: 'Actief',
    translationKey: 'walkingFunctionActive',
    fullKey: 'walkingFunctionActive',
  },
  {
    label: 'Korte transfers',
    value: 'Korte transfers',
    translationKey: 'walkingFunctionShortTransfers',
    fullKey: 'walkingFunctionShortTransfers',
  },
];

/** Walking function indication options (OSB specific) */
export type WalkingFunctionIndicationOption =
  | 'Passief'
  | 'Korte Transfers'
  | 'Actief';
export const WALKING_FUNCTION_INDICATION_OPTIONS = [
  {
    label: 'Passief',
    value: 'Passief',
    translationKey: 'walkingFunctionPassive',
    fullKey: 'walkingFunctionPassive',
  },
  {
    label: 'Korte Transfers',
    value: 'Korte Transfers',
    translationKey: 'walkingFunctionShortTransfers',
    fullKey: 'walkingFunctionShortTransfers',
  },
  {
    label: 'Actief',
    value: 'Actief',
    translationKey: 'walkingFunctionActive',
    fullKey: 'walkingFunctionActive',
  },
  {
    label: 'Anders',
    value: 'Anders',
    translationKey: 'other',
    fullKey: 'walkingFunctionOther',
  },
];

/** Suppliers */
export type SupplierOption = 'Neskrid' | 'Tom' | 'Myfoot' | 'Durea';
export const SUPPLIER_OPTIONS = [
  {label: 'Neskrid', value: 'Neskrid', translationKey: 'neskrid'},
  {label: 'Tom', value: 'Tom', translationKey: 'tom'},
  {label: 'Myfoot', value: 'Myfoot', translationKey: 'myfoot'},
  {label: 'Durea', value: 'Durea', translationKey: 'durea'},
];

/** Basiscode SOS */
export type BaseCodeOption = '42' | '40';
export const BASE_CODE_OPTIONS = [
  {label: '42', value: '42', translationKey: 'basicCode42'},
  {label: '40', value: '40', translationKey: 'basicCode40'},
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
export type HalluxMmOption = 'Nee' | '3 mm' | '8 mm';
export const HALLUX_MM_OPTIONS = [
  {label: 'Nee', value: 'Nee', translationKey: 'no'},
  {label: '3 mm', value: '3 mm', translationKey: 'halluxMm3'},
  {label: '8 mm', value: '8 mm', translationKey: 'halluxMm8'},
];

/** Forefoot deepening mm options */
export type DeepeningMmOption = 'Nee' | '3 mm' | '5 mm';
export const DEEPENING_MM_OPTIONS = [
  {label: 'Nee', value: 'Nee', translationKey: 'no'},
  {label: '3 mm', value: '3 mm', translationKey: 'deepeningMm3'},
  {label: '5 mm', value: '5 mm', translationKey: 'deepeningMm5'},
];

// ============================================================================
// STEUNZOLEN FORM CONSTANTS
// ============================================================================

/** Insole types */
export type InsoleType =
  | 'Berksteunzool met'
  | 'Berksteunzool zonder'
  | 'Kinderkniksteun'
  | 'Ergopad redux heel'
  | 'Birco'
  | 'Anders';
export const INSOLE_TYPE_OPTIONS = [
  {
    label: 'Berksteunzool met',
    value: 'Berksteunzool met',
    translationKey: 'berkInsoleWith',
    fullKey: 'berkInsoleWith',
  },
  {
    label: 'Berksteunzool zonder',
    value: 'Berksteunzool zonder',
    translationKey: 'berkInsoleWithout',
    fullKey: 'berkInsoleWithout',
  },
  {
    label: 'Kinderkniksteun',
    value: 'Kinderkniksteun',
    translationKey: 'childArchSupport',
    fullKey: 'childArchSupport',
  },
  {
    label: 'Ergopad redux heel',
    value: 'Ergopad redux heel',
    translationKey: 'ergopadReduxHeel',
    fullKey: 'ergopadReduxHeel',
  },
  {
    label: 'Birco',
    value: 'Birco',
    translationKey: 'birco',
    fullKey: 'birco',
  },
  {
    label: 'Anders',
    value: 'Anders',
    translationKey: 'other',
    fullKey: 'other',
  },
];

/** Midfoot correction */
export type MidfootCorrection = 'Nee' | 'Neutraal' | 'Laag' | 'Hoog';
export const MIDFOOT_CORRECTION_OPTIONS = [
  {label: 'Nee', value: 'Nee', translationKey: 'no'},
  {label: 'Neutraal', value: 'Neutraal', translationKey: 'neutral'},
  {label: 'Laag', value: 'Laag', translationKey: 'low'},
  {label: 'Hoog', value: 'Hoog', translationKey: 'high'},
];

/** Forefoot correction */
export type ForefootCorrection = 'Nee' | 'Neutraal' | 'Pronatie' | 'Supinatie';
export const FOREFOOT_CORRECTION_OPTIONS = [
  {label: 'Nee', value: 'Nee', translationKey: 'no'},
  {label: 'Neutraal', value: 'Neutraal', translationKey: 'neutral'},
  {label: 'Pronatie', value: 'Pronatie', translationKey: 'pronation'},
  {label: 'Supinatie', value: 'Supinatie', translationKey: 'supination'},
];

/** Pelotte options */
export type PelotteOption = 'Nee' | 'Hoog' | 'Laag';
export const PELOTTE_OPTIONS = [
  {label: 'Nee', value: 'Nee', translationKey: 'no'},
  {label: 'Hoog', value: 'Hoog', translationKey: 'high'},
  {label: 'Laag', value: 'Laag', translationKey: 'low'},
];

/** Insole pricing options - numeric values */
export type SteunzolenPrijs = 175 | 225 | 195;
export const INSOLE_PRICE_OPTIONS = [
  {label: 'priceUpTo15Years', value: 175},
  {label: 'insolesPrice225', value: 225},
  {label: 'priceWithin3Months', value: 195},
];

/** Heel raise pricing */
export type HeelRaisePrice = 29;
export const HEEL_RAISE_PRICE_OPTIONS = [{label: 'priceTalonette', value: 29}];

// ============================================================================
// OVAC FORM CONSTANTS
// ============================================================================

/** OVAC Omschrijving items met post nummers */
export type OvacDescriptionItem = {
  key: string;
  label: string;
  postNr: string;
};

export const OVAC_DESCRIPTION_ITEMS: OvacDescriptionItem[] = [
  {key: 'supplementIndividueel', label: 'Supplement individueel', postNr: '71'},
  {key: 'eenvoudigeAfwikkelrol', label: 'Eenvoudige afwikkelrol', postNr: '74'},
  {
    key: 'gecompliceerdeAfwikkelrol',
    label: 'Gecompliceerde afwikkelrol',
    postNr: '75',
  },
  {key: 'hakAanpassing2cm', label: 'Hak aanpassing t/m 2 cm', postNr: '76'},
  {
    key: 'hakZoolVerhoging3cm',
    label: 'Hak zool verhoging t/m 3 cm',
    postNr: '77',
  },
  {
    key: 'hakZoolVerhoging7cm',
    label: 'Hak zool verhoging t/m 7 cm',
    postNr: '78',
  },
  {key: 'aangepastehakken', label: 'Aangepaste hakken', postNr: '84'},
  {key: 'zoolverstijving', label: 'Zoolverstijving', postNr: '85'},
  {key: 'nieuweWreefsluiting', label: 'Nieuwe wreefsluiting', postNr: '88'},
];

/** Supplement types - Used in OVAC */
export type SupplementType = 'lateral' | 'medial';
export const SUPPLEMENT_TYPE_OPTIONS = [
  {label: 'lateral', value: 'Lateraal', translationKey: 'lateral'},
  {label: 'medial', value: 'Mediaal', translationKey: 'medial'},
  {
    label: 'lateralAndMedial',
    value: 'LateraalEnMediaal',
    translationKey: 'lateralAndMedial',
  },
];

// ============================================================================
// Check foliepas - Kleur en Model opties
// ============================================================================

/** Zoolranden - Structured data for sole edges with types, models, and colors */
export interface ZoolRandKleur {
  kleur: string;
  code?: string;
}

export interface ZoolRandModel {
  model: string;
  gegevens?: {
    notitie?: string;
  };
  kleuren: ZoolRandKleur[];
}

export interface ZoolRandType {
  naam: string;
  modellen: ZoolRandModel[];
}

export const ZOOL_RANDEN: ZoolRandType[] = [
  {
    naam: 'E.V.A.',
    modellen: [
      {
        model: 'Rand 3 met kant',
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Moreno', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Lichtgrijs', code: '60'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: 'Rand 12x11',
        kleuren: [
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Moreno', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donderblauw', code: '78'},
          {kleur: 'Antreciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: 'Rand 13',
        kleuren: [
          {kleur: 'Moreno met grijze stik'},
          {kleur: 'Zwart met grijze stik'},
          {kleur: 'Wit met witte stik'},
        ],
      },
    ],
  },
  {
    naam: 'Lederrand',
    modellen: [
      {
        model: '380',
        gegevens: {
          notitie: 'Imitatie flexibel',
        },
        kleuren: [
          {kleur: 'Zwart met zwart stiksel', code: '380'},
          {kleur: 'Zwart met zwart stiksel gekartelt', code: '381'},
          {kleur: 'Bruin met bruin stiksel', code: '382'},
          {kleur: 'Bruin met bruin stiksel gekartelt', code: '383'},
        ],
      },
      {
        model: '500',
        kleuren: [
          {kleur: 'Zwart met wit stiksel', code: '500'},
          {kleur: 'Bruin met wit stiksel', code: '501'},
          {kleur: 'Naturel met wit stiksel', code: '502'},
        ],
      },
    ],
  },
  {
    naam: 'Rubberrand',
    modellen: [
      {
        model: '28',
        gegevens: {
          notitie: 'Imitatie flexibel',
        },
        kleuren: [{kleur: 'Middenbruin'}, {kleur: 'Zwart'}],
      },
      {
        model: '47',
        gegevens: {
          notitie: 'Dr. Martens',
        },
        kleuren: [{kleur: 'Donkerbruin'}, {kleur: 'Zwart'}],
      },
    ],
  },
];

/** Onderwerken - Structured data for sole types with categories, models, metadata, and colors */
export interface OnderwerkKleur {
  kleur: string;
  code?: string;
}

export interface OnderwerkModel {
  model: string;
  gegevens?: {
    notitie?: string;
    zwaarte?: string;
    zool_dikte?: string;
    hak_dikte?: string;
    dikte?: string;
  };
  kleuren: OnderwerkKleur[];
}

export interface OnderwerkCategorie {
  naam: string;
  zolen: OnderwerkModel[];
}

export const ONDERWERKEN: OnderwerkCategorie[] = [
  {
    naam: 'Vibram',
    zolen: [
      {
        model: '1100 profielzool',
        gegevens: {
          zwaarte: 'Zwaar',
          zool_dikte: '12 mm',
          hak_dikte: '20 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: '1220 profielzool',
        gegevens: {
          zwaarte: 'Zwaar',
          zool_dikte: '8 mm',
          hak_dikte: '8 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Honing'}, {kleur: 'Moreno'}],
      },
      {
        model: '2603 gumlitezool',
        gegevens: {
          notitie: 'Dr. Martens',
          zwaarte: 'Licht',
          zool_dikte: '12 mm',
          hak_dikte: '23 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '2644 gumlitezool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '6 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '2655 gumlitezool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '7 mm',
          hak_dikte: '10 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: '4855 Newflex zool',
        gegevens: {
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '6 mm',
        },
        kleuren: [{kleur: 'Honing'}, {kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: 'Mammoth profielzool',
        gegevens: {
          notitie: 'Slijtvast zwaarder',
          zwaarte: 'Zwaar',
          zool_dikte: '8 mm',
          hak_dikte: '8 mm',
        },
        kleuren: [{kleur: 'Bruin'}, {kleur: 'Zwart'}, {kleur: 'Honing'}],
      },
      {
        model: 'Flensburg PUR profielzool',
        gegevens: {
          notitie: 'Werkschoen (Olie en Benzinebestendig + Antistatisch)',
          zwaarte: 'Licht',
          zool_dikte: '8 mm',
          hak_dikte: '24 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Kiel profielzool',
        gegevens: {
          notitie: 'Werkschoen (Olie en Zuurbestendig + Antistatisch)',
          zwaarte: 'Licht',
          zool_dikte: '6 mm',
          hak_dikte: '11 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Lübeck PUR profielzool',
        gegevens: {
          notitie:
            'Werkschoen (Olie en Benzinebestendig + Antistatisch) - Sleehak & CSO Rand',
          zwaarte: 'Licht',
          zool_dikte: '9 mm',
          hak_dikte: '9 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
      {
        model: 'Onderwerk Sportflex',
        gegevens: {
          notitie: 'Slijtvast / Sneaker',
          zwaarte: 'Zwaar',
          zool_dikte: '5,5 mm',
          hak_dikte: '5,5 mm',
        },
        kleuren: [
          {kleur: 'Bruin'},
          {kleur: 'Grijs'},
          {kleur: 'Rood'},
          {kleur: 'Zwart'},
          {kleur: 'Oranje'},
          {kleur: 'Groen'},
          {kleur: 'Geel'},
          {kleur: 'Wit'},
          {kleur: 'Blauw'},
        ],
      },
      {
        model: 'Iztok sportzool',
        gegevens: {
          notitie: 'Sportief',
          zwaarte: 'Medium',
          zool_dikte: '6,5 mm',
          hak_dikte: '6,5 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Tri-Color'}],
      },
    ],
  },
  {
    naam: 'Onderwerken vrij',
    zolen: [
      {
        model: 'Zoolrubber Lavero flex profielen',
        gegevens: {
          notitie: 'Sportief',
          dikte: '4 mm',
        },
        kleuren: [
          {kleur: 'Rood', code: '102'},
          {kleur: 'Blauw', code: '103'},
          {kleur: 'Groen', code: '105'},
          {kleur: 'Roze', code: '106'},
        ],
      },
      {
        model: 'Vibram 8316 Mandorlo',
        gegevens: {
          notitie: 'Extra Zachte E.V.A. - Huisschoen',
          zwaarte: 'Super licht',
          dikte: '6 of 8 mm',
        },
        kleuren: [{kleur: 'Zwart'}, {kleur: 'Moreno'}],
      },
      {
        model: 'Zoolrubber Astro Star',
        gegevens: {
          notitie: 'Nette schoenen - Onder MyFoot',
          zwaarte: 'Licht',
          dikte: '4 of 6 mm',
        },
        kleuren: [
          {kleur: 'Zwart', code: '81'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Donkergrijs', code: '56'},
          {kleur: 'Rood', code: '89'},
          {kleur: 'Blauw', code: '352'},
        ],
      },
      {
        model: 'Zoolrubber PowerGrip',
        gegevens: {
          notitie: 'Werkschoen (Olie en Zuurbestendig + Antistatisch)',
          dikte: '4,7 of 6,5 mm',
        },
        kleuren: [{kleur: 'Zwart'}],
      },
    ],
  },
];

/** Zipper placement options */
export const ZIPPER_PLACEMENT_OPTIONS = [
  {label: 'Langs Ringbies', value: 'Langs Ringbies'},
  {label: 'Zie leest', value: 'Zie leest'},
];
