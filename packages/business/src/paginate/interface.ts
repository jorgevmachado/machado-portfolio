export interface PaginateParameters<T> {
  skip: number;
  next: number;
  prev: number;
  total: number;
  pages: number;
  results: Array<T>;
  per_page: number;
  current_page: number;
}
