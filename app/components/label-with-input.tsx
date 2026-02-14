import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flex } from '@/components/ui/flex';
import type { ComponentProps } from 'react';

interface LabelWithInputProps extends ComponentProps<typeof Input> {
  label: string;
}

export function LabelWithInput({
  label,
  id,
  className,
  ...props
}: LabelWithInputProps) {
  return (
    <Flex as="fieldset" direction="column" gap={8} className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </Flex>
  );
}
