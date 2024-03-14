/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps, useFormik } from 'formik';
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
import './Login.css';
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
   
    <div className="row container-fluid" style={{display:"flex" ,flexDirection: "column",height: "100vh"}}>
    <div className="left-web left-mob main-left">
        <div className="col-1">
            <img src="src/assets/images/team-logo.png" alt="" />
        </div>
        
        
            <div className="heading">
            
              <div className="row">
                  <div className="col-md-12 heading1">
                  <p className="txt"> Teams HRMS </p>
          </div>
     
    </div>
</div>
    </div>
    <div className="right-web right-mob">
        
            <div className="login">
                <div className="row">
                <Formik
                        initialValues={{
                          username: '',
                          password: '',
                          submit: null,
                        }}
                        validationSchema={Yup.object({
                          username: Yup.string().max(10).required('User Name is required'),
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
                    <div className="col-md-12 col-sm-12 col-xs-12 log">
                        <p className="log-text">login</p>  
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 inp">
                      <Field name="username">
                      {({ field, form, meta }: FieldProps) => (
                      <div>
                      <input {...field} type='text' placeholder="User Name" className="user"/>
                      <ErrorMessage name="username" component="div"  className="fieldError"/>
                      </div>
                      )}
                      </Field>
                      
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 inp1">

                    <Field name="password">
                      {({ field, form, meta }: FieldProps) => (
                      <div>
                      <input {...field} type={isVisible ? 'text' : 'password'} placeholder="Password" className="pswd"/>
                      <ErrorMessage name="password" component="div"  className="fieldError"/>
                      </div>
                      )}
                      </Field>

                        {isVisible ? (
                                  <i className="eye-icon fa fa-eye" onClick={toggleVisibility} ></i>
                              ) : (
                                 <i className="eye-icon fa fa-eye fa-eye-slash" onClick={toggleVisibility} ></i>
                              )}
                       
                    
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 fr-psw">
                        <div className="row">
                            <div className="col-md-10">
                                <p> Forgot your password?</p>
                            </div>
                          
                        </div>
                       
                    </div>
                 
                  <div className="col-md-12 col-sm-12 col-xs-12 bton">
                    <button type="submit" className="loginbtn"><span className="fa fa-arrow-circle-o-right"></span> LOGIN </button>
                  </div>
                     </Form>
                     )}
</Formik>

                
                  <div className="col-md-12 col-sm-12 col-xs-12 copy">
                    <p className="copyright"> Team Computers Pvt. Ltd. © 2024 | All rights reserved</p>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12 pol">
                    <div> Cookie Policy</div>
                    <div> Terms of Use</div>
                    <div> Privacy Policy</div>
                  </div>

                   </div>
                 
      
         
            </div>
            
            
            
           
        </div>
    </div>
    <div className="loader-overlay" id="loaderOverlay">
        <div className='loader'>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--dot'></div>
            <div className='loader--text'></div>
        </div>
    </div>

</>
  );
};

export default Login;
