// ============================================================================
// OSA FORM CONSTANTS
// Constants used in the OSA (Orthopedisch Schoeisel Aanmeting) form.
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
  {label: '4mm', value: 'mtp1Deep4mm'},
  {label: '8mm', value: 'mtp1Deep8mm'},
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
