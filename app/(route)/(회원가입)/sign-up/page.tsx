'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Flex } from '@/components/ui/flex';
import { useSignUp } from './hooks/use-sign-up';
import { Role, type RoleType, type SignUpSchema, signUpSchema } from './schema';
import { LabelWithInput } from '@/app/components/label-with-input';
import { useLogin } from '@/app/(route)/(로그인)/login/hooks/use-login';
import { useRouter } from 'next/navigation';
import { BottomCTA } from '@/app/components/bottom-cta';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: Role.수강생,
    },
    mode: 'onChange',
  });

  const router = useRouter();
  const { mutateAsync: signUp, isPending } = useSignUp();
  const { mutateAsync: login } = useLogin();
  const role = watch('role');

  /*
  회원가입 성공 시 로그인이후 -> 수강신청 페이지로 이동합니다
  */
  const onSubmit = handleSubmit(async (formData) => {
    //회원가입
    const response = await signUp(formData);
    const { email } = await response.json();

    //로그인
    await login({
      email,
      password: formData.password,
    }).then(() => {
      //수강신청 페이지로 이동
      router.push('/courses');
    });
  });

  return (
    <Flex
      as="form"
      direction="column"
      gap={32}
      onSubmit={onSubmit}
      style={{ minHeight: 'calc(100dvh - 120px)' }}
    >
      <LabelWithInput
        label="이름"
        id="name"
        placeholder="이름을 입력해주세요"
        error={errors.name !== undefined}
        bottomAffix={errors.name?.message}
        {...register('name')}
        autoComplete="off"
      />

      <LabelWithInput
        label="이메일"
        id="email"
        type="email"
        placeholder="example@email.com"
        error={errors.email !== undefined}
        bottomAffix={errors.email?.message}
        {...register('email')}
        autoComplete="off"
      />

      <LabelWithInput
        label="휴대폰번호"
        id="phone"
        type="tel"
        placeholder="010-1234-5678"
        error={errors.phone !== undefined}
        bottomAffix={errors.phone?.message}
        {...register('phone')}
        autoComplete="off"
      />

      <LabelWithInput
        label="비밀번호"
        id="password"
        type="password"
        placeholder="6~10자, 영문/숫자 중 2가지 이상"
        error={errors.password !== undefined}
        bottomAffix={errors.password?.message}
        {...register('password')}
        autoComplete="off"
      />

      <Flex as="fieldset" direction="column" gap={8}>
        <Label>회원 유형</Label>
        <RadioGroup
          value={role}
          onValueChange={(value) =>
            setValue('role', value as RoleType, { shouldValidate: true })
          }
          className="flex justify-between"
        >
          <Flex
            as="label"
            htmlFor="role-student"
            align="center"
            gap={12}
            className="flex-1 cursor-pointer rounded-lg px-4 py-3"
          >
            <RadioGroupItem
              value={Role.수강생}
              id="role-student"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">수강생</span>
          </Flex>
          <Flex
            as="label"
            htmlFor="role-instructor"
            align="center"
            gap={12}
            className="flex-1 cursor-pointer rounded-lg px-4 py-3"
          >
            <RadioGroupItem
              value={Role.강사}
              id="role-instructor"
              className="h-5 w-5"
            />
            <span className="text-sm font-medium">강사</span>
          </Flex>
        </RadioGroup>
      </Flex>

      <BottomCTA
        type="submit"
        disabled={!isValid || isPending}
        style={{ marginTop: 'auto' }}
      >
        가입하기
      </BottomCTA>
    </Flex>
  );
}
