import type { ComponentProps, ElementType, JSX } from 'react';
import { cn } from '@/lib/utils';

type FlexProps<T extends ElementType = 'div'> = {
  as?: T;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: number;
  wrap?: boolean;
  flex?: number | string;
} & Omit<ComponentProps<T>, 'as'>;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export function Flex<T extends ElementType = 'div'>({
  as,
  direction = 'row',
  align,
  justify,
  gap,
  wrap = false,
  flex,
  className,
  style,
  children,
  ...props
}: FlexProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'flex',
        direction === 'column' && 'flex-col',
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
      style={{
        ...(gap !== undefined && { gap }),
        ...(flex !== undefined && { flex }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
