/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './Login.css';

import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikProps,
  useFormik,
} from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/AuthProvider';
import { LoginCredentials } from '../../models/auth_type';
import { useLogin } from '../../queries/authQueries';
import config from '../../redux/constant';
import { enableLoading } from '../../redux/reducers/loadSlice';
import { setSnackbar } from '../../redux/reducers/snackbarSlice';
import ForgotPassoword from './ForgotPassoword';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const loginMutation = useLogin();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(enableLoading({ loading: loginMutation.isLoading }));
    //
  }, [loginMutation.isLoading, dispatch]);

  const handleUserSubmit = async (
    values: LoginCredentials,
    helpers: {
      setStatus: (arg0: { success: boolean }) => void;
      setErrors: (arg0: { submit: any }) => void;
      setSubmitting: (arg0: boolean) => void;
    },
  ) => {
    try {
      const status = await loginMutation.mutateAsync(values);
      // // Login successful, perform any necessary actions
      dispatch(enableLoading({ loading: loginMutation.isLoading }));
      setToken(status.data.tokens.accessToken);
      dispatch(
        setSnackbar({
          snackbarMessage: status?.message,
          snackbarOpen: true,
          snackbarType: 'success',
        }),
      );
      localStorage.setItem('userData', JSON.stringify(status.data.emp));
      navigate(config.defaultPath, { replace: true });
    } catch (err: any) {
      dispatch(
        setSnackbar({
          snackbarMessage: err?.response?.data?.message,
          snackbarOpen: true,
          snackbarType: 'error',
        }),
      );
    }
  };

  //  a

  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    return () => {
      loginMutation.reset();
    };
  }, [isActive]);

  return (
    <>
      <div
        className="row container-fluid"
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div className="left-web left-mob main-left">
          <div className="col-1">
            <img src="src/assets/images/team-logo.png" alt="" />
          </div>
          
        </div>
        <div className="right-web right-mob">
          <div className="login">
            <div className="row">
              <Formik
                initialValues={{
                  username: '13675',
                  password: 'test1234',
                  submit: null,
                }}
                validationSchema={Yup.object({
                  username: Yup.string().max(255).required('TMC is required'),
                  password: Yup.string().max(255).required('Password is required'),
                })}
                onSubmit={handleUserSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form className="login-form" noValidate onSubmit={props.handleSubmit}>
                    <Box
                      sx={{
                        width: '64%',
                        marginLeft: '17%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        border: '1px solid #ccc',
                        boxShadow: '6px 8px 4px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        background: 'white'
                      }}
                    >
                      <div className="heading">
            <div className="row">
              <div className="col-md-12 heading1">
                <p className="txt"> Teams HRMS </p>
              </div>
            </div>
          </div>
                      <div className="log">
                        <p className="log-text">Login</p>
                      </div>
                      <div className='container'>
                        <div className='col-md-12'>
                          <div className='col-md-12'>
                            <Field name="username">
                              {({ field, form, meta }: FieldProps) => (
                                <TextField
                                  {...field}
                                  label="Username"
                                  variant="outlined"
                                  fullWidth
                                  name="username"
                                  style={{ marginBottom: '4rem' }}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  value={form.values.username}
                                  error={form.touched.username && Boolean(form.errors.username)}
                                  helperText={form.touched.username && form.errors.username}
                                />
                              )}
                            </Field>
                    
                          </div>
                          <div className='col-md-12'>
                            <Field name="password">
                              {({ field, form, meta }: FieldProps) => (
                                <div style={{ position: 'relative' }}>
                                  <TextField
                                    {...field}
                                    type={isVisible ? 'text' : 'password'}
                                    label="Password"
                                    name='password'
                                    variant="outlined"
                                    fullWidth
                                    style={{ marginBottom: '4rem' }}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  value={form.values.password}
                                  error={form.touched.password && Boolean(form.errors.password)}
                                  helperText={form.touched.password && form.errors.password}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton onClick={toggleVisibility} edge="end">
                                            {isVisible ? (
                                              <VisibilityIcon />
                                            ) : (
                                              <VisibilityOffIcon />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                 
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div>
                      </div>
                      <div className="bton" style={{ marginTop: '1rem' }}>
                        <button type="submit" className="loginbtn">
                          <span className="fa fa-arrow-circle-o-right"></span> LOGIN{' '}
                        </button>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12 copy">
                <p className="copyright">
                  {' '}
                  Team Computers Pvt. Ltd. © 2024 | All rights reserved
                </p>
              </div>

              <div className="col-md-12 col-sm-12 col-xs-12 pol">
                <div> Cookie Policy</div>
                <div> Terms of Use</div>
                <div> Privacy Policy</div>
              </div>
                    </Box>
                  </Form>
                )}
              </Formik>
             
            </div>
          </div>
        </div>
      </div>
      <div className="loader-overlay" id="loaderOverlay">
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--text"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
