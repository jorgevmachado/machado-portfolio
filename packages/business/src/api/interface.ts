export interface ResponsePaginate<T> {
  next: string;
  count: number;
  results: Array<T>;
  previous: string;
}
