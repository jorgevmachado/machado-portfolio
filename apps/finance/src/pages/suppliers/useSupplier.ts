import {useEffect, useRef, useState} from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';
import Supplier from '@repo/business/finance/supplier/supplier';
import SupplierType from '@repo/business/finance/supplier-type';

import type { SortedColumn } from '@repo/ds/components/table/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { supplierService, supplierTypeService } from '../../shared';

export function useSupplier() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [supplierTypes, setSupplierTypes] = useState<Array<SupplierType>>([]);
  const [results, setResults] = useState<Array<Supplier>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
    sort: '',
    order: '',
  });

  const isMounted = useRef(false);

  const resourceName = 'Supplier';

  const handleSort = ({ sort, order }: SortedColumn) => {
    setSortedColumn({ sort, order });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchItems = async (
      { page = currentPage, limit = 10,  ...props}: QueryParameters,
  ): Promise<Paginate<Supplier>> => {
    setLoading(true);
    try {
      const response = await supplierService.getAll({...props, page, limit }) as Paginate<Supplier>;
      setResults(response.results);
      setTotalPages(response.pages);
      return response;
    } catch (error) {
      addAlert({ type: 'error', message: `Error fetching ${resourceName}s.` });
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
          message: `Unable to fetch ${resourceName} types`,
        });
        setSupplierTypes([]);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (item?: Supplier, close?: () => void) => {
    if(!item) {
      return;
    }
    setLoading(true);
    try {
      const supplier = item.id
       ? await supplierService.update(item.id, {
            name: item.name ?? '',
            type: item.type?.name ?? '',
          })
       : await supplierService.create({
        name: item.name ?? '',
        type: item.type?.name ?? '',
      });
      addAlert({
        type: 'success',
        message: `${resourceName} saved successfully!`,
      });
      await fetchItems({ page: currentPage });
      close && close();
      return supplier;
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error saving ${resourceName}.`,
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
      await supplierService.remove(id);
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
      });
      fetchSupplierTypes();
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
    supplierTypes,
    handlePageChange,
    fetchSupplierTypes,
  };
}