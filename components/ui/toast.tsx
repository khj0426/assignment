'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': '#2c2c2e',
          '--normal-text': '#f5f5f7',
          '--normal-border': '#3a3a3c',
          '--border-radius': '12px',
          '--success-bg': '#14532d',
          '--success-text': '#bbf7d0',
          '--success-border': '#166534',
          '--error-bg': '#7f1d1d',
          '--error-text': '#fecaca',
          '--error-border': '#991b1b',
          '--warning-bg': '#78350f',
          '--warning-text': '#fde68a',
          '--warning-border': '#92400e',
          '--info-bg': '#1e3a5f',
          '--info-text': '#bfdbfe',
          '--info-border': '#1e40af',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
