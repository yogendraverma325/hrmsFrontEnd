import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import {
  Avatar,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProfile } from '@/api/mainApi';
import { gridSpacing } from '@/redux/constant';

import userProfileIcon from '../../assets/images/avatar.jpg';
import MainCard from '../../components/Cards/MainCards';
import SubCard from '../../components/Cards/SubCard';
import { OutlinedInput } from '../../components/OutlinedInput';
import Tabs, { a11yProps, TabPanel } from '../../components/Tabs';
import { Decrypt } from '../../utils/decrypt';
import OrgStructure from '../Structure/orgStructure';
import PersonalDetails from './Personal';
const AccountProfile = (props: any) => {
  const { userId } = useParams();
  const queryFunction = () => getProfile(userId);

  // Pass the closure function as the query function to useQuery
  const { data, isLoading, isError, error } = useQuery(
    ['profile', userId],
    queryFunction,
  );
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const { name } = Decrypt();

  const user_Name = name === undefined ? 'djs' : name;

  const word = user_Name.match(/\b(\w)/g);

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
          {isLoading && <div>Loading...</div>}
          {data && (
            <Grid container spacing={gridSpacing}>
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
                            sx={{ height: 100, width: 100 }}
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
                            {data?.data?.name
                              ? data?.data?.name.charAt(0).toUpperCase() +
                                data?.data?.name.slice(1)
                              : ' Get Extra Space'}
                          </Typography>
                          <Typography variant="h7" textAlign="center">
                            ({data?.data?.designationmaster?.name})
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
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">First Name</Typography>
                          <Typography variant="body2">
                            {data?.data?.firstName.split(' ').slice(0, -1).join(' ')
                              .length === 0
                              ? data?.data?.firstName
                              : data?.data?.firstName.split(' ').slice(0, -1).join(' ')}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">Last Name</Typography>
                          <Typography variant="body2">
                            {' '}
                            {data?.data?.lastName.split(' ').slice(0, -1).join(' ')
                              .length === 0
                              ? data?.data?.lastName
                              : data?.data?.lastName.split(' ').slice(0, -1).join(' ')}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">Email</Typography>
                          <Typography variant="body2">{Decrypt().email}</Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">
                            Personal Mobile Number
                          </Typography>
                          <Typography variant="body2">
                            {data?.data?.personalMobileNumber}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">
                            Office Mobile Number
                          </Typography>
                          <Typography variant="body2">
                            {data?.data?.officeMobileNumber}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">Designation</Typography>
                          <Typography variant="body2">
                            {data?.data?.designationmaster.name}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">Department</Typography>
                          <Typography variant="body2">
                            {data?.data?.departmentmaster.departmentName}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">Functional Area</Typography>
                          <Typography variant="body2">
                            {data?.data?.functionalareamaster.functionalAreaName}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={1} alignItems="flex-start">
                          <Typography variant="subtitle1">BU</Typography>
                          <Typography variant="body2">
                            {data?.data?.bumaster.buName}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </SubCard>
              </Grid>

              <Grid item xs={12} lg={12} md={0}>
                {/* Ensure key is unique */}
                <PerfectScrollbar
                  component="div"
                  style={{
                    height: 'auto',
                  }}
                >
                  <SubCard title="Organizational Chart">
                    <OrgStructure userId={userId} />
                  </SubCard>
                </PerfectScrollbar>
              </Grid>
            </Grid>
          )}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonalDetails userId={userId} />
      </TabPanel>
    </MainCard>
  );
};

AccountProfile.propTypes = {};

export default AccountProfile;
