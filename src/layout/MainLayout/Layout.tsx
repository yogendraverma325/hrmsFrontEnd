import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Footer from './Footer';
import NavBar from './Navbar';
import { DrawerHeader } from './Header';
import Marquee from 'react-fast-marquee';
import Announcements from './Announcements';
import { styled, useTheme } from '@mui/material/styles';
import { drawerWidth } from '@/redux/constant';
import { RootState } from '@/redux/reducers';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
export default function AdminLayout({ children }: any) {
  const Utils = useSelector((state: RootState) => state.utils);
  const Main = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth - 10}px`,
    }),
  }));

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      </Box>
      <NavBar />
      <Sidebar />

      <Main open={Utils.isActive} sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        <Marquee pauseOnHover={true}>
          <Announcements />
        </Marquee>
        <Outlet />
        {/* {children} */}
      </Main>

      <Footer />
    </>
  );
}
