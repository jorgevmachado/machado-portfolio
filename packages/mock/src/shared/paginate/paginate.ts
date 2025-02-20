import { ResultResponse } from '../interface';
import {badRequestException} from "../exceptions";

export function paginate<T = unknown>(
  page: number,
  limit: number,
  list: Array<T>,
): ResultResponse {
  const total = list.length;
  if(page <= 0 || limit <= 0) {
    return badRequestException('Invalid page or limit number.')
  }
  const skip = (page - 1) * limit;
  const paginatedResults = list.slice(skip, skip + limit);
  const totalPages = Math.ceil(total / limit);

  return {
    response: {
      skip,
      next: page < totalPages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
      total,
      pages: totalPages,
      results: paginatedResults,
      per_page: limit,
      current_page: page,
    },
    statusCode: 200,
  };
}