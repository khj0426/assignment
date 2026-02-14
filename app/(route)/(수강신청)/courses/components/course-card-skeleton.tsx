import { Card } from '@/components/ui/card';
import { Flex } from '@/components/ui/flex';

export function CourseCardSkeleton() {
  return (
    <Card className="animate-pulse bg-zinc-900/50 border-zinc-800">
      <Flex direction="column" gap={12} className="p-4">
        <div className="h-5 w-16 bg-zinc-800 rounded" />

        <div className="h-6 w-3/4 bg-zinc-800 rounded" />

        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-800 rounded" />
          <div className="h-4 w-5/6 bg-zinc-800 rounded" />
        </div>

        <Flex justify="between" align="center" className="mt-2">
          <div className="h-4 w-24 bg-zinc-800 rounded" />
          <div className="h-5 w-20 bg-zinc-800 rounded" />
        </Flex>
      </Flex>
    </Card>
  );
}
