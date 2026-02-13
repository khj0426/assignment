'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { PropsWithChildren } from 'react';
import { QueryProvider } from './query-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryProvider>
  );
}
