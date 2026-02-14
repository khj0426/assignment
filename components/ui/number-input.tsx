import * as React from 'react';

import { cn } from '@/lib/utils';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onValueChange?: (value: number | undefined) => void;
}

const 숫자만_포함하는가 = (value: string) => {
  return value === '' || /^\d+$/.test(value);
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (숫자만_포함하는가(value)) {
        onChange?.(e);
        onValueChange?.(value === '' ? undefined : Number(value));
      }
    };

    return (
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
