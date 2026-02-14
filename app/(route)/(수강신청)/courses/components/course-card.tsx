import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Flex } from '@/components/ui/flex';
import { Users, CreditCard } from 'lucide-react';
import { Course } from '../schema';
import { useEnrolledCourses } from '../hooks/use-enrolled-courses';
import { useMemo } from 'react';

interface CourseCardProps {
  course: Course;
  onClick?: (id: number) => void;
  selected?: boolean;
}
export function CourseCard({ course, onClick, selected }: CourseCardProps) {

  const isFull = course.currentStudents >= course.maxStudents;
  const fillPercentage = (course.currentStudents / course.maxStudents) * 100;

  const cardAriaLabel = `${course.title}, 강사 ${course.instructorName}, 가격 ${course.price}원, ${course.currentStudents}명 수강 중`;

  const { isEnrolled } = useEnrolledCourses()

  const disabled = isFull || isEnrolled(course.id)

  const badgeLabel = () => {
    if (isEnrolled(course.id)) {
      return '수강 중';
    }
    return isFull ? '마감' : '모집중';
  }

  return (
    <Card
      style={{
        padding: '12px',
      }}
      tabIndex={0}
      onClick={() => !disabled && onClick?.(course.id)}
      className={cn(
        'group relative overflow-hidden border-zinc-800 bg-zinc-950 transition-all duration-300',
        !disabled &&
          'hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-900/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        selected && 'border-violet-500 ring-1 ring-violet-500 bg-zinc-900',
      )}
      role="article"
      aria-label={cardAriaLabel}
    >
      <CardHeader className="relative p-8">
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="start" gap={4}>
            <CardTitle className="text-xl font-bold text-zinc-100 leading-tight group-hover:text-violet-100 transition-colors">
              {course.title}
            </CardTitle>
            <Badge
              variant={disabled ? 'secondary' : 'default'}
              style={{
                padding: '4px',
              }}
              className={cn(
                'shrink-0 font-semibold px-3 py-1 text-xs',
                disabled
                  ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  : 'bg-violet-950/50 text-violet-300 border border-violet-800/50 hover:bg-violet-900/50',
              )}
              aria-label={isFull ? '마감됨' : '모집중'}
            >
              {badgeLabel()}
            </Badge>
          </Flex>

          <CardDescription className="text-sm text-zinc-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {course.description}
          </CardDescription>

          <Flex align="center" gap={3} className="pt-2">
            <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
              {course.instructorName}
            </span>
          </Flex>
        </Flex>
      </CardHeader>

      <CardFooter className="relative p-8 pt-0">
        <Flex direction="column" gap={5} className="w-full">
          <div className="h-px w-full bg-zinc-900" aria-hidden="true" />
          <Flex direction="column" gap={3} className="w-full">
            <Students
              currentStudents={course.currentStudents}
              maxStudents={course.maxStudents}
            />
            <Progress percenTage={fillPercentage} />
          </Flex>
          <Price price={course.price} />
        </Flex>
      </CardFooter>
    </Card>
  );
}

function Students({
  currentStudents,
  maxStudents,
}: {
  currentStudents: number;
  maxStudents: number;
}) {
  return (
    <Flex align="center" justify="between" className="text-sm">
      <Flex align="center" gap={2} className="text-zinc-500">
        <Users className="h-4 w-4" aria-hidden="true" />
        <span>수강생</span>
      </Flex>
      <span className="font-medium text-zinc-300">
        <span className="sr-only">
          현재 {currentStudents}명, 정원 {maxStudents}명
        </span>
        <span aria-hidden="true">
          {currentStudents} / {maxStudents}명
        </span>
      </span>
    </Flex>
  );
}

function Price({ price }: { price: number }) {
  return (
    <Flex
      align="center"
      justify="between"
      className="w-full rounded-lg bg-zinc-900/40 border border-zinc-800/50 px-4 py-3 group-hover:bg-violet-500/5 group-hover:border-violet-500/10 transition-all"
    >
      <Flex align="center" gap={2} className="text-zinc-500">
        <CreditCard className="h-4 w-4" aria-hidden="true" />
        <span className="text-sm font-medium">수강료</span>
      </Flex>
      <span className="text-lg font-bold text-zinc-200 group-hover:text-violet-300 transition-colors">
        <span className="sr-only">가격 {price}원</span>
        <span aria-hidden="true">{price.toLocaleString()}원</span>
      </span>
    </Flex>
  );
}

function Progress({ percenTage }: { percenTage: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-900"
      role="progressbar"
      aria-valuenow={Math.min(percenTage, 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="모집 진행률"
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          percenTage >= 100 ? 'bg-zinc-700' : 'bg-violet-600/70',
        )}
        style={{ width: `${Math.min(percenTage, 100)}%` }}
      />
    </div>
  );
}
