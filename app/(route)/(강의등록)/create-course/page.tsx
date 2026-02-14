'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Flex } from '@/components/ui/flex';
import { LabelWithInput } from '@/app/components/label-with-input';
import { NumberInput } from '@/components/ui/number-input';
import { createCourseSchema, type CreateCourseSchema } from './schema';
import { useCreateNewCourse } from './hooks/use-create-new-course';
import { BottomCTA } from '@/app/components/bottom-cta';

export default function CreateCoursePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: '',
      description: '',
      instructorName: '',
      maxStudents: undefined,
      price: undefined,
    },
    mode: 'onChange',
  });

  const { mutate, isPending } = useCreateNewCourse();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
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
        label="강의명"
        id="title"
        type="text"
        placeholder="너나위의 내집마련 기초반"
        error={errors.title !== undefined}
        bottomAffix={errors.title?.message}
        {...register('title')}
        autoComplete="off"
      />

      <LabelWithInput
        label="강의 설명"
        id="description"
        type="text"
        placeholder="강의에 대한 설명을 입력해주세요"
        error={errors.description !== undefined}
        bottomAffix={errors.description?.message}
        {...register('description')}
        autoComplete="off"
      />

      <LabelWithInput
        label="강사명"
        id="instructorName"
        type="text"
        placeholder="강사 이름을 입력해주세요"
        error={errors.instructorName !== undefined}
        bottomAffix={errors.instructorName?.message}
        {...register('instructorName')}
        autoComplete="off"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="maxStudents" className="text-sm font-medium">
          최대 수강 인원
        </label>
        <NumberInput
          id="maxStudents"
          placeholder="10"
          {...register('maxStudents', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
        />
        {errors.maxStudents && (
          <span className="text-sm text-red-500">
            {errors.maxStudents.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-sm font-medium">
          가격 (원)
        </label>
        <NumberInput
          id="price"
          placeholder="200000"
          {...register('price', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
        />
        {errors.price && (
          <span className="text-sm text-red-500">{errors.price.message}</span>
        )}
      </div>

      <BottomCTA type="submit" disabled={!isValid || isPending}>
        강의 등록하기
      </BottomCTA>
    </Flex>
  );
}
