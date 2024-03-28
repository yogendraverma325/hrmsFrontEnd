import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports

import Leave from './Cards/Leave';
import { gridSpacing } from '@/redux/constant';
import Attandence from './Cards/Attandence';
import Tasks from './Cards/Task';
import Employees from './Cards/Employees';
import { useNavigate } from 'react-router-dom';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleListItemClick = (URL: string) => {
    navigate(URL, { replace: true });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Leave isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Attandence isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Tasks isLoading={isLoading} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            sm={6}
            xs={12}
            onClick={() => {
              handleListItemClick('/org');
            }}
          >
            <Employees isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
