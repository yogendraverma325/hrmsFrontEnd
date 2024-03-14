import { Components } from '@mui/material';
import { Component } from 'react';

import type { Theme } from '../types';
import pxToRem from '../functions/pxToRem';
import borders from '../borders';

const { borderWidth, borderRadius } = borders;

export const MuiTextField = {
  styleOverrides: {
    root: {
      height: `${pxToRem(20)} !important`,
      display: 'flex !important',
      // padding: `${pxToRem(8)} ${pxToRem(28)} ${pxToRem(8)} ${pxToRem(12)} !important`,
      border: `${borderWidth[1]} solid '#d2d6da'`,
      borderRadius: `${borderRadius.md} !important`,
    },
  },
};
