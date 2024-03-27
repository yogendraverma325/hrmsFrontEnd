import { Autocomplete, TextField } from '@mui/material';
import pxToRem from '../functions/pxToRem';
import borders from '../borders';

export const MuiAutocomplete = {
  styleOverrides: {
    inputRoot: {
      height: `${pxToRem(42)} !important`, // Adjust the height value as needed
      textAlign: 'center', // Center the text horizontally
      marginBottom: '40px',
    },
  },
};
