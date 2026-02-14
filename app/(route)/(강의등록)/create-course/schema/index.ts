import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, '강의 제목을 입력해주세요'),
  description: z.string().min(1, '강의 설명을 입력해주세요'),
  instructorName: z.string().min(1, '강사 이름을 입력해주세요'),
  maxStudents: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val > 0, {
      message: '최대 수강생 수를 입력해주세요',
    }),
  price: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val > 0, {
      message: '가격을 입력해주세요',
    }),
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
