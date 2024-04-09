import { Components } from '@mui/material';
import { Component } from 'react';

import pxToRem from '@/themes/functions/pxToRem';

export const MuiSelect = {
  styleOverrides: {
    root: {
      height: pxToRem(42),
    },
    select: {
      display: 'grid',
      alignItems: 'center',
      padding: `0 ${pxToRem(12)} !important`,

      '& .Mui-selected': {
        backgroundColor: 'transparent',
      },
    },

    selectMenu: {
      background: 'none',
      height: 'none',
      minHeight: 'none',
      overflow: 'unset',
    },

    icon: {
      display: 'none',
    },
  },
};
