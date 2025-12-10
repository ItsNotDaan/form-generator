// Gecentraliseerde formulier constanten (runtime waarden + afgeleide types)

// Behandelaars
export const BEHANDELAARS = [
  {label: 'Johan Bonekamp', value: 'p1'},
  {label: 'Job de Graaff', value: 'p2'},
  {label: 'Daan Heetkamp', value: 'p3'},
  {label: 'Michel Heetkamp', value: 'p4'},
  {label: 'Anne Hummelen', value: 'p5'},
  {label: 'Mia Rietberg', value: 'p6'},
  {label: 'Norah Schrijver', value: 'p7'},
];

// Zorgverzekeraars
export const ZORGVERZEKERAARS = [
  {label: 'Menzis', value: 'Menzis'},
  {label: 'Achmea', value: 'Achmea'},
  {label: 'VGZ', value: 'VGZ'},
  {label: 'CZ', value: 'CZ'},
  {label: 'Salland', value: 'Salland'},
  {label: 'EUCare', value: 'EUCare'},
  {label: 'Zorg en Zekerheid', value: 'Zorg en Zekerheid'},
  {label: 'ASR', value: 'ASR'},
  {label: 'DSW', value: 'DSW'},
  {label: 'ONVZ', value: 'ONVZ'},
];

// Locaties
export type Locatie = 'FZ' | 'FM' | 'NN' | 'MMC' | 'AMC' | 'Holten' | 'Markelo';
export const LOCATIE_OPTIES = [
  {label: 'FZ', value: 'FZ'},
  {label: 'FM', value: 'FM'},
  {label: 'NN', value: 'NN'},
  {label: 'MMC', value: 'MMC'},
  {label: 'AMC', value: 'AMC'},
  {label: 'Holten', value: 'Holten'},
  {label: 'Markelo', value: 'Markelo'},
];

// Aanhef
export type Aanhef = 'Mw.' | 'Dhr.' | 'X.';
export const AANHEF_OPTIES = [
  {label: 'Mw.', value: 'Mw.'},
  {label: 'Dhr.', value: 'Dhr.'},
  {label: 'X.', value: 'X.'},
];

// Generieke zijdes gebruikt in intake formulieren
export type Zijde = 'beide' | 'links' | 'rechts';
export const ZIJDE_OPTIES = [
  {label: 'beide', value: 'beide'},
  {label: 'links', value: 'links'},
  {label: 'rechts', value: 'rechts'},
];

// Generieke ja/nee gebruikt in formulieren
export type JaNee = 'ja' | 'nee';
export const JA_NEE_OPTIES = [
  {label: 'ja', value: 'ja'},
  {label: 'nee', value: 'nee'},
];

// Openstand schacht opties (waarden in cm)
export type Openstand = '0.5' | '0.8' | '1' | '1.5' | '2';
export const OPENSTAND_OPTIES = [
  {label: '0.5', value: '0.5'},
  {label: '0.8', value: '0.8'},
  {label: '1', value: '1'},
  {label: '1.5', value: '1.5'},
  {label: '2', value: '2'},
];

// Supplement types
export type SupplementType = 'Lateraal' | 'Mediaal';
export const SUPPLEMENT_TYPE_OPTIES = [
  {label: 'Lateraal', value: 'Lateraal'},
  {label: 'Mediaal', value: 'Mediaal'},
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
  {label: 'Sleehak Vlak', value: 'Sleehak Vlak'},
  {label: 'Opbouwhak', value: 'Opbouwhak'},
  {label: 'Leer/Poro', value: 'Leer/Poro'},
  {label: 'Uitholling', value: 'Uitholling'},
  {label: 'Vlak', value: 'Vlak'},
  {label: 'Blokhak', value: 'Blokhak'},
  {label: 'Kernbekleding', value: 'Kernbekleding'},
];

// Loopzool opties
export type Loopzool =
  | 'Lavero Soft 6mm'
  | 'Star-o-last 6mm'
  | 'Astrostar 6mm'
  | 'Autoband profiel 6mm';
export const LOOPZOOL_OPTIES = [
  {label: 'Lavero Soft 6mm', value: 'Lavero Soft 6mm'},
  {label: 'Star-o-last 6mm', value: 'Star-o-last 6mm'},
  {label: 'Astrostar 6mm', value: 'Astrostar 6mm'},
  {label: 'Autoband profiel 6mm', value: 'Autoband profiel 6mm'},
];

// Sluiting opties
export type Sluiting = 'Haken/Ringen' | 'Klittenband';
export const SLUITING_OPTIES = [
  {label: 'Haken/Ringen', value: 'Haken/Ringen'},
  {label: 'Klittenband', value: 'Klittenband'},
];

// Hakschoring types
export type HakschoringType = 'Mediaal' | 'Lateraal';
export const HAKSCHORING_TYPE_OPTIES = [
  {label: 'Mediaal', value: 'Mediaal'},
  {label: 'Lateraal', value: 'Lateraal'},
];

// Ezelsoor types
export type EzelsoorType = 'Mediaal' | 'Lateraal';
export const EZELSOOR_TYPE_OPTIES = [
  {label: 'Mediaal', value: 'Mediaal'},
  {label: 'Lateraal', value: 'Lateraal'},
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
    label: 'Hoge van omsluiting (cm)',
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
  {label: 'New Harlem', value: 'New Harlem'},
  {label: 'Harlem Extra', value: 'Harlem Extra'},
];

// Schoenmaten (37-48)
export const SCHOENMATEN = Array.from({length: 12}, (_, i) =>
  (37 + i).toString()
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
  {label: 'Eerste paar', value: 'Eerste paar'},
  {label: 'Herhalings paar', value: 'Herhalings paar'},
  {label: 'Reserve paar', value: 'Reserve paar'},
  {label: 'Privé paar', value: 'Privé paar'},
];

// Doel opties (GEEN L/R)
export type DoelOptie =
  | 'Pasvorm'
  | 'Stabiliteit'
  | 'Loop afstand vergroten'
  | 'Ondersteuning gewelf';
export const DOEL_OPTIES = [
  {label: 'Pasvorm', value: 'Pasvorm', fullKey: 'doelPasvorm'},
  {label: 'Stabiliteit', value: 'Stabiliteit', fullKey: 'doelStabiliteit'},
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
  {label: 'Passief', value: 'Passief', fullKey: 'loopfunctiePassief'},
  {label: 'Actief', value: 'Actief', fullKey: 'loopfunctieActief'},
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
  {label: 'Passief', value: 'Passief', fullKey: 'loopfunctiePassief'},
  {
    label: 'Korte Transfers',
    value: 'Korte Transfers',
    fullKey: 'loopfunctieKorteTransfers',
  },
  {label: 'Actief', value: 'Actief', fullKey: 'loopfunctieActief'},
];

// Leveranciers
export type LeverancierOptie = 'Neskrid' | 'Tom' | 'Myfoot' | 'Durea';
export const LEVERANCIER_OPTIES = [
  {label: 'Neskrid', value: 'Neskrid'},
  {label: 'Tom', value: 'Tom'},
  {label: 'Myfoot', value: 'Myfoot'},
  {label: 'Durea', value: 'Durea'},
];

// Basiscode SOS
export type BasiscodeOptie = '42' | '40';
export const BASISCODE_OPTIES = [
  {label: '42', value: '42'},
  {label: '40', value: '40'},
];

// Supplement opties met codes (in tabel met L/R)
export const SUPPLEMENT_OPTIES = [
  {key: 'individueel', label: 'Supplement individueel', code: 43},
  {key: 'afwikkelrol_eenvoudig', label: 'Afwikkelrol eenvoudig', code: 46},
  {
    key: 'afwikkelrol_gecompliceerd',
    label: 'Afwikkelrol gecompliceerd',
    code: 47,
  },
  {key: 'zoolverstijving', label: 'Zoolverstijving', code: 57},
] as const;
export type SupplementOptie = (typeof SUPPLEMENT_OPTIES)[number];

// Hallux valgus mm opties
export type HalluxMmOptie = '3mm' | '8mm';
export const HALLUX_MM_OPTIES = [
  {label: '3mm', value: '3mm'},
  {label: '8mm', value: '8mm'},
];

// Verdieping voorvoet mm opties
export type VerdiepingMmOptie = '3mm' | '5mm';
export const VERDIEPING_MM_OPTIES = [
  {label: '3mm', value: '3mm'},
  {label: '5mm', value: '5mm'},
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
  {label: 'Birco', value: 'Birco', fullKey: 'steunzoolTypeBirco'},
  {label: 'Anders', value: 'Anders', fullKey: 'steunzoolTypeAnders'},
];

// Correctie middenvoet
export type CorrectieMiddenvoet = 'Neutraal' | 'Laag' | 'Hoog';
export const CORRECTIE_MIDDENVOET_OPTIES = [
  {label: 'Neutraal', value: 'Neutraal'},
  {label: 'Laag', value: 'Laag'},
  {label: 'Hoog', value: 'Hoog'},
];

// Correctie voorvoet
export type CorrectieVoorvoet = 'Neutraal' | 'Pronatie' | 'Supinatie';
export const CORRECTIE_VOORVOET_OPTIES = [
  {label: 'Neutraal', value: 'Neutraal'},
  {label: 'Pronatie', value: 'Pronatie'},
  {label: 'Supinatie', value: 'Supinatie'},
];

// Pellote opties
export type PelloteOptie = 'Hoog' | 'Laag';
export const PELLOTE_OPTIES = [
  {label: 'Hoog', value: 'Hoog'},
  {label: 'Laag', value: 'Laag'},
];

// OVAC Omschrijving items met post nummers
export type OvacOmschrijvingItem = {
  key: string;
  label: string;
  postNr: string;
};

export const OVAC_OMSCHRIJVING_ITEMS: OvacOmschrijvingItem[] = [
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

// Steunzolen pricing options - numeric values
export type SteunzolenPrijs = 175 | 225 | 195 | 29;
export const STEUNZOLEN_PRIJS_OPTIES = [
  {label: 'prijsTot15Jaar', value: 175},
  {label: 'prijsSteunzolen225', value: 225},
  {label: 'prijsBinnen3Maanden', value: 195},
  {label: 'prijsTalonette', value: 29},
];
