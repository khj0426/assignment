'use client';

import { LoginRequire } from './components/login-auth-guard';

export default function Page() {
  return <LoginRequire />;
}
