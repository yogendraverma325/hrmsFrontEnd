import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state of the 'utils' slice
type UtilState = {
  isActive: boolean;
};

// Define the initial state for the 'utils' slice
const initialState: UtilState = {
  isActive: false,
};

// Create a slice using the createSlice function from Redux Toolkit
const utilsSlice = createSlice({
  name: 'utils', // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    // Define the 'updatePayload' reducer
    toggleModal: (state: UtilState, { payload }: PayloadAction<UtilState>) => {
      state.isActive = payload.isActive; // Update the 'payloadUpdater' property of the state with a random ID generated using the 'generateRandomId' utility function
    },
  },
});

// Extract the reducer and actions from the utilsSlice
const { reducer, actions } = utilsSlice;

// Extract the 'updatePayload', 'clearPayload', 'updateSparePayload', 'shareProps', and 'shareSlaProps' actions from the utilsSlice actions
export const { toggleModal } = actions;
export default reducer;
