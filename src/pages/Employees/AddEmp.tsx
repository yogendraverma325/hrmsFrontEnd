import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
  Box,
  Button,
  Grid,
  Card,
  Stack,
  Typography,
  Paper,
  FormControl,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// third party
import * as Yup from 'yup';
import * as React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEmployees } from '../../api/mainApi';
import { RootState } from '../../redux/reducers';

import SelectField from '@/components/Forms/SelectField';
import InputField from '@/components/Forms/InputField';
import DateField from '@/components/Forms/DateField';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import pxToRem from '@/themes/functions/pxToRem';
interface EMP {
  title: string;
  year: number;
}

const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
const AddEmp = ({ ...others }) => {
  const [searchString, setSearchString] = useState('Yogi');
  const queryFn = () => getEmployees({ input: searchString });
  // queryFn();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly EMP[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

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
    console.log('value', value, 'fieldName', fieldName);
    formik.setFieldValue(fieldName.trim(), value?.year);
  }
  //   const { data, error, isLoading, isSuccess } = useQuery({
  //     queryKey: ['appriciation_list'],
  //     queryFn: () => fetchAppriciationList('1'),
  //   });

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
                          id="asynchronous-demo"
                          fullWidth
                          sx={{
                            height: `${pxToRem(24)} !important`,
                          }}
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.title === value.title
                          }
                          getOptionLabel={(option) => option.title}
                          options={options}
                          loading={loading}
                          onChange={(event, newValue) => {
                            handleAutocompleteChange(
                              newValue,
                              'reportingManager',
                              'reportingManager',
                            );
                          }}
                          renderInput={(params) => (
                            <FormControl fullWidth size={'medium'}>
                              <label htmlFor={`outlined-select-reportingManager}`}>
                                Reporting Manager
                              </label>
                              <TextField
                                sx={{
                                  height: `${pxToRem(24)} !important`,
                                  display: 'flex !important',
                                  // padding: `${pxToRem(8)} ${pxToRem(28)} ${pxToRem(8)} ${pxToRem(12)} !important`,
                                }}
                                {...params}
                                label=""
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {loading ? (
                                        <CircularProgress color="inherit" size={20} />
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
