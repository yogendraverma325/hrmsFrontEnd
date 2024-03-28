import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

import Main from './Cards';
import { gridSpacing } from '@/redux/constant';

import { useNavigate } from 'react-router-dom';

import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//
export type iconData = {
  icon: any;
  count: number;
  title: string;
  url: string;
  urlType: 'NONE' | 'EXTERNAL' | 'INTERNAL';
};
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

  const dashboardCards: iconData[] = [
    {
      icon: <TableChartOutlinedIcon />,
      count: 0,
      title: 'Leave',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <BrowseGalleryOutlinedIcon />,
      count: 0,
      title: 'Attendance',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <AssignmentIndOutlinedIcon />,
      count: 0,
      title: 'Task',
      url: 'https://intranet.teamcomputers.com/#/',
      urlType: 'EXTERNAL',
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      count: 0,
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
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {dashboardCards.map((element) => (
            <Grid
              key={element.url}
              item
              lg={4}
              md={6}
              sm={6}
              xs={12}
              onClick={() => {
                handleListItemClick(element);
              }}
            >
              <Main data={element} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
