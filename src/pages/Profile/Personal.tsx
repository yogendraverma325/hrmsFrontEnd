import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';

import SubCard from '../../components/Cards/SubCard';

import { useTheme } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { gridSpacing } from '@/redux/constant';
import { Decrypt } from '../../utils/decrypt';
const PersonalDetails = (props: any) => {
  const theme = useTheme();

  useEffect(() => {
    // return () => {};
  }, []);

  return (
    <Box p={0}>
      <Grid container spacing={gridSpacing} direction="column">
        <Grid item xs />
        <Grid item xs sx={{ paddingLeft: '0 !important' }}>
          <SubCard title="Biographical Information">
            <Box>
              <Grid container spacing={{ xs: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    disabled
                    size="small"
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="for-name">First Name</InputLabel>
                    <OutlinedInput
                      id="for-name"
                      value={
                        Decrypt().firstName.split(' ').slice(0, -1).join(' ').length === 0
                          ? Decrypt().firstName
                          : Decrypt().firstName.split(' ').slice(0, -1).join(' ')
                      }
                      label="First Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    disabled
                    size="small"
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="for-last-name">Last Name</InputLabel>
                    <OutlinedInput
                      id="for-last-name"
                      value={
                        Decrypt().lastName.split(' ').slice(0, -1).join(' ').length === 0
                          ? Decrypt().lastName
                          : Decrypt().lastName.split(' ').slice(0, -1).join(' ')
                      }
                      label="Last Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    disabled
                    size="small"
                    fullWidth
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="for-email">Email Address</InputLabel>
                    <OutlinedInput
                      id="for-email"
                      value={Decrypt().email}
                      label="Email Address"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </SubCard>
        </Grid>
      </Grid>
    </Box>
  );
};

PersonalDetails.propTypes = {};

export default PersonalDetails;
