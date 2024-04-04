// material-ui
import { Grid } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { gridSpacing } from '@/redux/constant';

import Main from './Cards';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//
export type iconData = {
  icon: any;
  urlImage: string;
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
      urlImage:
        'https://www.teamcomputers.com/repositry/team-intranet-imgs/new-icons/team-works-ico.png',
      title: 'Leave',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <BrowseGalleryOutlinedIcon />,
      count: 0,
      urlImage:
        'https://www.teamcomputers.com/repositry/team-intranet-imgs/new-icons/team-works-ico.png',
      title: 'Attendance',
      url: '',
      urlType: 'NONE',
    },
    {
      icon: <AssignmentIndOutlinedIcon />,
      count: 0,
      urlImage:
        'https://www.teamcomputers.com/repositry/team-intranet-imgs/new-icons/team-works-ico.png',
      title: 'Task',
      url: 'https://intranet.teamcomputers.com/#/',
      urlType: 'EXTERNAL',
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      count: 0,
      urlImage:
        'https://www.teamcomputers.com/repositry/team-intranet-imgs/new-icons/team-works-ico.png',
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
              lg={3}
              md={2}
              sm={2}
              xs={4}
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
