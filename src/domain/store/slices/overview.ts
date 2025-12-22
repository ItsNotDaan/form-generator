import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface OverviewState {
  title: string;
}

const initialState: OverviewState = {
  title: 'Overview',
};

export const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetOverviewState: () => initialState,
  },
});

export const {resetOverviewState} = overviewSlice.actions;
export const getOverviewState = (state: RootState) => state.overview;

export default overviewSlice.reducer;
