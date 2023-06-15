import { useMutation } from '@tanstack/react-query';

import { createAppriciationPost, fetchAppriciationList } from '../api/mainApi';
import { MessageData } from '../models/feed';

export function useAppriciationList() {
  return useMutation((page: string) => fetchAppriciationList(page));
}

export function useAppriciateSomeone() {
  return useMutation((messageData: MessageData) => createAppriciationPost(messageData));
}
