import { useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';

import SupplierType from '@repo/business/finance/supplier-type';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { supplierTypeService } from '../../../shared';

export function useSupplierType() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async (
    params: QueryParameters,
  ): Promise<Paginate<SupplierType>> => {
    setLoading(true);
    try {
      const response = await supplierTypeService.getAll(params);
      return response as Paginate<SupplierType>;
    } catch (error) {
      addAlert({ type: 'error', message: 'Error fetching supplier Types.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (item: Partial<SupplierType>) => {
    setLoading(true);
    try {
      if (item.id) {
        return await supplierTypeService.update(item.id, {
          name: item.name ?? '',
        });
      }
      return await supplierTypeService.create({ name: item.name ?? '' });
    } catch (error) {
      addAlert({ type: 'error', message: 'Error saving supplier Type.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      return await supplierTypeService.remove(id);
    } catch (error) {
      addAlert({ type: 'error', message: 'Error deleting Supplier Type.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveItem,
    deleteItem,
    fetchItems,
  };
}