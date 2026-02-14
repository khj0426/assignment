import { ErrorResponse, httpClient } from '@/lib/http-client';
import { useMutation } from '@tanstack/react-query';
import { CreateCourseSchema } from '../schema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/hooks/useToast';
import { Course } from '@/app/(route)/(수강신청)/courses/schema';
import { useMyCreatedCourses } from './useMyCreatedCourses';

export function useCreateNewCourse() {
  const router = useRouter();
  const toast = useToast();
  const { addCreatedCourse } = useMyCreatedCourses();

  return useMutation({
    mutationFn: (body: CreateCourseSchema) =>
      httpClient.post<Course>('courses', { json: body }),
    onSuccess: async (response) => {
      const course = await response.json();
      addCreatedCourse(course.id);
      toast.success('강의가 성공적으로 등록되었습니다.');
      router.push('/courses');
    },
    onError: (e) => {
      if (e instanceof ErrorResponse) {
        toast.error(e.message);
      }
    },
  });
}
