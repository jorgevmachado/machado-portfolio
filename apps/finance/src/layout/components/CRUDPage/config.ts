import type { GetUpdatedUrlParams, UpdateUrlParams } from './interface';

export function getValidPage(page?: number) {
  return page && page > 0 ? page : 1;
}

export function getUpdatedUrlParams({
  page,
  sort,
  order,
  searchParams,
}: GetUpdatedUrlParams) {

  const urlSearchParams = new URLSearchParams(searchParams.toString());

  updateUrlParam({
    key: 'page',
    value: String(getValidPage(Number(page ?? urlSearchParams.get('page')))),
    urlSearchParams
  });

  updateUrlParam({
    key: 'sort',
    value: sort ?? urlSearchParams.get('sort'),
    urlSearchParams
  });

  updateUrlParam({
    key: 'order',
    value: order ?? urlSearchParams.get('order'),
    urlSearchParams
  });

  return urlSearchParams;
}

function updateUrlParam({
  key,
  value,
  urlSearchParams,
}: UpdateUrlParams) {
  if (!value || value === '') {
    urlSearchParams.delete(key);
  } else {
    urlSearchParams.set(key, value);
  }
}