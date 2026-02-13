import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Props extends PropsWithChildren {
  resetKeys?: React.Key[];
  rejectFallback?: React.ReactNode;
}

export function QueryErrorBoundary({
  children,
  resetKeys,
  rejectFallback,
}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={rejectFallback}
          onReset={reset}
          resetKeys={resetKeys}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
