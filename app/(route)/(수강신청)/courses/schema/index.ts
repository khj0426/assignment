export const CourseSort = {
  최신순: 'recent',
  '신청자 많은 순': 'popular',
  '신청률 높은 순': 'rate',
} as const;

export type CourseSortType = (typeof CourseSort)[keyof typeof CourseSort];

export interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
}
