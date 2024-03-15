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
  statusCode: string;
  message: string;
  data: {
    emp: {
      id: number;
      name: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type changePassword = {
  data: any;
  message: string;
  statusCode: number;
  success: boolean;
};
