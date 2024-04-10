import { AxiosResponse } from 'axios';

import {
  EmpListResponse,
  ApiResponse,
  PersonalData,
  ReportiesListResponse,
} from '../models/feed';
import { apiClient } from './apiClient';

export async function getEmployees(payload: any): Promise<EmpListResponse> {
  const { input } = payload ?? {};
  const applyFilter = payload ? `?search=${payload}` : '';
  const response: AxiosResponse<EmpListResponse> = await apiClient.get(
    `master/employee${applyFilter}`,
  );
  return response.data;
}

export async function getHierarchy(payload: number): Promise<any> {
  const applyFilter = payload ? `?manager=${payload}` : '';
  const response: AxiosResponse<ReportiesListResponse> = await apiClient.get(
    `master/reporties${applyFilter}`,
  );
  return response.data;
}

export async function getpersonalDetails(userId: string): Promise<PersonalData> {
  const response: AxiosResponse<PersonalData> = await apiClient.get(
    `user/personalDetails?user=${userId}`,
  );
  return response.data;
}

export async function getProfile(userId: string | undefined): Promise<ApiResponse> {
  if (!userId) {
    false;
  }
  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `user/profileDetails?user=${userId}`,
  );
  return response.data;
}
