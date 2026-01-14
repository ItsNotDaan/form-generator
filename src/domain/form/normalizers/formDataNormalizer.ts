// Utility to normalize form data and ensure all fields are exported to JSON
// This ensures Word document placeholders like ${enclosureRightCm} are always replaced

import {ENCLOSURE_OPTIONS} from '@/domain/form/constants/formConstants';
import type {
  IntakeVLOSData,
  IntakeOSAData,
  IntakePulmanData,
  IntakeRebacareData,
  IntakeOSBData,
  IntakeOVACData,
  IntakeInsolesData,
  ClientData,
  CheckFoliepasData,
} from '@/domain/form/types/formData';

/**
 * Helper to normalize boolean/string values for export
 * - false/"nee"/"no" -> ""
 * - true/"ja"/"yes" -> "Ja"
 * - Arrays are JSON.stringify'd
 * - Objects are JSON.stringify'd
 * Always returns a string for consistent API
 */
export const normalizeValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'boolean') {
    return value ? 'Ja' : '';
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'yes' || lower === 'ja' || lower === 'true') {
      return 'Ja';
    }
    if (lower === 'no' || lower === 'nee' || lower === 'false') {
      return '';
    }
    return value;
  }
  if (Array.isArray(value)) {
    // Arrays are stringified as JSON for consistent string output
    return JSON.stringify(value.map(normalizeValue));
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(normalizeObject(value as Record<string, unknown>));
  }
  return String(value);
};

export const normalizeObject = (
  obj: Record<string, unknown>,
): Record<string, string> => {
  if (!obj) {
    return {};
  }
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    normalized[key] = normalizeValue(value);
  }
  return normalized;
};

/**
 * Generic auto-normalizer that converts any typed object to Record<string, string>
 * Automatically handles all fields without manual mapping
 * Skip certain keys that need custom handling (Records, nested objects, etc.)
 */
const autoNormalize = (
  data: unknown,
  skipKeys: string[] = [],
): Record<string, string> => {
  const result: Record<string, string> = {};

  if (!data || typeof data !== 'object') {
    return result;
  }

  for (const [key, value] of Object.entries(data)) {
    // Skip keys that need custom handling
    if (skipKeys.includes(key)) {
      continue;
    }

    // Skip nested objects and Records (they need custom flattening)
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      continue;
    }

    result[key] = normalizeValue(value);
  }

  return result;
};

/**
 * Flatten and normalize enclosure data from nested structure to flat English keys
 * Uses the export keys defined in formConstants for consistent mapping
 */
export const normalizeEnclosureData = (
  enclosureLeft: Record<string, boolean> | undefined,
  enclosureRight: Record<string, boolean> | undefined,
  enclosureLeftMm: Record<string, string> | undefined,
  enclosureRightMm: Record<string, string> | undefined,
): Record<string, string> => {
  const result: Record<string, string> = {};

  // Process each enclosure option using the export keys from constants
  for (const option of ENCLOSURE_OPTIONS) {
    // Left side
    const leftEnabled = enclosureLeft?.[option.fullKeyLinks] || false;
    const leftValue = enclosureLeftMm?.[option.mmKeyLinks] || '';

    // Right side
    const rightEnabled = enclosureRight?.[option.fullKeyRechts] || false;
    const rightValue = enclosureRightMm?.[option.mmKeyRechts] || '';

    // Use the export keys defined in constants for consistent English names
    // For options with measurements (needsMm), export value if enabled and has value
    // For boolean-only options (like orca), export "Ja" if enabled
    if (option.needsMm) {
      result[option.exportKeyLeft] = leftEnabled && leftValue ? leftValue : '';
      result[option.exportKeyRight] =
        rightEnabled && rightValue ? rightValue : '';
    } else {
      // Boolean-only (like orca)
      result[option.exportKeyLeft] = leftEnabled ? 'Ja' : '';
      result[option.exportKeyRight] = rightEnabled ? 'Ja' : '';
    }
  }

  return result;
};

/**
 * Helper to check if a translation is available for a given key
 * This function is exported for use in future enhancements where translation
 * availability needs to be checked before applying translations.
 *
 * Example use case: Conditionally rendering UI elements based on translation availability
 * or providing fallback content when translations are missing.
 *
 * @param translationKey - The key to check for translation
 * @param translationFunction - The translation function (e.g., t from next-translate)
 * @returns true if translation exists and differs from the key, false otherwise
 */
export const checkTranslateAvailable = (
  translationKey: string,
  translationFunction?: (key: string) => string,
): boolean => {
  if (!translationFunction) {
    return false;
  }
  try {
    const translated = translationFunction(translationKey);
    // If translation returns the same value as the key, no translation exists
    return translated !== translationKey;
  } catch {
    return false;
  }
};

/**
 * Helper to aggregate all "Ja" values from a record into a comma-separated string
 * Returns empty string if no values are "Ja"
 */
export const aggregateJaValues = (record: Record<string, string>): string => {
  const activeKeys = Object.entries(record)
    .filter(([_, value]) => value === 'Ja')
    .map(([key, _]) => key);
  return activeKeys.join(' + ');
};

/*
 * Possible pages that need normalization:
 * - Client Data
 * - Check Foliepas
 * - Intake OSA
 * - Intake VLOS
 * - Intake OSB
 * - Intake Steunzolen
 * - Intake Pulman
 * - Intake Rebacare
 * - Intake OVAC
 */

/**
 * Normalize client data - ensure all fields are present
 * Assumes data is always fully populated from Redux store
 */
export const normalizeClientData = (
  client: ClientData,
): Record<string, string> => {
  return {
    ...autoNormalize(client),
    practitionerName: '', // Will be resolved separately
  };
};

/**
 * Normalize VLOS intake data - ensure all fields are present with English names
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeVLOSData = (
  data: IntakeVLOSData,
): Record<string, string> => {
  // Flatten enclosure data
  const enclosureData = normalizeEnclosureData(
    data.enclosureLeft,
    data.enclosureRight,
    data.enclosureLeftMm,
    data.enclosureRightMm,
  );

  // Flatten pathologies
  const pathologies: Record<string, string> = {
    diabetes: data.pathologies?.diabetes ? 'Ja' : '',
    polyNeuropathie: data.pathologies?.polyNeuropathie ? 'Ja' : '',
    reuma: data.pathologies?.reuma ? 'Ja' : '',
    ms: data.pathologies?.ms ? 'Ja' : '',
    hmsn: data.pathologies?.hmsn ? 'Ja' : '',
    degeneratie: data.pathologies?.degeneratie ? 'Ja' : '',
    artrose: data.pathologies?.artrose ? 'Ja' : '',
  };

  // Flatten walking distance aids
  const walkingDistanceAids: Record<string, string> = {
    steunzolen: data.walkingDistanceAids?.steunzolen ? 'Ja' : '',
    rollator: data.walkingDistanceAids?.rollator ? 'Ja' : '',
    stok: data.walkingDistanceAids?.stok ? 'Ja' : '',
    elKousen: data.walkingDistanceAids?.elKousen ? 'Ja' : '',
    knieBrace: data.walkingDistanceAids?.knieBrace ? 'Ja' : '',
    fysio: data.walkingDistanceAids?.fysio ? 'Ja' : '',
    pedicure: data.walkingDistanceAids?.pedicure ? 'Ja' : '',
  };

  // Flatten foot inspection
  const footInspection: Record<string, string> = {
    oedeem: data.footInspection?.oedeem ? 'Ja' : '',
    wisselend: data.footInspection?.wisselend ? 'Ja' : '',
    structureel: data.footInspection?.structureel ? 'Ja' : '',
    dunneKwetsbareHuid: data.footInspection?.dunneKwetsbareHuid ? 'Ja' : '',
    drogeHuid: data.footInspection?.drogeHuid ? 'Ja' : '',
    doorbloedingsstoornis: data.footInspection?.doorbloedingsstoornis
      ? 'Ja'
      : '',
    halluxValgus: data.footInspection?.halluxValgus ? 'Ja' : '',
    bunion: data.footInspection?.bunion ? 'Ja' : '',
    pesPlanoValgus: data.footInspection?.pesPlanoValgus ? 'Ja' : '',
    pesCavo: data.footInspection?.pesCavo ? 'Ja' : '',
    klauwtenen: data.footInspection?.klauwtenen ? 'Ja' : '',
  };

  // Auto-normalize all basic fields, skip Records that need custom handling
  const basicFields = autoNormalize(data, [
    'enclosureLeft',
    'enclosureRight',
    'enclosureLeftMm',
    'enclosureRightMm',
    'pathologies',
    'walkingDistanceAids',
    'footInspection',
    'shaftHeightLeft',
    'shaftHeightRight',
  ]);

  return {
    ...basicFields,
    // Add custom field name mappings
    shaftHeightLeftCm: data.shaftHeightLeft || '',
    shaftHeightRightCm: data.shaftHeightRight || '',
    // Enclosure fields
    ...enclosureData,
    // Functieonderzoek
    ...pathologies,
    ...walkingDistanceAids,
    ...footInspection,
    // Aggregated functieonderzoek fields
    allPathologies: aggregateJaValues(pathologies),
    allWalkingDistanceAids: aggregateJaValues(walkingDistanceAids),
    allFootInspections: aggregateJaValues(footInspection),
  };
};

/**
 * Normalize OSA intake data (extends VLOS)
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeOSAData = (
  data: IntakeOSAData,
): Record<string, string> => {
  const vlosData = normalizeIntakeVLOSData(data);
  const osaSpecific = autoNormalize(data, [
    // Skip all VLOS fields (already handled)
    'enclosureLeft',
    'enclosureRight',
    'enclosureLeftMm',
    'enclosureRightMm',
    'pathologies',
    'walkingDistanceAids',
    'footInspection',
    'shaftHeightLeft',
    'shaftHeightRight',
  ]);

  return {
    ...vlosData,
    ...osaSpecific,
  };
};

/**
 * Normalize Pulman intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakePulmanData = (
  data: IntakePulmanData,
): Record<string, string> => {
  return autoNormalize(data);
};

/**
 * Normalize Rebacare intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeRebacareData = (
  data: IntakeRebacareData,
): Record<string, string> => {
  return autoNormalize(data);
};

/**
 * Normalize OSB intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeOSBData = (
  data: IntakeOSBData,
): Record<string, string> => {
  // Flatten goal options
  const goal: Record<string, string> = {
    doelPasvorm: data.goal?.doelPasvorm ? 'Ja' : '',
    doelStabiliteit: data.goal?.doelStabiliteit ? 'Ja' : '',
    doelLoopAfstandVergroten: data.goal?.doelLoopAfstandVergroten ? 'Ja' : '',
    doelOndersteuningGewelf: data.goal?.doelOndersteuningGewelf ? 'Ja' : '',
  };

  // Auto-normalize basic fields, skip Records
  const basicFields = autoNormalize(data, ['goal', 'productSpecifications']);

  return {
    ...basicFields,
    // Goal
    ...goal,
    allGoals: aggregateJaValues(goal),
    // Product specifications (flatten nested object)
    productArticleCode: data.productSpecifications?.articleCode || '',
    productLengthSize: data.productSpecifications?.lengthSize || '',
    productWidth: data.productSpecifications?.width || '',
    productColor: data.productSpecifications?.color || '',
    productClosure: data.productSpecifications?.closure || '',
  };
};

/**
 * Normalize OVAC intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeOVACData = (
  data: IntakeOVACData,
): Record<string, string> => {
  // Group items for aggregation
  const leftModifications: Record<string, string> = {
    customInsoleIndividualLeft: data.customInsoleIndividualLeft ? 'Ja' : '',
    simpleRockerLeft: data.simpleRockerLeft ? 'Ja' : '',
    complicatedRockerLeft: data.complicatedRockerLeft ? 'Ja' : '',
    heelAdjustment2cmLeft: data.heelAdjustment2cmLeft ? 'Ja' : '',
    heelSoleElevation3cmLeft: data.heelSoleElevation3cmLeft ? 'Ja' : '',
    heelSoleElevation7cmLeft: data.heelSoleElevation7cmLeft ? 'Ja' : '',
    adjustedHeelsLeft: data.adjustedHeelsLeft ? 'Ja' : '',
    soleReinforcementLeft: data.soleReinforcementLeft ? 'Ja' : '',
    newInstepClosureLeft: data.newInstepClosureLeft ? 'Ja' : '',
  };

  const rightModifications: Record<string, string> = {
    customInsoleIndividualRight: data.customInsoleIndividualRight ? 'Ja' : '',
    simpleRockerRight: data.simpleRockerRight ? 'Ja' : '',
    complicatedRockerRight: data.complicatedRockerRight ? 'Ja' : '',
    heelAdjustment2cmRight: data.heelAdjustment2cmRight ? 'Ja' : '',
    heelSoleElevation3cmRight: data.heelSoleElevation3cmRight ? 'Ja' : '',
    heelSoleElevation7cmRight: data.heelSoleElevation7cmRight ? 'Ja' : '',
    adjustedHeelsRight: data.adjustedHeelsRight ? 'Ja' : '',
    soleReinforcementRight: data.soleReinforcementRight ? 'Ja' : '',
    newInstepClosureRight: data.newInstepClosureRight ? 'Ja' : '',
  };

  // Auto-normalize remaining fields
  const basicFields = autoNormalize(data);

  return {
    ...basicFields,
    // Aggregated modifications
    allLeftModifications: aggregateJaValues(leftModifications),
    allRightModifications: aggregateJaValues(rightModifications),
  };
};

/**
 * Normalize Steunzolen (Insoles) intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeSteunzolenData = (
  data: IntakeInsolesData,
): Record<string, string> => {
  return autoNormalize(data);
};

/**
 * Normalize Check Foliepas data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeCheckFoliepasData = (
  data: CheckFoliepasData,
): Record<string, string> => {
  // Flatten enclosure data
  const enclosureData = normalizeEnclosureData(
    data.enclosureLeft,
    data.enclosureRight,
    data.enclosureLeftMm,
    data.enclosureRightMm,
  );

  // Auto-normalize all basic fields, skip Records
  const basicFields = autoNormalize(data, [
    'enclosureLeft',
    'enclosureRight',
    'enclosureLeftMm',
    'enclosureRightMm',
    'colorOptions',
  ]);

  return {
    ...basicFields,
    // Enclosure fields
    ...enclosureData,
    // Array field
    colorOptions: data.colorOptions?.join(', ') || '',
  };
};
