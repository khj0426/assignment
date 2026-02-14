'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoginRequire() {
  return (
    <div className="flex h-[calc(100%+48px)] w-full m-6 items-center justify-center">
      <Card className="flex h-full w-full flex-col justify-center rounded-none border-0 shadow-none">
        <CardHeader className="items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">로그인이 필요합니다</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/sign-up">회원가입</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
