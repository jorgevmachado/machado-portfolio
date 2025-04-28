import { isNumberEven } from '@repo/services/number/number';

interface RenderNumbersStartEndParams {
  offset: number;
  pageRange: number;
  totalPages: number;
  selectedPage: number;
  lastMiddlePoint: number;
  firstMiddlePoint: number;
}

export function renderNumbersStartEnd({
  offset,
  pageRange,
  totalPages,
  selectedPage,
  lastMiddlePoint,
  firstMiddlePoint,
}: RenderNumbersStartEndParams) {
  const isInMiddleRange =
    selectedPage > firstMiddlePoint && selectedPage <= lastMiddlePoint;
  const isBeyondLastMiddlePoint = selectedPage > lastMiddlePoint;
  const isPageRangeExceedingTotalPages = (pageRange ?? 0) > totalPages;

  const start = isInMiddleRange
    ? selectedPage - offset
    : isBeyondLastMiddlePoint
      ? totalPages - ((pageRange ?? 1) - 1)
      : 1;

  const end = isInMiddleRange
    ? isNumberEven(pageRange ?? 0)
      ? selectedPage + offset - 1
      : selectedPage + offset
    : isBeyondLastMiddlePoint
      ? totalPages
      : isPageRangeExceedingTotalPages
        ? totalPages
        : (pageRange ?? 1);

  return {
    start,
    end,
  };
}