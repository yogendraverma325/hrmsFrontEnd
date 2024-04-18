import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import OverviewTotalProfit from './Cards/OverviewTotalProfit';
import { icons } from '@/layout/menu-items/pages';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

// Define styles using makeStyles from @mui/styles
const useStyles = makeStyles((theme) => ({
  gridItem: {
    transition: 'transform 1.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'box-shadow 1s, transform 0.80s ease-in-out', // Added transition
    '&:hover': {
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.05) rotateX(360deg)', // Vertical rotation on hover
    },
  },
}));

const Dashboard = () => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const classes = useStyles();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1); // State to track hovered card index
  const navigate = useNavigate();
  
  const handleCardClick = (url: string) => {
    navigate(url);
  };

  // Define dynamic card data
  const dynamicCards = [
    {
      name: "Task",
      backgroundColor: "rgba(253, 29, 29, 100)",
      svgPath: CircleNotificationsIcon,
      url: '/org'
    },
    {
      name: "Leave",
      backgroundColor: "rgb(103, 58, 183)",
      svgPath: icons.HolidayVillageIcon,
      url: '/org',
    },
    {
      name: "Attendance",
      backgroundColor: "rgb(30, 136, 229)",
      svgPath: icons.AccessAlarmIcon,
      url: '/org'
    },
    {
      name: "Organization",
      backgroundColor: "rgb(0, 200, 83)",
      svgPath: icons.AccountTreeIcon,
      url: '/org'
    },
    {
      name: "Recruitment",
      backgroundColor: "rgb(199, 05, 29)",
      svgPath: icons.PersonSearchIcon,
      url: '/org'
    },
    {
      name: "Compensation",
      backgroundColor: "rgb(30, 90, 40)",
      svgPath: icons.AttachMoneyIcon,
      url: ''
    },
    {
      name: "Documents",
      backgroundColor: "rgb(90, 67, 21)",
      svgPath: icons.DocumentScannerIcon,
      url: '/org'
    },
    {
      name: "Performance",
      backgroundColor: "rgb(250, 100, 83)",
      svgPath: icons.TrendingUpIcon,
      url: '/org'
    },
    {
      name: "Calendar",
      backgroundColor: "rgb(32, 58, 183)",
      svgPath: icons.CalendarMonthIcon,
      url: '/org'
    },
  ];

  return (
    <Grid container spacing={4} padding={6} marginTop={2}>
      {dynamicCards.map((card, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          lg={3}
          className={classes.gridItem}
          onMouseEnter={() => setHoveredCardIndex(index)} // Set hovered card index
          onMouseLeave={() => setHoveredCardIndex(-1)} // Reset hovered card index
        >
          <Box
            className={classes.cardBox}
            style={{ backgroundColor: card.backgroundColor }}
            onClick={() => handleCardClick(card.url)}
          >
            {hoveredCardIndex === index ? ( // Conditionally render card information based on hover state
              <>
                {card.svgPath && <card.svgPath sx={{ fontSize: 24, color: '#fff' }} />}
                <Typography variant="h6" sx={{ color: '#fff', marginTop: 2 }}>
                  Opened content
                </Typography>
                {/* Add additional card information here */}
              </>
            ) : (
              <>
                {card.svgPath && <card.svgPath sx={{ fontSize: 24, color: '#fff' }} />}
                <Typography variant="h6" sx={{ color: '#fff', marginTop: 2 }}>
                  {card.name}
                </Typography>
              </>
            )}
          </Box>

        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
