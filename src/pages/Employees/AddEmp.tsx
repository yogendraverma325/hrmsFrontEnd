import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useQuery } from '@tanstack/react-query';
import { Form, FormikProvider, useFormik } from 'formik';
import { debounce, forEach } from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// third party
import * as Yup from 'yup';

import DateField from '@/components/Forms/DateField';
import InputField from '@/components/Forms/InputField';
import SelectField from '@/components/Forms/SelectField';
import pxToRem from '@/themes/functions/pxToRem';

import { getEmployees } from '../../api/mainApi';
import { RootState } from '../../redux/reducers';
interface EMP {
  name: string;
  id: number;
}

const AddEmp = ({ ...others }) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [options, setOptions] = React.useState<readonly EMP[]>([]);
  const handleSuggestionInput = (searchText: string) => {
    setSearchQuery(searchText);
  };
  const debounceHandlerForSuggestions = React.useCallback(
    debounce(handleSuggestionInput, 500),
    [],
  );

  const loading = open && options.length === 0;

  const fetchData = async (input: string) => {
    const response = await getEmployees(input);
    return response.data;
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const data = await fetchData(searchQuery);
      const list: EMP[] = [];
      data.forEach((element) => {
        list.push({ name: element.name, id: element.id });
      });
      if (active) {
        setOptions([...list]);
      }
    })();

    return () => {
      active = false;
    };
  }, [searchQuery]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      selfService: '',
      autoActive: '',
      firstName: '',
      lastName: '',
      middleName: '',
      dob: '',
      personalEmail: '',
      maritalStatus: '',
      dateOfJoining: '',
      groupCategory: '',
      department: '',
      designation: '',
      employeeType: '',
      reportingManager: '',
      currentOfficeLocation: '',
      baseOfficeLocation: '',
      jobLevel: '',
      contributionLevel: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      selfService: Yup.string(),
      autoActive: Yup.string(),
      firstName: Yup.string().max(5),
      lastName: Yup.string().max(255),
      middleName: Yup.string().max(255),
      dob: Yup.string().max(255),
      personalEmail: Yup.string().max(255),
      maritalStatus: Yup.string().max(255),
      dateOfJoining: Yup.string().max(255),
      groupCategory: Yup.string().max(255),
      department: Yup.string().max(255),
      designation: Yup.string().max(255),
      employeeType: Yup.string().max(255),
      reportingManager: Yup.string().max(255),
      currentOfficeLocation: Yup.string().max(255),
      baseOfficeLocation: Yup.string().max(255),
      jobLevel: Yup.string().max(255),
      contributionLevel: Yup.string().max(255),
      // selfService: Yup.string().required('Self Service is required'),
      // autoActive: Yup.string().required('Auto Active is required'),
      // firstName: Yup.string().max(5).required('First Name is required'),
      // lastName: Yup.string().max(255).required('Last Name is required'),
      // middleName: Yup.string().max(255).required('Middle Name is required'),
      // dob:Yup.string().max(255).required('Date Of Birth is required'),
      // personalEmail:Yup.string().max(255).required('Personal Email is required'),
      // maritalStatus:Yup.string().max(255).required('Marital Status is required'),
      // dateOfJoining:Yup.string().max(255).required('Date Of Joning is required'),
      // groupCategory:Yup.string().max(255).required('Group Category is required'),
      // department:Yup.string().max(255).required('Department is required'),
      // designation:Yup.string().max(255).required('Designation is required'),
      // employeeType:Yup.string().max(255).required('Employee Type is required'),
      // reportingManager:Yup.string().max(255).required('Reporting Manager is required'),
      // currentOfficeLocation:Yup.string().max(255).required('Current Office Location is required'),
      // baseOfficeLocation:Yup.string().max(255).required('Base Office Location is required'),
      // jobLevel:Yup.string().max(255).required('Job Level is required'),
      // contributionLevel:Yup.string().max(255).required('Contribution Level is required'),
    }),

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      console.log('values', values);
      try {
      } catch (err) {
        console.error(err);
      }
    },
  });
  function handleAutocompleteChange(value: any, fieldName: string, idFieldName: string) {
    formik.setFieldValue(fieldName.trim(), value?.id);
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Employee
        </Typography>

        <Paper sx={{ mt: 6 }}>
          <Card>
            <FormikProvider value={formik}>
              <Form>
                <Grid container spacing={2}>
                  {/* Basic Section */}
                  <Grid item xs={12} lg={12} md={12} sx={{ m: 3 }}>
                    <Stack mb={8}>
                      <Typography variant="h6" gutterBottom>
                        <InfoOutlinedIcon fontSize="inherit" /> Basic Details
                      </Typography>
                      <div style={{ borderBottom: '1px solid #000' }}></div>
                    </Stack>

                    <Grid container spacing={2}>
                      <Grid item sm={6} md={6} xs={12}>
                        <Autocomplete
                          fullWidth
                          className="autocompleteHeight"
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                          }
                          getOptionLabel={(option) => option.name}
                          options={options}
                          loading={loading}
                          onInputChange={(e, value) =>
                            debounceHandlerForSuggestions(value)
                          }
                          onChange={(event, newValue) => {
                            handleAutocompleteChange(
                              newValue,
                              'reportingManager',
                              'reportingManager',
                            );
                          }}
                          renderInput={(params) => (
                            <FormControl fullWidth>
                              <label htmlFor={`outlined-select-reportingManager}`}>
                                Reporting Manager
                              </label>
                              <TextField
                                variant="outlined"
                                {...params}
                                label=""
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {loading ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                          style={{ marginBottom: '10px' }}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </React.Fragment>
                                  ),
                                }}
                              />
                            </FormControl>
                          )}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="selfService"
                          label="Self Service"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="autoActive"
                          label="Auto Active"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <InputField name="firstName" label="First Name" />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <InputField name="lastName" label="Last Name" />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <InputField name="middleName" label="Middle Name" />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <DateField name="dob" label="Date Of Birth" />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <InputField name="personalEmail" label="Personal Email ID" />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="maritalStatus"
                          label="Marital Status"
                          options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                          ]}
                        />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <DateField name="dateOfJoining" label="Date Of Joining" />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Basic Section */}

                  {/* Employement Details */}
                  <Grid item xs={12} lg={12} md={12} sx={{ m: 3 }}>
                    <Stack mb={8}>
                      <Typography variant="h6" gutterBottom>
                        <CalendarMonthOutlinedIcon fontSize="inherit" /> Employment
                        Details
                      </Typography>
                      <div style={{ borderBottom: '1px solid #000' }}></div>
                    </Stack>

                    <Grid container spacing={2}>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="groupCategory"
                          label="Group Category"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="department"
                          label="Department"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="designation"
                          label="Designation"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="employeeType"
                          label="Employee Type"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <InputField name="reportingManager" label="Reporting Manager" />
                      </Grid>

                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="currentOfficeLocation"
                          label="Current Office Location"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="baseOfficeLocation"
                          label="Base Office Location"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="jobLevel"
                          label="Job Level"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <SelectField
                          name="contributionLevel"
                          label="Contribution Level"
                          options={[
                            { value: 'yes', label: 'Yes' },
                            { value: 'no', label: 'No' },
                          ]}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Employement Details */}
                  {/* Button Section */}
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12} sm={6} md={4} sx={{ m: 2, maxWidth: 300 }}>
                      {' '}
                      {/* Adjust maxWidth as needed */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disableElevation
                        size="small"
                        disabled={formik.isSubmitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </FormikProvider>
          </Card>
        </Paper>
      </Box>
    </>
  );
};

export default AddEmp;
