import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Box, useMediaQuery } from '@mui/material';

import Main from './Cards';
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

  const dashboardCards: iconData[] = [
    {
      icon: <TableChartOutlinedIcon />,
      count: 0,
      urlImage: '/src/assets/images/image23.jpg',
      title: 'Leave',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <BrowseGalleryOutlinedIcon />,
      count: 0,
      urlImage: '/src/assets/images/image23.jpg',
      title: 'Attendance',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <AssignmentIndOutlinedIcon />,
      count: 0,
      urlImage: '/src/assets/images/image23.jpg',
      title: 'Task',
      url: 'https://intranet.teamcomputers.com/#/',
      urlType: 'EXTERNAL',
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      count: 0,
      urlImage: '/src/assets/images/image23.jpg',
      title: 'Organization View',
      url: '/org',
      urlType: 'INTERNAL',
    },
  ];

  const handleListItemClick = (URLData: iconData) => {
    if (URLData.urlType == 'INTERNAL') {
      navigate(URLData.url, { replace: true });
    } else if (URLData.urlType == 'EXTERNAL') {
      window.open(URLData.url, '_blank');
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
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
                  sx={{ height: '100%' }}
                  name="Leave"
                  backgroundColor="rgb(103, 58, 183)"
                  svgPath1="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77"
                  svgPath2="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42"
                  color="#819bc7"
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
                  sx={{ height: '100%' }}
                  name="Attendance"
                  backgroundColor="rgb(30, 136, 229)"
                  svgPath1="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-1.74 0-3.34-.56-4.65-1.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5m6.14-2.88C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12"
                  svgPath2="M12 5.93c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5m0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
                  color="rgb(239 232 232)"
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
                  sx={{ height: '100%' }}
                  name="Task"
                  backgroundColor="rgb(216, 67, 21)"
                  svgPath1="M13 4H6v16h12V9h-5zm3 14H8v-2h8zm0-6v2H8v-2z"
                  svgPath2="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
                  color="rgb(212 162 130)"
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
              <Box>
                <OverviewTotalProfit
                  sx={{ height: '100%' }}
                  name="Organization"
                  backgroundColor="rgb(0, 200, 83)"
                  svgPath1="M19.5 5.65c-.28 0-.5.22-.5.5V12h-2V3.42c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V2.51c0-.28-.22-.5-.5-.5s-.5.22-.5.5V12h-2V4.79c0-.28-.22-.5-.5-.5s-.5.23-.5.5v12.87l-5.35-2.83-.51.45 5.86 6.1c.38.39.9.62 1.44.62H18c1.1 0 2-.9 2-2V6.15c0-.28-.22-.5-.5-.5"
                  svgPath2="M19.5 3.65c-.17 0-.34.02-.5.05v-.28c0-1.38-1.12-2.5-2.5-2.5-.33 0-.65.06-.94.18C15.11.44 14.35.01 13.5.01c-1.32 0-2.41 1.03-2.49 2.33-.16-.03-.33-.05-.51-.05-1.38 0-2.5 1.12-2.5 2.5v9.55l-2.41-1.28c-.73-.39-1.64-.28-2.26.27l-2.07 1.83 7.3 7.61c.75.78 1.8 1.23 2.89 1.23H18c2.21 0 4-1.79 4-4V6.15c0-1.38-1.12-2.5-2.5-2.5M20 20c0 1.1-.9 2-2 2h-6.55c-.54 0-1.07-.22-1.44-.62l-5.86-6.11.51-.45L10 17.66V4.79c0-.28.22-.5.5-.5s.5.23.5.5V12h2V2.51c0-.28.22-.5.5-.5s.5.22.5.5V12h2V3.42c0-.28.22-.5.5-.5s.5.22.5.5V12h2V6.15c0-.28.22-.5.5-.5s.5.22.5.5z"
                  color="#81dda0"
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
                  sx={{ height: '100%' }}
                  name="Leave"
                  backgroundColor="rgb(103, 58, 183)"
                  svgPath1="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8m1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77"
                  svgPath2="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42"
                  color="#819bc7"
                />
              </Box>
            </Grid>

            {/* Your other Grid items */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
