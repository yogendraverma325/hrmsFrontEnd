/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik, FormikProps, useFormik } from 'formik';
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
      // Login successful, perform any necessary actions
      dispatch(enableLoading({ loading: loginMutation.isLoading }));
      setToken(status.Data.Key);
      dispatch(
        setSnackbar({
          snackbarMessage: 'Login Successful',
          snackbarOpen: true,
          snackbarType: 'success',
        }),
      );
      localStorage.setItem('userData', JSON.stringify(status.Data));
      navigate(config.defaultPath, { replace: true });
      if (status.StatusCode === 0) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: status?.Message });
        helpers.setSubmitting(false);
      }
    } catch (err) {
      console.log('<< Error >>', err);
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: 'Invalid username or password' });
      helpers.setSubmitting(false);
    }
  };

  //  a

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    return () => {
      loginMutation.reset();
    };
  }, [isActive]);

  return (
    <div className="login-wrap">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="card-container d-flex justify-content-center align-items-center">
            <div className="login-card">
              <div className="flip-card" id="flipCard">
                <div
                  className={isActive ? 'flip-card-inner is-flipped' : 'flip-card-inner'}
                  id="flipCardInner"
                >
                  <div className="flip-card-front">
                    <div style={{ position: 'relative' }}>
                      <p className="text-center sign-in-heading">Sign In</p>
                      <Formik
                        initialValues={{
                          username: '',
                          password: '',
                          submit: null,
                        }}
                        validationSchema={Yup.object({
                          username: Yup.string().max(10).required('TMC ID is required'),
                          password: Yup.string()
                            .max(255)
                            .required('Password is required'),
                        })}
                        onSubmit={handleUserSubmit}
                      >
                        {(props: FormikProps<any>) => (
                          <Form
                            className="login-form"
                            noValidate
                            onSubmit={props.handleSubmit}
                            // onKeyDown={(e) => {
                            //   if (e.key === 'Enter') e.preventDefault();
                            // }}
                          >
                            <div className="form-group mb-3">
                              <Field
                                name="username"
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="TMC"
                              />
                              <ErrorMessage name="username" component="div" />
                            </div>
                            <div className="form-group mb-3">
                              <Field
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Domain Password"
                              />

                              <ErrorMessage name="password" component="div" />
                            </div>
                            {/* <div className="form-group mb-3">
                            </div> */}
                            {props.errors.submit && (
                              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                                {props.errors.submit}
                              </Typography>
                            )}
                            {/* eslint-disable-next-line
                            jsx-a11y/click-events-have-key-events */}
                            <p className="frgt-pass" id="forgotPwd" onClick={toggleClass}>
                              Forgot password?
                            </p>
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                type="submit"
                                className="btn btn-primary login-sbmt-btn"
                              >
                                LOGIN
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      <div className="pos-abs">
                        <p className="footer-txt text-center">
                          Team Computers Pvt. Ltd. @2023 | All rights Reserved
                        </p>
                      </div>
                    </div>
                  </div>
                  {isActive ? (
                    <ForgotPassoword status={isActive} handleToggleClass={toggleClass} />
                  ) : null}
                  {/* <ForgotPassoword handleToggleClass={toggleClass} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="teams-logo-div">
        <img
          alt="footer_img"
          src="https://www.teamcomputers.com/images/team-footer-logo.png"
        />
      </div>
    </div>
  );
};

export default Login;
