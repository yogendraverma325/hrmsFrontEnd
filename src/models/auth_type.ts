export type LoginCredentials = {
  username: string;
  password: string;
};

export type changePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type verifyOtpType = {
  email: string;
  otp: string;
};

export type userPassword = {
  newPassword: string;
  email: string;
};

export type AuthResponse = {
  Data: { Full_Name: string; Key: string };
  StatusCode: number;
  Message: string;
};

export type changePassword = {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
};
