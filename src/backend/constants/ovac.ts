// ============================================================================
// OVAC FORM CONSTANTS
// Constants used in the OVAC (Orthopedische Voorzieningen Aanvraag Centrum) form.
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
