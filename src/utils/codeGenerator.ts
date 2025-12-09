/**
 * Medical Code Generation System for VLOS and OSA intake forms
 *
 * Generates boolean keys for medical codes for Word document mail merge.
 *
 * Code definitions:
 * ---MAIN CODES---
 * - 1: VLOS eerste paar
 * - 2: VLOS herhaling/reservepaar
 * - 3: Laag OSA (<12cm schachthoogte) eerste paar
 * - 4: Laag OSA (<12cm schachthoogte) herhaling/reservepaar
 * - 5: Half-hoog OSA (12-18cm schachthoogte) eerste paar
 * - 6: Half-hoog OSA (12-18cm schachthoogte) herhaling/reservepaar
 * - 7: Hoog OSA (>18cm schachthoogte) eerste paar
 * - 8: Hoog OSA (>18cm schachthoogte) herhaling/reservepaar
 *
 * --ADDITIONAL CODES---
 * - 9: Proefschoen (only for high OSA code 07 + code 17 for Achmea, DSW, ASR) per side
 * - 10: (placeholder - not implemented)
 * - 11: (placeholder - not implemented)
 * - 14: Aanvulling lengte/breedte (placeholder - not implemented)
 * - 15: Zoolverstijving per side
 * - 16: Ezelsoor (mediaal/lateraal) per side
 * - 16a: Koker aan supplement (placeholder - not implemented)
 * - 17: Koker tussen voering (any omsluiting option checked) per side
 */

import {
  ClientData,
  IntakeVLOSData,
  IntakeOSAData,
} from '@/presentation/form/types/formData';

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
  code16aLinks: boolean;
  code16aRechts: boolean;
  code17Links: boolean;
  code17Rechts: boolean;
}

export interface CodeGenerationResult {
  codes: GeneratedCodes;
  warnings: string[];
  generalBasiscode: string | null;
}

interface IntakeFormData {
  intakeVLOS: IntakeVLOSData | null;
  intakeOSA: IntakeOSAData | null;
  intakePulman: any | null;
  intakeRebacare: any | null;
  intakeOSB: any | null;
  intakeOVAC: any | null;
  intakeSteunzolen: any | null;
}

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
    code16aLinks: false,
    code16aRechts: false,
    code17Links: false,
    code17Rechts: false,
  };
}

/**
 * Check if any omsluiting option is checked for a side
 * If omsluitingRecord is undefined or null, return false
 * Else return true if any value in the record is true
 */
function hasOmsluiting(
  omsluitingRecord: Record<string, boolean> | undefined
): boolean {
  if (!omsluitingRecord) {
    return false;
  }
  return Object.values(omsluitingRecord).some(value => value === true);
}

/**
 * Determine if this is "eerste paar" (odd codes) or "herhaling/reserve paar" (even codes)
 * Privepaar will also give eerste paar
 */
function isEerstePaar(welkPaar: string): boolean {
  return welkPaar === 'Eerste paar' || welkPaar === 'Privepaar';
}

/**
 * Check if insurance company should get proefschoen code (Code 9)
 * Code 9 is only generated for Achmea, DSW, and ASR when code 07 + 17 are present
 */
function shouldGenerateProefschoen(insurance: string): boolean {
  const eligibleInsurers = ['Achmea', 'DSW', 'ASR'];
  return eligibleInsurers.includes(insurance);
}

/**
 * Generate codes for VLOS intake
 */
function generateVLOSCodes(
  vlos: IntakeVLOSData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string
): void {
  const {side, welkPaar} = vlos;

  // Determine if it's eerste paar. Needed for the main code selection.
  const isEerste = isEerstePaar(welkPaar || '');

  // Determine which sides are active
  const hasLinks = side === 'links' || side === 'beide';
  const hasRechts = side === 'rechts' || side === 'beide';

  // Code 1/2: VLOS base codes
  // Code 1 = VLOS eerste paar
  // Code 2 = VLOS herhaling/reservepaar
  if (isEerste) {
    codes.code01 = true;
  } else {
    codes.code02 = true;
  }

  // Code 15: Zoolverstijving
  if (vlos.zoolverstijvingEnabled) {
    if (vlos.zoolverstijvingLinks) {
      codes.code15Links = true;
    }
    if (vlos.zoolverstijvingRechts) {
      codes.code15Rechts = true;
    }
  }

  // Code 16: Ezelsoor
  if (vlos.ezelsoorLinksEnabled) {
    codes.code16Links = true;
    if (!vlos.ezelsoorLinksType) {
      warnings.push(
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd'
      );
    }
  }
  if (vlos.ezelsoorRechtsEnabled) {
    codes.code16Rechts = true;
    if (!vlos.ezelsoorRechtsType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd'
      );
    }
  }

  // Code 17: Koker tussen voering (any omsluiting)
  if (hasOmsluiting(vlos.omsluitingLinks)) {
    codes.code17Links = true;
  }
  if (hasOmsluiting(vlos.omsluitingRechts)) {
    codes.code17Rechts = true;
  }

  // Validation warnings
  if (!welkPaar) {
    warnings.push('VLOS welk paar (paartype) is niet ingevuld');
  }
}

/**
 * Generate codes for OSA intake
 */
function generateOSACodes(
  osa: IntakeOSAData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string
): void {
  const {side, welkPaar, schachthoogteLinks, schachthoogteRechts} = osa;
  const isEerste = isEerstePaar(welkPaar || '');

  // Determine which sides are active
  const hasLinks = side === 'links' || side === 'beide';
  const hasRechts = side === 'rechts' || side === 'beide';

  // Parse schachthoogte values
  const heightLinks = parseFloat(schachthoogteLinks || '0') || 0;
  const heightRechts = parseFloat(schachthoogteRechts || '0') || 0;

  // Determine OSA type based on schachthoogte
  // < 12cm = laag (codes 3/4)
  // 12-18cm = half-hoog (codes 5/6)
  // > 18cm = hoog (codes 7/8)
  // Odd code (3/5/7) = eerste paar, Even code (4/6/8) = herhaling/reservepaar

  const maxHeight =
    side === 'beide'
      ? Math.max(heightLinks, heightRechts)
      : side === 'links'
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
  if (osa.zoolverstijvingEnabled) {
    if (osa.zoolverstijvingLinks) {
      codes.code15Links = true;
    }
    if (osa.zoolverstijvingRechts) {
      codes.code15Rechts = true;
    }
  }

  // Code 16: Ezelsoor
  if (osa.ezelsoorLinksEnabled) {
    codes.code16Links = true;
    if (!osa.ezelsoorLinksType) {
      warnings.push(
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd'
      );
    }
  }
  if (osa.ezelsoorRechtsEnabled) {
    codes.code16Rechts = true;
    if (!osa.ezelsoorRechtsType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd'
      );
    }
  }

  // Code 17: Koker tussen voering (any omsluiting)
  if (hasOmsluiting(osa.omsluitingLinks)) {
    codes.code17Links = true;
  }
  if (hasOmsluiting(osa.omsluitingRechts)) {
    codes.code17Rechts = true;
  }

  // Code 9: Proefschoen
  // Dit krijg je alleen als 07 met 17 wordt gedaan bij de volgende verzekeraars:
  // Achmea, DSW en ASR.
  // Only generate for high OSA (code 07) combined with koker tussen voering (code 17)
  if (codes.code07 && shouldGenerateProefschoen(insurance)) {
    // Check if code 17 is present on either side
    if (hasLinks && codes.code17Links) {
      codes.code09Links = true;
    }
    if (hasRechts && codes.code17Rechts) {
      codes.code09Rechts = true;
    }
  }

  // Validation warnings
  if (!welkPaar) {
    warnings.push('OSA welk paar (paartype) is niet ingevuld');
  }
}

/**
 * Main code generation function
 */
export function generateCodes(
  clientData: ClientData | null,
  intakeData: IntakeFormData
): CodeGenerationResult {
  const codes = initializeCodes();
  const warnings: string[] = [];
  let generalBasiscode: string | null = null;

  if (!clientData) {
    warnings.push('Geen client data gevonden');
    return {codes, warnings, generalBasiscode};
  }

  const {intakeType, insurance} = clientData;

  if (!intakeType) {
    warnings.push('Intake type is niet geselecteerd');
    return {codes, warnings, generalBasiscode};
  }

  // Generate codes based on intake type
  switch (intakeType) {
    case 'VLOS':
      if (intakeData.intakeVLOS) {
        generateVLOSCodes(
          intakeData.intakeVLOS,
          codes,
          warnings,
          insurance || ''
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
          insurance || ''
        );
      } else {
        warnings.push('OSA intake data is niet beschikbaar');
      }
      break;

    case 'OSB':
    case 'OVAC':
      warnings.push(
        `Code generatie voor ${intakeType} wordt in een latere fase geïmplementeerd`
      );
      break;

    case 'Pulman':
    case 'Rebacare':
    case 'Steunzolen':
      warnings.push(`Code generatie is niet beschikbaar voor ${intakeType}`);
      break;

    default:
      warnings.push(`Onbekend intake type: ${intakeType}`);
  }

  // Determine generalBasiscode (codes 1-8 for VLOS/OSA)
  if (codes.code01) {
    generalBasiscode = '1';
  } else if (codes.code02) {
    generalBasiscode = '2';
  } else if (codes.code03) {
    generalBasiscode = '3';
  } else if (codes.code04) {
    generalBasiscode = '4';
  } else if (codes.code05) {
    generalBasiscode = '5';
  } else if (codes.code06) {
    generalBasiscode = '6';
  } else if (codes.code07) {
    generalBasiscode = '7';
  } else if (codes.code08) {
    generalBasiscode = '8';
  }

  return {codes, warnings, generalBasiscode};
}
