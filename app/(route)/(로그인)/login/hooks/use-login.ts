import { ErrorResponse, httpClient } from '@/lib/http-client';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/app/hooks/useToast';
import { useAuth } from '@/app/hooks/auth/useAuth';
import type { LoginSchema } from '../schema';
import { User } from '@/app/models/user';
import { useUserRole } from '@/app/hooks/auth/useUserRole';

interface Response {
  user: User;
  accessToken: string;
  tokenType: string;
}

export function useLogin() {
  const toast = useToast();

  const { setAuthToken } = useAuth();
  const { setUserRole } = useUserRole();

  return useMutation({
    mutationFn: (body: LoginSchema) =>
      httpClient.post<Response>('users/login', { json: body }),
    onSuccess: async (response) => {
      const { accessToken, user } = await response.json();

      setAuthToken(accessToken);
      setUserRole(user.role);
    },
    onError: (e) => {
      if (e instanceof ErrorResponse) {
        toast.error(e.message);
      }
    },
  });
}
