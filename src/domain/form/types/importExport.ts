import type {
  ClientData,
  IntakeVLOSData,
  IntakeOSAData,
  IntakePulmanData,
  IntakeRebacareData,
  IntakeOSBData,
  IntakeOVACData,
  IntakeInsolesData,
  CheckFoliepasData,
  ShoeDesignData,
} from './formData';

/**
 * Raw form data included in the export JSON for round-trip import support.
 * Keys mirror the Redux FormDataState keys for consistent mapping.
 */
export interface FormRawData {
  client: ClientData;
  intakeVLOS?: IntakeVLOSData;
  intakeOSA?: IntakeOSAData;
  intakePulman?: IntakePulmanData;
  intakeRebacare?: IntakeRebacareData;
  intakeOSB?: IntakeOSBData;
  intakeOVAC?: IntakeOVACData;
  intakeInsoles?: IntakeInsolesData;
  checkFoliepas?: CheckFoliepasData;
  shoeDesign?: ShoeDesignData;
}

/**
 * The complete JSON export structure.
 * Contains both normalized/translated data (for external apps) and raw data (for re-import).
 */
export interface FormExportJSON {
  clientData?: Record<string, string>;
  intakeVLOS?: Record<string, string>;
  intakeOSA?: Record<string, string>;
  intakePulman?: Record<string, string>;
  intakeRebacare?: Record<string, string>;
  intakeOSB?: Record<string, string>;
  intakeOVAC?: Record<string, string>;
  intakeInsoles?: Record<string, string>;
  checkFoliepas?: Record<string, string>;
  shoeDesign?: Record<string, string>;
  medicalCodes?: Record<string, string>;
  codeWarnings?: string[];
  /** Raw form data for re-importing into the form generator */
  _rawData?: FormRawData;
  generatedAt?: string;
}
