import { Flex } from '@/components/ui/flex';
import { cn } from '@/lib/utils';
import { CourseSort, type CourseSortType } from '../schema';
import { CreateCourseButton } from './create-course-button';

interface Props {
  countOfAllCourses: number;
  onValueChange: (value: CourseSortType) => void;
  value: CourseSortType;
}

export function CourseSortHeader({
  countOfAllCourses,
  onValueChange,
  value,
}: Props) {
  const currentSort = value;

  return (
    <Flex
      justify="between"
      align="center"
      className="sticky top-[0px] z-50 p-4 bg-[#1c1c1e] h-[30px] rounded-sm"
    >
      <Flex align="center" gap={12}>
        <div className="text-sm font-medium text-muted-foreground">
          총 <span className="text-zinc-100">{countOfAllCourses}</span>개
        </div>
        <CreateCourseButton />
      </Flex>
      <Flex gap={12} role="radiogroup" aria-label="강의 정렬 옵션">
        {Object.entries(CourseSort).map(([label, value]) => {
          const isSelected = currentSort === value;
          return (
            <button
              key={value}
              onClick={() => {
                onValueChange(value);
              }}
              style={{
                cursor: 'pointer',
              }}
              className={cn(
                'text-sm font-medium transition-colors px-4 py-2 rounded-md',
                isSelected
                  ? 'text-zinc-100 font-bold bg-zinc-800'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900',
              )}
              role="radio"
              aria-checked={isSelected}
            >
              {label}
            </button>
          );
        })}
      </Flex>
    </Flex>
  );
}
