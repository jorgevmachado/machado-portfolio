import { useEffect, useRef, useState } from 'react';

import { joinClass } from '../../utils';
import { ProgressIndicator } from '../../elements';

import Button from '../button';

import { renderNumbersStartEnd } from './config';
import { PaginationProps } from './interface';

import './Pagination.scss';

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
    fluid && 'pagination__fluid',
    `pagination__context-${context}`,
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
    if (hidePagination) {
      return;
    }

    const numberButtons = [];

    const offset = Math.floor((pageRange ?? 0) / 2);

    const firstMiddlePoint = 1 + offset;
    const lastMiddlePoint = totalPages - offset;

    const { start, end } = renderNumbersStartEnd({
      offset,
      pageRange: pageRange ?? 0,
      totalPages,
      selectedPage,
      lastMiddlePoint,
      firstMiddlePoint,
    });

    for (let i = start; i <= end; i++) {
      numberButtons.push(
        <Button
          type="button"
          key={`page-${i}`}
          context={context}
          selected={selectedPage === i}
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
          total={limitedTotalDots}
          current={currentDot}
          context={context}
        />
      );
    }

    return (
      <ProgressIndicator
        total={totalPages}
        current={selectedPage}
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
          icon="chevron-left"
          onClick={handlePreviousClick}
          context={context}
          disabled={disableButtonsFirstAndLastPage && selectedPage === 1}
          appearance="icon"
          aria-label="Previous page"
          data-testid="pagination-button-prev"
        />
      )}
      <div className={paginationItemsClassNameList}>
        {isNumberedPagination && renderNumbers()}
        {!isNumberedPagination && renderDots()}
      </div>
      {!hidePaginationButtons && (
        <Button
          type="button"
          icon="chevron-right"
          onClick={handleNextClick}
          context={context}
          disabled={
            disableButtonsFirstAndLastPage && selectedPage === totalPages
          }
          appearance="icon"
          aria-label="Next page"
          data-testid="pagination-button-next"
        />
      )}
    </nav>
  );
}