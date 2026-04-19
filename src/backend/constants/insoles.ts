// ============================================================================
// STEUNZOLEN (INSOLES) FORM CONSTANTS
// Constants used in the Steunzolen (insoles) form.
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
