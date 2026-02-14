import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  bottomText?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  bottomText,
  children,
}: FormFieldProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {bottomText && <p className="text-sm text-red-400">{bottomText}</p>}
    </fieldset>
  );
}
