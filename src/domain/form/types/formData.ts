// Type definities voor cliënt en intake formulier data
import type {
  Location,
  Salutation,
  Side,
} from '@/domain/form/constants/formConstants';

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
  location?: Location;

  // Personal information
  salutation?: Salutation;
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
  medicalIndication?: string;
  insurance: string;
  specialist?: string;
}

export interface IntakeVLOSData {
  // Functieonderzoek
  pathologies?: Record<string, boolean>;
  walkingDistanceAids?: Record<string, boolean>;
  painPerception?: string;
  footInspection?: Record<string, boolean>;

  // Description/pair type
  whichPair?: string;
  medicalIndication?: string;

  // Side selection (both/left/right)
  side: Side;

  // Shaft height in cm
  shaftHeightLeft?: string;
  shaftHeightRight?: string;

  // Enclosure/padding - now key-value pairs for Word document generation
  enclosureLeft: Record<string, boolean>; // Keys like omsluitingLinksMultivorm
  enclosureRight: Record<string, boolean>; // Keys like omsluitingRechtsLavero
  enclosureLeftMm: Record<string, string>; // Keys like omsluitingMmLinksMultivorm
  enclosureRightMm: Record<string, string>; // Keys like omsluitingMmRechtsLavero

  // Supplement shoring/support
  customInsoleShoringLeftEnabled: boolean;
  customInsoleShoringRightEnabled: boolean;
  customInsoleShoringLeftType?: string; // Lateral/Medial
  customInsoleShoringRightType?: string;

  // Sole stiffening
  soleReinforcementEnabled: boolean;
  soleReinforcementLeft?: boolean;
  soleReinforcementRight?: boolean;

  // Closure type
  closureType?: string; // hooks/rings or velcro

  // Entry point in cm
  entryPoint?: string;

  // Shaft opening width
  shaftOpeningWidth?: string;

  // Tongue padding
  tonguePaddingEnabled: boolean;

  // Fixed tongue
  fixedTongueEnabled: boolean;

  // Heel type
  heelTypeLeft?: string;
  heelTypeRight?: string;

  // Heel height in cm
  heelHeightLeft?: string;
  heelHeightRight?: string;

  // Heel shoring/wedge
  heelWedgeLeftEnabled: boolean;
  heelWedgeRightEnabled: boolean;
  heelWedgeLeftType?: string; // Medial/Lateral
  heelWedgeRightType?: string;

  // Heel rounding
  heelRoundingLeftEnabled: boolean;
  heelRoundingRightEnabled: boolean;
  heelRoundingLeftHeight?: string; // Height in mm
  heelRoundingLeftLength?: string; // Length in mm
  heelRoundingRightHeight?: string;
  heelRoundingRightLength?: string;

  // Ezelsoor (donkey ear)
  donkeyEarLeftEnabled: boolean;
  donkeyEarRightEnabled: boolean;
  donkeyEarLeftType?: string; // Medial/Lateral
  donkeyEarRightType?: string;

  // Amputatie (code 50)
  amputationLeftEnabled: boolean;
  amputationRightEnabled: boolean;

  // Walking sole type
  rockerSoleType?: string;

  // Generated basis code (1-8)
  generalBaseCode?: string;

  // Special notes
  specialNotes?: string;
}

// OSA intake data with only fields needed for OSA (foliepas handles custom modifications)
export interface IntakeOSAData {
  // Description/pair type
  whichPair?: string;
  medicalIndication?: string;

  // Side selection (both/left/right)
  side: Side;

  //Amputation:
  amputationLeftEnabled: boolean;
  amputationRightEnabled: boolean;

  // Shaft height in cm (only field needed from orthopedics)
  shaftHeightLeft?: string;
  shaftHeightRight?: string;

  // Sole reinforcement
  soleReinforcementEnabled?: boolean;
  soleReinforcementLeft?: boolean;
  soleReinforcementRight?: boolean;

  // Donkey ear (Ezelsoor)
  donkeyEarLeftEnabled?: boolean;
  donkeyEarLeftType?: string;
  donkeyEarRightEnabled?: boolean;
  donkeyEarRightType?: string;

  // Enclosure (Omsluiting)
  enclosureLeft?: Record<string, boolean>;
  enclosureLeftMm?: Record<string, string>;
  enclosureRight?: Record<string, boolean>;
  enclosureRightMm?: Record<string, string>;

  // Functieonderzoek
  pathologies?: Record<string, boolean>;
  walkingDistanceAids?: Record<string, boolean>;
  painPerception?: string;
  footInspection?: Record<string, boolean>;

  // Digitaal section
  digitalEnabled?: boolean;
  heelLiftLeft?: string;
  heelLiftRight?: string;
  lastHeight?: string; // 15, 20, or 25 cm
  mtp1DeepLeft?: string; // 4 or 8 cm
  mtp1DeepRight?: string; // 4 or 8 cm
  clawToesEnabled?: boolean;
  scannedWithFoil?: boolean;
  digitalInstructions?: string;

  // Special notes
  specialNotes?: string;
}

export interface IntakePulmanData {
  // Description/pair type
  whichPair?: string;

  // Side selection
  side: Side;

  // Medical indication
  medicalIndication?: string;

  // Bandaged foot
  bandagedFoot?: boolean;

  // Pulman type (New Harlem, Harlem Extra)
  pulmanType?: string;

  // Shoe size (client's size)
  shoeSize?: string; // 37-48

  // Provided size (actual size given)
  providedSize?: string; // 37-48

  // Special notes
  specialNotes?: string;
}

export interface IntakeRebacareData {
  // Description/pair type
  whichPair?: string;

  // Side selection
  side: Side;

  // Medical indication
  medicalIndication?: string;

  // Bandaged foot
  bandagedFoot?: boolean;

  // Shoe size (client's size)
  shoeSize?: string; // 37-48

  // Provided size (actual size given)
  providedSize?: string; // 37-48

  // Special notes
  specialNotes?: string;
}

export interface IntakeOSBData {
  // Description/pair type
  whichPair?: string;
  medicalIndication?: string;
  side?: 'left' | 'right' | 'both';

  // Functieonderzoek
  goal?: Record<string, boolean>;
  walkingFunctionIndication?: string;
  walkingFunctionOtherText?: string;

  // Supplier and Product
  supplierName?: string;
  orderDate?: string;
  osb?: {
    articleCode?: string;
    lengthSize?: string;
    width?: string;
    color?: string;
    closure?: string;
  };

  // Steunzolen/Talonette Section
  heelRaiseLeft?: string;
  heelRaiseRight?: string;
  insoleTypeGeneral?: string;
  insoleOtherText?: string;
  insoleMidfootCorrection?: string;
  insoleForefootCorrection?: string;
  insoleForefootPad?: string;
  insolePrice?: number; // Price numeric value
  insolePriceName?: string; // Price label name

  // Supplement (van leest)
  customInsoleIndividualLeft?: boolean;
  customInsoleIndividualRight?: boolean;

  // Zoolverstijving
  soleReinforcementLeft?: boolean;
  soleReinforcementRight?: boolean;

  // Afwikkelrol (onder schoen)
  rockerRollCmLeft?: string;
  rockerRollCmRight?: string;

  // Modules: Hallux valgus & Verdieping voorvoet
  halluxMmLeft?: string;
  halluxMmRight?: string;
  deepeningMmLeft?: string;
  deepeningMmRight?: string;

  // Special notes
  specialNotes?: string;
}

export interface IntakeOVACData {
  // Description/pair type
  whichPair?: string;

  // Medical indication
  medicalIndication?: string;

  // Omschrijving items - vlakke structuur (9 items × 2 zijdes = 18 velden)
  customInsoleIndividualLeft?: boolean;
  customInsoleIndividualRight?: boolean;
  simpleRockerLeft?: boolean;
  simpleRockerRight?: boolean;
  complicatedRockerLeft?: boolean;
  complicatedRockerRight?: boolean;
  heelAdjustment2cmLeft?: boolean;
  heelAdjustment2cmRight?: boolean;
  heelSoleElevation3cmLeft?: boolean;
  heelSoleElevation3cmRight?: boolean;
  heelSoleElevation7cmLeft?: boolean;
  heelSoleElevation7cmRight?: boolean;
  adjustedHeelsLeft?: boolean;
  adjustedHeelsRight?: boolean;
  soleReinforcementLeft?: boolean;
  soleReinforcementRight?: boolean;
  newInstepClosureLeft?: boolean;
  newInstepClosureRight?: boolean;

  // Verkorting
  shorteningLeft?: boolean;
  shorteningRight?: boolean;
  // New: separate left/right measurements
  forefootCmLeft?: string;
  forefootCmRight?: string;
  heelCmLeft?: string;
  heelCmRight?: string;

  // Afwikkelrol cm values (used to determine code 74 or 75)
  rockerRollCmLeft?: string;
  rockerRollCmRight?: string;

  // Hakzool verhoging cm values (used to determine code 76, 77, or 78)
  heelSoleElevationCmLeft?: string;
  heelSoleElevationCmRight?: string;

  // Steunzolen (optional)
  insoleTypeGeneral?: string; // Single selected type
  insoleOtherText?: string; // Anders text input
  insoleMidfootCorrection?: string; // Midfoot correction
  insoleForefootCorrection?: string; // Forefoot correction
  insoleForefootPad?: string; // Forefoot pad
  heelRaiseLeft?: string; // Heel raise in cm
  heelRaiseRight?: string;
  insolePrice?: number; // Price numeric value
  insolePriceName?: string; // Price label name

  // Special notes
  specialNotes?: string;
}

export interface IntakeInsolesData {
  // Description/pair type
  whichPair?: string;

  // Medical indication
  medicalIndication?: string;

  // Shoe size (required)
  shoeSize?: string;

  // Talonette logic
  heelRaiseEnabled?: boolean;
  heelRaiseLeft?: string;
  heelRaiseRight?: string;

  // Steunzool fields
  insoleTypeGeneral?: string; // Single selected type
  insoleOtherText?: string; // Anders text input
  insoleMidfootCorrection?: string; // Midfoot correction
  insoleForefootCorrection?: string; // Forefoot correction
  insoleForefootPad?: string; // Forefoot pad
  insolePrice?: number; // Price numeric value
  insolePriceName?: string; // Price label name

  // Calculated final price
  finalPrice?: number;

  // Special notes
  specialNotes?: string;
}

export interface FormSubmissionData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  intakeOSA?: IntakeOSAData;
  intakePulman?: IntakePulmanData;
  intakeRebacare?: IntakeRebacareData;
  intakeOSB?: IntakeOSBData;
  intakeOVAC?: IntakeOVACData;
  intakeInsoles?: IntakeInsolesData;
}

// Check Foliepas data
export interface CheckFoliepasData {
  // Side selection
  side?: Side;

  // Reading corrections
  readingCorrectionAfterFoilFit?: string;
  readingCorrectionAfterLiningShoe?: string;

  // Enclosure/padding - same structure as VLOS
  enclosureLeft?: Record<string, boolean>;
  enclosureRight?: Record<string, boolean>;
  enclosureLeftMm?: Record<string, string>;
  enclosureRightMm?: Record<string, string>;

  // Beenlengte verschil (functieonderzoek)
  legLengthDifferenceLeft?: string;
  legLengthDifferenceRight?: string;

  // Shaft height in cm
  shaftHeightLeft?: string;
  shaftHeightRight?: string;

  // Openstand schacht
  shaftOpeningWidth?: string;

  // Supplement schoring
  customInsoleShoringLeftEnabled?: boolean;
  customInsoleShoringRightEnabled?: boolean;
  customInsoleShoringLeftType?: string;
  customInsoleShoringRightType?: string;

  // Zoolverstijving
  soleReinforcementEnabled?: boolean;
  soleReinforcementLeft?: boolean;
  soleReinforcementRight?: boolean;

  // Sluiting en tong
  closureType?: string;
  entryPoint?: string;
  tonguePaddingEnabled?: boolean;
  fixedTongueEnabled?: boolean;

  // Haksoort en hoogte
  heelTypeLeft?: string;
  heelTypeRight?: string;
  heelHeightLeft?: string;
  heelHeightRight?: string;

  // Hak aanpassingen (schoring) en ezelsoor
  heelWedgeLeftEnabled?: boolean;
  heelWedgeRightEnabled?: boolean;
  heelWedgeLeftType?: string;
  heelWedgeRightType?: string;
  donkeyEarLeftEnabled?: boolean;
  donkeyEarRightEnabled?: boolean;
  donkeyEarLeftType?: string;
  donkeyEarRightType?: string;

  // Hakafrondingen
  heelRoundingLeftEnabled?: boolean;
  heelRoundingRightEnabled?: boolean;
  heelRoundingLeftHeight?: string;
  heelRoundingLeftLength?: string;
  heelRoundingRightHeight?: string;
  heelRoundingRightLength?: string;

  // Loopzool
  rockerSoleType?: string;

  // New fields for Kleur en Model section
  showColorAndModel?: boolean;
  modelType?: string;
  modelText?: string;
  colorOptions?: string[];

  // Tong polsteren en polsterkraag
  tonguePaddingMm?: string;
  paddingCollarMm?: string;

  // Closure details
  ringsNumber?: string;
  ringsAmount?: string;
  hooksNumber?: string;
  hooksAmount?: string;

  // Rits
  zipperType?: string;
  zipperColor?: string;
  zipperPlacement?: string;
  zipperMedial?: boolean;
  zipperLateral?: boolean;

  // Bijzonderheden
  specialMedialVelcro?: boolean;
  specialLaceLoop?: boolean;
  specialExtraLeather?: boolean;
  specialOther?: string;

  // Randtype - Cascading selection
  edgeTypeMain?: string; // E.V.A., Lederrand, Rubberrand
  edgeTypeModel?: string; // Rand 3, 380, 28, etc.
  edgeTypeColor?: string; // Color name
  edgeTypeColorCode?: string; // Color code for backend

  // Zooltype - Cascading selection
  soleTypeCategory?: string; // Vibram, Onderwerken vrij
  soleTypeModel?: string; // 1100 profielzool, 2644 gumlitezool, etc.
  soleTypeColor?: string; // Color name
  soleTypeOther?: string; // For "Anders" option

  // Koolstofverstijving
  carbonStiffeningType?: string;
  carbonStiffeningLeft?: boolean;
  carbonStiffeningRight?: boolean;

  // Neusopties
  toeOptionsType?: string;

  // Contrefort
  counterfortType?: string;
  counterfortOther?: string;

  // Binnenzool
  insoleType?: string;
  insoleOther?: string;

  // Zoolkantuitpoetsen
  soleEdgePolishType?: string;
  soleEdgePolishOther?: string;

  // Maakwijze
  constructionMethodType?: string;
  constructionMethodOther?: string;

  // Hakmodel
  heelModelType?: string;
  heelBuildUpMaterial?: string;
  heelWedgeType?: string;
  heelBlockCoreCoating?: boolean;

  // Schoring
  shoringLeftType?: string;
  shoringLeftMm?: string;
  shoringRightType?: string;
  shoringRightMm?: string;
}
