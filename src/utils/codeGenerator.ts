/**
 * Medical Code Generation System for VLOS and OSA intake forms
 * 
 * Generates individual boolean keys for each code (code01Links, code01Rechts, etc.)
 * for Word document mail merge compatibility.
 * 
 * Code definitions:
 * - 1: VLOS links eerste paar
 * - 2: VLOS rechts/beide eerste paar
 * - 3: Laag OSA links (<12cm schachthoogte) eerste paar
 * - 4: Laag OSA rechts/beide (<12cm schachthoogte) eerste paar
 * - 5: Half-hoog OSA links (12-18cm schachthoogte) eerste paar
 * - 6: Half-hoog OSA rechts/beide (12-18cm schachthoogte) eerste paar
 * - 7: Hoog OSA links (>18cm schachthoogte) eerste paar
 * - 8: Hoog OSA rechts/beide (>18cm schachthoogte) eerste paar
 * - 9: Proefschoen VLOS (auto-generated with VLOS codes)
 * - 10: (placeholder - not implemented)
 * - 11: (placeholder - not implemented)
 * - 14: Aanvulling lengte/breedte (placeholder - not implemented)
 * - 15: Zoolverstijving per side
 * - 16: Ezelsoor (mediaal/lateraal) per side
 * - 16a: Koker aan supplement (placeholder - not implemented)
 * - 17: Koker tussen voering (any omsluiting option checked) per side
 */

import { ClientData, IntakeVLOSData, IntakeOSAData } from '@/presentation/form/types/formData';

export interface GeneratedCodes {
    code01Links: boolean;
    code01Rechts: boolean;
    code02Links: boolean;
    code02Rechts: boolean;
    code03Links: boolean;
    code03Rechts: boolean;
    code04Links: boolean;
    code04Rechts: boolean;
    code05Links: boolean;
    code05Rechts: boolean;
    code06Links: boolean;
    code06Rechts: boolean;
    code07Links: boolean;
    code07Rechts: boolean;
    code08Links: boolean;
    code08Rechts: boolean;
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
        code01Links: false,
        code01Rechts: false,
        code02Links: false,
        code02Rechts: false,
        code03Links: false,
        code03Rechts: false,
        code04Links: false,
        code04Rechts: false,
        code05Links: false,
        code05Rechts: false,
        code06Links: false,
        code06Rechts: false,
        code07Links: false,
        code07Rechts: false,
        code08Links: false,
        code08Rechts: false,
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
 */
function hasOmsluiting(omsluitingRecord: Record<string, boolean> | undefined): boolean {
    if (!omsluitingRecord) return false;
    return Object.values(omsluitingRecord).some(value => value === true);
}

/**
 * Determine if this is "eerste paar" (odd codes) or "herhaling/reserve paar" (even codes)
 */
function isEerstePaar(omschrijving: string): boolean {
    return omschrijving === 'Eerste paar';
}

/**
 * Generate codes for VLOS intake
 */
function generateVLOSCodes(
    vlos: IntakeVLOSData,
    codes: GeneratedCodes,
    warnings: string[]
): void {
    const { side, omschrijving } = vlos;
    const isEerste = isEerstePaar(omschrijving || '');

    // Determine which sides are active
    const hasLinks = side === 'links' || side === 'beide';
    const hasRechts = side === 'rechts' || side === 'beide';

    // Code 1/2: VLOS base codes
    if (hasLinks) {
        if (isEerste) {
            codes.code01Links = true;
        } else {
            codes.code02Links = true;
        }
    }

    if (hasRechts) {
        if (isEerste) {
            codes.code01Rechts = true;
        } else {
            codes.code02Rechts = true;
        }
    }

    // Code 9: Proefschoen (auto-generated with VLOS)
    if (hasLinks) {
        codes.code09Links = true;
    }
    if (hasRechts) {
        codes.code09Rechts = true;
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
            warnings.push('Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd');
        }
    }
    if (vlos.ezelsoorRechtsEnabled) {
        codes.code16Rechts = true;
        if (!vlos.ezelsoorRechtsType) {
            warnings.push('Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd');
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
    if (!omschrijving) {
        warnings.push('VLOS omschrijving (paartype) is niet ingevuld');
    }
}

/**
 * Generate codes for OSA intake
 */
function generateOSACodes(
    osa: IntakeOSAData,
    codes: GeneratedCodes,
    warnings: string[]
): void {
    const { side, omschrijving, schachthoogteLinks, schachthoogteRechts } = osa;
    const isEerste = isEerstePaar(omschrijving || '');

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

    if (hasLinks) {
        if (heightLinks < 12) {
            // Laag OSA
            codes[isEerste ? 'code03Links' : 'code04Links'] = true;
        } else if (heightLinks <= 18) {
            // Half-hoog OSA
            codes[isEerste ? 'code05Links' : 'code06Links'] = true;
        } else {
            // Hoog OSA
            codes[isEerste ? 'code07Links' : 'code08Links'] = true;
        }

        if (heightLinks === 0) {
            warnings.push('OSA schachthoogte links is niet ingevuld');
        }
    }

    if (hasRechts) {
        if (heightRechts < 12) {
            // Laag OSA
            codes[isEerste ? 'code03Rechts' : 'code04Rechts'] = true;
        } else if (heightRechts <= 18) {
            // Half-hoog OSA
            codes[isEerste ? 'code05Rechts' : 'code06Rechts'] = true;
        } else {
            // Hoog OSA
            codes[isEerste ? 'code07Rechts' : 'code08Rechts'] = true;
        }

        if (heightRechts === 0) {
            warnings.push('OSA schachthoogte rechts is niet ingevuld');
        }
    }

    // Code 9: Proefschoen (OSA also gets proefschoen codes)
    if (hasLinks) {
        codes.code09Links = true;
    }
    if (hasRechts) {
        codes.code09Rechts = true;
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
            warnings.push('Ezelsoor links is enabled maar type (mediaal/lateraal) is niet geselecteerd');
        }
    }
    if (osa.ezelsoorRechtsEnabled) {
        codes.code16Rechts = true;
        if (!osa.ezelsoorRechtsType) {
            warnings.push('Ezelsoor rechts is enabled maar type (mediaal/lateraal) is niet geselecteerd');
        }
    }

    // Code 17: Koker tussen voering (any omsluiting)
    if (hasOmsluiting(osa.omsluitingLinks)) {
        codes.code17Links = true;
    }
    if (hasOmsluiting(osa.omsluitingRechts)) {
        codes.code17Rechts = true;
    }

    // Validation warnings
    if (!omschrijving) {
        warnings.push('OSA omschrijving (paartype) is niet ingevuld');
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

    if (!clientData) {
        warnings.push('Geen client data gevonden');
        return { codes, warnings };
    }

    const { intakeType } = clientData;

    if (!intakeType) {
        warnings.push('Intake type is niet geselecteerd');
        return { codes, warnings };
    }

    // Generate codes based on intake type
    switch (intakeType) {
        case 'VLOS':
            if (intakeData.intakeVLOS) {
                generateVLOSCodes(intakeData.intakeVLOS, codes, warnings);
            } else {
                warnings.push('VLOS intake data is niet beschikbaar');
            }
            break;

        case 'OSA':
            if (intakeData.intakeOSA) {
                generateOSACodes(intakeData.intakeOSA, codes, warnings);
            } else {
                warnings.push('OSA intake data is niet beschikbaar');
            }
            break;

        case 'OSB':
        case 'OVAC':
            warnings.push(`Code generatie voor ${intakeType} wordt in een latere fase geïmplementeerd`);
            break;

        case 'Pulman':
        case 'Rebacare':
        case 'Steunzolen':
            warnings.push(`Code generatie is niet beschikbaar voor ${intakeType}`);
            break;

        default:
            warnings.push(`Onbekend intake type: ${intakeType}`);
    }

    return { codes, warnings };
}
