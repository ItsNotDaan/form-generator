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
  checkFoliepas: CheckFoliepasData;
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
  checkFoliepas: emptyFormData.checkFoliepas,
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
          | 'checkFoliepas';
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
      state.checkFoliepas = emptyFormData.checkFoliepas;
    },
    clearIntakeForms: state => {
      state.intakeVLOS = emptyFormData.intakeVLOS;
      state.intakeOSA = emptyFormData.intakeOSA;
      state.intakePulman = emptyFormData.intakePulman;
      state.intakeRebacare = emptyFormData.intakeRebacare;
      state.intakeOSB = emptyFormData.intakeOSB;
      state.intakeInsoles = emptyFormData.intakeInsoles;
      state.intakeOVAC = emptyFormData.intakeOVAC;
      state.checkFoliepas = emptyFormData.checkFoliepas;
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
  setFormField,
  clearFormData,
  clearIntakeForms,
} = formDataSlice.actions;
export default formDataSlice.reducer;
