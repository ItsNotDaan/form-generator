// Type definities voor cliënt en intake formulier data
import type {
  Locatie,
  Aanhef,
  Zijde,
} from '@/presentation/form/constants/formConstants';
export interface ClientData {
  // Practitioner and date
  practitionerId?: string;
  date: string;

  // Intake form type
  intakeType?:
    | 'VLOS'
    | 'OSA'
    | 'Pulman'
    | 'Rebacare'
    | 'OSB'
    | 'OVAC'
    | 'Steunzolen';

  // Location
  location?: Locatie;

  // Personal information
  salutation?: Aanhef;
  initials: string;
  clientName: string;
  birthDate: string;

  // Address information
  postalCode: string;
  houseNumber: string;
  city: string;
  address: string;

  // Contact information
  phoneOne: string;
  phoneTwo?: string;
  email: string;

  // Medical information
  medischeIndicatie?: string;
  insurance: string;
  specialist?: string;
}

export interface IntakeVLOSData {
  // Description/pair type
  welkPaar?: string;

  // Side selection (both/left/right)
  side: Zijde;

  // Shaft height in cm
  schachthoogteLinks?: string;
  schachthoogteRechts?: string;

  // Enclosure/padding - now key-value pairs for Word document generation
  omsluitingLinks: Record<string, boolean>; // Keys like omsluitingLinksMultivorm
  omsluitingRechts: Record<string, boolean>; // Keys like omsluitingRechtsLavero
  omsluitingLinksMm: Record<string, string>; // Keys like omsluitingMmLinksMultivorm
  omsluitingRechtsMm: Record<string, string>; // Keys like omsluitingMmRechtsLavero

  // Supplement shoring/support
  supplementschoringLinksEnabled: boolean;
  supplementschoringRechtsEnabled: boolean;
  supplementschoringLinksType?: string; // Lateral/Medial
  supplementschoringRechtsType?: string;

  // Sole stiffening
  zoolverstijvingEnabled: boolean;
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;

  // Closure type
  sluitingType?: string; // hooks/rings or velcro

  // Entry point in cm
  inschotpunt?: string;

  // Shaft opening width
  openstandSchacht?: string;

  // Tongue padding
  tongpolsterEnabled: boolean;

  // Fixed tongue
  tongVaststikkenEnabled: boolean;

  // Heel type
  haksoortLinks?: string;
  haksoortRechts?: string;

  // Heel height in cm
  hakhoogteLinks?: string;
  hakhoogteRechts?: string;

  // Heel shoring/wedge
  hakschoringLinksEnabled: boolean;
  hakschoringRechtsEnabled: boolean;
  hakschoringLinksType?: string; // Medial/Lateral
  hakschoringRechtsType?: string;

  // Heel rounding
  hakafrondingLinksEnabled: boolean;
  hakafrondingRechtsEnabled: boolean;
  hakafrondingLinksHoogte?: string; // Height in mm
  hakafrondingLinksLengte?: string; // Length in mm
  hakafrondingRechtsHoogte?: string;
  hakafrondingRechtsLengte?: string;

  // Ezelsoor (donkey ear)
  ezelsoorLinksEnabled: boolean;
  ezelsoorRechtsEnabled: boolean;
  ezelsoorLinksType?: string; // Medial/Lateral
  ezelsoorRechtsType?: string;

  // Amputatie (code 50)
  amputatieLinksEnabled: boolean;
  amputatieRechtsEnabled: boolean;

  // Walking sole type
  loopzoolType?: string;

  // Generated basis code (1-8)
  generalBasiscode?: string;

  // Special notes
  bijzonderheden?: string;
}

// OSA intake data mirrors VLOS structure
export type IntakeOSAData = IntakeVLOSData;

export interface IntakePulmanData {
  // Description/pair type
  welkPaar?: string;

  // Side selection
  side: Zijde;

  // Medical indication
  medischeIndicatie?: string;

  // Bandaged foot
  gezwachteld?: boolean;

  // Pulman type (New Harlem, Harlem Extra)
  typePulman?: string;

  // Shoe size (client's size)
  schoenmaat?: string; // 37-48

  // Provided size (actual size given)
  afgegevenMaat?: string; // 37-48

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeRebacareData {
  // Description/pair type
  welkPaar?: string;

  // Side selection
  side: Zijde;

  // Medical indication
  medischeIndicatie?: string;

  // Bandaged foot
  gezwachteld?: boolean;

  // Shoe size (client's size)
  schoenmaat?: string; // 37-48

  // Provided size (actual size given)
  afgegevenMaat?: string; // 37-48

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeOSBData {
  // Order information
  ordernummer?: string;
  welkPaar?: string;

  // Medical indication
  medischeIndicatie?: string;

  // Goals/objectives (no left/right)
  doel?: Record<string, boolean>;

  // Walking functions
  loopfunctieIndicatie?: string;
  loopfunctieAndersText?: string;

  // Supplier and order date
  leverancierNaam?: string;
  bestelDatum?: string;

  // Product specifications
  productSpecificaties?: {
    artCode?: string;
    lengteMaat?: string;
    wijdte?: string;
    kleur?: string;
    sluiting?: string;
  };

  // Nieuw: Basiscode blok
  basiscode?: string;
  generalBasiscode?: string;

  // Nieuw: Aanpassingen blok
  aanpassingen?: {
    zoolverstijvingLinks?: boolean;
    zoolverstijvingRechts?: boolean;
    halluxValgusLinks?: boolean;
    halluxValgusRechts?: boolean;
    verdiepingVoorvoetLinks?: boolean;
    verdiepingVoorvoetRechts?: boolean;
    supplementIndividueelLinks?: boolean;
    supplementIndividueelRechts?: boolean;
    afwikkelrolEenvoudigLinks?: boolean;
    afwikkelrolEenvoudigRechts?: boolean;
    afwikkelrolGecompliceerdLinks?: boolean;
    afwikkelrolGecompliceerdRechts?: boolean;
  };

  // Insole component - single select steunzooltype
  steunzoolTypeGeneral?: string;
  steunzoolAndersText?: string;
  steunzoolCorrectieMiddenvoet?: string;
  steunzoolCorrectieVoorvoet?: string;
  steunzoolVvPellote?: string;

  // Insole component - hak verhoging is gesplitst
  steunzoolHakVerhogingLinks?: string;
  steunzoolHakVerhogingRechts?: string;

  // Insole price
  steunzoolPrijs?: number;
  steunzoolPrijsNaam?: string;

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeOVACData {
  // Description/pair type
  welkPaar?: string;

  // Medical indication
  medischeIndicatie?: string;

  // Omschrijving items - vlakke structuur (9 items × 2 zijdes = 18 velden)
  supplementIndividueelLinks?: boolean;
  supplementIndividueelRechts?: boolean;
  eenvoudigeAfwikkelrolLinks?: boolean;
  eenvoudigeAfwikkelrolRechts?: boolean;
  gecompliceerdeAfwikkelrolLinks?: boolean;
  gecompliceerdeAfwikkelrolRechts?: boolean;
  hakAanpassing2cmLinks?: boolean;
  hakAanpassing2cmRechts?: boolean;
  hakZoolVerhoging3cmLinks?: boolean;
  hakZoolVerhoging3cmRechts?: boolean;
  hakZoolVerhoging7cmLinks?: boolean;
  hakZoolVerhoging7cmRechts?: boolean;
  aangepastehakkenLinks?: boolean;
  aangepastehakkenRechts?: boolean;
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;
  nieuweWreefsluitingLinks?: boolean;
  nieuweWreefsluitingRechts?: boolean;

  // Verkorting
  verkortingLinks?: boolean;
  verkortingRechts?: boolean;
  voorvoetCm?: string;
  hielCm?: string;

  // Steunzolen (optional)
  steunzoolTypeGeneral?: string; // Single selected type
  steunzoolAndersText?: string; // Anders text input
  steunzoolCorrectieMiddenvoet?: string; // Midfoot correction
  steunzoolCorrectieVoorvoet?: string; // Forefoot correction
  steunzoolVvPellote?: string; // Forefoot pad
  steunzoolHakVerhogingLinks?: string; // Heel raise in cm
  steunzoolHakVerhogingRechts?: string;
  steunzoolPrijs?: number; // Price numeric value
  steunzoolPrijsNaam?: string; // Price label name

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeSteunzolenData {
  // Description/pair type
  welkPaar?: string;

  // Medical indication
  medischeIndicatie?: string;

  // Shoe size (required)
  schoenmaat?: string;

  // Insole type - single select
  steunzoolTypeGeneral?: string; // Single selected type

  // Anders option
  steunzoolAndersText?: string;

  // Corrections
  steunzoolCorrectieMiddenvoet?: string; // Midfoot correction
  steunzoolCorrectieVoorvoet?: string; // Forefoot correction
  steunzoolVvPellote?: string; // Forefoot pad

  // Heel raises (split by side)
  steunzoolHakVerhogingLinks?: string; // Heel raise in cm
  steunzoolHakVerhogingRechts?: string;

  // Price (required) - numeric value and label
  prijs?: number; // Price numeric value
  prijsNaam?: string; // Price label name

  // Special notes
  bijzonderheden?: string;
}

export interface FormSubmissionData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  intakeOSA?: IntakeOSAData;
  intakePulman?: IntakePulmanData;
  intakeRebacare?: IntakeRebacareData;
  intakeOSB?: IntakeOSBData;
  intakeOVAC?: IntakeOVACData;
  intakeSteunzolen?: IntakeSteunzolenData;
}
