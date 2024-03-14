import type { Components } from '@mui/material/styles';

import type { Theme } from '../types';

export const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      borderBottom:
        'var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)',
    },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
};
