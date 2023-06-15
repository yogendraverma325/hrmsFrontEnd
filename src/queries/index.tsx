import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const ReactQueryProvider = ({ children }: PropsWithChildren<unknown>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        // ✅ globally default to 5 seconds
        staleTime: 5 * 1000,
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
