import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { RootState } from '@/redux/reducers';
import { publishAnnoucements } from '@/redux/reducers/utilitesSlice';
import Paper from '@mui/material/Paper';

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
            borderRadius: '999px',
            minHeight: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {Utils.annoucements}
        </Toolbar>
      </Paper>
    </>
  ) : (
    <></>
  );
};

export default Announcements;
