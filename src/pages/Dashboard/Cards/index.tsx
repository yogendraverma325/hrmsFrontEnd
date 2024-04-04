import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
// material-ui
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import MainCard from '../../../components/Cards/MainCards';
import { iconData } from '../Dashboard';

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    color: 'black',
    '&:after': {
      position: 'absolute',
      width: '110px',
      height: '110px',
      background:
        'linear-gradient(210.04deg, rgb(255, 193, 7) -50.94%, rgba(144, 202, 249, 0) 83.49%)',
      borderRadius: '50%',
      top: '-20px',
      right: '-180px',
    },
    '&:hover': {
      // New hover effect
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      transition: 'box-shadow 0.3s ease',
    },
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '110px',
      height: '110px',
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
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    background: 'rgb(255, 248, 225)',
    cursor: 'pointer',
    width: '100px', // Adjust width for centering
    height: '100px', // Adjust height for centering
  },
  primary: {
    color: 'black',
    textAlign: 'center', // Center the primary text
  },
  secondary: {
    color: 'black',
    textAlign: 'center', // Center the secondary text
    marginTop: '5px', // Add margin top for spacing
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const Index = (props: iconData) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <MainCard border={false} className={classes.card}>
        <List>
          <ListItem alignItems="center" disableGutters>
            <ListItemAvatar className={classes.avatarContainer}>
              {/* Displaying the image as the Avatar */}
              <Avatar className={classes.avatar}>
                <img src={data.urlImage} alt="avatar" />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography className={classes.primary}>{data.title}</Typography>}
            />
          </ListItem>
        </List>
      </MainCard>
    </React.Fragment>
  );
};

export default Index;
