import type { TContext } from '../../utils';

export interface PaginationProps {
  fluid?: boolean;
  context?: TContext;
  pageRange?: number;
  limitDots?: boolean;
  totalPages: number;
  currentPage?: number;
  handleNewPage?(newPage: number): void;
  handleNextPage?(): void;
  handlePrevPage?(): void;
  hidePagination?: boolean;
  isNumberedPagination?: boolean;
  hidePaginationButtons?: boolean;
  disableButtonsFirstAndLastPage?: boolean;
}