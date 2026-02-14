import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { CourseList } from './components/course-list';
import { getCourseList, useCourseList } from './hooks/use-course-list';

export default async function CoursePage() {
  const queryClient = new QueryClient();

  //모든 3개의 필터에 대해 프리패칭 (Promise.allSettled로 하나가 실패해도 나머지는 진행되도록)
  await Promise.allSettled([
    queryClient.prefetchInfiniteQuery({
      queryKey: useCourseList.queryKey('recent'),
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) =>
        getCourseList({ page: pageParam, sort: 'recent' }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: useCourseList.queryKey('rate'),
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) =>
        getCourseList({ page: pageParam, sort: 'rate' }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: useCourseList.queryKey('popular'),
      initialPageParam: 0,
      queryFn: ({ pageParam = 0 }) =>
        getCourseList({ page: pageParam, sort: 'popular' }),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CourseList />
    </HydrationBoundary>
  );
}
