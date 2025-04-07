import { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';

import Supplier from '@repo/business/finance/supplier/supplier';
import SupplierType from '@repo/business/finance/supplier-type';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { supplierService, supplierTypeService } from '../../shared';

export function useSupplier() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [supplierTypes, setSupplierTypes] = useState<Array<SupplierType>>([]);

  const fetchItems = async (
    params: QueryParameters,
  ): Promise<Paginate<Supplier>> => {
    setLoading(true);
    try {
      const response = await supplierService.getAll(params);
      return response as Paginate<Supplier>;
    } catch (error) {
      addAlert({ type: 'error', message: 'Error fetching suppliers.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchSupplierTypes = async () => {
    if (supplierTypes.length === 0) {
      setLoading(true);
      try {
        const response = await supplierTypeService.getAll({});
        setSupplierTypes(response as Array<SupplierType>);
      } catch (error) {
        addAlert({
          type: 'error',
          message: 'Unable to fetch supplier types',
        });
        setSupplierTypes([]);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const saveItem = async (item: Partial<Supplier>) => {
    setLoading(true);
    try {
      if (item.id) {
        return await supplierService.update(item.id, {
          name: item.name ?? '',
          type: item.type?.name ?? '',
        });
      }
      return await supplierService.create({
        name: item.name ?? '',
        type: item.type?.name ?? '',
      });
    } catch (error) {
      addAlert({ type: 'error', message: 'Error saving supplier.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      return await supplierService.remove(id);
    } catch (error) {
      addAlert({ type: 'error', message: 'Error deleting Supplier.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplierTypes();
  }, []);

  return {
    loading,
    saveItem,
    deleteItem,
    fetchItems,
    supplierTypes,
    fetchSupplierTypes,
  };
}