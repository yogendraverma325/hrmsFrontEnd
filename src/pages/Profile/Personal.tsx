import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getpersonalDetails } from '@/api/mainApi';
import { Profile } from '@/models/feed';
import { gridSpacing } from '@/redux/constant';

import SubCard from '../../components/Cards/SubCard';
import { Decrypt } from '../../utils/decrypt';
const PersonalDetails = (props: any) => {
  const { userId } = props;
  const theme = useTheme();
  const queryFunction = () => getpersonalDetails(userId);

  // Pass the closure function as the query function to useQuery
  const { data, isLoading, isError, error } = useQuery(
    ['personalDetails', userId],
    queryFunction,
  );

  return (
    <Box p={0}>
      {isLoading && <div>Loading...</div>}

      {data && (
        <Grid container spacing={gridSpacing} direction="column">
          {/* BIOGRAPHY DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Biographical Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} lg={12} md={12}>
                    <Box>
                      <Grid container spacing={{ xs: 3 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Nationality</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.nationality}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Marital Status</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.maritalStatus
                                ? 'Married'
                                : 'Single'}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Mobile Access</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.mobileAccess
                                ? 'Yes'
                                : 'No'}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Laptop System</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.laptopSystem}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              Background Verification
                            </Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail
                                ?.backgroundVerification
                                ? 'Yes'
                                : 'No'}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Gender</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.gender}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Date Of Birth</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeebiographicaldetail?.dateOfBirth}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* JOB DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Job Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} lg={12} md={12}>
                    <Box>
                      <Grid container spacing={{ xs: 3 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Employee Code</Typography>
                            <Typography variant="body2">{data?.data?.empCode}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Date Of Joining</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeejobdetail?.dateOfJoining}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Probation Period</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeejobdetail?.probationPeriod}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">languages Spoken</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeejobdetail?.languagesSpoken}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* JOB DETAILS */}

          {/* PAYMENT DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Payment Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} lg={12} md={12}>
                    <Box>
                      <Grid container spacing={{ xs: 3 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Account Number</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeepaymentdetail?.paymentAccountNumber}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              Account Holder Name
                            </Typography>
                            <Typography variant="body2">
                              {data?.data?.employeepaymentdetail?.paymentHolderName}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">Bank Name</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeepaymentdetail?.paymentBankName}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">IFSC</Typography>
                            <Typography variant="body2">
                              {data?.data?.employeepaymentdetail?.paymentBankIfsc}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* PAYMENT DETAILS */}

          {/* EMERGENCY DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Emergency Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} lg={12} md={12}>
                    <Box>
                      <Grid container spacing={{ xs: 3 }}>
                        <Grid item xs={12} sm={4} md={4}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              Emergency Contact Name
                            </Typography>
                            <Typography variant="body2">
                              {data?.data?.employeeemergencycontact?.emergencyContactName}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              Emergency Contact Mobile
                            </Typography>
                            <Typography variant="body2">
                              {
                                data?.data?.employeeemergencycontact
                                  ?.emergencyContactNumber
                              }
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                          <Stack direction="column" spacing={1} alignItems="flex-start">
                            <Typography variant="subtitle1">
                              Emergency Contact Relation
                            </Typography>
                            <Typography variant="body2">
                              {
                                data?.data?.employeeemergencycontact
                                  ?.emergencyContactRelation
                              }
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* EMERGENCY DETAILS */}

          {/* FAMILY DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Family Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  {data?.data?.employeefamilydetails?.map((element: any) => {
                    return (
                      <Grid item xs={12} lg={12} md={12}>
                        <Card style={{ marginTop: 2 }}>
                          <CardContent>
                            <Box>
                              <CardContent>
                                <Grid container spacing={{ xs: 10 }}>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">Name</Typography>
                                      <Typography variant="body2">
                                        {element.name}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">DOB</Typography>
                                      <Typography variant="body2">
                                        {element.dob}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Mobile No
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.mobileNo}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2} md={2}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Relation
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.relationWithEmp}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">Gender</Typography>
                                      <Typography variant="body2">
                                        {element.gender}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* FAMILY DETAILS */}
          {/* FAMILY DETAILS */}
          <Grid item xs sx={{ paddingLeft: '0 !important' }}>
            <SubCard title="Educational Details">
              <Box p={0}>
                <Grid container spacing={gridSpacing}>
                  {data?.data?.employeeeducationdetails?.map((element: any) => {
                    return (
                      <Grid item xs={12} lg={12} md={12}>
                        <Card style={{ marginTop: 2 }}>
                          <CardContent>
                            <Box>
                              <CardContent>
                                <Grid container spacing={{ xs: 10 }}>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Education
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.degreemaster.degreeName}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={3} md={3}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Institute
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.educationInstitute}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2.5} md={2.5}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Specialisation
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.educationSpecialisation}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2} md={2}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        Start Date
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.educationStartDate}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} sm={2} md={2}>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      alignItems="flex-start"
                                    >
                                      <Typography variant="subtitle1">
                                        End Date
                                      </Typography>
                                      <Typography variant="body2">
                                        {element.educationCompletionDate}
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </SubCard>
          </Grid>
          {/* FAMILY DETAILS */}
        </Grid>
      )}
    </Box>
  );
};

PersonalDetails.propTypes = {};

export default PersonalDetails;
