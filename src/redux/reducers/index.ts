// Import the necessary functions and reducers from Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';

import loadReducer from './loadSlice';
import snackbarReducer from './snackbarSlice';
// Import individual reducers from their respective files
import utilsReducer from './utilitesSlice';
import customizationSlice from './customizationSlice'
// Combine the individual reducers into a single root reducer
const rootReducer = combineReducers({
  utils: utilsReducer,
  load: loadReducer,
  snackbar: snackbarReducer,
  customization: customizationSlice
});

// Define the type of the root state based on the return type of the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Export the root reducer as the default export of this module
export default rootReducer;
