import { useEffect, useRef, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';
import BillCategory from '@repo/business/finance/bill-category';

import type { SortedColumn } from '@repo/ds/components/table/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { billCategoryService } from '../../../shared';

export function useBillCategory() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<BillCategory>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
    sort: '',
    order: '',
  });

  const resourceName = 'Bill Category';

  const isMounted = useRef(false);

  const handleSort = ({ sort, order }: SortedColumn) => {
    setSortedColumn({ sort, order });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchItems = async ({
    page = currentPage,
    limit = 10,
    ...props
  }: QueryParameters) => {
    setLoading(true);
    try {
      const response = (await billCategoryService.getAll({
        ...props,
        page,
        limit,
      })) as Paginate<BillCategory>;
      setResults(response.results);
      setTotalPages(response.pages);
      return response;
    } catch (error) {
      addAlert({ type: 'error', message: `Error fetching Bill Categories.` });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item?: BillCategory, close?: () => void) => {
    if (!item) {
      return;
    }
    setLoading(true);
    try {
      const bank = item.id
        ? await billCategoryService.update(item.id, { name: item.name ?? '' })
        : await billCategoryService.create({ name: item.name ?? '' });
      addAlert({
        type: 'success',
        message: `${resourceName} saved successfully!`,
      });
      await fetchItems({ page: currentPage });
      close && close();
      return bank;
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error saving ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      await billCategoryService.remove(id);
      addAlert({
        type: 'success',
        message: `${resourceName} deleted successfully!`,
      });
      await fetchItems({ page: currentPage });
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error deleting ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchItems({
        page: currentPage,
      });
    }
  }, [currentPage, isMounted]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchItems({
        page: currentPage,
      });
    }
  }, []);

  return {
    results,
    loading,
    handleSave,
    totalPages,
    handleSort,
    currentPage,
    sortedColumn,
    handleDelete,
    resourceName,
    handlePageChange,
  };
}