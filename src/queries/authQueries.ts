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
  const queryClient = useQueryClient();

  const loginMutation = useMutation((credential: LoginCredentials) => login(credential), {
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(['loginMutation'], data.Data); // Set the mutation result in the query client
    },
    onError: (error: AxiosError, variables, context) => {
      // On Error
    },
  });

  return loginMutation;
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
