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
      
          <Typography variant='h6' component='h5'>
            {Utils.annoucements}
          </Typography>
        
    </>
  ) : (
    <></>
  );
};

export default Announcements;
