import React from "react";
import PropTypes from "prop-types";

// material-ui
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

// ==============================|| SKELETON - ISSUE DETAILS ||============================== //

const IssueDetails = (props) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction='column'>
          <Grid item>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Skeleton variant='rectangular' width={44} height={44} />
              </Grid>
              <Grid item>
                <Skeleton variant='rectangular' width={34} height={34} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Skeleton variant='rectangular' sx={{ my: 2 }} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant='rectangular' height={30} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

IssueDetails.propTypes = {};

export default IssueDetails;
