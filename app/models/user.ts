import type { RoleType } from '../(route)/(회원가입)/sign-up/schema';

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: RoleType;
  message: string;
}
