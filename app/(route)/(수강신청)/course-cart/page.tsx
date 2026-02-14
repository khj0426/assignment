'use client';

import { Flex } from '@/components/ui/flex';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomCTA } from '@/app/components/bottom-cta';
import { useRouter, useSearchParams } from 'next/navigation';
import { Course } from '../courses/schema';
import { useEnrollCourses } from './hooks/use-enroll-course';

export default function CourseCart() {
  const searchParams = useSearchParams();
  const selectedCourses = JSON.parse(
    searchParams.get('data') || '[]',
  ) as Course[];
  const router = useRouter();

  const { mutate: enrollCourses, isPending } = useEnrollCourses();

  const totalPrice = selectedCourses.reduce(
    (acc, course) => acc + course.price,
    0,
  );

  if (selectedCourses.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="h-[calc(100vh-100px)] text-center gap-4 text-muted-foreground"
      >
        <p>담은 강의가 없습니다.</p>
        <Button variant="outline" onClick={() => router.push('/courses')}>
          강의 목록으로 돌아가기
        </Button>
      </Flex>
    );
  }

  return (
    <div className="pb-32">
      <Flex direction="column" gap={16} className="p-4">
        <h1 className="text-xl font-bold">
          장바구니 ({selectedCourses.length})
        </h1>
        <Flex direction="column" gap={12}>
          {selectedCourses.map((course) => (
            <Card
              key={course.id}
              className="p-4 bg-zinc-900 border-zinc-800 relative"
            >
              <Flex
                direction="column"
                gap={8}
                style={{
                  padding: '12px',
                }}
              >
                <div className="text-sm text-zinc-400">
                  {course.instructorName}
                </div>
                <div className="font-bold pr-8">{course.title}</div>
                <div className="text-sm text-zinc-400 line-clamp-2">
                  {course.description}
                </div>
                <div className="text-right font-semibold text-zinc-200">
                  {course.price.toLocaleString()}원
                </div>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>

      <BottomCTA
        disabled={isPending}
        onClick={() =>
          enrollCourses(selectedCourses.map((course) => course.id))
        }
      >
        {totalPrice.toLocaleString()}원 결제하기
      </BottomCTA>
    </div>
  );
}
