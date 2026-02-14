import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Props extends PropsWithChildren {
  resetKeys?: React.Key[];
  rejectFallback?: React.ReactNode;
}

import { ServiceError } from '@/app/components/service-error';

export function QueryErrorBoundary({
  children,
  resetKeys,
  rejectFallback,
}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={resetKeys}
          fallbackRender={({ resetErrorBoundary }) => {
            if (rejectFallback) {
              return <>{rejectFallback}</>;
            }
            return <ServiceError onRetry={resetErrorBoundary} />;
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
