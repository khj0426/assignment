import { z } from 'zod';

export const Role = {
  수강생: 'STUDENT',
  강사: 'INSTRUCTOR',
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];

const 전화번호_패턴 = /^01[0-9]-\d{3,4}-\d{4}$/;

export const signUpSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.email('이메일 형식이 올바르지 않아요'),
  phone: z
    .string()
    .min(1, '휴대폰번호를 입력해주세요')
    .regex(전화번호_패턴, '010-1234-5678 형식으로 입력해주세요'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .max(10, '비밀번호는 10자 이하여야 합니다')
    .refine((pw) => {
      const has = 비밀번호유효성(pw);
      return has >= 2;
    }, '영문 소문자, 대문자, 숫자 중 최소 두 가지 이상 조합이 필요합니다'),
  role: z.enum([Role.강사, Role.수강생]),
});

const 비밀번호유효성 = (pw: string) =>
  [/[a-z]/, /[A-Z]/, /[0-9]/].filter((r) => r.test(pw)).length;

export type SignUpSchema = z.infer<typeof signUpSchema>;
