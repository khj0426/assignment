'use client';

import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { TriangleAlert } from 'lucide-react';

interface Props {
  onRetry?: () => void;
  className?: string;
}

export function ServiceError({ onRetry, className }: Props) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={16}
      className={
        className ?? 'h-full min-h-[400px] text-center p-6 bg-zinc-950 w-full'
      }
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800">
        <TriangleAlert className="w-8 h-8 text-zinc-400" />
      </div>

      <Flex direction="column" gap={8} align="center">
        <h2 className="text-lg font-bold text-zinc-100">
          서비스 이용에 불편을 드려 죄송합니다
        </h2>
        <p className="text-zinc-500 text-sm max-w-[300px] break-keep">
          일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </Flex>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          다시 시도
        </Button>
      )}
    </Flex>
  );
}
