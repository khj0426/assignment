'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { useLogin } from './hooks/use-login';
import { type LoginSchema, loginSchema } from './schema';
import { LabelWithInput } from '@/app/components/label-with-input';
import { useRouter } from 'next/navigation';
import { BottomCTA } from '@/app/components/bottom-cta';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess() {
        router.replace('/courses');
      },
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
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password !== undefined}
        bottomAffix={errors.password?.message}
        {...register('password')}
        autoComplete="off"
      />

      <BottomCTA
        type="submit"
        disabled={!isValid || isPending}
        style={{ marginTop: 'auto' }}
      >
        로그인
      </BottomCTA>
    </Flex>
  );
}
