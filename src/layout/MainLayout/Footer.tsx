import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 'auto',
        fontSize: 4,
        bottom: 0,
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        height: 45,
        color: 'black',
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ fontSize: 'small' }}>
          Team Computers Pvt. Ltd. © 2024 | All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
