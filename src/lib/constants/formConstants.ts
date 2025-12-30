// Gecentraliseerde formulier constanten (runtime waarden + afgeleide types)

// Behandelaars
export const BEHANDELAARS = [
  { label: 'Johan Bonekamp', value: 'p1' },
  { label: 'Job de Graaff', value: 'p2' },
  { label: 'Daan Heetkamp', value: 'p3' },
  { label: 'Michel Heetkamp', value: 'p4' },
  { label: 'Anne Hummelen', value: 'p5' },
  { label: 'Mia Rietberg', value: 'p6' },
  { label: 'Norah Schrijver', value: 'p7' },
];

// Zorgverzekeraars
export const ZORGVERZEKERAARS = [
  { label: 'Menzis', value: 'Menzis' },
  { label: 'Achmea', value: 'Achmea' },
  { label: 'VGZ', value: 'VGZ' },
  { label: 'CZ', value: 'CZ' },
  { label: 'Salland', value: 'Salland' },
  { label: 'EUCare', value: 'EUCare' },
  { label: 'Zorg en Zekerheid', value: 'Zorg en Zekerheid' },
  { label: 'ASR', value: 'ASR' },
  { label: 'DSW', value: 'DSW' },
  { label: 'ONVZ', value: 'ONVZ' },
];

// Locaties
export type Locatie = 'FZ' | 'FM' | 'NN' | 'MMC' | 'AMC' | 'Holten' | 'Markelo';
export const LOCATIE_OPTIES = [
  { label: 'FZ', value: 'FZ' },
  { label: 'FM', value: 'FM' },
  { label: 'NN', value: 'NN' },
  { label: 'MMC', value: 'MMC' },
  { label: 'AMC', value: 'AMC' },
  { label: 'Holten', value: 'Holten' },
  { label: 'Markelo', value: 'Markelo' },
];

// Aanhef
export type Aanhef = 'Mw.' | 'Dhr.' | 'X.';
export const AANHEF_OPTIES = [
  { label: 'Mw.', value: 'Mw.' },
  { label: 'Dhr.', value: 'Dhr.' },
  { label: 'X.', value: 'X.' },
];

// Generieke zijdes gebruikt in intake formulieren
export type Zijde = 'both' | 'left' | 'right';
export const ZIJDE_OPTIES = [
  { label: 'both', value: 'both' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
];

// Generieke ja/nee gebruikt in formulieren
export type JaNee = 'ja' | 'nee';
export const JA_NEE_OPTIES = [
  { label: 'yes', value: 'ja', translationKey: 'yes' },
  { label: 'no', value: 'nee', translationKey: 'no' },
];

// Openstand schacht opties (waarden in cm)
export type Openstand = '0.5' | '0.8' | '1' | '1.5' | '2';
export const OPENSTAND_OPTIES = [
  { label: '0.5', value: '0.5' },
  { label: '0.8', value: '0.8' },
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
];

// Supplement types
export type SupplementType = 'lateral' | 'medial';
export const SUPPLEMENT_TYPE_OPTIES = [
  { value: 'Lateraal', label: 'lateral' },
  { value: 'Mediaal', label: 'medial' },
  { value: 'LateraalEnMediaal', label: 'lateralAndMedial' },
];

// Haksoort opties
export type Haksoort =
  | 'Sleehak Vlak'
  | 'Opbouwhak'
  | 'Leer/Poro'
  | 'Uitholling'
  | 'Vlak'
  | 'Blokhak'
  | 'Kernbekleding';
export const HAKSOORT_OPTIES = [
  { label: 'Sleehak Vlak', value: 'Sleehak Vlak' },
  { label: 'Opbouwhak', value: 'Opbouwhak' },
  { label: 'Leer/Poro', value: 'Leer/Poro' },
  { label: 'Uitholling', value: 'Uitholling' },
  { label: 'Vlak', value: 'Vlak' },
  { label: 'Blokhak', value: 'Blokhak' },
  { label: 'Kernbekleding', value: 'Kernbekleding' },
];

// Loopzool opties
export type Loopzool =
  | 'Lavero Soft 6mm'
  | 'Star-o-last 6mm'
  | 'Astrostar 6mm'
  | 'Autoband profiel 6mm';
export const LOOPZOOL_OPTIES = [
  { label: 'Lavero Soft 6 mm', value: 'Lavero Soft 6 mm' },
  { label: 'Star-o-last 6 mm', value: 'Star-o-last 6 mm' },
  { label: 'Astrostar 6 mm', value: 'Astrostar 6 mm' },
  { label: 'Autoband profiel 6 mm', value: 'Autoband profiel 6 mm' },
];

// Sluiting opties
export type Sluiting = 'Haken/Ringen' | 'Klittenband';
export const SLUITING_OPTIES = [
  { label: 'Haken/Ringen', value: 'Haken/Ringen' },
  { label: 'Klittenband', value: 'Klittenband' },
];

// Hakschoring types
export type HakschoringType = 'medial' | 'lateral' | 'LateraalEnMediaal';
export const HAKSCHORING_TYPE_OPTIES = [
  { label: 'medial', value: 'medial', translationKey: 'medial' },
  { label: 'lateral', value: 'lateral', translationKey: 'lateral' },
  { value: 'LateraalEnMediaal', label: 'lateralAndMedial', translationKey: 'lateralAndMedial' },
];

// Ezelsoor types
export type EzelsoorType = 'medial' | 'lateral';
export const EZELSOOR_TYPE_OPTIES = [
  { label: 'medial', value: 'medial', translationKey: 'medial' },
  { label: 'lateral', value: 'lateral', translationKey: 'lateral' },
  { value: 'LateraalEnMediaal', label: 'lateralAndMedial' },
];

// Omsluiting
export type OmsluitingKey =
  | 'hoge'
  | 'lavero'
  | 'multivorm'
  | 'plastazote'
  | 'orca';

export type OmsluitingOptie = {
  key: OmsluitingKey;
  label: string;
  needsMm: boolean;
  defaultMm?: string; // standaard wanneer geselecteerd
  fullKeyLinks: string; // Full key name for left side: omsluitingLinksMultivorm
  fullKeyRechts: string; // Full key name for right side: omsluitingRechtsMultivorm
  mmKeyLinks: string; // MM key for left side: omsluitingMmLinksMultivorm
  mmKeyRechts: string; // MM key for right side: omsluitingMmRechtsMultivorm
};

export const OMSLUITING_OPTIES: OmsluitingOptie[] = [
  {
    key: 'hoge',
    label: 'Hoogte van omsluiting (cm)',
    needsMm: true,
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
    fullKeyLinks: 'omsluitingLinksPlastazote',
    fullKeyRechts: 'omsluitingRechtsPlastazote',
    mmKeyLinks: 'omsluitingMmLinksPlastazote',
    mmKeyRechts: 'omsluitingMmRechtsPlastazote',
  },
  {
    key: 'orca',
    label: 'Orca omsluiting',
    needsMm: false,
    fullKeyLinks: 'omsluitingLinksOrca',
    fullKeyRechts: 'omsluitingRechtsOrca',
    mmKeyLinks: 'omsluitingMmLinksOrca',
    mmKeyRechts: 'omsluitingMmRechtsOrca',
  },
];

// Pulman types
export type PulmanType = 'New Harlem' | 'Harlem Extra';
export const PULMAN_TYPE_OPTIES = [
  { label: 'New Harlem', value: 'New Harlem' },
  { label: 'Harlem Extra', value: 'Harlem Extra' },
];

// Schoenmaten (37-48)
export const SCHOENMATEN = Array.from({ length: 12 }, (_, i) =>
  (37 + i).toString(),
);
export type Schoenmaat = (typeof SCHOENMATEN)[number];

// OSB Formulier Constanten
// Omschrijving/Paartype
export type PaartypeOptie =
  | 'Eerste paar'
  | 'Herhalings paar'
  | 'Reserve paar'
  | 'Privé paar';
export const PAARTYPE_OPTIES = [
  { label: 'firstPair', value: 'Eerste paar' },
  { label: 'repeatPair', value: 'Herhalings paar' },
  { label: 'sparePair', value: 'Reserve paar' },
  { label: 'privatePair', value: 'Privé paar' },
];

// Doel opties (GEEN L/R)
export type DoelOptie =
  | 'Pasvorm'
  | 'Stabiliteit'
  | 'Loop afstand vergroten'
  | 'Ondersteuning gewelf';
export const DOEL_OPTIES = [
  { label: 'Pasvorm', value: 'Pasvorm', fullKey: 'doelPasvorm' },
  { label: 'Stabiliteit', value: 'Stabiliteit', fullKey: 'doelStabiliteit' },
  {
    label: 'Loop afstand vergroten',
    value: 'Loop afstand vergroten',
    fullKey: 'doelLoopAfstandVergroten',
  },
  {
    label: 'Ondersteuning gewelf',
    value: 'Ondersteuning gewelf',
    fullKey: 'doelOndersteuningGewelf',
  },
];

// Loopfunctie opties
export type LoopfunctieOptie = 'Passief' | 'Actief' | 'Korte transfers';
export const LOOPFUNCTIE_OPTIES = [
  { label: 'Passief', value: 'Passief', fullKey: 'loopfunctiePassief' },
  { label: 'Actief', value: 'Actief', fullKey: 'loopfunctieActief' },
  {
    label: 'Korte transfers',
    value: 'Korte transfers',
    fullKey: 'loopfunctieKorteTransfers',
  },
];

// Loopfunctie indicatie opties (OSB specific)
export type LoopfunctieIndicatieOptie =
  | 'Passief'
  | 'Korte Transfers'
  | 'Actief';
export const LOOPFUNCTIE_INDICATIE_OPTIES = [
  { label: 'Passief', value: 'Passief', fullKey: 'loopfunctiePassief' },
  {
    label: 'Korte Transfers',
    value: 'Korte Transfers',
    fullKey: 'loopfunctieKorteTransfers',
  },
  { label: 'Actief', value: 'Actief', fullKey: 'loopfunctieActief' },
];

// Leveranciers
export type LeverancierOptie = 'Neskrid' | 'Tom' | 'Myfoot' | 'Durea';
export const LEVERANCIER_OPTIES = [
  { label: 'Neskrid', value: 'Neskrid' },
  { label: 'Tom', value: 'Tom' },
  { label: 'Myfoot', value: 'Myfoot' },
  { label: 'Durea', value: 'Durea' },
];

// Basiscode SOS
export type BasiscodeOptie = '42' | '40';
export const BASISCODE_OPTIES = [
  { label: '42', value: '42' },
  { label: '40', value: '40' },
];

// Supplement opties met codes (in tabel met L/R)
export const SUPPLEMENT_OPTIES = [
  { key: 'individueel', label: 'Supplement individueel', code: 43 },
  { key: 'afwikkelrol_eenvoudig', label: 'Afwikkelrol eenvoudig', code: 46 },
  {
    key: 'afwikkelrol_gecompliceerd',
    label: 'Afwikkelrol gecompliceerd',
    code: 47,
  },
  { key: 'zoolverstijving', label: 'Zoolverstijving', code: 57 },
] as const;
export type SupplementOptie = (typeof SUPPLEMENT_OPTIES)[number];

// Hallux valgus mm opties
export type HalluxMmOptie = 'Nee' | '3 mm' | '8 mm';
export const HALLUX_MM_OPTIES = [
  { label: 'Nee', value: 'Nee' },
  { label: '3 mm', value: '3 mm' },
  { label: '8 mm', value: '8 mm' },
];

// Verdieping voorvoet mm opties
export type VerdiepingMmOptie = 'Nee' | '3 mm' | '5 mm';
export const VERDIEPING_MM_OPTIES = [
  { label: 'Nee', value: 'Nee' },
  { label: '3 mm', value: '3 mm' },
  { label: '5 mm', value: '5 mm' },
];

// Steunzool types
export type SteunzoolType =
  | 'Berksteunzool met'
  | 'Berksteunzool zonder'
  | 'Kinderkniksteun'
  | 'Ergopad redux heel'
  | 'Birco'
  | 'Anders';
export const STEUNZOOL_TYPE_OPTIES = [
  {
    label: 'Berksteunzool met',
    value: 'Berksteunzool met',
    fullKey: 'steunzoolTypeBerksteunzoolMet',
  },
  {
    label: 'Berksteunzool zonder',
    value: 'Berksteunzool zonder',
    fullKey: 'steunzoolTypeBerksteunzoolZonder',
  },
  {
    label: 'Kinderkniksteun',
    value: 'Kinderkniksteun',
    fullKey: 'steunzoolTypeKinderkniksteun',
  },
  {
    label: 'Ergopad redux heel',
    value: 'Ergopad redux heel',
    fullKey: 'steunzoolTypeErgopadReduxHeel',
  },
  { label: 'Birco', value: 'Birco', fullKey: 'steunzoolTypeBirco' },
  { label: 'Anders', value: 'Anders', fullKey: 'steunzoolTypeAnders' },
];

// Correctie middenvoet
export type CorrectieMiddenvoet = 'Nee' | 'Neutraal' | 'Laag' | 'Hoog';
export const CORRECTIE_MIDDENVOET_OPTIES = [

  { label: 'Nee', value: 'Nee' },
  { label: 'Neutraal', value: 'Neutraal' },
  { label: 'Laag', value: 'Laag' },
  { label: 'Hoog', value: 'Hoog' },
];

// Correctie voorvoet
export type CorrectieVoorvoet = 'Nee' | 'Neutraal' | 'Pronatie' | 'Supinatie';
export const CORRECTIE_VOORVOET_OPTIES = [

  { label: 'Nee', value: 'Nee' },
  { label: 'Neutraal', value: 'Neutraal' },
  { label: 'Pronatie', value: 'Pronatie' },
  { label: 'Supinatie', value: 'Supinatie' },
];

// Pellote opties
export type PelloteOptie = 'Nee' | 'Hoog' | 'Laag';
export const PELLOTE_OPTIES = [
  { label: 'Nee', value: 'Nee' },
  { label: 'Hoog', value: 'Hoog' },
  { label: 'Laag', value: 'Laag' },
];

// OVAC Omschrijving items met post nummers
export type OvacOmschrijvingItem = {
  key: string;
  label: string;
  postNr: string;
};

export const OVAC_OMSCHRIJVING_ITEMS: OvacOmschrijvingItem[] = [
  { key: 'supplementIndividueel', label: 'Supplement individueel', postNr: '71' },
  { key: 'eenvoudigeAfwikkelrol', label: 'Eenvoudige afwikkelrol', postNr: '74' },
  {
    key: 'gecompliceerdeAfwikkelrol',
    label: 'Gecompliceerde afwikkelrol',
    postNr: '75',
  },
  { key: 'hakAanpassing2cm', label: 'Hak aanpassing t/m 2 cm', postNr: '76' },
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
  { key: 'aangepastehakken', label: 'Aangepaste hakken', postNr: '84' },
  { key: 'zoolverstijving', label: 'Zoolverstijving', postNr: '85' },
  { key: 'nieuweWreefsluiting', label: 'Nieuwe wreefsluiting', postNr: '88' },
];

// Steunzolen pricing options - numeric values
export type SteunzolenPrijs = 175 | 225 | 195 | 29;
export const STEUNZOLEN_PRIJS_OPTIES = [
  { label: 'priceUpTo15Years', value: 175 },
  { label: 'insolesPrice225', value: 225 },
  { label: 'priceWithin3Months', value: 195 },
  { label: 'priceTalonette', value: 29 },
];

// OSA Functieonderzoek - Ziektebeelden (Medical Conditions)
export const ZIEKTEBEELDEN_OPTIES = [
  { key: 'no', label: 'no', translationKey: 'no' },
  { key: 'diabetes', label: 'diabetes', translationKey: 'diabetes' },
  {
    key: 'polyNeuropathie',
    label: 'polyNeuropathie',
    translationKey: 'polyNeuropathie',
  },
  { key: 'reuma', label: 'reuma', translationKey: 'reuma' },
  { key: 'ms', label: 'ms', translationKey: 'ms' },
  { key: 'hmsn', label: 'hmsn', translationKey: 'hmsn' },
  { key: 'degeneratie', label: 'degeneratie', translationKey: 'degeneratie' },
  { key: 'artrose', label: 'artrose', translationKey: 'artrose' },
];

// OSA Functieonderzoek - Loopafstand hulpmiddelen (Walking Distance Aids)
export const LOOPAFSTAND_OPTIES = [
  { key: 'no', label: 'no', translationKey: 'no' },
  { key: 'steunzolen', label: 'steunzolen', translationKey: 'supportSoles' },
  { key: 'rollator', label: 'rollator', translationKey: 'rollator' },
  { key: 'stok', label: 'stok', translationKey: 'cane' },
  { key: 'elKousen', label: 'elKousen', translationKey: 'compressionStockings' },
  { key: 'knieBrace', label: 'knieBrace', translationKey: 'kneeBrace' },
  { key: 'fysio', label: 'fysio', translationKey: 'physiotherapy' },
  { key: 'pedicure', label: 'pedicure', translationKey: 'pedicure' },
];

// OSA Functieonderzoek - Inspectie voeten (Foot Inspection)
export const INSPECTIE_VOETEN_OPTIES = [
  { key: 'no', label: 'no', translationKey: 'no' },
  { key: 'oedeem', label: 'oedeem', translationKey: 'edema' },
  { key: 'wisselend', label: 'wisselend', translationKey: 'variable' },
  { key: 'structureel', label: 'structureel', translationKey: 'structural' },
  {
    key: 'dunneKwetsbareHuid',
    label: 'dunneKwetsbareHuid',
    translationKey: 'thinFragileSkin',
  },
  { key: 'drogeHuid', label: 'drogeHuid', translationKey: 'drySkin' },
  {
    key: 'doorbloedingsstoornis',
    label: 'doorbloedingsstoornis',
    translationKey: 'circulationDisorder',
  },
  { key: 'halluxValgus', label: 'halluxValgus', translationKey: 'halluxValgus' },
  { key: 'bunion', label: 'bunion', translationKey: 'bunion' },
  {
    key: 'pesPlanoValgus',
    label: 'pesPlanoValgus',
    translationKey: 'pesPlanoValgus',
  },
  { key: 'pesCavo', label: 'pesCavo', translationKey: 'pesCavo' },
  { key: 'klauwtenen', label: 'klauwtenen', translationKey: 'clawToes' },
];

// OSA Digitaal - Leesthoogte options
export const LEESTHOOGTE_OPTIES = [
  { label: 'Nee', value: 'No' },
  { label: '15cm', value: '15' },
  { label: '20cm', value: '20' },
  { label: '25cm', value: '25' },
];

// OSA Digitaal - MTP1 diep options
export const MTP1_DIEP_OPTIES = [
  { label: 'Nee', value: 'No' },
  { label: '4cm', value: '4' },
  { label: '8cm', value: '8' },
];
