'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface BottomCTAProps extends React.ComponentProps<'button'> {
  containerClassName?: string;
  description?: React.ReactNode;
  asChild?: boolean;
}

export const BottomCTA = forwardRef<HTMLButtonElement, BottomCTAProps>(
  (
    { className, containerClassName, children, description, asChild, ...props },
    ref,
  ) => {
    return (
      <div
        style={{
          margin: '4px auto',
          cursor: 'pointer',
        }}
        className={cn(
          'fixed bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm z-50 transition-all duration-300 mx-auto max-w-[440px] flex flex-col gap-3 justify-center',
          containerClassName,
        )}
      >
        {description}
        <div className="w-full">
          <Button
            asChild={asChild}
            ref={ref}
            size="lg"
            {...props}
            className={cn(
              'w-full font-bold text-base h-12 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/30 transition-all',
              props.disabled &&
                'bg-zinc-700 text-zinc-400 shadow-none hover:shadow-none pointer-events-none cursor-not-allowed border-none hover:bg-zinc-700 hover:text-zinc-400',
              className,
            )}
          >
            {children}
          </Button>
        </div>
      </div>
    );
  },
);
BottomCTA.displayName = 'BottomCTA';
