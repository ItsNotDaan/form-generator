// ============================================================================
// PULMAN & REBACARE FORM CONSTANTS
// Constants used in the Pulman and Rebacare forms.
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
