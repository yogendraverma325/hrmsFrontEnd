import { AxiosResponse } from 'axios';

import { EmpListResponse, Profile, ReportiesListResponse } from '../models/feed';
import { apiClient } from './apiClient';

export async function getEmployees(payload: any): Promise<EmpListResponse> {
  const { input } = payload ?? {};
  const applyFilter = payload ? `?search=${payload}` : '';
  const response: AxiosResponse<EmpListResponse> = await apiClient.get(
    `master/employee${applyFilter}`,
  );
  return response.data;
}

export async function getHierarchy(payload: number): Promise<ReportiesListResponse> {
  const applyFilter = payload ? `?manager=${payload}` : '';
  const response: AxiosResponse<ReportiesListResponse> = await apiClient.get(
    `master/reporties${applyFilter}`,
  );
  return response.data;
}

export async function getpersonalDetails(userId: string): Promise<Profile> {
  const response: AxiosResponse<Profile> = await apiClient.get(
    `user/personalDetails?user=${userId}`,
  );
  return response.data;
}

export async function getProfile(userId: string): Promise<Profile> {
  console.log('hello', userId);
  const response: AxiosResponse<Profile> = await apiClient.get(
    `user/profileDetails?user=${userId}`,
  );
  return response.data;
}
