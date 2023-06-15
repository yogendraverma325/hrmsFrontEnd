/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from '@mui/material';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikProps,
  FormikValues,
  useFormikContext,
} from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useVerifyPasswordMutation,
} from '../../queries/authQueries';
import { enableLoading } from '../../redux/reducers/loadSlice';
import { setSnackbar } from '../../redux/reducers/snackbarSlice';
import { forgetPasswordValidation } from './helper';

interface ForgotPassword {
  handleToggleClass: () => void;
  status: boolean;
}

const ForgotPassoword: React.FC<ForgotPassword> = ({ handleToggleClass, status }) => {
  const formRef = useRef<FormikProps<FormikValues>>(null);
  const dispatch = useDispatch();
  const sendOtpMutation = useSendOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();
  const verifyPasswordMutation = useVerifyPasswordMutation();

  const handleUserSubmit = async (values: FormikValues, helpers: any) => {
    if (!sendOtpMutation.isSuccess) {
      try {
        const status = await sendOtpMutation.mutateAsync(values.email);
        // Login successful, perform any necessary actions

        console.log('<<API STATUS>>', status);
        dispatch(enableLoading({ loading: sendOtpMutation.isLoading }));
        dispatch(
          setSnackbar({
            snackbarMessage: status.message,
            snackbarOpen: true,
            snackbarType: 'success',
          }),
        );
      } catch (err: any) {
        console.log('<< Error >>', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }

    if (sendOtpMutation.data?.success && !verifyOtpMutation.data?.success) {
      try {
        const status = await verifyOtpMutation.mutateAsync({
          email: values.email,
          otp: values.otp,
        });
        // Login successful, perform any necessary actions

        console.log('<<API STATUS>>', status);
        dispatch(
          setSnackbar({
            snackbarMessage: status.message,
            snackbarOpen: true,
            snackbarType: 'success',
          }),
        );
      } catch (err: any) {
        console.log('<< Error >>', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }

    if (verifyOtpMutation.data?.success) {
      try {
        const status = await verifyPasswordMutation.mutateAsync({
          email: values.email,
          newPassword: values.confirmPassword,
        });
        // Login successful, perform any necessary actions
        handleToggleClass();
        console.log('<<API STATUS>>', status);
        dispatch(enableLoading({ loading: verifyPasswordMutation.isLoading }));
        dispatch(
          setSnackbar({
            snackbarMessage: status.message,
            snackbarOpen: true,
            snackbarType: 'success',
          }),
        );
      } catch (err: any) {
        console.log('<< Error >>', err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    // formRef.current?.resetForm();
    console.log('USEFFECT call');
    //   return () => {
    //     sendOtpMutation.reset();
    //   };
  }, [formRef.current?.values]);

  console.log(formRef.current?.values);

  return (
    <div className="flip-card-back">
      <p className="text-center sign-in-heading">
        <span>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <i className="las la-times go-back-to-login" onClick={handleToggleClass}></i>
        </span>
        Forgot Password
      </p>
      <span>Please enter your email address.</span>
      <Formik
        initialValues={{
          email: '',
          submit: null,
          otp: '',
          newPassword: '',
          confirmPassword: '',
          emailStatus: false,
          otpStatus: false,
        }}
        validationSchema={forgetPasswordValidation}
        onSubmit={handleUserSubmit}
        innerRef={formRef}
      >
        {(props: FormikProps<any>) => (
          <Form
            id="forgot_password_form"
            className="login-form mt-5"
            onSubmit={props.handleSubmit}
            noValidate
          >
            {!sendOtpMutation.data?.success ? (
              <div className="form-group mb-3">
                <Field
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" />
              </div>
            ) : null}
            {sendOtpMutation.data?.success && !verifyOtpMutation.data?.success ? (
              <>
                <div className="form-group mb-3">
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    name="otp"
                  />
                  <ErrorMessage name="otp" component="div" />
                </div>
                {/* eslint-disable-next-line
                jsx-a11y/no-noninteractive-element-interactions */}
                <p
                  className="frgt-pass"
                  id="forgotPwd"
                  onClick={() => sendOtpMutation.mutateAsync(props.values.email)}
                >
                  Resend OTP
                </p>
              </>
            ) : null}

            {verifyOtpMutation.data?.success ? (
              <>
                <div className="form-group mb-3">
                  <Field
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="newPassword"
                  />
                </div>
                <div className="form-group mb-3">
                  <Field
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                </div>
              </>
            ) : null}
            {props.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {props.errors.submit}
              </Typography>
            )}
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="btn btn-primary login-sbmt-btn"
                id="forgot_password_form"
                disabled={props.isSubmitting}
              >
                {!sendOtpMutation.data?.success
                  ? 'SEND OTP'
                  : sendOtpMutation.data?.success && !verifyOtpMutation.data?.success
                  ? 'VERIFY OTP'
                  : 'Confirm Password'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassoword;
