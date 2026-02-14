import type { PropsWithChildren } from 'react';

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">로그인</h1>
      </header>
      <section>{children}</section>
    </div>
  );
}
