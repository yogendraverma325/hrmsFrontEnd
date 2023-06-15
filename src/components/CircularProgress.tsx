import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
// Mui imports
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducers';

const CircularLoading = (props: any) => {
  const { loading } = useSelector((store: RootState) => store.load);

  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 900,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={50}
          thickness={5}
          {...props}
          value={100}
        />

        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={50}
          thickness={5}
          {...props}
        />
      </Box>
    </Backdrop>
  );
};

export default CircularLoading;
