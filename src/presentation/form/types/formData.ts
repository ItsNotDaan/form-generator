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
  intakeType?: 'VLOS' | 'OSA' | 'Pulman' | 'Rebacare' | 'OSB' | 'OVAC' | 'Steunzolen';

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
  insurance: string;
  specialist?: string;
}

export interface IntakeVLOSData {
  // Description/pair type
  omschrijving?: string;

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
  supplementschoringLinksType?: string; // Lateral/Medial/Both
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

  // Walking sole type
  loopzoolType?: string;

  // Special notes
  bijzonderheden?: string;
}

// OSA intake data mirrors VLOS structure
export type IntakeOSAData = IntakeVLOSData;

export interface IntakePulmanData {
  // Description/pair type
  omschrijving?: string;

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
  omschrijving?: string;

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
  ordernummer?: string; // Order number
  omschrijving?: string; // Description/pair type (single select)

  // Medical indication
  medischeIndicatie?: string;

  // Goals/objectives (no left/right) - now key-value pairs for Word document generation
  doel?: Record<string, boolean>; // Keys like doelPasvorm, doelStabiliteit

  // Walking functions - now key-value pairs for Word document generation
  loopfunctie?: Record<string, boolean>; // Keys like loopfunctiePassief, loopfunctieActief

  // Supplier and order date
  leverancier?: string; // Supplier (single select)
  bestelDatum?: string;

  // Product specifications
  productSpecificaties?: {
    artCode?: string; // Article code
    lengteMaat?: string; // Length measurement
    wijdte?: string; // Width
    kleur?: string; // Color
    sluiting?: string; // Closure type
  };

  // Modules - Hallux valgus correction
  halluxValgusEnabled?: boolean;
  halluxValgusLinks?: boolean;
  halluxValgusRechts?: boolean;
  halluxValgusLinksMm?: string; // 3mm or 8mm
  halluxValgusRechtsMm?: string;

  // Modules - Forefoot deepenings
  verdiepingenVoorvoetLinks?: boolean;
  verdiepingenVoorvoetRechts?: boolean;
  verdiepingenVoorvoetLinksMm?: string; // 3mm or 5mm
  verdiepingenVoorvoetRechtsMm?: string;
  verdiepingenVoorvoetExtraLinks?: boolean; // Extra deepening
  verdiepingenVoorvoetExtraRechts?: boolean;

  // Basic SOS codes with left/right
  basiscodeSOS?: string; // Selected basic code (single select)

  // Supplements - vlakke structuur (4 supplements × 2 zijdes = 8 velden)
  supplementIndividueelLinks?: boolean;
  supplementIndividueelRechts?: boolean;
  afwikkelrolEenvoudigLinks?: boolean;
  afwikkelrolEenvoudigRechts?: boolean;
  afwikkelrolGecompliceerdLinks?: boolean;
  afwikkelrolGecompliceerdRechts?: boolean;
  zoolverstijvingLinks?: boolean;
  zoolverstijvingRechts?: boolean;

  // Insole component - gedeelde velden - now key-value pairs for Word document generation
  steunzoolType?: Record<string, boolean>; // Keys like steunzoolTypeBerksteunzoolMet
  steunzoolTypeAnders?: string; // Other type (text input)
  steunzoolCorrectieMiddenvoet?: string; // Midfoot correction
  steunzoolCorrectieVoorvoet?: string; // Forefoot correction
  steunzoolVvPellote?: string; // Forefoot pad

  // Insole component - alleen hak verhoging is gesplitst
  steunzoolHakVerhogingLinks?: string; // Heel raise in cm
  steunzoolHakVerhogingRechts?: string;

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeOVACData {
  // Description/pair type
  omschrijving?: string;

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

  // Special notes
  bijzonderheden?: string;
}

export interface IntakeSteunzolenData {
  // Description/pair type
  omschrijving?: string;

  // Process selection
  processes?: string;

  // Shoe last measurements (orthopedic technical term)
  schoenteest?: {
    berekteKloonzool?: boolean; // Calculated clone sole
    berekteKustvlakte?: boolean; // Calculated coastal plane
    berekteVlakten?: boolean; // Calculated planes
    enkelvolZolen?: boolean; // Ankle-full soles
  };

  // Insole options
  steunzolen?: {
    ts15cm?: boolean; // TS 15cm type
    tussenlegd?: boolean; // Intermediate layer
    steunzolen?: boolean; // Support soles
    bislangTussen?: boolean; // Bislang intermediate
    bislang?: boolean; // Bislang type
  };

  // Orthopedic corrections
  corrections?: {
    vervolgC1Lang1UVlug?: boolean; // Follow-up C1 long 1U wing
    vervolgC1Kort?: boolean; // Follow-up C1 short
    uithollingC1Krag3Grote?: boolean; // Hollow C1 collar 3 large
    uithollingC1Krag3Kleine?: boolean; // Hollow C1 collar 3 small
    haktVerlengdC1Krag3?: boolean; // Heel extended C1 collar 3
  };

  // Padding materials
  pads?: {
    csm?: boolean; // CSM material
    e625?: boolean; // E625 material
    e425?: boolean; // E425 material
    cushlin?: boolean; // Cushlin material
  };

  // Correction notes
  corr?: string;

  // Assembly notes
  montage?: string;

  // Control/inspection notes
  controle?: string;

  // Load/pressure notes
  belasting?: string;

  // Preference notes
  pref?: string;

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
