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
  const response: AxiosResponse<any> = await apiClient.get(
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

export async function getGroupCompany(): Promise<any> {
  const response: AxiosResponse<any> = await apiClient.get(`mapping/groupCompany`);
  return response.data;
}

export async function getCompanyFromGroup(inputId: string | undefined): Promise<any> {
  if (!inputId) {
    false;
  }
  let ar_data = inputId?.split('_');

  if (!ar_data || ar_data.length < 2) {
    return null; // Return early if ar_data is undefined or doesn't have enough elements
  }

  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `mapping/company?groupId=${ar_data[1]}`,
  );
  return response.data;
}

export async function getBUFromCompany(input: string | undefined): Promise<any> {
  if (!input) {
    false;
  }
  let ar_data = input?.split('_');

  if (!ar_data || ar_data.length < 2) {
    return null; // Return early if ar_data is undefined or doesn't have enough elements
  }

  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `mapping/bu?companyId=${ar_data[1]}`,
  );
  return response.data;
}

export async function getSBUFromBuAndComapny(input: { id: string }): Promise<any> {
  if (!input) {
    false;
  }
  let ar_data = input?.id?.split('_');
  console.log('ar_data', ar_data);
  if (!ar_data || ar_data.length < 3) {
    return null; // Return early if ar_data is undefined or doesn't have enough elements
  }

  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `mapping/sbu?companyId=${ar_data[1]}&buId=${ar_data[2]}`,
  );
  return response.data;
}
export async function getDepartmentFromSBU(input: { id: string }): Promise<any> {
  if (!input) {
    false;
  }
  let ar_data = input?.id?.split('_');
  console.log('ar_data', ar_data);
  if (!ar_data || ar_data.length < 3) {
    return null; // Return early if ar_data is undefined or doesn't have enough elements
  }

  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `mapping/department?sbuMappingId=${ar_data[3]}`,
  );
  return response.data;
}
export async function getFunctionalAreaFromDepartment(input: {
  id: string;
}): Promise<any> {
  if (!input) {
    false;
  }
  let ar_data = input?.id?.split('_');
  console.log('ar_data', ar_data);
  if (!ar_data || ar_data.length < 3) {
    return null; // Return early if ar_data is undefined or doesn't have enough elements
  }

  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `mapping/functionalArea?departmentMappingId=${ar_data[2]}`,
  );
  return response.data;
}
