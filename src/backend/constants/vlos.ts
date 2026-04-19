// ============================================================================
// VLOS FORM CONSTANTS
// Constants used in the VLOS (Voet en Loopschoeisel) form.
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
