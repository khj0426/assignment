import { useStorageState } from 'react-simplikit';

const MY_CREATED_COURSES_KEY = 'myCreatedCourses';

export function useMyCreatedCourses() {
  const [myCreatedCourseIds, setMyCreatedCourseIds] = useStorageState<number[]>(
    MY_CREATED_COURSES_KEY,
    {
      defaultValue: [],
    },
  );

  const addCreatedCourse = (courseId: number) => {
    setMyCreatedCourseIds((prev) => {
      if (prev?.includes(courseId)) {
        return prev;
      }
      return [...(prev || []), courseId];
    });
  };

  const isMyCreatedCourse = (courseId: number) => {
    return myCreatedCourseIds?.includes(courseId) ?? false;
  };

  const clearCreatedCourses = () => {
    setMyCreatedCourseIds([]);
  };

  return {
    myCreatedCourseIds,
    addCreatedCourse,
    isMyCreatedCourse,
    clearCreatedCourses,
  };
}
