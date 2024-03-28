import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

// project imports
import MainCard from '../../../components/Cards/MainCards';
// assets
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#d6cbd3',
    color: 'black',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      position: 'absolute',
      width: '210px',
      height: '210px',
      background:
        'linear-gradient(210.04deg, rgb(255, 193, 7) -50.94%, rgba(144, 202, 249, 0) 83.49%)',
      borderRadius: '50%',
      top: '-30px',
      right: '-180px',
    },
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '210px',
      height: '210px',
      background:
        'linear-gradient(140.9deg, rgb(255, 193, 7) -14.02%, rgba(144, 202, 249, 0) 70.5%)',
      borderRadius: '50%',
      top: '-160px',
      right: '-130px',
    },
  },
  content: {
    padding: '16px !important',
  },
  avatar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'Roboto, sans-serif',
    lineHeight: 1,
    overflow: 'hidden',
    userSelect: 'none',
    background: 'rgb(255, 248, 225)',
    cursor: 'pointer',
    borderRadius: '8px',
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
    color: 'rgb(255, 193, 7)',
  },
  primary: {
    color: 'black',
  },
  secondary: {
    color: 'black',
    marginTop: '5px',
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

//-----------------------|| DASHBOARD - TOTAL INCOME DARK CARD ||-----------------------//

const Tasks = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MainCard border={false} className={classes.card} contentClass={classes.content}>
        <List className={classes.padding}>
          <ListItem alignItems="center" disableGutters className={classes.padding}>
            <ListItemAvatar>
              <Avatar variant="rounded" className={classes.avatar}>
                <AssignmentIndOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.padding}
              sx={{
                mt: 0.45,
                mb: 0.45,
              }}
              primary={
                <Typography variant="h4" className={classes.primary}>
                  0
                </Typography>
              }
              secondary={
                <Typography variant="subtitle2" className={classes.secondary}>
                  Task
                </Typography>
              }
            />
          </ListItem>
        </List>
      </MainCard>
    </React.Fragment>
  );
};

export default Tasks;
