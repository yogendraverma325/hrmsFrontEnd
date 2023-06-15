import { AxiosResponse } from 'axios';

import { AppreciationListResponse, MessageData } from '../models/feed';
import { apiClient } from './apiClient';

export async function fetchAppriciationList(
  page: string,
): Promise<AppreciationListResponse> {
  const form = new FormData();

  form.append('page', page);
  const response: AxiosResponse<AppreciationListResponse> = await apiClient.post(
    'user/appreciationList',
    form,
  );
  return response.data;
}

export async function createAppriciationPost(messageData: MessageData): Promise<any> {
  const response: AxiosResponse<any> = await apiClient.post(
    'user/appreciationForm',
    messageData,
  );
  return response.data;
}
