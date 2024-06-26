import { AccountCircle, Dashboard, ExitToApp, Person } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  CardActions,
  ClickAwayListener,
  Grid,
  InputAdornment,
  InputBase,
  Paper,
  Popper,
  Stack,
  useMediaQuery,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RootState } from '@/redux/reducers';
import { toggleModal } from '@/redux/reducers/utilitesSlice';
import { convertTimeStampToDate } from '@/utils/DateConverter';
import { Decrypt } from '@/utils/decrypt';

import MainCard from '../../components/Cards/MainCards';
import Transitions from '../../components/extended/Transitions';
import NotificationList from '../../components/Notifications';
import { DrawerHeader } from './Header';
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
export default function NavBar() {
  const { name, designation, id, lastLogin } = Decrypt();
  const Utils = useSelector((state: RootState) => state.utils);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const handleDrawer = () => {
    dispatch(toggleModal({ isActive: !Utils.isActive }));
  };

  const [userMenuOn, serUserMenuOn] = React.useState(false);
  const [notificationOn, setNotificationOn] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Perform search operations here
  };
  const anchorRef = React.useRef(null);
  const userMenuRef = React.useRef(null);
  const handleOpenNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationOn(true);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationOn(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    serUserMenuOn(true);
  };

  const handleCloseUserMenu = () => {
    serUserMenuOn(false);
  };

  const handleListItemClick = (URL: string) => {
    if (URL == '/profile') {
      navigate(`/profile/${id}`);
    } else {
      navigate(URL, { replace: true });
    }
  };

  return (
    <>
      <AppBar position="fixed" open={Utils.isActive} sx={{ backgroundColor: '#104155' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 1,
              //   ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Box>
              <DrawerHeader>
                <div className="logo-wrap">
                  <Link
                    to="index.html"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <img
                      className="brand-img"
                      src="/src/assets/images/team-logo.png"
                      alt="brand"
                      style={{
                        width: '70%',
                        height: '39px',
                        marginRight: '3rem',
                      }}
                    />
                  </Link>
                </div>
                {/* <div className="logo-wrap">
                  <Link
                    to="index.html"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <img
                      className="brand-img"
                      src="/src/assets/images/WhatisHRMSSoftwareBanner-1024x786.png"
                      alt="brand"
                      style={{
                        width: '70%',
                        height: '39px',
                        marginRight: '3rem',
                      }}
                    />
                  </Link>
                </div> */}
              </DrawerHeader>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <InputBase
              placeholder="Search by Employee Name, Designation"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '0.5rem',
                marginLeft: '25rem',
                width: '35%',
              }}
              startAdornment={
                // Add startAdornment to place the search icon
                <InputAdornment position="start">
                  <IconButton aria-label="search">
                    <SearchIcon /> {/* Assuming SearchIcon is imported */}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" gap={1}>
              {/* <Typography>
                <Typography variant="subtitle1">
                  {name.toUpperCase()} ({designation.toUpperCase()})
                </Typography>
                <Typography variant="subtitle2">
                  Last Login: {convertTimeStampToDate(lastLogin)}
                </Typography>
              </Typography> */}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                ref={anchorRef}
                onClick={handleOpenNotificationMenu}
              >
                <Badge badgeContent={17} color="success">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} ref={userMenuRef}>
                  <Avatar alt="Remy Sharp" src="/src/assets/images/avatar.jpg" />
                </IconButton>
              </Tooltip>
            </Stack>

            <Popper
              placement={matchesXs ? 'bottom' : 'bottom-end'}
              open={notificationOn}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              popperOptions={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [matchesXs ? 5 : 0, 20],
                    },
                  },
                ],
              }}
            >
              {({ TransitionProps }) => (
                <Transitions
                  position={matchesXs ? 'top' : 'top-right'}
                  in={notificationOn}
                  {...TransitionProps}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseNotificationMenu}>
                      {/* REMINDER: ADD SHADOW FOR BETTER UI */}
                      <MainCard border={false} content={false} boxShadow>
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12}>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="space-between"
                              sx={{ pt: 2, px: 2 }}
                            >
                              <Grid item>
                                <Stack direction="row" spacing={2}>
                                  <Typography variant="subtitle1">
                                    All Notification
                                  </Typography>
                                </Stack>
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2" color="primary">
                                  Mark as all read
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <PerfectScrollbar
                              style={{
                                height: 'auto',
                                maxHeight: 'calc(100vh - 150px)',
                                overflowX: 'hidden',
                              }}
                            >
                              <NotificationList />
                            </PerfectScrollbar>
                          </Grid>
                        </Grid>
                        <Divider />
                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                          <Button size="small" disableElevation>
                            View All
                          </Button>
                        </CardActions>
                      </MainCard>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </Popper>

            <Popper
              placement={matchesXs ? 'bottom' : 'bottom-end'}
              open={userMenuOn}
              anchorEl={userMenuRef.current}
              role={undefined}
              transition
              disablePortal
              popperOptions={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [matchesXs ? 5 : 0, 20],
                    },
                  },
                ],
              }}
            >
              {({ TransitionProps }) => (
                <Transitions
                  position={matchesXs ? 'top' : 'top-right'}
                  in={userMenuOn}
                  {...TransitionProps}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseUserMenu}>
                      {/* REMINDER: ADD SHADOW FOR BETTER UI */}
                      <MainCard border={false} elevation={16} content={false} boxShadow>
                        <List>
                          <ListItem
                            onClick={() => handleListItemClick('/profile')}
                            style={{ cursor: 'pointer' }}
                          >
                            <ListItemIcon>
                              <Person />
                            </ListItemIcon>
                            <Typography textAlign="center">Profile</Typography>
                          </ListItem>

                          <ListItem
                            onClick={() => handleListItemClick('/dashbaord')}
                            style={{ cursor: 'pointer' }}
                          >
                            <ListItemIcon>
                              <Dashboard />
                            </ListItemIcon>
                            <Typography textAlign="center">Dashboard</Typography>
                          </ListItem>
                          <Divider />

                          <ListItem
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              localStorage.clear();
                              navigate('auth/login', { replace: true });
                            }}
                          >
                            <ListItemIcon>
                              <ExitToApp />
                            </ListItemIcon>
                            <Typography textAlign="center">Logout</Typography>
                          </ListItem>
                        </List>
                      </MainCard>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </Popper>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
