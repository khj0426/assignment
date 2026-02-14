import type * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.ComponentProps<'input'> {
  error?: boolean;
  bottomAffix?: string;
}

function Input({ className, type, error, bottomAffix, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'placeholder:text-[#8e8e93] placeholder:text-sm selection:bg-primary selection:text-primary-foreground border-[#3a3a3c] h-11 w-full min-w-0 rounded-lg border bg-[#2c2c2e] px-4 py-2 text-base text-[#f5f5f7] shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          error &&
            'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20',
          className,
        )}
        {...props}
      />
      {bottomAffix && (
        <p
          className={cn(
            'text-sm',
            error ? 'text-red-400' : 'text-muted-foreground',
          )}
        >
          {bottomAffix}
        </p>
      )}
    </div>
  );
}

export { Input };
