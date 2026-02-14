import { useStorageState } from 'react-simplikit';

const AUTH_KEY = 'auth-token';

export function useAuth() {
  const [authToken, setAuthToken] = useStorageState(AUTH_KEY, {
    defaultValue: '',
  });

  const isAuthenticated = authToken !== '';

  return {
    authToken,
    isAuthenticated,
    setAuthToken,
  };
}
