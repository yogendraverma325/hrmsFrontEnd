import { Alert, Slide, Snackbar } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/reducers';
import { setSnackbar } from '../redux/reducers/snackbarSlice';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { snackbarOpen, snackbarType, snackbarMessage } = useSelector(
    (store: RootState) => store?.snackbar,
  );

  const handleClose = (event: SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      setSnackbar({
        snackbarOpen: false,
        snackbarType: snackbarType,
        snackbarMessage: snackbarMessage,
      }),
    );
  };

  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'right',
    Transition: Slide,
  });
  const { vertical, horizontal } = state;
  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        sx={{ width: '20%' }}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        TransitionComponent={state.Transition}
        autoHideDuration={3000}
      >
        <Alert
          variant="standard"
          sx={{ width: '100%' }}
          onClose={handleClose}
          severity={snackbarType}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
