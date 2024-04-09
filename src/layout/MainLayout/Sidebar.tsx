import { useSelector } from 'react-redux';
import MenuList from './Sidebar/MenuList';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'; // If you're using React Router
import Typography from '@mui/material/Typography';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { RootState } from '@/redux/reducers';
import { DrawerHeader } from './Header';
import Drawer from '@mui/material/Drawer';
import { drawerWidth } from '@/redux/constant';

const drawer = () => (
  <Box sx={{ width: 200 }}>
    
    <BrowserView>
      <PerfectScrollbar
        component="div"
        style={{
          height: 'calc(100vh - 56px)',
        }}
      >
        <MenuList />
      </PerfectScrollbar>
    </BrowserView>
    <MobileView>
      <Box sx={{ px: 2 }}>{/* <MenuList /> */}</Box>
    </MobileView>
  </Box>
);
const Sidebar = () => {
  const Utils = useSelector((state: RootState) => state.utils);
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

export default Sidebar;
