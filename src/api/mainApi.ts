import { AxiosResponse } from 'axios';

import { EmpListResponse, ReportiesListResponse } from '../models/feed';
import { apiClient } from './apiClient';

export async function getEmployees(payload: any): Promise<EmpListResponse> {
  const { input } = payload ?? {};
  let applyFilter = input ? `?search=${input}` : '';
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
