// Centralized form constants (runtime values + derived types)

// Practitioners
export const PRACTITIONERS = [
    { label: 'Johan Bonekamp', value: 'p1' },
    { label: 'Job de Graaff', value: 'p2' },
    { label: 'Daan Heetkamp', value: 'p3' },
    { label: 'Michel Heetkamp', value: 'p4' },
    { label: 'Anne Hummelen', value: 'p5' },
    { label: 'Mia Rietberg', value: 'p6' },
    { label: 'Norah Schrijver', value: 'p7' },
];

// Locations
export const LOCATIONS = [
    'FZ',
    'FM',
    'NN',
    'MMC',
    'AMC',
    'Holten',
    'Markelo',
] as const;
export type Location = typeof LOCATIONS[number];
export const LOCATION_OPTIONS = LOCATIONS.map(v => ({ label: v, value: v }));

// Salutations
export const SALUTATIONS = ['Mw.', 'Dhr.', 'X.'] as const;
export type Salutation = typeof SALUTATIONS[number];
export const SALUTATION_OPTIONS = SALUTATIONS.map(v => ({ label: v, value: v }));

// Generic sides used across intake forms
export const SIDES = ['beide', 'links', 'rechts'] as const;
export type Side = typeof SIDES[number];

// Generic yes/no used across forms
export const YES_NO = ['ja', 'nee'] as const;
export type YesNo = typeof YES_NO[number];

// Openstand schacht options (values in cm)
export const OPENSTAND_OPTIONS = ['0.5', '0.8', '1', '1.5', '2'] as const;
export type Openstand = typeof OPENSTAND_OPTIONS[number];

// Supplement types
export const SUPPLEMENT_TYPES = [
    'Lateraal',
    'Mediaal',
    'Lateraal of Mediaal',
] as const;
export type SupplementType = typeof SUPPLEMENT_TYPES[number];

// Haksoort options
export const HAKSOORT_OPTIONS = [
    'Sleehak Vlak',
    'Opbouwhak',
    'Leer/Poro',
    'Uitholling',
    'Vlak',
    'Blokhak',
    'Kernbekleding',
] as const;
export type Haksoort = typeof HAKSOORT_OPTIONS[number];

// Loopzool options
export const LOOPZOOL_OPTIONS = [
    'Lavero Soft 6mm',
    'Star-o-last 6mm',
    'Astrostar 6mm',
    'Autoband profiel 6mm',
] as const;
export type Loopzool = typeof LOOPZOOL_OPTIONS[number];

// Sluiting options
export const SLUITING_OPTIONS = ['haken/ringen', 'klittenband'] as const;
export type Sluiting = typeof SLUITING_OPTIONS[number];

// Hakschoring types
export const HAKSCHORING_TYPES = ['Mediaal', 'Lateraal'] as const;
export type HakschoringType = typeof HAKSCHORING_TYPES[number];

// Omsluiting (moved from omsluiting.ts)
export type OmsluitingKey =
    | 'hoge'
    | 'lavero'
    | 'multivorm'
    | 'plastazote'
    | 'orca';

export type OmsluitingOption = {
    key: OmsluitingKey;
    label: string; // Keep plain labels for now to avoid i18n key mismatch
    needsMm: boolean;
    defaultMm?: string; // default when selected
};

export const OMSLUITING_OPTIONS: OmsluitingOption[] = [
    { key: 'hoge', label: 'Hoge omsluiting', needsMm: true },
    { key: 'lavero', label: 'Lavero omsluiting', needsMm: true, defaultMm: '4' },
    {
        key: 'multivorm',
        label: 'Multivorm omsluiting',
        needsMm: true,
        defaultMm: '3',
    },
    { key: 'plastazote', label: 'Plastazote', needsMm: true, defaultMm: '3' },
    { key: 'orca', label: 'Orca omsluiting', needsMm: false },
];

// Pulman types
export const PULMAN_TYPES = ['New Harlem', 'Harlem Extra'] as const;
export type PulmanType = typeof PULMAN_TYPES[number];
export const PULMAN_TYPE_OPTIONS = PULMAN_TYPES.map(v => ({ label: v, value: v }));

// Shoe sizes (37-48)
export const SHOE_SIZES = Array.from({ length: 12 }, (_, i) => (37 + i).toString());
export type ShoeSize = typeof SHOE_SIZES[number];
