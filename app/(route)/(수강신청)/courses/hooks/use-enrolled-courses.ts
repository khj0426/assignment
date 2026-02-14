'use client';

import { useStorageState } from 'react-simplikit';

export const ENROLLED_COURSES_KEY = 'enrolledCourseIds';

export function useEnrolledCourses() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useStorageState<number[]>(
    ENROLLED_COURSES_KEY,
    {
      defaultValue: [],
    },
  );

  const isEnrolled = (courseId: number) => enrolledCourseIds.includes(courseId);

  const addEnrolledCourses = (newIds: number[]) => {
    setEnrolledCourseIds((prev) => Array.from(new Set([...prev, ...newIds])));
  };

  return { enrolledCourseIds, isEnrolled, addEnrolledCourses };
}
