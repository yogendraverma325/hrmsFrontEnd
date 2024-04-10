import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { icons } from '@/layout/menu-items/pages';
import { Grid, Box, useMediaQuery } from '@mui/material';
import OverviewTotalProfit from './Cards/OverviewTotalProfit';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//
export type iconData = {
  icon: any;
  urlImage: string;
  count: number;
  title: string;
  url: string;
  urlType: 'NONE' | 'EXTERNAL' | 'INTERNAL';
};

// Define styles using makeStyles from @mui/styles
const useStyles = makeStyles((theme) => ({
  gridItem: {
    transition: 'transform 0.3s', // Apply transition to the transform property
    '&:hover': {
      transform: 'scale(1.05)', // Scale the grid item by 5% when hovering
    },
  },
}));

const Dashboard = () => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleListItemClick = (URLData: string) => {
    navigate(URLData);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Grid container justifyContent="center" sx={{ marginTop: '30px' }}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: isDesktop ? '80px' : '9px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Leave"
                    backgroundColor="rgb(103, 58, 183)"
                    svgPath={icons.HolidayVillageIcon}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Attendance"
                    backgroundColor="rgb(30, 136, 229)"
                    svgPath={icons.AccessAlarmIcon}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Task Box"
                    backgroundColor="rgb(216, 67, 21)"
                    svgPath={icons.AssignmentIcon}
                    value={<CircleNotificationsIcon />}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box
                  onClick={() => {
                    handleListItemClick('/org');
                  }}
                >
                  <OverviewTotalProfit
                    name="Organization"
                    svgPath={icons.AccountTreeIcon}
                    backgroundColor="rgb(0, 200, 83)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="HR Care Desk"
                    svgPath={icons.WifiCalling3Icon}
                    backgroundColor="rgb(103, 58, 183)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: isDesktop ? '80px' : '9px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Recruitment"
                    svgPath={icons.PersonSearchIcon}
                    backgroundColor="rgb(199, 05, 29)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Compensation"
                    svgPath={icons.AttachMoneyIcon}
                    backgroundColor="rgb(30, 90, 40)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="HR Documents"
                    svgPath={icons.DocumentScannerIcon}
                    backgroundColor="rgb(90, 67, 21)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Performance"
                    svgPath={icons.TrendingUpIcon}
                    backgroundColor="rgb(250,100, 83)"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={2}
                sx={{ marginRight: '10px', marginLeft: '10px' }}
              >
                <Box>
                  <OverviewTotalProfit
                    name="Calendar"
                    svgPath={icons.CalendarMonthIcon}
                    backgroundColor="rgb(32, 58, 183)"
                  />
                </Box>
              </Grid>

              {/* Your other Grid items */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
