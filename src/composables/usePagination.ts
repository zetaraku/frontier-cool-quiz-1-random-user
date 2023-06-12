import * as Vue from 'vue';

function paginateItems<T>(items: T[], pageSize: number, pageNo: number): T[] {
  return items.slice(
    pageSize * (pageNo - 1),
    pageSize * (pageNo - 0),
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max);
}

export function computePagination(pageCount: number, currentPage: number, displayRange: number = 1): number[] {
  const firstPage = 1;
  const lastPage = Math.max(1, pageCount);

  const centerPage = clamp(currentPage, firstPage + 2 + displayRange, lastPage - 2 - displayRange);
  const fromRange = Math.max(centerPage - displayRange, firstPage + 2);
  const toRange = Math.min(centerPage + displayRange, lastPage - 2);

  const pagination: number[] = [];

  if (pageCount >= 1) pagination.push(firstPage);
  if (pageCount >= 3) pagination.push(fromRange <= firstPage + 2 ? firstPage + 1 : 0);
  for (let i = fromRange; i <= toRange; i += 1) pagination.push(i);
  if (pageCount >= 4) pagination.push(toRange >= lastPage - 2 ? lastPage - 1 : 0);
  if (pageCount >= 2) pagination.push(lastPage);

  return pagination;
}

export default function usePagination<T>(
  items: Vue.MaybeRef<T[]>,
  pageSize: Vue.MaybeRef<number>,
) {
  const pageNo = Vue.ref(1);

  const itemsCount = Vue.computed(() => Vue.unref(items).length);
  const pagesCount = Vue.computed(() => Math.max(1, Math.floor((itemsCount.value - 1) / Vue.unref(pageSize)) + 1));
  const paginatedItems = Vue.computed(() => paginateItems(Vue.unref(items), Vue.unref(pageSize), pageNo.value));

  Vue.watch([
    Vue.ref(items),
    Vue.ref(pageSize),
  ], () => {
    pageNo.value = 1;
  });

  return {
    pageNo,
    pagesCount,
    paginatedItems,
  };
}
