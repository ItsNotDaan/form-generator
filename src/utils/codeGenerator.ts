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
 * --SUB CODES---
 * - 9: Proefschoen (only for high OSA code 07 + code 17 for Achmea, DSW, ASR) per side
 * - 10: (placeholder - not implemented)
 * - 11: (placeholder - not implemented)
 * - 14: Aanvulling lengte/breedte (placeholder - not implemented)
 * - 15: Zoolverstijving per side
 * - 16: Ezelsoor (mediaal/lateraal) per side
 * - 17: Koker tussen voering (any omsluiting option checked) per side
 * - 50: Diverse Amputaties per side
 */

import {
  ClientData,
  IntakeVLOSData,
  IntakeOSAData,
  IntakeOVACData,
} from '@/components/form/types/formData';

import {OVAC_OMSCHRIJVING_ITEMS} from '@/lib/constants/formConstants';

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
  generalBasiscode: string | null;
}

interface IntakeFormData {
  intakeVLOS: IntakeVLOSData | null;
  intakeOSA: IntakeOSAData | null;
  intakePulman: any | null;
  intakeRebacare: any | null;
  intakeOSB: any | null;
  intakeOVAC: IntakeOVACData | null;
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
 * Main code generation function
 */
export function generateCodes(
  clientData: ClientData | null,
  intakeData: IntakeFormData,
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

  // Determine generalBasiscode for OSB (42 or 40)
  if (intakeData.intakeOSB?.basiscode) {
    if (intakeData.intakeOSB.basiscode === '42') {
      generalBasiscode = '42';
    } else if (intakeData.intakeOSB.basiscode === '40') {
      generalBasiscode = '40';
    }
  }

  // Determine generalBasiscode for OVAC (70 and variants by insurer)
  if (intakeType === 'OVAC') {
    const insuranceLower = (insurance || '').toLowerCase();
    const hasAny70 = codes.code70 || codes.code70Links || codes.code70Rechts;
    if (hasAny70) {
      if (insuranceLower === 'caresq') {
        // No main code for Caresq; leave generalBasiscode as-is
      } else if (
        ['asr', 'menzis', 'onvz', 'salland'].includes(insuranceLower)
      ) {
        // Side-specific main code representation
        if (codes.code70Links && !codes.code70Rechts) {
          generalBasiscode = '70 L';
        } else if (codes.code70Rechts && !codes.code70Links) {
          generalBasiscode = '70 R';
        } else {
          // Both sides or unified 70
          generalBasiscode = '70';
        }
      } else if (insuranceLower === 'dsw') {
        // DSW requires special note inline with the main code
        generalBasiscode = '70 - Administratie zelf opbouwen!';
      } else {
        // Default: single 70
        generalBasiscode = '70';
      }
    }
  }

  return {codes, warnings, generalBasiscode};
}

/**
 * Generate codes for VLOS intake
 */
function generateVLOSCodes(
  vlos: IntakeVLOSData,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  const {side, welkPaar} = vlos;

  // Determine if it's eerste paar. Needed for the main code selection.
  const isEerste = welkPaar === 'Eerste paar' || welkPaar === 'Privepaar';

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
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }
  if (vlos.ezelsoorRechtsEnabled) {
    codes.code16Rechts = true;
    if (!vlos.ezelsoorRechtsType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd',
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

  // Code 50: Diverse Amputaties
  if (vlos.amputatieLinksEnabled) {
    codes.code50Links = true;
  }
  if (vlos.amputatieRechtsEnabled) {
    codes.code50Rechts = true;
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
  insurance: string,
): void {
  const {side, welkPaar, schachthoogteLinks, schachthoogteRechts} = osa;
  const isEerste = welkPaar === 'Eerste paar' || welkPaar === 'Privepaar';

  // Determine which sides are active
  const hasLinks = side === 'left' || side === 'both';
  const hasRechts = side === 'right' || side === 'both';

  // Parse schachthoogte values
  const heightLinks = parseFloat(schachthoogteLinks || '0') || 0;
  const heightRechts = parseFloat(schachthoogteRechts || '0') || 0;

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
        'Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd',
      );
    }
  }
  if (osa.ezelsoorRechtsEnabled) {
    codes.code16Rechts = true;
    if (!osa.ezelsoorRechtsType) {
      warnings.push(
        'Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd',
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

  // Code 50: Diverse Amputaties
  if (osa.amputatieLinksEnabled) {
    codes.code50Links = true;
  }
  if (osa.amputatieRechtsEnabled) {
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
  if (!welkPaar) {
    warnings.push('OSA welk paar (paartype) is niet ingevuld');
  }
}
/**
 * Generate codes for OSB intake
 * Codes: 43 (Supplement Individueel), 46 (Afwikkelrol Eenvoudig), 47 (Afwikkelrol Gecompliceerd), 57 (Zoolverstijving)
 * Per zijde (Links/Rechts)
 */
function generateOSBCodes(
  osb: any,
  codes: GeneratedCodes,
  warnings: string[],
  insurance: string,
): void {
  // TODO:
  // ASR: OSB Cluster (Hoofdcode: 42)
  // Caresq: OSB Cluster (Hoofdcode: 42)
  // CZ: OSB Cluster (Hoofdcode: 42)
  // DSW: OSB Opbouw (Hoofdcode: 42, met tekst ("Administratie zelf opbouwen!"))
  // Menzis: OSB Cluster (Hoofdcode: 42)
  // ONVZ: OSB Cluster (Hoofdcode: 42)
  // Salland: OSB Cluster (Hoofdcode: 42)
  // VGZ: OSB Cluster (Hoofdcode: 42)
  // ZK: OSB Cluster (Hoofdcode: 42)
  // Zorg en Zekerheid: OSB Cluster (Hoofdcode: 42)

  // Supplement Individueel (code 43)
  if (osb.aanpassingen?.supplementIndividueelLinks) {
    codes.code43Links = true;
  }
  if (osb.aanpassingen?.supplementIndividueelRechts) {
    codes.code43Rechts = true;
  }

  // Afwikkelrol Eenvoudig (code 46)
  if (osb.aanpassingen?.afwikkelrolEenvoudigLinks) {
    codes.code46Links = true;
  }
  if (osb.aanpassingen?.afwikkelrolEenvoudigRechts) {
    codes.code46Rechts = true;
  }

  // Afwikkelrol Gecompliceerd (code 47)
  if (osb.aanpassingen?.afwikkelrolGecompliceerdLinks) {
    codes.code47Links = true;
  }
  if (osb.aanpassingen?.afwikkelrolGecompliceerdRechts) {
    codes.code47Rechts = true;
  }

  // Zoolverstijving (code 57)
  if (osb.aanpassingen?.zoolverstijvingLinks) {
    codes.code57Links = true;
  }
  if (osb.aanpassingen?.zoolverstijvingRechts) {
    codes.code57Rechts = true;
  }

  // Note: Hallux Valgus and Verdieping voorvoet do not generate codes in OSB
  // They are part of the form but don't map to the code generation system

  // Basiscode (optioneel, voor rapportage)
  // if (osb.basiscode) ...
}

/**
 * Medical Code Generation System for OVAC intake forms
 *
 * OVAC Definitions
 *
 * ---MAIN CODE---
 * - 70: OVAC Cluster (varies by insurer; some use 70 L, 70 R, or just 70)
 *
 * ---SUB CODES---
 * - 71: Supplement individueel
 * - 74: Eenvoudige afwikkelrol
 * - 75: Gecompliceerde afwikkelrol
 * - 76: Hak aanpassing t/m 2 cm
 * - 77: Hak zool verhoging t/m 3 cm
 * - 78: Hak zool verhoging t/m 7 cm
 * - 84: Aangepaste hakken
 * - 85: Zoolverstijving
 * - 88: Nieuwe wreefsluiting
 *
 *  OVAC Code Mapping:
 * - Section 2: Supplement (van leest) -> Code 71
 * - Section 4a: Eenvoudige afwikkelrol (onder schoen) -> Code 74
 * - Section 4b: Gecompliceerde afwikkelrol (onder schoen) -> Code 75
 * - Section 5a: Hakzool verhoging t/m 2cm -> Code 76
 * - Section 5b: Hakzool verhoging t/m 3cm -> Code 77
 * - Section 5c: Hakzool verhoging t/m 7cm -> Code 78
 * - Section 3: Zoolverstijving -> Code 85
 * - Section 6: Nieuwe wreefsluiting -> Code 88
 *
 * Insurance-specific configurations:
 * - ASR: OVAC Cluster (hoofdcode: 70 L of 70 R of 70 Both)
 * - Caresq: OVAC Cluster per stuk (Geen hoofdcode, wel subcodes)
 * - CZ: OVAC Cluster (Hoofdcode: 70)
 * - DSW: OVAC Opbouw (Hoofdcode: 70, met tekst "Administratie zelf opbouwen!")
 * - Menzis: OVAC Cluster (Hoofdcode: 70 L of 70 R of 70 Both)
 * - ONVZ: OVAC Cluster (Hoofdcode: 70 L of 70 R of 70 Both)
 * - Salland: OVAC Cluster (Hoofdcode: 70 L of 70 R of 70 Both)
 * - VGZ: OVAC Cluster (Hoofdcode: 70)
 * - ZK: OVAC Cluster (Hoofdcode: 70)
 * - Zorg en Zekerheid: OVAC Cluster (Hoofdcode: 70)
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

  // Map OVAC_OMSCHRIJVING_ITEMS to codes (for supplement, zoolverstijving, wreefsluiting, aangepaste hakken)
  OVAC_OMSCHRIJVING_ITEMS.forEach(item => {
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
  if (ovac.afwikkelrolCmLinks && ovac.afwikkelrolCmLinks.trim() !== '') {
    const cmValue = parseFloat(ovac.afwikkelrolCmLinks);
    if (!isNaN(cmValue) && cmValue > 0) {
      if (cmValue < 1) {
        codes.code74Links = true; // Eenvoudige afwikkelrol
      } else {
        codes.code75Links = true; // Gecompliceerde afwikkelrol
      }
      hasAnyLeftCode = true;
    }
  }

  if (ovac.afwikkelrolCmRechts && ovac.afwikkelrolCmRechts.trim() !== '') {
    const cmValue = parseFloat(ovac.afwikkelrolCmRechts);
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
    ovac.hakzoolVerhogingCmLinks &&
    ovac.hakzoolVerhogingCmLinks.trim() !== ''
  ) {
    const cmValue = parseFloat(ovac.hakzoolVerhogingCmLinks);
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
    ovac.hakzoolVerhogingCmRechts &&
    ovac.hakzoolVerhogingCmRechts.trim() !== ''
  ) {
    const cmValue = parseFloat(ovac.hakzoolVerhogingCmRechts);
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

      // DSW: main code text handled via generalBasiscode downstream
    }
  }
}

/**
 * Check if any omsluiting option is checked for a side
 * If omsluitingRecord is undefined or null, return false
 * Else return true if any value in the record is true
 */
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
