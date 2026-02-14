'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/toast';
import { QueryProvider } from './query-provider';
import { QueryErrorBoundary } from './query-error-boundary';

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <QueryErrorBoundary>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryErrorBoundary>
      <Toaster />
    </QueryProvider>
  );
}
