'use client';

import { useCallback, useState } from 'react';
import type { Course } from '../schema';
import { useMyCreatedCourses } from '@/app/(route)/(강의등록)/create-course/hooks/useMyCreatedCourses';
import { useToast } from '@/app/hooks/useToast';

import { useEnrolledCourses } from './use-enrolled-courses';

export function useCourseSelection() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const { isMyCreatedCourse } = useMyCreatedCourses();
  const { isEnrolled } = useEnrolledCourses();
  const toast = useToast();

  const selectCourse = useCallback(
    (course: Course) => {
      // Prevent selecting own created courses
      if (isMyCreatedCourse(course.id)) {
        toast.error('본인이 등록한 강의는 선택할 수 없습니다');
        return;
      }

      // Prevent selecting already enrolled courses
      if (isEnrolled(course.id)) {
        toast.error('이미 수강 중인 강의입니다');
        return;
      }

      setSelectedCourses((prev) => {
        const exists = prev.some((c) => c.id === course.id);
        if (exists) {
          return prev.filter((c) => c.id !== course.id);
        }
        return [...prev, course];
      });
    },
    [isMyCreatedCourse, isEnrolled, toast],
  );

  return {
    selectedCourses,
    selectCourse,
  };
}
