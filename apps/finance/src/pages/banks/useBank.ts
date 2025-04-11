import {useEffect, useRef, useState} from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';
import Bank from '@repo/business/finance/bank/bank';

import type { SortedColumn } from '@repo/ds/components/table/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { bankService } from '../../shared';

export function useBank() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Array<Bank>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
    sort: '',
    order: '',
  });

  const isMounted = useRef(false);

  const handleSort = ({ sort, order }: SortedColumn) => {
    setSortedColumn({ sort, order });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchItems = async ({ page = currentPage, limit = 10,  ...props}: QueryParameters) => {
    setLoading(true);
    try {
      const response = (await bankService.getAll({...props, page, limit })) as Paginate<Bank>;
      setResults(response.results);
      setTotalPages(response.pages);
      return response;
    } catch (error) {
      addAlert({ type: 'error', message: 'Error fetching banks.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item?: Bank, close?: () => void) => {
    if(!item) {
      return;
    }
    try {
      const bank = item.id
          ?  await bankService.update(item.id, { name: item.name ?? '' })
          : await bankService.create({ name: item.name ?? '' });
      addAlert({
        type: 'success',
        message: `Bank saved successfully!`,
      });
      await fetchItems({ page: currentPage });
      close && close();
      return bank;
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error saving bank.`,
      });
    } finally {
      setLoading(false);
    }

  }

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      await bankService.remove(id);
      addAlert({
        type: 'success',
        message: `Bank deleted successfully!`,
      });
      await fetchItems({ page: currentPage });
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error deleting bank.`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(isMounted.current) {
      fetchItems({
        page: currentPage,
      })
    }
  }, [currentPage, isMounted]);

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
      fetchItems({
        page: currentPage,
      })
    }
  }, []);

  return {
    results,
    loading,
    handleSave,
    totalPages,
    handleSort,
    fetchItems,
    currentPage,
    sortedColumn,
    handleDelete,
    handlePageChange,
  };
}