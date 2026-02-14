'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Role } from '@/app/(route)/(회원가입)/sign-up/schema';
import { useUserRole } from '@/app/hooks/auth/useUserRole';

export function CreateCourseButton() {
  const { userRole } = useUserRole();

  // 강사가 아니면 보여주지 않음
  if (userRole !== Role.강사) {
    return null;
  }

  return (
    <Button
      asChild
      variant="default"
      size="xs"
      style={{
        padding: '6px',
      }}
    >
      <Link href="/create-course">강의 만들기</Link>
    </Button>
  );
}
