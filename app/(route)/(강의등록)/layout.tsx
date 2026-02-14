import type { PropsWithChildren } from 'react';

export default function CreateCourseLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">강의 만들기</h1>
      </header>
      <section>{children}</section>
    </div>
  );
}
