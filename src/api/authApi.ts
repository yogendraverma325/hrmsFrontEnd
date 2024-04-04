import axios, { AxiosResponse } from 'axios';

import {
  AuthResponse,
  changePassword,
  changePasswordType,
  LoginCredentials,
  userPassword,
  verifyOtpType,
} from '../models/auth_type';
import { apiClient } from './apiClient';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { username, password } = credentials;
  let formObject = {
    tmc: username,
    password: password,
  };
  const response: AxiosResponse<any> = await apiClient.post('auth/login', formObject);
  return response.data;
}

export async function changePassword(credentials: changePasswordType): Promise<any> {
  const { currentPassword, newPassword, confirmPassword } = credentials;
  const form = new FormData();
  form.append('password', currentPassword);
  form.append('newPassword', newPassword);
  form.append('email', 'customercare@teamcomputers.com');
  const response: AxiosResponse<any> = await axios.post(
    'https://teamsproject.teamcomputers.com/apbo/api/v1/resetPassword',
    form,
  );
  return response.data;
}

export async function sendOtpMail(email: string): Promise<changePassword> {
  const form = new FormData();
  form.append('email', email);
  const response: AxiosResponse<changePassword> = await axios.post(
    'https://teamsproject.teamcomputers.com/apbo/api/v1/user/sendOtpMail',
    form,
  );
  return response.data;
}

export async function verifyOtp(credential: verifyOtpType): Promise<changePassword> {
  const form = new FormData();
  const { email, otp } = credential;
  form.append('email', email);
  form.append('otp', otp);
  const response: AxiosResponse<changePassword> = await axios.post(
    'https://teamsproject.teamcomputers.com/apbo/api/v1/user/verifyOTP',
    form,
  );
  return response.data;
}

export async function verifyPassword(credential: userPassword): Promise<changePassword> {
  const form = new FormData();
  const { email, newPassword } = credential;
  form.append('email', email);
  form.append('newPassword', newPassword);
  const response: AxiosResponse<changePassword> = await axios.post(
    'https://teamsproject.teamcomputers.com/apbo/api/v1/user/forgotPassword',
    form,
  );
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/api/logout');
}
