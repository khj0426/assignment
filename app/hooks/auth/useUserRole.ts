import type { RoleType } from '@/app/(route)/(회원가입)/sign-up/schema';
import { useStorageState } from 'react-simplikit';

const USER_ROLE_KEY = 'userRole';
export function useUserRole() {
  const [userRole, setUserRole] = useStorageState<RoleType>(USER_ROLE_KEY, {
    storage: {
      get: (key) => sessionStorage.getItem(key),
      set: (key, value) => sessionStorage.setItem(key, value),
      remove: (key) => sessionStorage.removeItem(key),
      clear: () => sessionStorage.clear(),
    },
  });

  return {
    userRole,
    setUserRole,
    removeUserRole: () => setUserRole(undefined),
    clearUserRole: () => setUserRole(undefined),
  };
}
