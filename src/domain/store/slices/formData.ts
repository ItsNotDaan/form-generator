import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
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
} from '@/domain/form/types/formData';
import {emptyFormData} from '@/domain/form/types/formDataTemplates.generated';

export interface FormDataState {
  client: ClientData;
  intakeVLOS: IntakeVLOSData;
  intakeOSA: IntakeOSAData;
  intakePulman: IntakePulmanData;
  intakeRebacare: IntakeRebacareData;
  intakeOSB: IntakeOSBData;
  intakeInsoles: IntakeInsolesData;
  intakeOVAC: IntakeOVACData;
  checkFoliepas: CheckFoliepasData | null;
  shoeDesign: ShoeDesignData | null;
}

const initialState: FormDataState = {
  client: emptyFormData.client,
  intakeVLOS: emptyFormData.intakeVLOS,
  intakeOSA: emptyFormData.intakeOSA,
  intakePulman: emptyFormData.intakePulman,
  intakeRebacare: emptyFormData.intakeRebacare,
  intakeOSB: emptyFormData.intakeOSB,
  intakeInsoles: emptyFormData.intakeInsoles,
  intakeOVAC: emptyFormData.intakeOVAC,
  checkFoliepas: null,
  shoeDesign: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setClientData: (state, action: PayloadAction<ClientData>) => {
      state.client = action.payload;
    },
    setIntakeVLOSData: (state, action: PayloadAction<IntakeVLOSData>) => {
      state.intakeVLOS = action.payload;
    },
    setIntakeOSAData: (state, action: PayloadAction<IntakeOSAData>) => {
      state.intakeOSA = action.payload;
    },
    setIntakePulmanData: (state, action: PayloadAction<IntakePulmanData>) => {
      state.intakePulman = action.payload;
    },
    setIntakeRebacareData: (
      state,
      action: PayloadAction<IntakeRebacareData>,
    ) => {
      state.intakeRebacare = action.payload;
    },
    setIntakeOSBData: (state, action: PayloadAction<IntakeOSBData>) => {
      state.intakeOSB = action.payload;
    },
    setIntakeOVACData: (state, action: PayloadAction<IntakeOVACData>) => {
      state.intakeOVAC = action.payload;
    },
    setIntakeSteunzolenData: (
      state,
      action: PayloadAction<IntakeInsolesData>,
    ) => {
      state.intakeInsoles = action.payload;
    },
    setCheckFoliepasData: (state, action: PayloadAction<CheckFoliepasData>) => {
      state.checkFoliepas = action.payload;
    },
    setShoeDesignData: (state, action: PayloadAction<ShoeDesignData>) => {
      state.shoeDesign = action.payload;
    },
    /**
     * Generic setter that can update any form field
     * Usage: dispatch(setFormField({formType: 'intakeVLOS', data: {...}}))
     */
    setFormField: (
      state,
      action: PayloadAction<{
        formType:
          | 'client'
          | 'intakeVLOS'
          | 'intakeOSA'
          | 'intakePulman'
          | 'intakeRebacare'
          | 'intakeOSB'
          | 'intakeOVAC'
          | 'intakeInsoles'
          | 'checkFoliepas'
          | 'shoeDesign';
        data: any;
      }>,
    ) => {
      const {formType, data} = action.payload;
      (state as any)[formType] = data;
    },
    clearFormData: state => {
      state.client = emptyFormData.client;
      state.intakeVLOS = emptyFormData.intakeVLOS;
      state.intakeOSA = emptyFormData.intakeOSA;
      state.intakePulman = emptyFormData.intakePulman;
      state.intakeRebacare = emptyFormData.intakeRebacare;
      state.intakeOSB = emptyFormData.intakeOSB;
      state.intakeInsoles = emptyFormData.intakeInsoles;
      state.intakeOVAC = emptyFormData.intakeOVAC;
      state.checkFoliepas = null;
      state.shoeDesign = null;
    },
    clearIntakeForms: state => {
      state.intakeVLOS = emptyFormData.intakeVLOS;
      state.intakeOSA = emptyFormData.intakeOSA;
      state.intakePulman = emptyFormData.intakePulman;
      state.intakeRebacare = emptyFormData.intakeRebacare;
      state.intakeOSB = emptyFormData.intakeOSB;
      state.intakeInsoles = emptyFormData.intakeInsoles;
      state.intakeOVAC = emptyFormData.intakeOVAC;
      state.checkFoliepas = null;
      state.shoeDesign = null;
    },
    /**
     * Import selected form data from a parsed JSON export.
     * Clears all existing form data first, then restores only the provided forms.
     */
    importFormData: (state, action: PayloadAction<Partial<FormDataState>>) => {
      // Reset to empty state first
      state.client = emptyFormData.client;
      state.intakeVLOS = emptyFormData.intakeVLOS;
      state.intakeOSA = emptyFormData.intakeOSA;
      state.intakePulman = emptyFormData.intakePulman;
      state.intakeRebacare = emptyFormData.intakeRebacare;
      state.intakeOSB = emptyFormData.intakeOSB;
      state.intakeInsoles = emptyFormData.intakeInsoles;
      state.intakeOVAC = emptyFormData.intakeOVAC;
      state.checkFoliepas = null;
      state.shoeDesign = null;

      // Restore only the provided (selected) forms
      const data = action.payload;
      if (data.client !== undefined) {
        state.client = data.client;
      }
      if (data.intakeVLOS !== undefined) {
        state.intakeVLOS = data.intakeVLOS;
      }
      if (data.intakeOSA !== undefined) {
        state.intakeOSA = data.intakeOSA;
      }
      if (data.intakePulman !== undefined) {
        state.intakePulman = data.intakePulman;
      }
      if (data.intakeRebacare !== undefined) {
        state.intakeRebacare = data.intakeRebacare;
      }
      if (data.intakeOSB !== undefined) {
        state.intakeOSB = data.intakeOSB;
      }
      if (data.intakeOVAC !== undefined) {
        state.intakeOVAC = data.intakeOVAC;
      }
      if (data.intakeInsoles !== undefined) {
        state.intakeInsoles = data.intakeInsoles;
      }
      if (data.checkFoliepas !== undefined) {
        state.checkFoliepas = data.checkFoliepas;
      }
      if (data.shoeDesign !== undefined) {
        state.shoeDesign = data.shoeDesign;
      }
    },
  },
});

export const {
  setClientData,
  setIntakeVLOSData,
  setIntakeOSAData,
  setIntakePulmanData,
  setIntakeRebacareData,
  setIntakeOSBData,
  setIntakeOVACData,
  setIntakeSteunzolenData,
  setCheckFoliepasData,
  setShoeDesignData,
  setFormField,
  clearFormData,
  clearIntakeForms,
  importFormData,
} = formDataSlice.actions;
export default formDataSlice.reducer;
