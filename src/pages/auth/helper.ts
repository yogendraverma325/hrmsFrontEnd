import * as Yup from 'yup';

export const forgetPasswordValidation = Yup.object().shape({
  emailStatus: Yup.bool(),
  otpStatus: Yup.bool(),

  email: Yup.string().when('emailStatus', {
    is: false,
    then: () =>
      Yup.string().email('Invalid email address').required('Please enter email address'),
  }),

  otp: Yup.string().when('emailStatus', {
    is: true,
    then: () => Yup.string().min(6).max(6).required('Please enter OTP'),
  }),
  newPassword: Yup.string().when('otpStatus', {
    is: true,
    then: () =>
      Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        ),
  }),

  confirmPassword: Yup.string().when('otpStatus', {
    is: true,
    then: () =>
      Yup.string().oneOf([Yup.ref('newPassword')], 'Both password need to be the same'),
  }),
});

export const forgetPasswordValues = {
  email: '',
  submit: null,
  otp: '',
  newPassword: '',
  confirmPassword: '',
  step: 0,
};
