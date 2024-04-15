import Typography from '@mui/material/Typography';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // If you're using React Router
import { Decrypt } from '@/utils/decrypt';
import { drawerWidth } from '@/redux/constant';
import { RootState } from '@/redux/reducers';

import { DrawerHeader } from './Header';
import MenuList from './Sidebar/MenuList';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuCard from './Sidebar/MenuCard';
import MenuCard2 from './Sidebar/MenuCard/index2';
const Sidebar = () => {
  const theme = useTheme();
  const Utils = useSelector((state: RootState) => state.utils);
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          backgroundColor: '#104155',
          color: 'white', // Set text color to white
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={Utils.isActive}
    >
      <DrawerHeader />
      {drawer()}
    </Drawer>
  );
};
const drawer = () => (
  <>
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>{/* <LogoSection /> */}</Box>
    </Box>
    <BrowserView>
      <PerfectScrollbar
        component="div"
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <MenuCard2 userDetails={Decrypt()} />
        {/* <br></br>
        <MenuCard userDetails={Decrypt()} /> */}

        <MenuList />
      </PerfectScrollbar>
    </BrowserView>
    <MobileView>
      <Box sx={{ px: 2 }}>
        <MenuCard userDetails={Decrypt()} />
        <MenuList />
      </Box>
    </MobileView>
  </>
);
export default Sidebar;
