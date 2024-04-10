import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTabs from '@mui/material/Tabs';
// mui-material
import { shouldForwardProp } from '@mui/system';
// third party library for prop typecheking
import PropTypes from 'prop-types';
import React from 'react';

const Tabs = styled(MuiTabs, { shouldForwardProp })(({ theme }) => ({
  '& .MuiTab-root.MuiButtonBase-root.MuiTab-labelIcon.MuiTab-textColorPrimary': {
    minHeight: 'auto',
    minWidth: '10px',
    padding: '12px 8px',
    marginRight: '18px',
    color: 'rgb(33, 33, 33)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiSvgIcon-root.MuiSvgIcon-colorPrimary.MuiSvgIcon-fontSizeMedium.MuiTab-iconWrapper':
    {
      color: 'rgb(33, 33, 33)',
    },
  '& .Mui-selected': {
    color: 'rgb(33, 150, 243) !important',
  },
}));

Tabs.propTypes = {};

export default Tabs;

export function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
