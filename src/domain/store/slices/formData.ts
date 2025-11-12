import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientData, IntakeVLOSData } from '@/presentation/form/types/formData';

export interface FormDataState {
  client: ClientData | null;
  intakeVLOS: IntakeVLOSData | null;
  // Voor toekomstige intake forms
  intakeOSA: any | null;
  intakeOSB: any | null;
  intakeSteunsolen: any | null;
  intakeOVAC: any | null;
}

const initialState: FormDataState = {
  client: null,
  intakeVLOS: null,
  intakeOSA: null,
  intakeOSB: null,
  intakeSteunsolen: null,
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
    clearFormData: (state) => {
      state.client = null;
      state.intakeVLOS = null;
      state.intakeOSA = null;
      state.intakeOSB = null;
      state.intakeSteunsolen = null;
      state.intakeOVAC = null;
    },
  },
});

export const { setClientData, setIntakeVLOSData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
