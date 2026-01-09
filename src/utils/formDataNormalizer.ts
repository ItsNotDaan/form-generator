// Utility to normalize form data and ensure all fields are exported to JSON
// This ensures Word document placeholders like ${enclosureRightCm} are always replaced

import {ENCLOSURE_OPTIONS} from '@/lib/constants/formConstants';
import type {
  IntakeVLOSData,
  IntakeOSAData,
  IntakePulmanData,
  IntakeRebacareData,
  IntakeOSBData,
  IntakeOVACData,
  IntakeInsolesData,
  ClientData,
} from '@/components/form/types/formData';

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
    if (lower === 'yes' || lower === 'ja') {
      return 'Ja';
    }
    if (lower === 'no' || lower === 'nee') {
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
  if (!obj) return {};
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    normalized[key] = normalizeValue(value);
  }
  return normalized;
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
 * Normalize client data - ensure all fields are present
 */
export const normalizeClientData = (
  client: ClientData | null | undefined,
): Record<string, string> => {
  if (!client) {
    return {
      practitionerId: '',
      practitionerName: '',
      date: '',
      intakeType: '',
      location: '',
      salutation: '',
      initials: '',
      clientName: '',
      birthDate: '',
      postalCode: '',
      houseNumber: '',
      city: '',
      address: '',
      phoneOne: '',
      phoneTwo: '',
      email: '',
      medicalIndication: '',
      insurance: '',
      specialist: '',
    };
  }

  return {
    practitionerId: client.practitionerId || '',
    practitionerName: '', // Will be resolved separately
    date: client.date || '',
    intakeType: client.intakeType || '',
    location: client.location || '',
    salutation: client.salutation || '',
    initials: client.initials || '',
    clientName: client.clientName || '',
    birthDate: client.birthDate || '',
    postalCode: client.postalCode || '',
    houseNumber: client.houseNumber || '',
    city: client.city || '',
    address: client.address || '',
    phoneOne: client.phoneOne || '',
    phoneTwo: client.phoneTwo || '',
    email: client.email || '',
    medicalIndication: client.medicalIndication || '',
    insurance: client.insurance || '',
    specialist: client.specialist || '',
  };
};

/**
 * Normalize VLOS intake data - ensure all fields are present with English names
 */
export const normalizeIntakeVLOSData = (
  data: IntakeVLOSData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return getEmptyVLOSData();
  }

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

  return {
    whichPair: data.whichPair || '',
    medicalIndication: data.medicalIndication || '',
    side: data.side || '',
    shaftHeightLeftCm: data.shaftHeightLeft || '',
    shaftHeightRightCm: data.shaftHeightRight || '',

    // Enclosure fields (flattened with English names)
    ...enclosureData,

    // Supplement shoring
    customInsoleShoringLeftEnabled: data.customInsoleShoringLeftEnabled
      ? 'Ja'
      : '',
    customInsoleShoringRightEnabled: data.customInsoleShoringRightEnabled
      ? 'Ja'
      : '',
    customInsoleShoringLeftType: data.customInsoleShoringLeftType || '',
    customInsoleShoringRightType: data.customInsoleShoringRightType || '',

    // Sole reinforcement
    soleReinforcementEnabled: data.soleReinforcementEnabled ? 'Ja' : '',
    soleReinforcementLeft: data.soleReinforcementLeft ? 'Ja' : '',
    soleReinforcementRight: data.soleReinforcementRight ? 'Ja' : '',

    // Closure
    closureType: data.closureType || '',
    entryPoint: data.entryPoint || '',
    shaftOpeningWidth: data.shaftOpeningWidth || '',

    // Tongue
    tonguePaddingEnabled: data.tonguePaddingEnabled ? 'Ja' : '',
    fixedTongueEnabled: data.fixedTongueEnabled ? 'Ja' : '',

    // Heel type and height
    heelTypeLeft: data.heelTypeLeft || '',
    heelTypeRight: data.heelTypeRight || '',
    heelHeightLeft: data.heelHeightLeft || '',
    heelHeightRight: data.heelHeightRight || '',

    // Heel wedge
    heelWedgeLeftEnabled: data.heelWedgeLeftEnabled ? 'Ja' : '',
    heelWedgeRightEnabled: data.heelWedgeRightEnabled ? 'Ja' : '',
    heelWedgeLeftType: data.heelWedgeLeftType || '',
    heelWedgeRightType: data.heelWedgeRightType || '',

    // Heel rounding
    heelRoundingLeftEnabled: data.heelRoundingLeftEnabled ? 'Ja' : '',
    heelRoundingRightEnabled: data.heelRoundingRightEnabled ? 'Ja' : '',
    heelRoundingLeftHeight: data.heelRoundingLeftHeight || '',
    heelRoundingLeftLength: data.heelRoundingLeftLength || '',
    heelRoundingRightHeight: data.heelRoundingRightHeight || '',
    heelRoundingRightLength: data.heelRoundingRightLength || '',

    // Donkey ear
    donkeyEarLeftEnabled: data.donkeyEarLeftEnabled ? 'Ja' : '',
    donkeyEarRightEnabled: data.donkeyEarRightEnabled ? 'Ja' : '',
    donkeyEarLeftType: data.donkeyEarLeftType || '',
    donkeyEarRightType: data.donkeyEarRightType || '',

    // Amputation
    amputationLeftEnabled: data.amputationLeftEnabled ? 'Ja' : '',
    amputationRightEnabled: data.amputationRightEnabled ? 'Ja' : '',

    // Rocker sole
    rockerSoleType: data.rockerSoleType || '',

    // General base code (if generated)
    generalBaseCode: data.generalBaseCode || '',

    // Special notes
    specialNotes: data.specialNotes || '',

    // Functieonderzoek
    ...pathologies,
    ...walkingDistanceAids,
    painPerception: data.painPerception || '',
    ...footInspection,
  };
};

/**
 * Get empty VLOS data structure with all fields
 */
const getEmptyVLOSData = (): Record<string, string> => {
  return {
    whichPair: '',
    medicalIndication: '',
    side: '',
    shaftHeightLeftCm: '',
    shaftHeightRightCm: '',

    // Enclosure fields
    enclosureLeftCm: '',
    enclosureRightCm: '',
    laveroLeftMm: '',
    laveroRightMm: '',
    multivormLeftMm: '',
    multivormRightMm: '',
    plastazoteLeftMm: '',
    plastazoteRightMm: '',
    orcaLeft: '',
    orcaRight: '',

    // Supplement shoring
    customInsoleShoringLeftEnabled: '',
    customInsoleShoringRightEnabled: '',
    customInsoleShoringLeftType: '',
    customInsoleShoringRightType: '',

    // Sole reinforcement
    soleReinforcementEnabled: '',
    soleReinforcementLeft: '',
    soleReinforcementRight: '',

    // Closure
    closureType: '',
    entryPoint: '',
    shaftOpeningWidth: '',

    // Tongue
    tonguePaddingEnabled: '',
    fixedTongueEnabled: '',

    // Heel type and height
    heelTypeLeft: '',
    heelTypeRight: '',
    heelHeightLeft: '',
    heelHeightRight: '',

    // Heel wedge
    heelWedgeLeftEnabled: '',
    heelWedgeRightEnabled: '',
    heelWedgeLeftType: '',
    heelWedgeRightType: '',

    // Heel rounding
    heelRoundingLeftEnabled: '',
    heelRoundingRightEnabled: '',
    heelRoundingLeftHeight: '',
    heelRoundingLeftLength: '',
    heelRoundingRightHeight: '',
    heelRoundingRightLength: '',

    // Donkey ear
    donkeyEarLeftEnabled: '',
    donkeyEarRightEnabled: '',
    donkeyEarLeftType: '',
    donkeyEarRightType: '',

    // Amputation
    amputationLeftEnabled: '',
    amputationRightEnabled: '',

    // Rocker sole
    rockerSoleType: '',

    // General base code
    generalBaseCode: '',

    // Special notes
    specialNotes: '',

    // Functieonderzoek - pathologies
    diabetes: '',
    polyNeuropathie: '',
    reuma: '',
    ms: '',
    hmsn: '',
    degeneratie: '',
    artrose: '',

    // Walking distance aids
    steunzolen: '',
    rollator: '',
    stok: '',
    elKousen: '',
    knieBrace: '',
    fysio: '',
    pedicure: '',

    // Pain perception
    painPerception: '',

    // Foot inspection
    oedeem: '',
    wisselend: '',
    structureel: '',
    dunneKwetsbareHuid: '',
    drogeHuid: '',
    doorbloedingsstoornis: '',
    halluxValgus: '',
    bunion: '',
    pesPlanoValgus: '',
    pesCavo: '',
    klauwtenen: '',

    // Leg length difference
    legLengthDifferenceLeft: '',
    legLengthDifferenceRight: '',
  };
};

/**
 * Normalize OSA intake data (extends VLOS)
 */
export const normalizeIntakeOSAData = (
  data: IntakeOSAData | null | undefined,
): Record<string, string> => {
  const vlosData = normalizeIntakeVLOSData(data);

  if (!data) {
    return {
      ...vlosData,
      digitalEnabled: '',
      heelLiftLeft: '',
      heelLiftRight: '',
      lastHeight: '',
      mtp1DeepLeft: '',
      mtp1DeepRight: '',
      clawToesEnabled: '',
      scannedWithFoil: '',
      digitalInstructions: '',
    };
  }

  return {
    ...vlosData,
    digitalEnabled: data.digitalEnabled ? 'Ja' : '',
    heelLiftLeft: data.heelLiftLeft || '',
    heelLiftRight: data.heelLiftRight || '',
    lastHeight: data.lastHeight || '',
    mtp1DeepLeft: data.mtp1DeepLeft || '',
    mtp1DeepRight: data.mtp1DeepRight || '',
    clawToesEnabled: data.clawToesEnabled ? 'Ja' : '',
    scannedWithFoil: data.scannedWithFoil ? 'Ja' : '',
    digitalInstructions: data.digitalInstructions || '',
  };
};

/**
 * Normalize Pulman intake data
 */
export const normalizeIntakePulmanData = (
  data: IntakePulmanData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return {
      whichPair: '',
      side: '',
      medicalIndication: '',
      bandagedFoot: '',
      pulmanType: '',
      shoeSize: '',
      providedSize: '',
      specialNotes: '',
    };
  }

  return {
    whichPair: data.whichPair || '',
    side: data.side || '',
    medicalIndication: data.medicalIndication || '',
    bandagedFoot: data.bandagedFoot ? 'Ja' : '',
    pulmanType: data.pulmanType || '',
    shoeSize: data.shoeSize || '',
    providedSize: data.providedSize || '',
    specialNotes: data.specialNotes || '',
  };
};

/**
 * Normalize Rebacare intake data
 */
export const normalizeIntakeRebacareData = (
  data: IntakeRebacareData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return {
      whichPair: '',
      side: '',
      medicalIndication: '',
      bandagedFoot: '',
      shoeSize: '',
      providedSize: '',
      specialNotes: '',
    };
  }

  return {
    whichPair: data.whichPair || '',
    side: data.side || '',
    medicalIndication: data.medicalIndication || '',
    bandagedFoot: data.bandagedFoot ? 'Ja' : '',
    shoeSize: data.shoeSize || '',
    providedSize: data.providedSize || '',
    specialNotes: data.specialNotes || '',
  };
};

/**
 * Normalize OSB intake data
 */
export const normalizeIntakeOSBData = (
  data: IntakeOSBData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return getEmptyOSBData();
  }

  // Flatten goal options
  const goal: Record<string, string> = {
    doelPasvorm: data.goal?.doelPasvorm ? 'Ja' : '',
    doelStabiliteit: data.goal?.doelStabiliteit ? 'Ja' : '',
    doelLoopAfstandVergroten: data.goal?.doelLoopAfstandVergroten ? 'Ja' : '',
    doelOndersteuningGewelf: data.goal?.doelOndersteuningGewelf ? 'Ja' : '',
  };

  return {
    whichPair: data.whichPair || '',
    medicalIndication: data.medicalIndication || '',
    side: data.side || '',

    // Goal
    ...goal,

    // Walking function
    walkingFunctionIndication: data.walkingFunctionIndication || '',
    walkingFunctionOtherText: data.walkingFunctionOtherText || '',

    // Supplier and product
    supplierName: data.supplierName || '',
    orderDate: data.orderDate || '',
    productArticleCode: data.productSpecifications?.articleCode || '',
    productLengthSize: data.productSpecifications?.lengthSize || '',
    productWidth: data.productSpecifications?.width || '',
    productColor: data.productSpecifications?.color || '',
    productClosure: data.productSpecifications?.closure || '',

    // Heel raise
    heelRaiseLeft: data.heelRaiseLeft || '',
    heelRaiseRight: data.heelRaiseRight || '',

    // Insole
    insoleTypeGeneral: data.insoleTypeGeneral || '',
    insoleOtherText: data.insoleOtherText || '',
    insoleMidfootCorrection: data.insoleMidfootCorrection || '',
    insoleForefootCorrection: data.insoleForefootCorrection || '',
    insoleForefootPad: data.insoleForefootPad || '',

    // Supplement
    customInsoleIndividualLeft: data.customInsoleIndividualLeft ? 'Ja' : '',
    customInsoleIndividualRight: data.customInsoleIndividualRight ? 'Ja' : '',

    // Sole reinforcement
    soleReinforcementLeft: data.soleReinforcementLeft ? 'Ja' : '',
    soleReinforcementRight: data.soleReinforcementRight ? 'Ja' : '',

    // Rocker roll
    rockerRollCmLeft: data.rockerRollCmLeft || '',
    rockerRollCmRight: data.rockerRollCmRight || '',

    // Special notes
    specialNotes: data.specialNotes || '',
  };
};

const getEmptyOSBData = (): Record<string, string> => {
  return {
    whichPair: '',
    medicalIndication: '',
    side: '',

    // Goal
    doelPasvorm: '',
    doelStabiliteit: '',
    doelLoopAfstandVergroten: '',
    doelOndersteuningGewelf: '',

    // Walking function
    walkingFunctionIndication: '',
    walkingFunctionOtherText: '',

    // Supplier and product
    supplierName: '',
    orderDate: '',
    productArticleCode: '',
    productLengthSize: '',
    productWidth: '',
    productColor: '',
    productClosure: '',

    // Heel raise
    heelRaiseLeft: '',
    heelRaiseRight: '',

    // Insole
    insoleTypeGeneral: '',
    insoleOtherText: '',
    insoleMidfootCorrection: '',
    insoleForefootCorrection: '',
    insoleForefootPad: '',

    // Supplement
    customInsoleIndividualLeft: '',
    customInsoleIndividualRight: '',

    // Sole reinforcement
    soleReinforcementLeft: '',
    soleReinforcementRight: '',

    // Rocker roll
    rockerRollCmLeft: '',
    rockerRollCmRight: '',

    // Special notes
    specialNotes: '',
  };
};

/**
 * Normalize OVAC intake data
 */
export const normalizeIntakeOVACData = (
  data: IntakeOVACData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return getEmptyOVACData();
  }

  return {
    whichPair: data.whichPair || '',
    medicalIndication: data.medicalIndication || '',

    // Omschrijving items (flat structure)
    customInsoleIndividualLeft: data.customInsoleIndividualLeft ? 'Ja' : '',
    customInsoleIndividualRight: data.customInsoleIndividualRight ? 'Ja' : '',
    simpleRockerLeft: data.simpleRockerLeft ? 'Ja' : '',
    simpleRockerRight: data.simpleRockerRight ? 'Ja' : '',
    complicatedRockerLeft: data.complicatedRockerLeft ? 'Ja' : '',
    complicatedRockerRight: data.complicatedRockerRight ? 'Ja' : '',
    heelAdjustment2cmLeft: data.heelAdjustment2cmLeft ? 'Ja' : '',
    heelAdjustment2cmRight: data.heelAdjustment2cmRight ? 'Ja' : '',
    heelSoleElevation3cmLeft: data.heelSoleElevation3cmLeft ? 'Ja' : '',
    heelSoleElevation3cmRight: data.heelSoleElevation3cmRight ? 'Ja' : '',
    heelSoleElevation7cmLeft: data.heelSoleElevation7cmLeft ? 'Ja' : '',
    heelSoleElevation7cmRight: data.heelSoleElevation7cmRight ? 'Ja' : '',
    adjustedHeelsLeft: data.adjustedHeelsLeft ? 'Ja' : '',
    adjustedHeelsRight: data.adjustedHeelsRight ? 'Ja' : '',
    soleReinforcementLeft: data.soleReinforcementLeft ? 'Ja' : '',
    soleReinforcementRight: data.soleReinforcementRight ? 'Ja' : '',
    newInstepClosureLeft: data.newInstepClosureLeft ? 'Ja' : '',
    newInstepClosureRight: data.newInstepClosureRight ? 'Ja' : '',

    // Verkorting
    shorteningLeft: data.shorteningLeft ? 'Ja' : '',
    shorteningRight: data.shorteningRight ? 'Ja' : '',
    forefootCmLeft: data.forefootCmLeft || '',
    forefootCmRight: data.forefootCmRight || '',
    heelCmLeft: data.heelCmLeft || '',
    heelCmRight: data.heelCmRight || '',

    // Measurements
    rockerRollCmLeft: data.rockerRollCmLeft || '',
    rockerRollCmRight: data.rockerRollCmRight || '',
    heelSoleElevationCmLeft: data.heelSoleElevationCmLeft || '',
    heelSoleElevationCmRight: data.heelSoleElevationCmRight || '',

    // Steunzolen (optional)
    insoleTypeGeneral: data.insoleTypeGeneral || '',
    insoleOtherText: data.insoleOtherText || '',
    insoleMidfootCorrection: data.insoleMidfootCorrection || '',
    insoleForefootCorrection: data.insoleForefootCorrection || '',
    insoleForefootPad: data.insoleForefootPad || '',
    heelRaiseLeft: data.heelRaiseLeft || '',
    heelRaiseRight: data.heelRaiseRight || '',
    insolePrice: data.insolePrice?.toString() || '',
    insolePriceName: data.insolePriceName || '',

    // Special notes
    specialNotes: data.specialNotes || '',
  };
};

const getEmptyOVACData = (): Record<string, string> => {
  return {
    whichPair: '',
    medicalIndication: '',

    // Omschrijving items
    customInsoleIndividualLeft: '',
    customInsoleIndividualRight: '',
    simpleRockerLeft: '',
    simpleRockerRight: '',
    complicatedRockerLeft: '',
    complicatedRockerRight: '',
    heelAdjustment2cmLeft: '',
    heelAdjustment2cmRight: '',
    heelSoleElevation3cmLeft: '',
    heelSoleElevation3cmRight: '',
    heelSoleElevation7cmLeft: '',
    heelSoleElevation7cmRight: '',
    adjustedHeelsLeft: '',
    adjustedHeelsRight: '',
    soleReinforcementLeft: '',
    soleReinforcementRight: '',
    newInstepClosureLeft: '',
    newInstepClosureRight: '',

    // Verkorting
    shorteningLeft: '',
    shorteningRight: '',
    forefootCmLeft: '',
    forefootCmRight: '',
    heelCmLeft: '',
    heelCmRight: '',

    // Measurements
    rockerRollCmLeft: '',
    rockerRollCmRight: '',
    heelSoleElevationCmLeft: '',
    heelSoleElevationCmRight: '',

    // Steunzolen
    insoleTypeGeneral: '',
    insoleOtherText: '',
    insoleMidfootCorrection: '',
    insoleForefootCorrection: '',
    insoleForefootPad: '',
    heelRaiseLeft: '',
    heelRaiseRight: '',
    insolePrice: '',
    insolePriceName: '',

    // Special notes
    specialNotes: '',
  };
};

/**
 * Normalize Insoles intake data
 */
export const normalizeIntakeInsolesData = (
  data: IntakeInsolesData | null | undefined,
): Record<string, string> => {
  if (!data) {
    return {
      whichPair: '',
      medicalIndication: '',
      shoeSize: '',
      heelRaiseEnabled: '',
      heelRaiseLeft: '',
      heelRaiseRight: '',
      insoleTypeGeneral: '',
      insoleOtherText: '',
      insoleMidfootCorrection: '',
      insoleForefootCorrection: '',
      insoleForefootPad: '',
      insolePrice: '',
      insolePriceName: '',
      finalPrice: '',
      specialNotes: '',
    };
  }

  return {
    whichPair: data.whichPair || '',
    medicalIndication: data.medicalIndication || '',
    shoeSize: data.shoeSize || '',
    heelRaiseEnabled: data.heelRaiseEnabled ? 'Ja' : '',
    heelRaiseLeft: data.heelRaiseLeft || '',
    heelRaiseRight: data.heelRaiseRight || '',
    insoleTypeGeneral: data.insoleTypeGeneral || '',
    insoleOtherText: data.insoleOtherText || '',
    insoleMidfootCorrection: data.insoleMidfootCorrection || '',
    insoleForefootCorrection: data.insoleForefootCorrection || '',
    insoleForefootPad: data.insoleForefootPad || '',
    insolePrice: data.insolePrice?.toString() || '',
    insolePriceName: data.insolePriceName || '',
    finalPrice: data.finalPrice?.toString() || '',
    specialNotes: data.specialNotes || '',
  };
};
