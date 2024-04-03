import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state of the 'utils' slice
type UtilState = {
  isActive: boolean;
  annoucements: string;
};

// Define the initial state for the 'utils' slice
const initialState: UtilState = {
  isActive: true,
  annoucements: `As you know, the local union may go on strike starting July 15, at 1:00 a.m. We hope to have a settlement by then, but in case we don't, we must make contingency plans.
`,
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
    publishAnnoucements: (state: UtilState, { payload }: PayloadAction<UtilState>) => {
      state.annoucements = payload.annoucements; // Update the 'payloadUpdater' property of the state with a random ID generated using the 'generateRandomId' utility function
    },
  },
});

// Extract the reducer and actions from the utilsSlice
const { reducer, actions } = utilsSlice;

// Extract the 'updatePayload', 'clearPayload', 'updateSparePayload', 'shareProps', and 'shareSlaProps' actions from the utilsSlice actions
export const { toggleModal, publishAnnoucements } = actions;
export default reducer;
