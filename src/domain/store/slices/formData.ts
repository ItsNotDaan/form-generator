import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClientData,
  IntakeVLOSData,
  IntakePulmanData,
  IntakeOSBData,
  IntakeOVACData,
  IntakeSteunzolenData,
} from '@/presentation/form/types/formData';

export interface FormDataState {
  client: ClientData | null;
  intakeVLOS: IntakeVLOSData | null;
  intakePulman: IntakePulmanData | null;
  intakeOSB: IntakeOSBData | null;
  intakeSteunzolen: IntakeSteunzolenData | null;
  intakeOVAC: IntakeOVACData | null;
}

const initialState: FormDataState = {
  client: null,
  intakeVLOS: null,
  intakePulman: null,
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
    setIntakePulmanData: (state, action: PayloadAction<IntakePulmanData>) => {
      state.intakePulman = action.payload;
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
      state.intakePulman = null;
      state.intakeOSB = null;
      state.intakeSteunzolen = null;
      state.intakeOVAC = null;
    },
  },
});

export const {
  setClientData,
  setIntakeVLOSData,
  setIntakePulmanData,
  setIntakeOSBData,
  setIntakeOVACData,
  setIntakeSteunzolenData,
  clearFormData,
} = formDataSlice.actions;
export default formDataSlice.reducer;
