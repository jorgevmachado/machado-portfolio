import { useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';
import Bank from '@repo/business/finance/bank/bank';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { bankService } from '../../shared';

export function useBank() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchItems = async (params: QueryParameters) => {
    setLoading(true);
    try {
      const response = await bankService.getAll(params);
      return response as Paginate<Bank>;
    } catch (error) {
      addAlert({ type: 'error', message: 'Error fetching banks.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (item: Partial<Bank>) => {
    setLoading(true);
    try {
      if (item.id) {
        return await bankService.update(item.id, { name: item.name ?? '' });
      }
      return await bankService.create({ name: item.name ?? '' });
    } catch (error) {
      addAlert({ type: 'error', message: 'Error saving bank.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      return await bankService.remove(id);
    } catch (error) {
      addAlert({ type: 'error', message: 'Error deleting bank.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveItem,
    fetchItems,
    deleteItem,
  };
}