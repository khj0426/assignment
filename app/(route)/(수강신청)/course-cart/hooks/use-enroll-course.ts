import { useMutation } from '@tanstack/react-query';
import { ErrorResponse, httpClient } from '@/lib/http-client';
import { useToast } from '@/app/hooks/useToast';
import { useRouter } from 'next/navigation';

interface EnrollmentSuccess {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
}

interface EnrollmentFailure {
  courseId: number;
  reason: string;
}

interface BatchEnrollmentResponse {
  success: EnrollmentSuccess[];
  failed: EnrollmentFailure[];
}

export function useEnrollCourses() {
  const toast = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: (courseIds: number[]) =>
      httpClient.post<BatchEnrollmentResponse>('enrollments/batch', {
        json: {
          courseIds,
        },
      }),
    onSuccess: async (response) => {
      const data = await response.json();
      const { success, failed } = data;

      // 성공한 강의가 있는 경우
      if (success.length > 0) {
        toast.success(`${success.length}개 강의 수강 신청이 완료되었습니다`);
      }

      // 실패한 강의가 있는 경우
      if (failed.length > 0) {
        failed.forEach((fail) => {
          toast.error(`${fail.reason}`);
        });
      }

      // 모든 강의가 실패한 경우가 아니면 수강 신청 완료 페이지로 이동
      if (success.length > 0) {
        router.push('/courses');
      }
    },
    onError: (e) => {
      if (e instanceof ErrorResponse) {
        toast.error(e.message);
      }
    },
  });
}
