import { PaginateParameters } from './interface';

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
    this.insertCurrentPageNumberIntoPagination(page);
    limit = this.calculateLimit(limit);
    this.insertTotalNumberOfItemsIntoPagination(total);
    this.insertTotalNumberOfItemsPerPageIntoPagination(limit);
    this.insertTotalNumberOfPagesIntoPagination(total, limit);
    this.insertSkipIntoPagination();
    this.insertNumberOfNextPageIntoPagination();
    this.insertNumberOfPreviousPageIntoPagination();
    this.insertResultsIntoPagination(results);
  }

  private insertCurrentPageNumberIntoPagination(page: number) {
    this.current_page = page < 1 ? 1 : page;
  }

  private calculateLimit(limit: number) {
    return limit > 100 ? 100 : limit;
  }

  private insertTotalNumberOfItemsIntoPagination(total: number) {
    this.total = total;
  }

  private insertTotalNumberOfItemsPerPageIntoPagination(limit: number) {
    this.per_page = limit === 0 ? this.total : limit;
  }

  private insertTotalNumberOfPagesIntoPagination(total: number, limit: number) {
    if (limit === 0) {
      this.pages = Math.ceil(total / this.per_page);
      return;
    }
    this.pages = Math.ceil(total / limit);
  }

  private insertSkipIntoPagination() {
    if (this.current_page === 1) {
      this.skip = 0;
      return;
    }

    if (this.current_page === 2) {
      this.skip = this.per_page;
      return;
    }

    if (this.current_page === this.pages) {
      this.skip = this.total;
      return;
    }

    this.skip = this.current_page * this.per_page;
  }

  private insertNumberOfNextPageIntoPagination() {
    this.next = this.current_page === this.pages ? 0 : this.current_page + 1;
  }

  private insertNumberOfPreviousPageIntoPagination() {
    this.prev = this.current_page === 1 ? 0 : this.current_page - 1;
  }

  private insertResultsIntoPagination(results: Array<T>) {
    this.results = results;
  }
}
