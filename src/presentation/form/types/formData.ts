// Type definitions for client and intake form data
import type {
  Location,
  Salutation,
  Side,
} from '@/presentation/form/constants/formConstants';
export interface ClientData {
  // Behandelaar en datum
  practitionerId?: string;
  date: string;

  // OSA/VLOS selectie
  osaVlos?: 'OSA' | 'VLOS';

  // Locatie
  location?: Location;

  // Persoonlijke gegevens
  salutation?: Salutation;
  initials: string;
  clientName: string;
  birthDate: string;

  // Adresgegevens
  postalCode: string;
  houseNumber: string;
  city: string;
  address: string;

  // Contactgegevens
  phoneOne: string;
  phoneTwo?: string;
  email: string;

  // Medische gegevens
  insurance: string;
  bsn?: string;
  specialist?: string;
  familyDoctor?: string;
}

export interface IntakeVLOSData {
  // Zijde selectie
  side: Side;

  // Schachthoogte (cm)
  schachthoogteLinks?: string;
  schachthoogteRechts?: string;

  // Omsluiting
  omsluitingLinks: string[]; // OmsluitingKey[]
  omsluitingRechts: string[];
  omsluitingLinksMm: Record<string, string>;
  omsluitingRechtsMm: Record<string, string>;

  // Supplementschoring
  supplementschoringLinksEnabled: 'ja' | 'nee';
  supplementschoringRechtsEnabled: 'ja' | 'nee';
  supplementschoringLinksType?: string; // Lateraal/Mediaal/Lateraal of Mediaal
  supplementschoringRechtsType?: string; // Lateraal/Mediaal/Lateraal of Mediaal

  // Zoolverstijving
  zoolverstijvingEnabled: 'ja' | 'nee';
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;

  // Sluiting
  sluitingType?: string; // haken/ringen of klittenband

  // Inschotpunt
  inschotpunt?: string;

  // Openstand Schacht
  openstandSchacht?: string;

  // Tongpolster
  tongpolsterEnabled: 'ja' | 'nee';

  // Tong vaststikken
  tongVaststikkenEnabled: 'ja' | 'nee';

  // Haksoort
  haksoortLinks?: string;
  haksoortRechts?: string;

  // Hakhoogte
  hakhoogteLinks?: string;
  hakhoogteRechts?: string;

  // Hakschoring
  hakschoringLinksEnabled: 'ja' | 'nee';
  hakschoringRechtsEnabled: 'ja' | 'nee';
  hakschoringLinksType?: string; // Mediaal/Lateraal
  hakschoringRechtsType?: string; // Mediaal/Lateraal

  // Hakafronding
  hakafrondingLinksEnabled: 'ja' | 'nee';
  hakafrondingRechtsEnabled: 'ja' | 'nee';
  hakafrondingLinksHoogte?: string;
  hakafrondingLinksLengte?: string;
  hakafrondingRechtsHoogte?: string;
  hakafrondingRechtsLengte?: string;

  // Loopzool
  loopzoolType?: string;

  // Bijzonderheden
  bijzonderheden?: string;
}

export interface IntakePulmanData {
  side: Side;

  // Medische Indicatie
  medischeIndicatie?: string;

  // Gezwachteld
  gezwachteld?: 'ja' | 'nee';

  // Type Pulman
  typePulman?: string; // New Harlem, Harlem Extra

  // Schoenmaat
  schoenmaat?: string; // 37-48

  // Afgegeven maat
  afgegevenMaat?: string; // 37-48

  // Bijzonderheden
  bijzonderheden?: string;
}

export interface IntakeRebacareData {
  side: Side;

  // Medische Indicatie
  medischeIndicatie?: string;

  // Gezwachteld
  gezwachteld?: 'ja' | 'nee';

  // Schoenmaat
  schoenmaat?: string; // 37-48

  // Afgegeven maat
  afgegevenMaat?: string; // 37-48

  // Bijzonderheden
  bijzonderheden?: string;
}

export interface IntakeOSBData {
  // Header & Omschrijving
  ordernummer?: string;
  omschrijving?: string[]; // Array of selected paartype options

  // Medische Indicatie
  medischeIndicatie?: string;

  // Doel (checkboxes zonder L/R)
  doel?: string[]; // Array of selected doel options

  // Loopfunctie
  loopfunctie?: string[]; // Array of selected loopfunctie options

  // Leverancier & Bestel Datum
  leverancier?: string[]; // Array of selected leverancier options
  bestelDatum?: string;

  // Product Specificaties
  productSpecificaties?: {
    artCode?: string;
    lengteMaat?: string;
    wijdte?: string;
    kleur?: string;
    sluiting?: string;
  };

  // Modules - Hallux valgus
  halluxValgusEnabled?: boolean;
  halluxValgusLinks?: boolean;
  halluxValgusRechts?: boolean;
  halluxValgusLinksMm?: string; // '3mm' or '8mm'
  halluxValgusRechtsMm?: string; // '3mm' or '8mm'

  // Modules - Verdiepingen voorvoet
  verdiepingenVoorvoetLinks?: boolean;
  verdiepingenVoorvoetRechts?: boolean;
  verdiepingenVoorvoetLinksMm?: string; // '3mm' or '5mm'
  verdiepingenVoorvoetRechtsMm?: string; // '3mm' or '5mm'
  verdiepingenVoorvoetExtraLinks?: boolean;
  verdiepingenVoorvoetExtraRechts?: boolean;

  // Basiscode SOS & Omschrijving (tabel met L/R)
  basiscodeSOS?: string[]; // Array of selected basiscodes
  supplements?: Record<string, {links: boolean; rechts: boolean; code: number}>;

  // Steunzolen component (reusable)
  steunzoolLinks?: {
    type?: string[]; // Array of selected steunzool types
    typeAnders?: string; // Text input for 'Anders'
    correctieMiddenvoet?: string;
    correctieVoorvoet?: string;
    vvPellote?: string;
    hakVerhogingCm?: string;
  };

  steunzoolRechts?: {
    type?: string[]; // Array of selected steunzool types
    typeAnders?: string; // Text input for 'Anders'
    correctieMiddenvoet?: string;
    correctieVoorvoet?: string;
    vvPellote?: string;
    hakVerhogingCm?: string;
  };

  bijzonderheden?: string;
}

export interface IntakeOVACData {
  // Similar structure to OSB
  proefschoen?: 'ja' | 'nee';

  // Datum
  datum?: string;

  // Diktes
  diktes?: string;

  // Maatverdeling
  maatverdeling?: string;

  // Schoen sizes (24-32)
  schoenSizes?: Record<string, boolean>;

  // Procedures
  procedures?: {
    vrijstaandSchoentje?: boolean;
    voetAfdrukkleusKast?: boolean;
    bevolktenSchottel?: boolean;
    proefschoeneenGecombineerd?: boolean;
    bevolktenSchoen?: boolean;
    enkelvolschoen?: boolean;
    enkelvolkastel?: boolean;
  };

  bijzonderheden?: string;
}

export interface IntakeSteunzolenData {
  // Processes checkboxes
  processes?: string;

  // Schoenteest
  schoenteest?: {
    berekteKloonzool?: boolean;
    berekteKustvlakte?: boolean;
    berekteVlakten?: boolean;
    enkelvolZolen?: boolean;
  };

  // Steunzolen options
  steunzolen?: {
    ts15cm?: boolean;
    tussenlegd?: boolean;
    steunzolen?: boolean;
    bislangTussen?: boolean;
    bislang?: boolean;
  };

  // Corrections
  corrections?: {
    vervolgC1Lang1UVlug?: boolean;
    vervolgC1Kort?: boolean;
    uithollingC1Krag3Grote?: boolean;
    uithollingC1Krag3Kleine?: boolean;
    haktVerlengdC1Krag3?: boolean;
  };

  // Pads
  pads?: {
    csm?: boolean;
    e625?: boolean;
    e425?: boolean;
    cushlin?: boolean;
  };

  // Corr
  corr?: string;

  // Montage
  montage?: string;

  // Controle
  controle?: string;

  // Belasting
  belasting?: string;

  // Pref
  pref?: string;

  bijzonderheden?: string;
}

export interface FormSubmissionData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  intakePulman?: IntakePulmanData;
  intakeRebacare?: IntakeRebacareData;
  intakeOSB?: IntakeOSBData;
  intakeOVAC?: IntakeOVACData;
  intakeSteunzolen?: IntakeSteunzolenData;
}
