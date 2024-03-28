import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0],
  },
}));

export default function ProfileTabs() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab
                label="Profile 1"
                icon={<AccountCircleTwoToneIcon />}
                id="simple-tab-0"
                aria-controls="simple-tabpanel-0"
                href="/apps/user/account-profile/profile1"
              />
              {/* Add more tabs here */}
            </Tabs>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}
