'use client';
import React, { useEffect, useState } from 'react';
import {
  bankService,
  billBusiness,
  billCategoryService,
  billService,
} from '../../shared';
import Bill from '@repo/business/finance/bill';
import Tabs from '../../layout/components/Tabs';
import { SubTab } from './components';
import Bank from '@repo/business/finance/bank/bank';
import BillCategory from '@repo/business/finance/bill-category';
import useAlert from '@repo/ui/hooks/alert/useAlert';
import Spinner from '@repo/ds/elements/spinner/Spinner';
import { CRUDHeader, DependencyFallback } from '../../layout';
import { useRouter } from 'next/navigation';
import CRUDModal from '../../layout/components/CRUDModal';
import Input from '@repo/ui/components/input/Input';
import {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';
import { EBillType } from '@repo/business';

type BillList = {
  list: Array<Bill>;
  title: string;
};

export default function BillPage() {
  const { addAlert } = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Array<BillList>>([]);
  const [banks, setBanks] = useState<Array<Bank>>([]);
  const [categories, setCategories] = useState<Array<BillCategory>>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [hasAllDependencies, setHasAllDependencies] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Bill | null>(null);

  const fetchBanks = async () => {
    if (banks.length === 0) {
      setLoading(true);
      bankService
        .getAll({})
        .then((response) => {
          setBanks(response as Array<Bank>);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Unable to fetch banks',
          });
          setBanks([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fetchCategories = async () => {
    if (categories.length === 0) {
      setLoading(true);
      billCategoryService
        .getAll({})
        .then((response) => {
          setCategories(response as Array<BillCategory>);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Unable to fetch bill categories',
          });
          setCategories([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fetchBills = async () => {
    if (items.length === 0) {
      setLoading(true);
      billService
        .getAll({})
        .then((response) => {
          if (Array.isArray(response)) {
            const currentResponse = billBusiness.mapBillListByItem(
              response,
              'category',
            );
            setItems(currentResponse);
          }
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Unable to fetch bills',
          });
          setItems([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const openModal = (item?: Bill) => {
    setEditingItem(item ?? null);
    setIsModalVisible(true);
  };

  const handleSave = async () => {};

  useEffect(() => {
    fetchBanks();
    fetchCategories();
    fetchBills();
  }, []);

  useEffect(() => {
    setHasAllDependencies(banks.length > 0 && categories.length > 0);
  }, [banks, categories]);

  function handleChange(key: string, value: string): void {
    setEditingItem((prev) => {
      return prev
        ? { ...prev, [key]: value }
        : ({ [key]: value } as unknown as Bill);
    });
  }

  return loading ? (
    <Spinner context="neutral" />
  ) : (
    <>
      <CRUDHeader
        resourceName="Bill"
        button={hasAllDependencies ? { onClick: () => openModal() } : undefined}
      />
      {banks.length === 0 && (
        <DependencyFallback
          dependencyName="Bank"
          resourceName="Bill"
          button={{
            label: 'Create Bank',
            onClick: () => router.push('/banks'),
          }}
        />
      )}
      {categories.length === 0 && (
        <DependencyFallback
          dependencyName="Bill Category"
          resourceName="Bill"
          button={{
            label: 'Create Bill Category',
            onClick: () => router.push('/bills/categories'),
          }}
        />
      )}
      {isModalVisible && (
        <CRUDModal
          title={editingItem ? `Edit Bill` : `Create Bill`}
          actions={{
            error: { onClick: () => setIsModalVisible(false) },
            success: { onClick: () => handleSave() },
          }}
        >
          <form>
            <div className="styled-form__group">
              <Input
                type="text"
                name="year"
                label="Year"
                context="primary"
                value={
                  editingItem?.year?.toString() ??
                  new Date().getFullYear().toString()
                }
                onChange={(e) => handleChange('year', e.target.value)}
                validate={function (
                  validatorParams: ValidatorParams,
                ): ValidatorMessage {
                  // TODO MUST BE REMOVED BEFORE COMMIT
                  console.log('# => validatorParams => ', validatorParams);
                  return {
                    valid: true,
                    message: 'OK',
                  };
                }}
              />
            </div>
            <div className="styled-form__group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={editingItem?.type ?? ''}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value={editingItem?.type ?? ''} disabled>
                  Select a type
                </option>
                {Object.values(EBillType).map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="styled-form__group">
              <label htmlFor="banks">Bank</label>
              <select
                id="banks"
                value={editingItem?.bank?.name ?? ''}
                onChange={(e) => handleChange('bank', e.target.value)}
              >
                <option value="" disabled>
                  Select a bank
                </option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="styled-form__group">
              <label htmlFor="categories">Category</label>
              <select
                id="categories"
                value={editingItem?.category?.name ?? ''}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </CRUDModal>
      )}
      {items.length === 0 ? (
        <DependencyFallback message="No bills were found." />
      ) : (
        <Tabs
          fluid
          tabItems={items.map((item) => ({
            title: item.title,
            children: <SubTab key={item.title} list={item.list} />,
          }))}
        />
      )}
    </>
  );
}