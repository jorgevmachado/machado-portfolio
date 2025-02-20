import { ResultResponse } from '../interface';

export function paginate(
  page: number,
  limit: number,
  list: Array<unknown>,
): ResultResponse {
  return {
    response: {
      skip: 0,
      next: 0,
      prev: 0,
      total: list.length,
      pages: 1,
      results: list,
      per_page: limit,
      current_page: page,
    },
    statusCode: 200,
  };
}