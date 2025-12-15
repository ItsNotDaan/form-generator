import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ClientData,
  IntakeVLOSData,
  IntakeOSAData,
  IntakePulmanData,
  IntakeRebacareData,
  IntakeOSBData,
  IntakeOVACData,
  IntakeSteunzolenData,
} from '@/components/form/types/formData';

export interface FormDataState {
  client: ClientData | null;
  intakeVLOS: IntakeVLOSData | null;
  intakeOSA: IntakeOSAData | null;
  intakePulman: IntakePulmanData | null;
  intakeRebacare: IntakeRebacareData | null;
  intakeOSB: IntakeOSBData | null;
  intakeSteunzolen: IntakeSteunzolenData | null;
  intakeOVAC: IntakeOVACData | null;
}

const initialState: FormDataState = {
  client: null,
  intakeVLOS: null,
  intakeOSA: null,
  intakePulman: null,
  intakeRebacare: null,
  intakeOSB: null,
  intakeSteunzolen: null,
  intakeOVAC: null,
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
      action: PayloadAction<IntakeRebacareData>
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
      action: PayloadAction<IntakeSteunzolenData>
    ) => {
      state.intakeSteunzolen = action.payload;
    },
    clearFormData: state => {
      state.client = null;
      state.intakeVLOS = null;
      state.intakeOSA = null;
      state.intakePulman = null;
      state.intakeRebacare = null;
      state.intakeOSB = null;
      state.intakeSteunzolen = null;
      state.intakeOVAC = null;
    },
    clearIntakeForms: state => {
      state.intakeVLOS = null;
      state.intakeOSA = null;
      state.intakePulman = null;
      state.intakeRebacare = null;
      state.intakeOSB = null;
      state.intakeSteunzolen = null;
      state.intakeOVAC = null;
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
  clearFormData,
  clearIntakeForms,
} = formDataSlice.actions;
export default formDataSlice.reducer;
