//회원가입 POST요청
import { ErrorResponse, httpClient } from '@/lib/http-client';
import { useMutation } from '@tanstack/react-query';
import { SignUpSchema } from '../schema';
import { useToast } from '@/app/hooks/useToast';
import { User } from '@/app/models/user';

export function useSignUp() {
  const toast = useToast();

  return useMutation({
    mutationFn: (body: SignUpSchema) =>
      httpClient.post<User>('users/signup', {
        json: {
          ...body,
        },
      }),
    onSuccess: () => {
      toast.success('회원가입에 성공했어요');
    },
    onError: (e) => {
      if (e instanceof ErrorResponse) {
        toast.error(e.message);
      }
    },
  });
}
