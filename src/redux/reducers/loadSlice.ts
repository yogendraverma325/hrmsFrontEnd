import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type definations
type loadState = {
  loading: true | false;
};
// initial state
const initialState: loadState = { loading: false };

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    enableLoading: (state: loadState, { payload }: PayloadAction<loadState>) => {
      state.loading = payload.loading;
    },
  },
});

const { reducer, actions } = loadSlice;
export const { enableLoading } = actions;
export default reducer;
