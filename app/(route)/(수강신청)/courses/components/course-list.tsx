'use client';

import Link from 'next/link';
import { CourseCard } from './course-card';
import { useCourseList } from '../hooks/use-course-list';
import { Flex } from '@/components/ui/flex';
import { CourseSortHeader } from './course-sort-header';
import { useCourseSort } from '../hooks/use-course-sort';
import { Course, CourseSort } from '../schema';
import { useCourseSelection } from '../hooks/use-course-selection';
import { BottomCTA } from '@/app/components/bottom-cta';
import { QueryErrorBoundary } from '@/app/provider-groups/query-error-boundary';
import { ServiceError } from '@/app/components/service-error';
import { CourseCardSkeleton } from './course-card-skeleton';

import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export function CourseList() {
  const { sort, handleOnChangeSort } = useCourseSort();
  const {
    data: courseList,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourseList();
  const { selectedCourses, selectCourse } = useCourseSelection();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const 모든_강의목록들 = courseList?.courses ?? [];

  return (
    <QueryErrorBoundary
      resetKeys={[JSON.stringify(sort?.sort)]}
      rejectFallback={<ServiceError onRetry={refetch} />}
    >
      <Flex
        direction="column"
        gap={8}
        className="bg-[#1c1c1e]"
        style={{
          paddingBottom: '54px',
        }}
      >
        <CourseSortHeader
          value={sort?.sort || CourseSort.최신순}
          countOfAllCourses={courseList?.totalElements ?? 0}
          onValueChange={handleOnChangeSort}
        />
        {모든_강의목록들?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => selectCourse(course)}
            selected={selectedCourses.some((c) => c.id === course.id)}
          />
        ))}

        {isFetchingNextPage && <Loading />}

        <div ref={ref} className="h-4 w-full" />

        <BottomCTA asChild disabled={selectedCourses.length === 0}>
          <Link
            href={`/course-cart?data=${encodeURIComponent(
              JSON.stringify(selectedCourses),
            )}`}
            scroll={true}
          >
            <BottomCTALabel selectedCourses={selectedCourses} />
          </Link>
        </BottomCTA>
      </Flex>
    </QueryErrorBoundary>
  );
}

function Loading() {
  return (
    <div className="p-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
}

function BottomCTALabel({ selectedCourses }: { selectedCourses: Course[] }) {
  if (selectedCourses.length === 0) {
    return '신청하기';
  }
  return `${selectedCourses.length}개 강의 담기`;
}
