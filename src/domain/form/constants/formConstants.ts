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

// ============================================================================
// VLOS FORM CONSTANTS
// ============================================================================

/** Shaft opening options (waarden in cm) */
export type ShaftOpening = '0.5' | '0.8' | '1' | '1.5' | '2';
export const SHAFT_OPENING_OPTIONS = [
  {label: '0.5', value: '0.5'},
  {label: '0.8', value: '0.8'},
  {label: '1', value: '1'},
  {label: '1.5', value: '1.5'},
  {label: '2', value: '2'},
];

/** Heel type options */
export type HeelType =
  | 'sleeHakFlat'
  | 'builUpHeel'
  | 'leatherPoro'
  | 'excavation'
  | 'flat'
  | 'blockHeel'
  | 'coreLining';
export const HEEL_TYPE_OPTIONS = [
  {label: 'Sleehak Vlak', value: 'sleeHakFlat'},
  {label: 'Opbouwhak', value: 'builUpHeel'},
  {label: 'Leer/Poro', value: 'leatherPoro'},
  {label: 'Uitholling', value: 'excavation'},
  {label: 'Vlak', value: 'flat'},
  {label: 'Blokhak', value: 'blockHeel'},
  {
    label: 'Kernbekleding',
    value: 'coreLining',
  },
];

/** Walking sole options */
export type WalkingSole =
  | 'laveroSoft6mm'
  | 'staroLast6mm'
  | 'astrostar6mm'
  | 'autobandProfiel6mm';
export const WALKING_SOLE_OPTIONS = [
  {
    label: 'Lavero Soft 6 mm',
    value: 'laveroSoft6mm',
  },
  {
    label: 'Star-o-last 6 mm',
    value: 'staroLast6mm',
  },
  {
    label: 'Astrostar 6 mm',
    value: 'astrostar6mm',
  },
  {
    label: 'Autoband profiel 6 mm',
    value: 'autobandProfiel6mm',
  },
];

/** Closure options */
export type Closure = 'hooksRings' | 'velcroClosure';
export const CLOSURE_OPTIONS = [
  {label: 'Haken/Ringen', value: 'hooksRings'},
  {label: 'Klittenband', value: 'velcroClosure'},
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
  | 'orca'
  | 'ercoflex'
  | 'donkeyEar';

export type EnclosureOption = {
  key: OmsluitingKey;
  label: string;
  needsMm: boolean;
  defaultMm?: string;
  needsTypeSelect?: boolean; // For donkey ear type selection
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
    needsMm: false,
    exportKeyLeft: 'orcaLeft',
    exportKeyRight: 'orcaRight',
    fullKeyLinks: 'omsluitingLinksOrca',
    fullKeyRechts: 'omsluitingRechtsOrca',
    mmKeyLinks: 'omsluitingMmLinksOrca',
    mmKeyRechts: 'omsluitingMmRechtsOrca',
  },
  {
    key: 'ercoflex',
    label: 'Ercoflex omsluiting',
    needsMm: false,
    exportKeyLeft: 'ercoflexLeft',
    exportKeyRight: 'ercoflexRight',
    fullKeyLinks: 'omsluitingLinksErcoflex',
    fullKeyRechts: 'omsluitingRechtsErcoflex',
    mmKeyLinks: 'omsluitingMmLinksErcoflex',
    mmKeyRechts: 'omsluitingMmRechtsErcoflex',
  },
  {
    key: 'donkeyEar',
    label: 'Ezelsoor',
    needsMm: false,
    needsTypeSelect: true,
    exportKeyLeft: 'donkeyEarLeft',
    exportKeyRight: 'donkeyEarRight',
    fullKeyLinks: 'omsluitingLinksDonkeyEar',
    fullKeyRechts: 'omsluitingRechtsDonkeyEar',
    mmKeyLinks: 'omsluitingMmLinksDonkeyEar',
    mmKeyRechts: 'omsluitingMmRechtsDonkeyEar',
  },
];

// ============================================================================
// PULMAN & REBACARE FORM CONSTANTS
// ============================================================================

/** Pulman types */
export type PulmanType = 'newHarlem' | 'harlemExtra';
export const PULMAN_TYPE_OPTIONS = [
  {label: 'New Harlem', value: 'newHarlem'},
  {label: 'Harlem Extra', value: 'harlemExtra'},
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
    key: 'diabetes',
  },
  {
    label: 'polyNeuropathie',
    value: 'polyNeuropathie',
    key: 'polyNeuropathie',
  },
  {label: 'reuma', value: 'reuma', key: 'reuma'},
  {label: 'ms', value: 'ms', key: 'ms'},
  {label: 'hmsn', value: 'hmsn', key: 'hmsn'},
  {
    label: 'degeneratie',
    value: 'degeneratie',
    key: 'degeneratie',
  },
  {
    label: 'artrose',
    value: 'artrose',
    key: 'artrose',
  },
];

/** OSA Functieonderzoek - Loopafstand hulpmiddelen (Walking Distance Aids) */
export const WALKING_DISTANCE_AIDS_OPTIONS = [
  {
    label: 'steunzolen',
    value: 'supportSoles',
    key: 'steunzolen',
  },
  {
    label: 'rollator',
    value: 'rollator',
    key: 'rollator',
  },
  {label: 'stok', value: 'cane', key: 'stok'},
  {
    label: 'elKousen',
    value: 'compressionStockings',
    key: 'elKousen',
  },
  {
    label: 'knieBrace',
    value: 'kneeBrace',
    key: 'knieBrace',
  },
  {
    label: 'fysio',
    value: 'physiotherapy',
    key: 'fysio',
  },
  {
    label: 'pedicure',
    value: 'pedicure',
    key: 'pedicure',
  },
];

/** OSA Functieonderzoek - Inspectie voeten (Foot Inspection) */
export const FOOT_INSPECTION_OPTIONS = [
  {label: 'oedeem', value: 'edema', key: 'oedeem'},
  {
    label: 'wisselend',
    value: 'variable',
    key: 'wisselend',
  },
  {
    label: 'structureel',
    value: 'structural',
    key: 'structureel',
  },
  {
    label: 'dunneKwetsbareHuid',
    value: 'thinFragileSkin',
    key: 'dunneKwetsbareHuid',
  },
  {
    label: 'drogeHuid',
    value: 'drySkin',
    key: 'drogeHuid',
  },
  {
    label: 'doorbloedingsstoornis',
    value: 'circulationDisorder',
    key: 'doorbloedingsstoornis',
  },
  {
    label: 'halluxValgus',
    value: 'halluxValgus',
    key: 'halluxValgus',
  },
  {label: 'bunion', value: 'bunion', key: 'bunion'},
  {
    label: 'pesPlanoValgus',
    value: 'pesPlanoValgus',
    key: 'pesPlanoValgus',
  },
  {
    label: 'pesCavo',
    value: 'pesCavo',
    key: 'pesCavo',
  },
  {
    label: 'klauwtenen',
    value: 'clawToes',
    key: 'klauwtenen',
  },
];

/** OSA Digitaal - Leesthoogte options */
export const LAST_HEIGHT_OPTIONS = [
  {label: '15cm', value: 'lastHeight15cm'},
  {label: '20cm', value: 'lastHeight20cm'},
  {label: '25cm', value: 'lastHeight25cm'},
];

/** OSA Digitaal - MTP1 diep options */
export const MTP1_DEEP_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: '40mm', value: 'mtp1Deep40mm'},
  {label: '80mm', value: 'mtp1Deep80mm'},
];

/** OSA Functieonderzoek - Loopafstand options */
export const WALKING_DISTANCE_OPTIONS = [
  {
    label: '50-100m',
    value: 'walkingDistance50_100',
    key: 'walkingDistance50_100',
  },
  {
    label: '100m-500m',
    value: 'walkingDistance100_500',
    key: 'walkingDistance100_500',
  },
  {
    label: '1km-3km',
    value: 'walkingDistance1_3km',
    key: 'walkingDistance1_3km',
  },
  {
    label: '3km-6km',
    value: 'walkingDistance3_6km',
    key: 'walkingDistance3_6km',
  },
];

/** OSA Functieonderzoek - Tijdsduur pijn options */
export const PAIN_DURATION_OPTIONS = [
  {label: 'Pijn in rust', value: 'painAtRest', key: 'painAtRest'},
  {label: 'Pijn bij belasten', value: 'painWhenLoaded', key: 'painWhenLoaded'},
  {
    label: "Altijd pijn (ook 's nachts)",
    value: 'constantPain',
    key: 'constantPain',
  },
];

/** OSA Functieonderzoek - Teenpartij options */
export const TOE_AREA_OPTIONS = [
  {
    label: 'Extensiebeperking',
    value: 'extensionLimitation',
    key: 'extensionLimitation',
  },
  {
    label: 'Flexiebeperking',
    value: 'flexionLimitation',
    key: 'flexionLimitation',
  },
  {label: 'Hallux limitus', value: 'halluxLimitus', key: 'halluxLimitus'},
  {label: 'Hallux rigidus', value: 'halluxRigidus', key: 'halluxRigidus'},
];

/** OSA Functieonderzoek - Midvoet options */
export const MIDFOOT_OPTIONS = [
  {
    label: 'Pronatiebeperking',
    value: 'pronationLimitation',
    key: 'pronationLimitation',
  },
  {
    label: 'Supinatiebeperking',
    value: 'supinationLimitation',
    key: 'supinationLimitation',
  },
];

/** OSA Functieonderzoek - Enkelgewricht options */
export const ANKLE_JOINT_OPTIONS = [
  {
    label: 'Dorsaal flexiebeperking',
    value: 'dorsalFlexionLimitation',
    key: 'dorsalFlexionLimitation',
  },
  {
    label: 'Plantair flexiebeperking',
    value: 'plantarFlexionLimitation',
    key: 'plantarFlexionLimitation',
  },
];

/** OSA Functieonderzoek - Knieën options */
export const KNEES_OPTIONS = [
  {
    label: 'Extensiebeperking',
    value: 'extensionLimitation',
    key: 'extensionLimitation',
  },
  {
    label: 'Flexiebeperking',
    value: 'flexionLimitation',
    key: 'flexionLimitation',
  },
  {label: 'Genu valgum', value: 'genuValgum', key: 'genuValgum'},
  {label: 'Genu varum', value: 'genuVarum', key: 'genuVarum'},
];

/** Foliepas Leestcorrectie opties */
export const LAST_CORRECTION_OPTIONS = [
  {
    label: 'Openstand (zie Foliepas)',
    value: 'shaftOpeningLastCorrection',
  },
  {
    label: 'Schachthoogte',
    value: 'shaftHeightLastCorrection',
  },
  {
    label: 'Achter innemen (zie Foliepas)',
    value: 'reduceBackLastCorrection',
  },
  {
    label: 'Enkels aanpassen (zie Foliepas)',
    value: 'ankleAdjustmentLastCorrection',
  },
];

// ============================================================================
// OSB FORM CONSTANTS
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

// ============================================================================
// STEUNZOLEN FORM CONSTANTS
// ============================================================================

/** Insole types */
export type InsoleType =
  | 'berkInsoleWith'
  | 'berkInsoleWithout'
  | 'childArchSupport'
  | 'ergopadReduxHeel'
  | 'birco'
  | 'other';
export const INSOLE_TYPE_OPTIONS = [
  {
    label: 'Berksteunzool met',
    value: 'berkInsoleWith',
    fullKey: 'berkInsoleWith',
  },
  {
    label: 'Berksteunzool zonder',
    value: 'berkInsoleWithout',
    fullKey: 'berkInsoleWithout',
  },
  {
    label: 'Kinderkniksteun',
    value: 'childArchSupport',
    fullKey: 'childArchSupport',
  },
  {
    label: 'Ergopad redux heel',
    value: 'ergopadReduxHeel',
    fullKey: 'ergopadReduxHeel',
  },
  {
    label: 'Birco',
    value: 'birco',
    fullKey: 'birco',
  },
  {
    label: 'Anders',
    value: 'other',
    fullKey: 'other',
  },
];

/** Midfoot correction */
export type MidfootCorrection = 'no' | 'neutral' | 'low' | 'high';
export const MIDFOOT_CORRECTION_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: 'Neutraal', value: 'neutral'},
  {label: 'Laag', value: 'low'},
  {label: 'Hoog', value: 'high'},
];

/** Forefoot correction */
export type ForefootCorrection = 'no' | 'neutral' | 'pronation' | 'supination';
export const FOREFOOT_CORRECTION_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: 'Neutraal', value: 'neutral'},
  {label: 'Pronatie', value: 'pronation'},
  {label: 'Supinatie', value: 'supination'},
];

/** Pelotte options */
export type PelotteOption = 'no' | 'high' | 'low';
export const PELOTTE_OPTIONS = [
  {label: 'Nee', value: 'no'},
  {label: 'Hoog', value: 'high'},
  {label: 'Laag', value: 'low'},
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

// ============================================================================
// Check foliepas - Kleur en Model opties
// ============================================================================

// Voeringopties (lining options)
export type LiningOption = 'leatherLining' | 'onSteamLining' | 'diabeticLining';
export const LINING_OPTIONS = [
  {
    label: 'Leather lining',
    value: 'leatherLining',
  },
  {
    label: 'On-steam lining',
    value: 'onSteamLining',
  },
  {
    label: 'Diabetic lining',
    value: 'diabeticLining',
  },
];

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
  {
    naam: 'CSO Rand',
    modellen: [
      {
        model: '40',
        gegevens: {
          notitie: 'Standaard',
        },
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: '60',
        gegevens: {
          notitie: 'Glad',
        },
        kleuren: [
          {kleur: 'Zand', code: '05'},
          {kleur: 'Wit', code: '09'},
          {kleur: 'Beige', code: '17'},
          {kleur: 'Beige', code: '19'},
          {kleur: 'Middelbruin', code: '35'},
          {kleur: 'Taupe', code: '41'},
          {kleur: 'Donkerbruin', code: '46'},
          {kleur: 'Grijs', code: '56'},
          {kleur: 'Donkerblauw', code: '78'},
          {kleur: 'Antraciet', code: '80'},
          {kleur: 'Zwart', code: '81'},
        ],
      },
      {
        model: '70',
        gegevens: {
          notitie: 'Glad met streep',
        },
        kleuren: [
          {kleur: 'Donkerblauw (78) - Witte streep'},
          {kleur: 'Zwart (81) - Witte streep'},
          {kleur: 'Taupe (41) - Witte streep'},
          {kleur: 'Beige (19) - Witte streep'},
          {kleur: 'Wit (09) - Zwarte streep'},
        ],
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
    naam: 'Zolenplaat',
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

/** Zoolrand polish types */
export type SoleEdgePolishType =
  | 'none'
  | 'black'
  | 'brown'
  | 'mahogany'
  | 'ridges'
  | 'other';
export const SOLE_EDGE_POLISH_TYPE_OPTIONS = [
  {label: 'none', value: 'none'},
  {label: 'black', value: 'black'},
  {label: 'brown', value: 'brown'},
  {label: 'mahogany', value: 'mahogany'},
  {label: 'ridges', value: 'ridges'},
  {label: 'other', value: 'other'},
];

/** Model type options */
export type ModelType = 'asPhoto' | 'model';
export const MODEL_TYPE_OPTIONS = [
  {label: 'asPhoto', value: 'asPhoto' as const},
  {label: 'model', value: 'model' as const},
];

/** Tongue padding options (mm) */
export type TonguePaddingMm = 'no' | 'mm3' | 'mm5';
export const TONGUE_PADDING_MM_OPTIONS = [
  {label: 'no', value: 'no' as const},
  {label: '3', value: 'mm3' as const},
  {label: '5', value: 'mm5' as const},
];

/** Tongue Type options **/
export type TongueType = 'standard' | 'watertongue';
export const TONGUE_TYPE_OPTIONS = [
  {label: 'standard', value: 'standard' as const},
  {label: 'watertongue', value: 'watertongue' as const},
];

/** Padding collar options (mm) */
export type PaddingCollarMm = 'no' | 'mm5' | 'mm10';
export const PADDING_COLLAR_MM_OPTIONS = [
  {label: 'no', value: 'no' as const},
  {label: '5', value: 'mm5' as const},
  {label: '10', value: 'mm10' as const},
];

/** Closure type options */
export type ClosureType =
  | 'ringsAndHooksClosure'
  | 'velcroClosure'
  | 'velcroExtraLongClosure'
  | 'oneHandClosure'
  | 'boaClosure';
export const CLOSURE_TYPE_OPTIONS = [
  {
    label: 'ringAndHooksClosure',
    value: 'ringsAndHooksClosure' as const,
  },
  {
    label: 'velcroClosure',
    value: 'velcroClosure' as const,
  },
  {
    label: 'velcroExtraLongClosure',
    value: 'velcroExtraLongClosure' as const,
  },
  {
    label: 'oneHandClosure',
    value: 'oneHandClosure' as const,
  },
  {
    label: 'boaClosure',
    value: 'boaClosure' as const,
  },
];

/** Zipper type options */
export type ZipperType = 'none' | 'functionalNylon' | 'decorativeNylon';
export const ZIPPER_TYPE_OPTIONS = [
  {label: 'none', value: 'none' as const},
  {
    label: 'functionalNylon',
    value: 'functionalNylon' as const,
  },
  {
    label: 'decorativeNylon',
    value: 'decorativeNylon' as const,
  },
];

/** Toe type options / Neusmodellen */
export type ToeType = 'standard' | 'carbonToes' | 'rubberCrawlToes';
export const TOE_TYPE_OPTIONS = [
  {label: 'standard', value: 'standard' as const},
  {
    label: 'carbonToes',
    value: 'carbonToes' as const,
  },
  {
    label: 'rubberCrawlToes',
    value: 'rubberCrawlToes' as const,
  },
];

/** Counterfort type options */
export type CounterfortType = 'formo' | 'leather' | 'other';
export const COUNTERFORT_TYPE_OPTIONS = [
  {label: 'formo', value: 'formo' as const},
  {label: 'leather', value: 'leather' as const},
  {label: 'other', value: 'other' as const},
];

/** Insole type options for CheckFoliepas */
export type CheckFoliepasInsoleType = 'leather' | 'other';
export const CHECK_FOLIEPAS_INSOLE_TYPE_OPTIONS = [
  {label: 'leather', value: 'leather' as const},
  {label: 'other', value: 'other' as const},
];

/** Construction method type options */
export type ConstructionMethodType = 'glued' | 'flexible' | 'other';
export const CONSTRUCTION_METHOD_TYPE_OPTIONS = [
  {label: 'glued', value: 'glued' as const},
  {label: 'flexible', value: 'flexible' as const},
  {label: 'other', value: 'other' as const},
];

/** Heel model type options */
export type HeelModelType = 'buildUpHeel' | 'wedgeHeel' | 'blockHeel'; //Opbouw, sleehak, blokhak
export const HEEL_MODEL_TYPE_OPTIONS = [
  {
    label: 'buildUp',
    value: 'buildUpHeel' as const,
  },
  {
    label: 'wedge',
    value: 'wedgeHeel' as const,
  },
  {
    label: 'block',
    value: 'blockHeel' as const,
  },
];

/** Heel buildup material options */
export type HeelBuildUpMaterial = 'poro' | 'leather';
export const HEEL_BUILDUP_MATERIAL_OPTIONS = [
  {label: 'poro', value: 'poro' as const},
  {label: 'leather', value: 'leather' as const},
];

/** Shoring type options */
export type ShoringType = 'none' | 'lateral' | 'medial' | 'lateralAndMedial';
export const SHORING_TYPE_OPTIONS = [
  {label: 'none', value: 'none' as const},
  {label: 'lateral', value: 'lateral' as const},
  {label: 'medial', value: 'medial' as const},
  {
    label: 'lateralAndMedial',
    value: 'lateralAndMedial' as const,
  },
];
