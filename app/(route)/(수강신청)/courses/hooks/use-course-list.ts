import { httpClient } from '@/lib/http-client';
import type { Page } from '@/types/pagination';
import { useInfiniteQuery } from '@tanstack/react-query';
import { type Course, CourseSort, type CourseSortType } from '../schema';
import { useCourseSort } from './use-course-sort';

export const getCourseList = async ({
  page,
  sort,
}: {
  page: number;
  sort: CourseSortType;
}) => {
  return httpClient
    .get<Page<Course>>('courses', {
      searchParams: {
        page,
        sort,
      },
    })
    .then((r) => r.json());
};

export function useCourseList() {
  const { sort } = useCourseSort();
  const currentSort = sort?.sort || CourseSort.최신순;

  return useInfiniteQuery({
    queryKey: useCourseList.queryKey(currentSort),
    queryFn: ({ pageParam }) =>
      getCourseList({ page: pageParam, sort: currentSort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    select: (data) => {
      const flattened = data.pages.flatMap((page) => page.content) ?? [];
      const courses = Array.from(
        new Map(flattened.map((item) => [item.id, item])).values(),
      );

      return {
        courses,
        totalElements: data.pages[0]?.totalElements,
      };
    },
  });
}

useCourseList.queryKey = (sort: CourseSortType) => ['courses', { sort }];
