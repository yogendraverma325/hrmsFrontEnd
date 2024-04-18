import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

import { drawerWidth } from '@/redux/constant';
import { RootState } from '@/redux/reducers';

import Announcements from './Announcements';
import Footer from './Footer';
import { DrawerHeader } from './Header';
import NavBar from './Navbar';
import Sidebar from './Sidebar';
import BreadCrums from './BreadCrums';

import { Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function AdminLayout({ children }: any) {
  const Utils = useSelector((state: RootState) => state.utils);
  const location = useLocation();
  const Main = styled('main', {
    shouldForwardProp: (prop: any) => prop !== 'open',
  })(({ theme, open }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
      duration: open
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? `${drawerWidth - 10}px` : 0,
  }));
  const ScrollableOutlet = styled('div')({
    overflowY: 'auto', // Enable vertical scrollbar for Outlet content
    maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
  });
  const isDashboardPage = location.pathname !== '/dashbaord';
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      </Box>
      <NavBar />
      <Sidebar />

      <Main open={Utils.isActive} sx={{ flexGrow: 1, p: 4 }}>
        <DrawerHeader />
        <div className="sticky-wrapper">
          <Paper
            elevation={0}
            style={{
              zIndex: 20,
              top: '64px', // Adjust this value according to your header height
              left: 'auto',
              right: 0,
              position: 'fixed',
              background:
                'linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(16 65 85) 35%, rgb(3 113 136) 100%)',
              color: '#F0F7FF',
              boxShadow: 'none',
              borderRadius: 0, // Remove border curve
            }}
          >
            <Toolbar>
              <Marquee pauseOnHover={true}>
                <Announcements />
              </Marquee>
            </Toolbar>
          </Paper>
        </div>
        {isDashboardPage && <BreadCrums />}
        {/* <ScrollableOutlet> */}
        <Outlet />
        {/* </ScrollableOutlet> */}

        {/* {children} */}
      </Main>
      <Footer />
    </>
  );
}
