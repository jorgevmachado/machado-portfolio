import { PaginateParameters } from './interface';
import {
  getSkipIntoPagination,
  getTotalNumberOfPagesIntoPagination,
} from './config';

export class Paginate<T> implements PaginateParameters<T> {
  skip: number = 0;
  next: number = 0;
  prev: number = 0;
  total: number = 0;
  pages: number = 0;
  results: Array<T> = [];
  per_page: number = 0;
  current_page: number = 0;

  constructor(page: number, limit: number, total: number, results: Array<T>) {
    this.current_page = page < 1 ? 1 : page;
    limit = limit > 100 ? 100 : limit;
    this.total = total;
    this.per_page = limit === 0 ? this.total : limit;
    this.pages = getTotalNumberOfPagesIntoPagination(
      this.total,
      limit,
      this.per_page,
    );
    this.skip = getSkipIntoPagination(
      this.current_page,
      this.per_page,
      this.pages,
      this.total,
    );
    this.next = this.current_page === this.pages ? 0 : this.current_page + 1;
    this.prev = this.current_page === 1 ? 0 : this.current_page - 1;
    this.results = results;
  }
}
