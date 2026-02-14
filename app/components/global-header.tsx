'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function GlobalHeader() {
  const router = useRouter();
  const pathName = usePathname();
  const [isRootPath, setIsRootPath] = useState(true);

  useEffect(() => {
    setIsRootPath(pathName === '/');
  }, [pathName]);

  const safeRouterBack = () => {
    if (window.history.length > 1) {
      router.back();
    }
  };

  if (isRootPath) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={safeRouterBack}
        aria-label="뒤로가기"
      >
        <ChevronLeft />
      </Button>
    </header>
  );
}
