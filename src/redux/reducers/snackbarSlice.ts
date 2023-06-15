import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type
type SnackarState = {
  snackbarOpen: boolean;
  snackbarType: 'success' | 'error' | 'info' | 'warning';
  snackbarMessage: string;
};
const initialState: SnackarState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state: SnackarState, { payload }: PayloadAction<SnackarState>) => {
      return {
        snackbarOpen: payload?.snackbarOpen,
        snackbarType: payload?.snackbarType,
        snackbarMessage: payload?.snackbarMessage,
      };
    },
  },
});

const { reducer, actions } = snackbarSlice;
export const { setSnackbar } = actions;
export default reducer;
