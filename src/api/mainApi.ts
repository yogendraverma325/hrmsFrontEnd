import { AxiosResponse } from 'axios';

import { EmpListResponse, Profile, ReportiesListResponse } from '../models/feed';
import { apiClient } from './apiClient';

export async function getEmployees(payload: any): Promise<EmpListResponse> {
  const { input } = payload ?? {};
  let applyFilter = payload ? `?search=${payload}` : '';
  const response: AxiosResponse<EmpListResponse> = await apiClient.get(
    `master/employee${applyFilter}`,
  );
  return response.data;
}

export async function getHierarchy(payload: number): Promise<ReportiesListResponse> {
  let applyFilter = payload ? `?manager=${payload}` : '';
  const response: AxiosResponse<ReportiesListResponse> = await apiClient.get(
    `master/reporties${applyFilter}`,
  );
  return response.data;
}

export async function getpersonalDetails(): Promise<Profile> {
  const response: AxiosResponse<Profile> = await apiClient.get(`user/personalDetails`);
  return response.data;
}

export async function getProfile(): Promise<Profile> {
  const response: AxiosResponse<Profile> = await apiClient.get(`user/profileDetails`);
  return response.data;
}
