// Utility to normalize form data and ensure all fields are exported to JSON
// This ensures Word document placeholders like ${enclosureRightCm} are always replaced

import {
  ENCLOSURE_OPTIONS,
  BOOLEAN_TRUE_VALUE,
  BOOLEAN_FALSE_VALUE,
  YES_VARIANTS,
  NO_VARIANTS,
  FIELD_SUFFIX_RULES,
} from '@/domain/form/constants/formConstants';
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
  ShoeDesignData,
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
    return BOOLEAN_FALSE_VALUE;
  }
  if (typeof value === 'boolean') {
    return value ? BOOLEAN_TRUE_VALUE : BOOLEAN_FALSE_VALUE;
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (YES_VARIANTS.some(variant => lower === variant)) {
      return BOOLEAN_TRUE_VALUE;
    }
    if (NO_VARIANTS.some(variant => lower === variant)) {
      return BOOLEAN_FALSE_VALUE;
    }
    // Convert escaped newline characters to actual line breaks
    return value.replace(/\\n/g, '\n');
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
 * Apply field suffix rules to a field name
 * E.g., shaftHeightLeft with rule {shaftHeight: 'Cm'} becomes shaftHeightLeftCm
 */
const applyFieldSuffixRules = (fieldName: string): string => {
  for (const [pattern, suffix] of Object.entries(FIELD_SUFFIX_RULES)) {
    if (fieldName.includes(pattern)) {
      // Insert suffix before Left/Right if present, or append to end
      if (fieldName.endsWith('Left')) {
        return fieldName.replace('Left', `Left${suffix}`);
      }
      if (fieldName.endsWith('Right')) {
        return fieldName.replace('Right', `Right${suffix}`);
      }
      return `${fieldName}${suffix}`;
    }
  }
  return fieldName;
};

/**
 * Capitalize first letter of a string
 */
const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Check if a value is a Record<string, boolean>
 */
const isRecordOfBooleans = (
  value: unknown,
): value is Record<string, boolean> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  return Object.values(value).every(v => typeof v === 'boolean');
};

/**
 * Generic auto-normalizer that converts any typed object to Record<string, string>
 * Automatically handles all fields, nested objects, and Record<string, boolean> types
 * No manual mapping or skipKeys needed
 */
const autoNormalize = (
  data: unknown,
  skipKeys: string[] = [],
  parentKey: string = '',
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

    // Handle Record<string, boolean> - normalize each field and create aggregation
    if (isRecordOfBooleans(value)) {
      const booleanRecord: Record<string, string> = {};
      for (const [boolKey, boolValue] of Object.entries(value)) {
        const normalizedKey = applyFieldSuffixRules(boolKey);
        booleanRecord[normalizedKey] = boolValue
          ? BOOLEAN_TRUE_VALUE
          : BOOLEAN_FALSE_VALUE;
        result[normalizedKey] = booleanRecord[normalizedKey];
      }
      // Create aggregation field with 'all' prefix
      const aggregationKey = `all${capitalizeFirst(key)}`;
      result[aggregationKey] = aggregateJaValues(booleanRecord);
      continue;
    }

    // Handle nested objects (flatten them with camelCase naming)
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        // Create flattened field name: productSpecifications.articleCode -> productArticleCode
        const flattenedKey = parentKey
          ? `${parentKey}${capitalizeFirst(key)}${capitalizeFirst(nestedKey)}`
          : `${key}${capitalizeFirst(nestedKey)}`;
        const normalizedKey = applyFieldSuffixRules(flattenedKey);
        result[normalizedKey] = normalizeValue(nestedValue);
      }
      continue;
    }

    // Handle regular fields
    const normalizedKey = applyFieldSuffixRules(key);
    result[normalizedKey] = normalizeValue(value);
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
  return autoNormalize(client);
};

/**
 * Normalize VLOS intake data - ensure all fields are present with English names
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeVLOSData = (
  data: IntakeVLOSData,
): Record<string, string> => {
  // Flatten enclosure data (special handling due to ENCLOSURE_OPTIONS configuration)
  const enclosureData = normalizeEnclosureData(
    data.enclosureLeft,
    data.enclosureRight,
    data.enclosureLeftMm,
    data.enclosureRightMm,
  );

  // Auto-normalize all fields, skip enclosure fields (handled above)
  const autoFields = autoNormalize(data, [
    'enclosureLeft',
    'enclosureRight',
    'enclosureLeftMm',
    'enclosureRightMm',
  ]);

  return {
    ...autoFields,
    ...enclosureData,
  };
};

/**
 * Normalize OSA intake data (extends VLOS)
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeOSAData = (
  data: IntakeOSAData,
): Record<string, string> => {
  // Auto-normalize all fields automatically
  return autoNormalize(data);
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
  // Auto-normalize all fields automatically
  return autoNormalize(data);
};

/**
 * Normalize OVAC intake data
 * Assumes data is always fully populated from Redux store
 */
export const normalizeIntakeOVACData = (
  data: IntakeOVACData,
): Record<string, string> => {
  // Auto-normalize all fields automatically
  const normalized = autoNormalize(data);

  // Create aggregations for Left and Right modifications
  const leftModifications: Record<string, string> = {};
  const rightModifications: Record<string, string> = {};

  // Group boolean fields by Left/Right suffix
  for (const [key, value] of Object.entries(normalized)) {
    if (key.endsWith('Left') && value === BOOLEAN_TRUE_VALUE) {
      leftModifications[key] = value;
    }
    if (key.endsWith('Right') && value === BOOLEAN_TRUE_VALUE) {
      rightModifications[key] = value;
    }
  }

  return {
    ...normalized,
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
  // Flatten enclosure data (special handling due to ENCLOSURE_OPTIONS configuration)
  const enclosureData = normalizeEnclosureData(
    data.enclosureLeft,
    data.enclosureRight,
    data.enclosureLeftMm,
    data.enclosureRightMm,
  );

  // Auto-normalize all basic fields, skip enclosure and special feature fields (handled separately)
  const autoFields = autoNormalize(data, [
    'enclosureLeft',
    'enclosureRight',
    'enclosureLeftMm',
    'enclosureRightMm',
    'specialVelcroTongue',
    'specialLaceLoop',
    'specialExtraLeather',
    'specialOther',
  ]);

  return {
    ...autoFields,
    ...enclosureData,
  };
};

export const normalizeShoeDesignData = (
  data: ShoeDesignData,
): Record<string, string> => {
  // Auto-normalize all fields for shoe design
  const autoFields = autoNormalize(data, ['colorOptions']);

  // Format colorOptions as a numbered list
  const normalizedData: Record<string, string> = {
    ...autoFields,
  };

  if (data.colorOptions && Array.isArray(data.colorOptions)) {
    const colorList = data.colorOptions
      .filter(color => color && color.trim())
      .map((color, index) => `${index + 1}. ${color}`)
      .join('\n');
    normalizedData.colorOptions = colorList;
  }

  return normalizedData;
};
