import { styled } from '@mui/material';
import MuiOutlinedInput from '@mui/material/OutlinedInput';
import { shouldForwardProp } from '@mui/system';
import React from 'react';

export const OutlinedInput = styled(MuiOutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
      textFillColor: theme.palette.grey[800],
      opacity: 1,
    },
  }),
);
