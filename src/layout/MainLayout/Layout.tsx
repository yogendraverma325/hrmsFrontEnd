import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Footer from './Footer';
import NavBar from './Navbar';
import { DrawerHeader } from './Header';
import Marquee from 'react-fast-marquee';
import Announcements from './Announcements';
export default function AdminLayout({ children }: any) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      </Box>
      <NavBar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Marquee pauseOnHover={true}>
          <Announcements />
        </Marquee>
        {children}
      </Box>
      <Footer />
    </>
  );
}
