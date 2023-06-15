import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers';

// Configure the Redux store using `configureStore` from Redux Toolkit
export const store = configureStore({
  reducer: rootReducer, // Set the root reducer for the store
});

// Infer the `RootState` type from the store's state using `typeof store.getState()`
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { load: LoadState, snackbar: SnackbarState, customization: CustomizationState, message: MessageState, menu: MenuState, utils: UtilsState }

// Infer the `AppDispatch` type from the store's dispatch function using `typeof store.dispatch`
export type AppDispatch = typeof store.dispatch;
