import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  CardContent,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';

import { useTheme } from '@mui/system';

import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from '../../components/Cards/MainCards';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import Tabs, { a11yProps, TabPanel } from '../../components/Tabs';
import SubCard from '../../components/Cards/SubCard';
import { OutlinedInput } from '../../components/OutlinedInput';
import userProfileIcon from '../../assets/images/avatar.jpg';
import { gridSpacing } from '@/redux/constant';
import { Decrypt } from '../../utils/decrypt';
import PersonalDetails from './Personal';
import OrgStructure from '../Structure/orgStructure';
const AccountProfile = (props: any) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  let { name } = Decrypt();

  let user_Name = name === undefined ? 'djs' : name;

  let word = user_Name.match(/\b(\w)/g);

  return (
    <MainCard>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={{
            '& .MuiTab-root.MuiButtonBase-root.MuiTab-labelIcon.MuiTab-textColorPrimary':
              {
                minHeight: 'auto',
                minWidth: '10px',
                padding: '12px 8px',
                marginRight: '18px',
                color: 'rgb(33, 33, 33)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<AccountCircleTwoToneIcon />}
            iconPosition="start"
            label="Overview"
            {...a11yProps(0)}
          />

          <Tab
            icon={<FingerprintOutlinedIcon />}
            iconPosition="start"
            label="Personal Details"
            {...a11yProps(1)}
          />
          {/* <Tab icon={<SettingsTwoToneIcon />} iconPosition='start' label='Settings' {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box p={0}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} />
            <Grid item xs={12} lg={3} md={3}>
              <SubCard content={false}>
                <CardContent>
                  <Grid container spacing={{ xs: 3 }} justifyContent="center">
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'end',
                        }}
                      ></Box>
                    </Grid>
                    <Grid item sm={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{ height: 90, width: 90 }}
                          src={userProfileIcon}
                          color="inherit"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={12} md={12}>
                      <Stack
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="h4" textAlign="center">
                          {Decrypt().firstName}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </SubCard>
            </Grid>
            <Grid item xs={12} lg={9} md={9}>
              <SubCard title="Personal Information">
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
                            Decrypt().firstName.split(' ').slice(0, -1).join(' ')
                              .length === 0
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
                            Decrypt().lastName.split(' ').slice(0, -1).join(' ')
                              .length === 0
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

            <Grid item xs={12} lg={12} md={0}>
              <PerfectScrollbar
                component="div"
                style={{
                  height: 'auto',
                }}
              >
                <SubCard title="Orgnizational Chart">
                  <OrgStructure />
                </SubCard>
              </PerfectScrollbar>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonalDetails />
      </TabPanel>
    </MainCard>
  );
};

AccountProfile.propTypes = {};

export default AccountProfile;
