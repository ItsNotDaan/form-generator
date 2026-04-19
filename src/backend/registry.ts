/**
 * Central Form Registry
 *
 * This is the SINGLE SOURCE OF TRUTH for all form metadata.
 *
 * When adding a new form to the system:
 * 1. Add a new entry to FORM_REGISTRY below.
 * 2. Add the form's TypeScript types to src/backend/types/formData.ts
 * 3. Run `npm run generate:empty-data` to update the templates.
 * 4. Add a Redux action to src/domain/store/slices/formData.ts.
 * 5. Create the form page under src/pages/.
 *
 * All other files (import dialog, form-selection, form-results, localStorage helpers)
 * derive their form lists automatically from this registry.
 */

import type {FormStoreKey} from '@/backend/types/importExport';
import {Routes} from '@/backend/utils/routes';
import {
  normalizeIntakeVLOSData,
  normalizeIntakeOSAData,
  normalizeIntakePulmanData,
  normalizeIntakeRebacareData,
  normalizeIntakeOSBData,
  normalizeIntakeOVACData,
  normalizeIntakeSteunzolenData,
  normalizeCheckFoliepasData,
  normalizeShoeDesignData,
} from '@/backend/normalizers/formDataNormalizer';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface FormRegistryEntry {
  /** Redux store key – must match a property name in FormDataState (except 'client'). */
  storeKey: FormStoreKey;
  /** Key used in localStorage for auto-save. */
  storageKey: string;
  /** URL route for the form page. */
  route: string;
  /** Translation key for the form title (used in form.json). */
  labelKey: string;
  /** Translation key for the form description. */
  descriptionKey: string;
  /**
   * Function that normalizes the raw form data for JSON export.
   * Receives `any` so the registry stays generic; the caller provides the correct data.
   */

  normalizer: (data: any) => Record<string, string>;
  /**
   * The value of `clientData.intakeType` that activates this form.
   * Only present for forms that are selected through the intake type selector.
   * Undefined for supplementary forms (checkFoliepas, shoeDesign).
   */
  intakeTypeKey?: string;
  /**
   * Whether medical codes should be generated when this intake form is active.
   */
  hasCodeGeneration?: boolean;
  /**
   * Whether a general base code should be injected into the exported results
   * for this form (subset of hasCodeGeneration forms).
   */
  hasGeneralBaseCode?: boolean;
}

// ---------------------------------------------------------------------------
// REGISTRY
// ---------------------------------------------------------------------------

/**
 * All forms registered in the system, in the order they appear in the UI.
 *
 * Adding or removing an entry here is the ONLY change required to include
 * or exclude a form from the import dialog, form-selection page, form-results
 * submitted data section, and localStorage cleanup.
 */
export const FORM_REGISTRY: FormRegistryEntry[] = [
  {
    storeKey: 'intakeVLOS',
    storageKey: 'intakeVLOS',
    route: Routes.form_intake_vlos,
    labelKey: 'intakeVlos',
    descriptionKey: 'intakeVlosDescription',
    normalizer: normalizeIntakeVLOSData,
    intakeTypeKey: 'VLOS',
    hasCodeGeneration: true,
    hasGeneralBaseCode: true,
  },
  {
    storeKey: 'intakeOSA',
    storageKey: 'intakeOSA',
    route: Routes.form_intake_osa,
    labelKey: 'intakeOsa',
    descriptionKey: 'intakeOsaDescription',
    normalizer: normalizeIntakeOSAData,
    intakeTypeKey: 'OSA',
    hasCodeGeneration: true,
    hasGeneralBaseCode: true,
  },
  {
    storeKey: 'intakePulman',
    storageKey: 'intakePulman',
    route: Routes.form_intake_pulman,
    labelKey: 'intakePulman',
    descriptionKey: 'intakePulmanDescription',
    normalizer: normalizeIntakePulmanData,
    intakeTypeKey: 'Pulman',
  },
  {
    storeKey: 'intakeRebacare',
    storageKey: 'intakeRebacare',
    route: Routes.form_intake_rebacare,
    labelKey: 'intakeRebacare',
    descriptionKey: 'intakeRebacareDescription',
    normalizer: normalizeIntakeRebacareData,
    intakeTypeKey: 'Rebacare',
  },
  {
    storeKey: 'intakeOSB',
    storageKey: 'intakeOSB',
    route: Routes.form_intake_osb,
    labelKey: 'intakeOsb',
    descriptionKey: 'intakeOsbDescription',
    normalizer: normalizeIntakeOSBData,
    intakeTypeKey: 'OSB',
    hasCodeGeneration: true,
    hasGeneralBaseCode: true,
  },
  {
    storeKey: 'intakeOVAC',
    storageKey: 'intakeOVAC',
    route: Routes.form_intake_ovac,
    labelKey: 'intakeOvac',
    descriptionKey: 'intakeOvacDescription',
    normalizer: normalizeIntakeOVACData,
    intakeTypeKey: 'OVAC',
    hasCodeGeneration: true,
  },
  {
    storeKey: 'intakeInsoles',
    storageKey: 'intakeInsoles',
    route: Routes.form_intake_steunzolen,
    labelKey: 'intakeInsoles',
    descriptionKey: 'intakeInsolesDescription',
    normalizer: normalizeIntakeSteunzolenData,
    intakeTypeKey: 'Steunzolen',
  },
  {
    storeKey: 'checkFoliepas',
    storageKey: 'checkFoliepas',
    route: Routes.form_check_foliepas,
    labelKey: 'checkFoliepas',
    descriptionKey: 'checkFoliepasDescription',
    normalizer: normalizeCheckFoliepasData,
  },
  {
    storeKey: 'shoeDesign',
    storageKey: 'shoeDesign',
    route: Routes.form_create_shoedesign,
    labelKey: 'createShoeDesign',
    descriptionKey: 'createShoeDesignDescription',
    normalizer: normalizeShoeDesignData,
  },
];

// ---------------------------------------------------------------------------
// DERIVED LOOKUP HELPERS
// ---------------------------------------------------------------------------

/** All localStorage storage keys for form auto-save data. */
export const FORM_STORAGE_KEYS: string[] = FORM_REGISTRY.map(f => f.storageKey);

/** Forms that are activated through the intake type selector. */
export const INTAKE_FORMS: FormRegistryEntry[] = FORM_REGISTRY.filter(
  f => f.intakeTypeKey !== undefined,
);

/** Supplementary forms (not tied to an intake type). */
export const SUPPLEMENTARY_FORMS: FormRegistryEntry[] = FORM_REGISTRY.filter(
  f => f.intakeTypeKey === undefined,
);

/** Intake type values for which medical codes are generated. */
export const INTAKE_TYPES_WITH_CODES: Set<string> = new Set(
  INTAKE_FORMS.filter(f => f.hasCodeGeneration).map(f => f.intakeTypeKey!),
);

/** Map from `clientData.intakeType` value → registry entry. */
export const INTAKE_FORM_BY_TYPE: Record<string, FormRegistryEntry> =
  Object.fromEntries(INTAKE_FORMS.map(f => [f.intakeTypeKey!, f]));

/** Map from route path → registry entry. */
export const FORM_BY_ROUTE: Record<string, FormRegistryEntry> =
  Object.fromEntries(FORM_REGISTRY.map(f => [f.route, f]));
