import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { TContext } from '@repo/ds/utils/colors/interface';
import Button from '@repo/ds/components/button/Button';
import { useEffect, useRef, useState } from 'react';
import { isNumberEven } from '@repo/services/number/number';
import ProgressIndicator from '../progressIndicator';

import './Pagination.scss';

interface PaginationProps {
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

export default function Pagination({
  fluid,
  context,
  pageRange,
  limitDots,
  totalPages,
  currentPage,
  handleNewPage,
  handleNextPage,
  handlePrevPage,
  hidePagination,
  isNumberedPagination,
  hidePaginationButtons,
  disableButtonsFirstAndLastPage,
}: PaginationProps) {
  const [selectedPage, setSelectedPage] = useState(currentPage ?? 1);
  const notInitialRender = useRef(false);

  const classNameList = joinClass([
    'pagination',
    isNumberedPagination && 'pagination--numbered',
    fluid && 'pagination--fluid',
    `pagination--context-${context}`,
  ]);

  const paginationItemsClassNameList = joinClass([
    'pagination__items',
    hidePagination && 'pagination__items--hide',
  ]);

  const handlePreviousClick = () => {
    handlePrevPage && handlePrevPage();
    if (selectedPage === 1) setSelectedPage(totalPages);
    else setSelectedPage(selectedPage - 1);
  };

  const handleNextClick = () => {
    handleNextPage && handleNextPage();
    const nextPage = selectedPage + 1;
    if (nextPage === totalPages + 1) setSelectedPage(1);
    else setSelectedPage(nextPage);
  };

  const renderNumbers = () => {
    if (hidePagination) return;

    const numberButtons = [];

    const offset = Math.floor((pageRange ?? 0) / 2);

    const firstMiddlePoint = 1 + offset;
    const lastMiddlePoint = totalPages - offset;

    let start = 1;
    let end = pageRange ?? 1;

    if (selectedPage > firstMiddlePoint && selectedPage <= lastMiddlePoint) {
      start = selectedPage - offset;
      end = selectedPage + offset;
      if (isNumberEven(pageRange ?? 0)) end--;
    }
    if (selectedPage > lastMiddlePoint) {
      start = totalPages - ((pageRange ?? 1) - 1);
      end = totalPages;
    }

    if ((pageRange ?? 0) > totalPages) {
      start = 1;
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      numberButtons.push(
        <Button
          type="button"
          key={`page-${i}`}
          context={context}
          appearance="outline"
          onClick={() => setSelectedPage(i)}
          data-testid={`button-page-${i}`}
        >
          {i}
        </Button>,
      );
    }
    return numberButtons;
  };

  const renderDots = () => {
    if (hidePagination || totalPages < 2) return;

    const limitedTotalDots = 5;
    if (limitDots && totalPages > limitedTotalDots) {
      const startMiddlePoint = 3;
      const endMiddlePoint = totalPages - 1;

      let currentDot = selectedPage;

      if (selectedPage > startMiddlePoint && selectedPage < endMiddlePoint)
        currentDot = 3;
      if (selectedPage === endMiddlePoint) currentDot = 4;
      if (selectedPage === totalPages) currentDot = 5;

      return (
        <ProgressIndicator
          totalDots={limitedTotalDots}
          currentDot={currentDot}
          context={context}
        />
      );
    }

    return (
      <ProgressIndicator
        totalDots={totalPages}
        currentDot={selectedPage}
        context={context}
      />
    );
  };

  useEffect(() => {
    if (notInitialRender.current) handleNewPage && handleNewPage(selectedPage);
    else notInitialRender.current = true;
  }, [selectedPage]);

  useEffect(() => {
    setSelectedPage(currentPage ?? 1);
  }, [currentPage]);

  return (
    <nav data-testid="pagination" className={classNameList}>
      {!hidePaginationButtons && (
        <Button
          type="button"
          aria-label="Página anterior"
          context={context}
          appearance="icon"
          disabled={disableButtonsFirstAndLastPage && currentPage === 1}
          icon="chevron-left"
          onClick={handlePreviousClick}
          data-testid="pagination-button-prev"
        ></Button>
      )}
      <div className={paginationItemsClassNameList}>
        {isNumberedPagination && renderNumbers()}
        {!isNumberedPagination && renderDots()}
      </div>
      {!hidePaginationButtons && (
        <Button
          type="button"
          aria-label="Próxima página"
          context={context}
          appearance="icon"
          disabled={disableButtonsFirstAndLastPage && currentPage === 1}
          icon="chevron-right"
          onClick={handleNextClick}
          data-testid="pagination-button-next"
        ></Button>
      )}
    </nav>
  );
}