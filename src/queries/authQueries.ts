import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  changePassword,
  login,
  sendOtpMail,
  verifyOtp,
  verifyPassword,
} from '../api/authApi';
import {
  AuthResponse,
  changePasswordType,
  LoginCredentials,
  userPassword,
  verifyOtpType,
} from '../models/auth_type';

export function useLogin() {
  return useMutation((credential: LoginCredentials) => login(credential));
}

export function useChangePassword() {
  return useMutation((credential: changePasswordType) => changePassword(credential));
}

export function useSendOtpMutation() {
  return useMutation((email: string) => sendOtpMail(email));
}

export function useVerifyOtpMutation() {
  return useMutation((credential: verifyOtpType) => verifyOtp(credential));
}
export function useVerifyPasswordMutation() {
  return useMutation((credential: userPassword) => verifyPassword(credential));
}
