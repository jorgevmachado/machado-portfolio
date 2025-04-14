import React, { useEffect, useState } from 'react';

import type { BillList } from '@repo/business/finance/bill/interface';
import Bill from '@repo/business/finance/bill';
import Bank from '@repo/business/finance/bank/bank';
import Supplier from '@repo/business/finance/supplier/supplier';
import BillCategory from '@repo/business/finance/bill-category';
import { EBillType } from '@repo/business/finance/enum';

import useModal from '@repo/ds/components/modal/useModal';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import BillContext, { BillContextProps } from './BillContext';

import {
  bankService,
  billBusiness,
  billCategoryService,
  billService,
  supplierService,
} from '../../shared';
import { Persist } from './components';

type BillProviderProps = {
  children: React.ReactNode;
};

export default function BillProvider({ children }: BillProviderProps) {
  const { addAlert } = useAlert();
  const { openModal, modal, closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [banks, setBanks] = useState<Array<Bank>>([]);
  const [categories, setCategories] = useState<Array<BillCategory>>([]);
  const [suppliers, setSuppliers] = useState<Array<Supplier>>([]);
  const [bills, setBills] = useState<Array<Bill>>([]);
  const [billListCategory, setBillListCategory] = useState<Array<BillList>>([]);
  const [hasAllDependencies, setHasAllDependencies] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchBanks = () => {
    if (banks.length === 0) {
      bankService
        .getAll({})
        .then((response) => setBanks(response as Array<Bank>))
        .catch(() => setBanks([]));
    }
  };

  const fetchCategories = () => {
    if (categories.length === 0) {
      billCategoryService
        .getAll({})
        .then((response) => setCategories(response as Array<BillCategory>))
        .catch(() => setCategories([]));
    }
  };

  const fetchSuppliers = () => {
    if (suppliers.length === 0) {
      supplierService
        .getAll({})
        .then((response) => setSuppliers(response as Array<Supplier>))
        .catch(() => setSuppliers([]));
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = (await billService.getAll({})) as Array<Bill>;
      initBillList(response);
    } catch (error) {
      addAlert({
        type: 'error',
        message: `Error fetching Bills.`,
      });
      throw error;
    } finally {
      setTimeout(() => setLoading(false), 1000);
      setReload(false);
    }
  };

  const initBillList = (bills: Array<Bill>) => {
    setBills(bills);
    const billListCategory = billBusiness.mapBillListByItem(bills, 'category');
    setBillListCategory(billListCategory);
  };

  const handleSave = async (item?: Bill, close?: () => void) => {
    if (!item) {
      return;
    }
    setLoading(true);
    try {
      const itemToSave = {
        year: item.year,
        bank: item.bank?.id ?? '',
        type: item.type as EBillType,
        category: item.category?.id ?? '',
      };
      const bill = item.id
        ? await billService.update(item.id, itemToSave)
        : await billService.create(itemToSave);
      addAlert({
        type: 'success',
        message: `Bill saved successfully!`,
      });
      await fetchItems();
      close && close();
      return bill;
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error saving Bill.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: Bill) => {
    openModal({
      title: item?.id ? `Edit Bill` : `Create Bill`,
      body: (
        <Persist
          item={item}
          banks={banks}
          closeModal={closeModal}
          handleSave={handleSave}
          categories={categories}
        />
      ),
    });
  };

  useEffect(() => {
    fetchBanks();
    fetchCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [reload]);

  useEffect(() => {
    setHasAllDependencies(banks.length > 0 && categories.length > 0);
  }, [banks, categories]);

  const context: BillContextProps = {
    modal,
    bills,
    banks,
    loading,
    suppliers,
    handleSave,
    categories,
    handleReload: (value: boolean) => setReload(value),
    handleLoading: (value: boolean) => setLoading(value),
    handleOpenModal,
    billListCategory,
    hasAllDependencies,
  };
  return (
    <BillContext.Provider value={context}>{children}</BillContext.Provider>
  );
}