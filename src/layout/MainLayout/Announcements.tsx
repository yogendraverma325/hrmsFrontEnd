import React from 'react';
import { keyframes } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { RootState } from '@/redux/reducers';
import { publishAnnoucements } from '@/redux/reducers/utilitesSlice';
import Paper from '@mui/material/Paper';

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Define the styles for the blinking text
const styles: { [key: string]: React.CSSProperties } = {
  blink: {
    animation: `${blinkAnimation} 1s infinite`,
  },
};

const Announcements = () => {
  const Utils = useSelector((state: RootState) => state.utils);
  return Utils.annoucements ? (
    <>
      <Paper
        elevation={0}
        style={{
          zIndex: 10,
          top: 0,
          left: 'auto',
          right: 0,
          backgroundColor: '#104155',
          borderRadius: '999px',
          color: '#F0F7FF',
          boxShadow: 'none',
          backgroundImage: 'none',
          marginTop: '16px',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Typography style={{ color: 'blue' }} fontWeight={500}>
            {Utils.annoucements}
          </Typography>
        </Toolbar>
      </Paper>
    </>
  ) : (
    <></>
  );
};

export default Announcements;
