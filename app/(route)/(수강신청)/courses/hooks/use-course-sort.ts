import { parseAsJson, useQueryState } from 'nuqs';
import { CourseSort, CourseSortType } from '../schema';
import z from 'zod';

const schema = z.object({
  sort: z.enum([
    CourseSort.최신순,
    CourseSort['신청자 많은 순'],
    CourseSort['신청률 높은 순'],
  ]),
});

export function useCourseSort() {
  const [sort, setSort] = useQueryState(
    'json',
    parseAsJson(schema).withOptions({ history: 'replace' }),
  );

  const handleOnChangeSort = (value: CourseSortType) => {
    setSort({ sort: value }).then(() => {
      scrollToTop();
    });
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('#app-content');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return { sort, handleOnChangeSort };
}
