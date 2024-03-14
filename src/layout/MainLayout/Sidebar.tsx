import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import MenuList from './Sidebar/MenuList';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'; // If you're using React Router
import Typography from '@mui/material/Typography';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { RootState } from '@/redux/reducers';
import { toggleModal } from '@/redux/reducers/utilitesSlice';
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const drawer = (anchor='left') => (
  <Box
    sx={{ width: 250 }}>
    
    <Box>
          <Box>
              <DrawerHeader>
              <div className="logo-wrap">
              <Link to="index.html" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img className="brand-img" src="/src/assets/images/Fevicon-white.png" alt="brand" style={{ width: '26px', height: '26px', marginRight: '8px' }} />
              <Typography variant="h6" component="span" className="brand-text">
              Team Computers
              </Typography>
              </Link>
              </div>
              </DrawerHeader>
          </Box>
        </Box>
        <BrowserView>
          <PerfectScrollbar
            component="div"
            style={{
              height:'calc(100vh - 56px)',
             
            }}
          >
            <MenuList />
         
            
          </PerfectScrollbar>
        </BrowserView>
        <MobileView>
          <Box sx={{ px: 2 }}>
            {/* <MenuList /> */}
         
          </Box>
        </MobileView>
  </Box>
);
const Sidebar = () => {
  const Utils = useSelector((state:RootState) => state.utils);
  const dispatch = useDispatch();
  return (
    <SwipeableDrawer
    sx={{
      backgroundColor: 'none',
      '& .MuiDrawer-paper': {
          backgroundColor: '#104155',
          color: 'white', // Set text color to white
          borderRight: 'none',
      },
      
      
  }}
      open={Utils.isActive}
      onClose={() =>dispatch(toggleModal({isActive:false}))} 
      onOpen={() => dispatch(toggleModal({isActive:true}))}
    >
      {drawer()}
    </SwipeableDrawer>
  );
};

export default Sidebar;
