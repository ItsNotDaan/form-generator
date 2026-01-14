/**
 * ==================================================
 * MEDICAL CODE GENERATION SYSTEM
 * ==================================================
 * Generates boolean keys for medical codes for Word document mail merge.
 *
 * This system handles code generation for multiple intake form types:
 * - VLOS (Vormgegeven Laarzen Orthopedische Schoeiing)
 * - OSA (Orthopedische Schoeiing met Aftrap)
 * - OSB (Orthopedische Schoeiing met Bijzondere Zolen)
 * - OVAC (Overige Voorzieningen Aangepaste Voetkleding)
 *
 * CODE DEFINITIONS BY FORM TYPE:
 * ==================================================
 *
 * --- VLOS & OSA MAIN CODES (1-8) ---
 * - 01: VLOS eerste paar
 * - 02: VLOS herhaling/reservepaar
 * - 03: Laag OSA (<12cm schachthoogte) eerste paar
 * - 04: Laag OSA (<12cm schachthoogte) herhaling/reservepaar
 * - 05: Half-hoog OSA (12-18cm schachthoogte) eerste paar
 * - 06: Half-hoog OSA (12-18cm schachthoogte) herhaling/reservepaar
 * - 07: Hoog OSA (>18cm schachthoogte) eerste paar
 * - 08: Hoog OSA (>18cm schachthoogte) herhaling/reservepaar
 *
 * --- SUB CODES (Per Side: Links/Rechts) ---
 * - 09: Proefschoen (only for high OSA code 07 + code 17)
 * - 10-11: Placeholders (not implemented)
 * - 14: Aanvulling lengte/breedte (placeholder)
 * - 15: Zoolverstijving
 * - 16: Ezelsoor (mediaal/lateraal)
 * - 17: Koker tussen voering (any omsluiting option)
 * - 50: Diverse Amputaties
 *
 * --- OSB MAIN CODE & SUB CODES (42, 43, 46, 47, 57) ---
 * - 42: OSB Cluster (Basis code)
 * - 43: Supplement Individueel
 * - 46: Afwikkelrol Eenvoudig (<1cm)
 * - 47: Afwikkelrol Gecompliceerd (>=1cm)
 * - 57: Zoolverstijving
 *
 * --- OVAC MAIN CODE & SUB CODES (70, 71-78, 84-85, 88) ---
 * - 70: OVAC Cluster (Main code, varies by insurer)
 * - 71: Supplement individueel
 * - 74: Eenvoudige afwikkelrol (<1cm)
 * - 75: Gecompliceerde afwikkelrol (>=1cm)
 * - 76: Hak aanpassing t/m 2cm
 * - 77: Hak zool verhoging t/m 3cm
 * - 78: Hak zool verhoging t/m 7cm
 * - 84: Aangepaste hakken
 * - 85: Zoolverstijving
 * - 88: Nieuwe wreefsluiting
 *
 * ==================================================
 */

import {
  ClientData,
  IntakeVLOSData,
  IntakeOSAData,
  IntakeOSBData,
  IntakeOVACData,
} from '@/domain/form/types/formData';

import {OVAC_DESCRIPTION_ITEMS} from '@/domain/form/constants/formConstants';

export interface GeneratedCodes {
  code01: boolean;
  code02: boolean;
  code03: boolean;
  code04: boolean;
  code05: boolean;
  code06: boolean;
  code07: boolean;
  code08: boolean;

  code09Links: boolean;
  code09Rechts: boolean;
  code10Links: boolean;
  code10Rechts: boolean;
  code11Links: boolean;
  code11Rechts: boolean;
  code14Links: boolean;
  code14Rechts: boolean;
  code15Links: boolean;
  code15Rechts: boolean;
  code16Links: boolean;
  code16Rechts: boolean;
  code17Links: boolean;
  code17Rechts: boolean;
  code43Links: boolean;
  code43Rechts: boolean;
  code46Links: boolean;
  code46Rechts: boolean;
  code47Links: boolean;
  code47Rechts: boolean;
  code57Links: boolean;
  code57Rechts: boolean;
  code58Links: boolean;
  code58Rechts: boolean;
  code59Links: boolean;
  code59Rechts: boolean;
  code71Links: boolean;
  code71Rechts: boolean;
  code74Links: boolean;
  code74Rechts: boolean;
  code75Links: boolean;
  code75Rechts: boolean;
  code76Links: boolean;
  code76Rechts: boolean;
  code77Links: boolean;
  code77Rechts: boolean;
  code78Links: boolean;
  code78Rechts: boolean;
  code84Links: boolean;
  code84Rechts: boolean;
  code85Links: boolean;
  code85Rechts: boolean;
  code88Links: boolean;
  code88Rechts: boolean;
  code42: boolean;
  code70: boolean;
  code70Links: boolean;
  code70Rechts: boolean;
  codeVerkortingLinks: boolean;
  codeVerkortingRechts: boolean;
  code50Links: boolean;
  code50Rechts: boolean;
}

export interface CodeGenerationResult {
  codes: GeneratedCodes;
  warnings: string[];
  generalBaseCode: string | null;
}

interface IntakeFormData {
  intakeVLOS: IntakeVLOSData | null;
  intakeOSA: IntakeOSAData | null;
  intakePulman: any | null;
  intakeRebacare: any | null;
  intakeOSB: any | null;
  intakeOVAC: IntakeOVACData | null;
  intakeInsoles: any | null;
}

/**
 * Initialize all codes to false
 */
// ==================================================
// UTILITY FUNCTIONS
// ==================================================

/**
 * Initialize all codes to false
 */
function initializeCodes(): GeneratedCodes {
  return {
    code01: false,
    code02: false,
    code03: false,
    code04: false,
    code05: false,
    code06: false,
    code07: false,
    code08: false,
    code09Links: false,
    code09Rechts: false,
    code10Links: false,
    code10Rechts: false,
    code11Links: false,
    code11Rechts: false,
    code14Links: false,
    code14Rechts: false,
    code15Links: false,
    code15Rechts: false,
    code16Links: false,
    code16Rechts: false,
    code17Links: false,
    code17Rechts: false,
    code43Links: false,
    code43Rechts: false,
    code46Links: false,
    code46Rechts: false,
    code47Links: false,
    code47Rechts: false,
    code57Links: false,
    code57Rechts: false,
    code58Links: false,
    code58Rechts: false,
    code59Links: false,
    code59Rechts: false,
    code71Links: false,
    code71Rechts: false,
    code74Links: false,
    code74Rechts: false,
    code75Links: false,
    code75Rechts: false,
    code76Links: false,
    code76Rechts: false,
    code77Links: false,
    code77Rechts: false,
    code78Links: false,
    code78Rechts: false,
    code84Links: false,
    code84Rechts: false,
    code85Links: false,
    code85Rechts: false,
    code88Links: false,
    code88Rechts: false,
    code42: false,
    code70: false,
    code70Links: false,
    code70Rechts: false,
    codeVerkortingLinks: false,
    codeVerkortingRechts: false,
    code50Links: false,
    code50Rechts: false,
  };
}

/**
 * Check if any omsluiting option is checked for a side
 * If omsluitingRecord is undefined or null, return false
 * Else return true if any value in the record is true
 */
function hasOmsluiting(
  omsluitingRecord: Record<string, boolean> | undefined,
): boolean {
  return (
    !!omsluitingRecord &&
    Object.values(omsluitingRecord).some(value => value === true)
  );
}

// ==================================================
// MAIN CODE GENERATION ENTRY POINT
// ==================================================

/**
 * Main code generation function
 *
 * Routes to form-specific code generators based on intake type
 * and computes the general basis code for mail merge integration.
 */
export function generateCodes(
  clientData: ClientData | null,
  intakeData: IntakeFormData,
): CodeGenerationResult {
  const codes = initializeCodes();
  const warnings: string[] = [];
  let generalBaseCode: string | null = null;

  if (!clientData) {
    warnings.push('Geen client data gevonden');
    return {codes, warnings, generalBaseCode};
  }

  const {intakeType, insurance} = clientData;

  if (!intakeType) {
    warnings.push('Intake type is niet geselecteerd');
    return {codes, warnings, generalBaseCode};
  }

  // Generate codes based on intake type
  switch (intakeType) {
    case 'VLOS':
      if (intakeData.intakeVLOS) {
        generateVLOSCodes(
          intakeData.intakeVLOS,
          codes,
          warnings,
          insurance || '',
        );
      } else {
        warnings.push('VLOS intake data is niet beschikbaar');
      }
      break;

    case 'OSA':
      if (intakeData.intakeOSA) {
        generateOSACodes(
          intakeData.intakeOSA,
          codes,
          warnings,
          insurance || '',
        );
      } else {
        warnings.push('OSA intake data is niet beschikbaar');
      }
      break;

    case 'OSB':
      if (intakeData.intakeOSB) {
        generateOSBCodes(
          intakeData.intakeOSB,
          codes,
          warnings,
          insurance || '',
        );
      } else {
        warnings.push('OSB intake data is niet beschikbaar');
      }
      break;
    case 'OVAC':
      if (intakeData.intakeOVAC) {
        generateOVACCodes(
          intakeData.intakeOVAC,
          codes,
          warnings,
          insurance || '',
        );
      } else {
        warnings.push('OVAC intake data is niet beschikbaar');
      }
      break;

    // Pulman, Rebacare, and Steunzolen don't have code generation
    case 'Pulman':
    case 'Rebacare':
    case 'Steunzolen':
      return {codes, warnings, generalBaseCode};

    default:
      warnings.push(`Onbekend intake type: ${intakeType}`);
  }

  // Determine generalBaseCode (codes 1-8 for VLOS/OSA)
  if (codes.code01) {
    generalBaseCode = '1';
  } else if (codes.code02) {
    generalBaseCode = '2';
  } else if (codes.code03) {
    generalBaseCode = '3';
  } else if (codes.code04) {
    generalBaseCode = '4';
  } else if (codes.code05) {
    generalBaseCode = '5';
  } else if (codes.code06) {
    generalBaseCode = '6';
  } else if (codes.code07) {
    generalBaseCode = '7';
  } else if (codes.code08) {
    generalBaseCode = '8';
  }

  // Determine generalBaseCode for OSB (always 42, add DSW text)
  if (intakeType === 'OSB') {
    if (codes.code42) {
      const insuranceLower = (insurance || '').toLowerCase();
      if (insuranceLower === 'dsw') {
        generalBaseCode = '42 - Administratie zelf opbouwen!';
      } else {
        generalBaseCode = '42';
      }
    }
  }

  // Determine generalBaseCode for OVAC (70 and variants by insurer)
  if (intakeType === 'OVAC') {
    const insuranceLower = (insurance || '').toLowerCase();
    const hasAny70 = codes.code70 || codes.code70Links || codes.code70Rechts;
    if (hasAny70) {
      if (insuranceLower === 'caresq') {
        // No main code for Caresq; leave generalBaseCode as-is
      } else if (
        ['asr', 'menzis', 'onvz', 'salland'].includes(insuranceLower)
      ) {
        // Side-specific main code representation
        if (codes.code70Links && !codes.code70Rechts) {
          generalBaseCode = '70 L';
        } else if (codes.code70Rechts && !codes.code70Links) {
          generalBaseCode = '70 R';
        } else {
          // Both sides or unified 70
          generalBaseCode = '70';
        }
      } else if (insuranceLower === 'dsw') {
        // DSW requires special note inline with the main code
        generalBaseCode = '70 - Administratie zelf opbouwen!';
      } else {
        // Default: single 70
        generalBaseCode = '70';
      }
    }
  }

  return {codes, warnings, generalBaseCode};
}

// ==================================================
// SECTION: VLOS CODE GENERATION
// ==================================================
/**
 * Generate codes for VLOS (Vormgegeven Laarzen Orthopedische Schoeiing) intake
 *
 * VLOS Main Codes (1-2):
 * - Code 01: VLOS eerste paar
 * - Code 02: VLOS herhaling/reservepaar
 *
 * VLOS Sub Codes (per side):
 * - Code 15: Zoolverstijving
 * - Code 16: Ezelsoor (mediaal/lateraal)
 * - Code 17: Koker tussen voering (any omsluiting option)
 * - Code 50: Diverse Amputaties
 */
function generateVLOSCodes(
  vlos: IntakeVLOSData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  const {side, whichPair} = vlos;

  // Determine if it's eerste paar. Needed for the main code selection.
  const isEerste = whichPair === 'Eerste paar' || whichPair === 'Privepaar';

  // Determine which sides are active
  const hasLinks = side === 'left' || side === 'both';
  const hasRechts = side === 'right' || side === 'both';

  // Code 1/2: VLOS base codes
  // Code 1 = VLOS eerste paar
  // Code 2 = VLOS herhaling/reservepaar
  if (isEerste) {
    codes.code01 = true;
  } else {
    codes.code02 = true;
  }

  // Code 15: Zoolverstijving
  if (vlos.soleReinforcementEnabled) {
    if (vlos.soleReinforcementLeft) {
      codes.code15Links = true;
    }
    if (vlos.soleReinforcementRight) {
      codes.code15Rechts = true;
    }
  }

  // Code 16: Ezelsoor
  if (vlos.donkeyEarLeftEnabled) {
    codes.code16Links = true;
    if (!vlos.donkeyEarLeftType) {
      warnings.push(
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }
  if (vlos.donkeyEarRightEnabled) {
    codes.code16Rechts = true;
    if (!vlos.donkeyEarRightType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }

  // Code 17: Koker tussen voering (any omsluiting)
  if (hasOmsluiting(vlos.enclosureLeft)) {
    codes.code17Links = true;
  }
  if (hasOmsluiting(vlos.enclosureRight)) {
    codes.code17Rechts = true;
  }

  // Code 50: Diverse Amputaties
  if (vlos.amputationLeftEnabled) {
    codes.code50Links = true;
  }
  if (vlos.amputationRightEnabled) {
    codes.code50Rechts = true;
  }

  // Validation warnings
  if (!whichPair) {
    warnings.push('VLOS welk paar (paartype) is niet ingevuld');
  }
}

// ==================================================
// SECTION: OSA CODE GENERATION
// ==================================================
/**
 * Generate codes for OSA (Orthopedische Schoeiing met Aftrap) intake
 *
 * OSA Main Codes (3-8) determined by shaft height (schachthoogte):
 * - Code 03/04: Laag OSA (<12cm schachthoogte)
 * - Code 05/06: Half-hoog OSA (12-18cm schachthoogte)
 * - Code 07/08: Hoog OSA (>18cm schachthoogte)
 *
 * Odd codes (03/05/07) = eerste paar
 * Even codes (04/06/08) = herhaling/reservepaar
 *
 * OSA Sub Codes (per side):
 * - Code 09: Proefschoen (only for high OSA code 07 + code 17, specific insurers)
 * - Code 15: Zoolverstijving
 * - Code 16: Ezelsoor (mediaal/lateraal)
 * - Code 17: Koker tussen voering (any omsluiting option)
 * - Code 50: Diverse Amputaties
 */
function generateOSACodes(
  osa: IntakeOSAData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  const {side, whichPair, shaftHeightLeft, shaftHeightRight} = osa;
  const isEerste = whichPair === 'Eerste paar' || whichPair === 'Privepaar';

  // Determine which sides are active
  const hasLinks = side === 'left' || side === 'both';
  const hasRechts = side === 'right' || side === 'both';

  // Parse schachthoogte values
  const heightLinks = parseFloat(shaftHeightLeft || '0') || 0;
  const heightRechts = parseFloat(shaftHeightRight || '0') || 0;

  // Determine OSA type based on schachthoogte
  // < 12cm = laag (codes 3/4)
  // 12-18cm = half-hoog (codes 5/6)
  // > 18cm = hoog (codes 7/8)
  // Odd code (3/5/7) = eerste paar, Even code (4/6/8) = herhaling/reservepaar

  const maxHeight =
    side === 'both'
      ? Math.max(heightLinks, heightRechts)
      : side === 'left'
        ? heightLinks
        : heightRechts;

  if (maxHeight === 0) {
    warnings.push('OSA schachthoogte is niet ingevuld');
  } else {
    if (maxHeight < 12) {
      // Laag OSA
      codes[isEerste ? 'code03' : 'code04'] = true;
    } else if (maxHeight <= 18) {
      // Half-hoog OSA
      codes[isEerste ? 'code05' : 'code06'] = true;
    } else {
      // Hoog OSA
      codes[isEerste ? 'code07' : 'code08'] = true;
    }
  }

  // Code 15: Zoolverstijving
  if (osa.soleReinforcementEnabled) {
    if (osa.soleReinforcementLeft) {
      codes.code15Links = true;
    }
    if (osa.soleReinforcementRight) {
      codes.code15Rechts = true;
    }
  }

  // Code 16: Ezelsoor
  if (osa.donkeyEarLeftEnabled) {
    codes.code16Links = true;
    if (!osa.donkeyEarLeftType) {
      warnings.push(
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }
  if (osa.donkeyEarRightEnabled) {
    codes.code16Rechts = true;
    if (!osa.donkeyEarRightType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }

  // Code 17: Koker tussen voering (any omsluiting)
  if (hasOmsluiting(osa.enclosureLeft)) {
    codes.code17Links = true;
  }
  if (hasOmsluiting(osa.enclosureRight)) {
    codes.code17Rechts = true;
  }

  // Code 50: Diverse Amputaties
  if (osa.amputationLeftEnabled) {
    codes.code50Links = true;
  }
  if (osa.amputationRightEnabled) {
    codes.code50Rechts = true;
  }

  // Code 9: Proefschoen
  // Dit krijg je alleen als 07 met 17 wordt gedaan bij de volgende verzekeraars:
  // Achmea, DSW en ASR.
  // Only generate for high OSA (code 07) combined with koker tussen voering (code 17)
  if (codes.code07 && ['Achmea', 'DSW', 'ASR'].includes(insurance)) {
    // Check if code 17 is present on either side
    if (hasLinks && codes.code17Links) {
      codes.code09Links = true;
    }
    if (hasRechts && codes.code17Rechts) {
      codes.code09Rechts = true;
    }
  }

  // Validation warnings
  if (!whichPair) {
    warnings.push('OSA welk paar (paartype) is niet ingevuld');
  }
}

// ==================================================
// SECTION: OSB CODE GENERATION
// ==================================================
/**
 * Generate codes for OSB (Orthopedische Schoeiing met Bijzondere Zolen)
 *
 * OSB Main Code:
 * - Code 42: OSB Cluster (basis code when any subcode is present)
 *
 * OSB Sub Codes (per side):
 * - Code 43: Supplement Individueel
 * - Code 46: Afwikkelrol Eenvoudig (<1cm)
 * - Code 47: Afwikkelrol Gecompliceerd (>=1cm)
 * - Code 57: Zoolverstijving
 *
 * Insurance-specific configurations:
 * - DSW: Code 42 with special note "Administratie zelf opbouwen!"
 * - Others: Code 42 standard
 */
function generateOSBCodes(
  osb: IntakeOSBData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  // Align OSB subcode mapping with OVAC structure
  // Determine which sides have any subcodes
  let hasAnyLeftCode = false;
  let hasAnyRightCode = false;

  // Supplement Individueel (code 43)
  if (osb.customInsoleIndividualLeft) {
    codes.code43Links = true;
    hasAnyLeftCode = true;
  }
  if (osb.customInsoleIndividualRight) {
    codes.code43Rechts = true;
    hasAnyRightCode = true;
  }

  // Afwikkelrol: Determine code 46 (eenvoudig) or 47 (gecompliceerd) based on cm value
  // < 1cm = eenvoudig (46), >= 1cm = gecompliceerd (47)
  if (osb.rockerRollCmLeft && osb.rockerRollCmLeft.trim() !== '') {
    const cmValue = parseFloat(osb.rockerRollCmLeft);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 1) {
        codes.code46Links = true;
      } else {
        codes.code47Links = true;
      }
      hasAnyLeftCode = true;
    }
  }
  if (osb.rockerRollCmRight && osb.rockerRollCmRight.trim() !== '') {
    const cmValue = parseFloat(osb.rockerRollCmRight);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 1) {
        codes.code46Rechts = true;
      } else {
        codes.code47Rechts = true;
      }
      hasAnyRightCode = true;
    }
  }

  // Zoolverstijving (code 57)
  if (osb.soleReinforcementLeft) {
    codes.code57Links = true;
    hasAnyLeftCode = true;
  }
  if (osb.soleReinforcementRight) {
    codes.code57Rechts = true;
    hasAnyRightCode = true;
  }

  // Main OSB code 42 when any subcode is present
  if (hasAnyLeftCode || hasAnyRightCode) {
    codes.code42 = true;
  }
}

// ==================================================
// SECTION: OVAC CODE GENERATION
// ==================================================
/**
 * Generate codes for OVAC (Overige Voorzieningen Aangepaste Voetkleding)
 *
 * OVAC Main Code:
 * - Code 70: OVAC Cluster (varies by insurer; side-specific or unified)
 *
 * OVAC Sub Codes (per side):
 * - Code 71: Supplement individueel
 * - Code 74: Eenvoudige afwikkelrol (<1cm)
 * - Code 75: Gecompliceerde afwikkelrol (>=1cm)
 * - Code 76: Hak aanpassing t/m 2cm
 * - Code 77: Hak zool verhoging t/m 3cm
 * - Code 78: Hak zool verhoging t/m 7cm
 * - Code 84: Aangepaste hakken
 * - Code 85: Zoolverstijving
 * - Code 88: Nieuwe wreefsluiting
 *
 * Insurance-specific configurations:
 * - Caresq: No main code 70 (subcodes only)
 * - ASR, Menzis, ONVZ, Salland: Side-specific codes (70 L, 70 R, or unified 70)
 * - CZ, DSW, VGZ, ZK, Zorg en Zekerheid: Single code 70
 * - DSW: Code 70 with special note "Administratie zelf opbouwen!"
 */
function generateOVACCodes(
  ovac: IntakeOVACData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  // Determine which sides need main code 70
  let hasAnyLeftCode = false;
  let hasAnyRightCode = false;

  // Map OVAC_DESCRIPTION_ITEMS to codes (for supplement, zoolverstijving, wreefsluiting, aangepaste hakken)
  OVAC_DESCRIPTION_ITEMS.forEach(item => {
    const leftKey = `${item.key}Links` as keyof IntakeOVACData;
    const rightKey = `${item.key}Rechts` as keyof IntakeOVACData;

    if (ovac[leftKey]) {
      const codeKey = `code${item.postNr}Links` as keyof GeneratedCodes;
      codes[codeKey] = true as GeneratedCodes[typeof codeKey];
      hasAnyLeftCode = true;
    }
    if (ovac[rightKey]) {
      const codeKey = `code${item.postNr}Rechts` as keyof GeneratedCodes;
      codes[codeKey] = true as GeneratedCodes[typeof codeKey];
      hasAnyRightCode = true;
    }
  });

  // Afwikkelrol: Determine code 74 or 75 based on cm value
  // < 1cm = eenvoudig (74), >= 1cm = gecompliceerd (75)
  if (ovac.rockerRollCmLeft && ovac.rockerRollCmLeft.trim() !== '') {
    const cmValue = parseFloat(ovac.rockerRollCmLeft);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 1) {
        codes.code74Links = true; // Eenvoudige afwikkelrol
      } else {
        codes.code75Links = true; // Gecompliceerde afwikkelrol
      }
      hasAnyLeftCode = true;
    }
  }

  if (ovac.rockerRollCmRight && ovac.rockerRollCmRight.trim() !== '') {
    const cmValue = parseFloat(ovac.rockerRollCmRight);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 1) {
        codes.code74Rechts = true; // Eenvoudige afwikkelrol
      } else {
        codes.code75Rechts = true; // Gecompliceerde afwikkelrol
      }
      hasAnyRightCode = true;
    }
  }

  // Hakzool verhoging: Determine code 76, 77, or 78 based on cm value
  // < 2cm = 76, 2-3cm = 77, 3-7cm = 78
  if (
    ovac.heelSoleElevationCmLeft &&
    ovac.heelSoleElevationCmLeft.trim() !== ''
  ) {
    const cmValue = parseFloat(ovac.heelSoleElevationCmLeft);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 2) {
        codes.code76Links = true; // Hak aanpassing t/m 2cm
      } else if (cmValue < 3) {
        codes.code77Links = true; // Hak zool verhoging t/m 3cm
      } else if (cmValue <= 7) {
        codes.code78Links = true; // Hak zool verhoging t/m 7cm
      }
      hasAnyLeftCode = true;
    }
  }

  if (
    ovac.heelSoleElevationCmRight &&
    ovac.heelSoleElevationCmRight.trim() !== ''
  ) {
    const cmValue = parseFloat(ovac.heelSoleElevationCmRight);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 2) {
        codes.code76Rechts = true; // Hak aanpassing t/m 2cm
      } else if (cmValue < 3) {
        codes.code77Rechts = true; // Hak zool verhoging t/m 3cm
      } else if (cmValue <= 7) {
        codes.code78Rechts = true; // Hak zool verhoging t/m 7cm
      }
      hasAnyRightCode = true;
    }
  }

  // Generate main code 70 based on insurance requirements
  // Insurance-specific logic:
  // - Caresq: No main code (subcodes only)
  // - ASR, Menzis, ONVZ, Salland: Use 70 L, 70 R, or 70 (both)
  // - CZ, DSW, VGZ, ZK, Zorg en Zekerheid: Use single 70

  if (hasAnyLeftCode || hasAnyRightCode) {
    const insuranceLower = insurance.toLowerCase();

    // Insurances that don't use main code 70
    if (insuranceLower === 'caresq') {
      // Caresq: No main code, only subcodes
      return;
    }

    // Insurances that use side-specific codes (70 L, 70 R, or 70 both)
    const sideSpecificInsurances = ['asr', 'menzis', 'onvz', 'salland'];
    if (sideSpecificInsurances.includes(insuranceLower)) {
      // If both sides have codes, use single code70; otherwise use side-specific codes
      if (hasAnyLeftCode && hasAnyRightCode) {
        codes.code70 = true;
      } else {
        if (hasAnyLeftCode) {
          codes.code70Links = true;
        }
        if (hasAnyRightCode) {
          codes.code70Rechts = true;
        }
      }
    } else {
      // All other insurances (CZ, DSW, VGZ, ZK, Zorg en Zekerheid, etc.)
      // Use single code 70 if any subcode is present
      codes.code70 = true;

      // DSW: main code text handled via generalBaseCode downstream
    }
  }
}
