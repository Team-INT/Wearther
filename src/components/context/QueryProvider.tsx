"use client"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';

export function QueryProvider({children}: {children: React.ReactNode}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
      {children}
    </QueryClientProvider>
  );
}
