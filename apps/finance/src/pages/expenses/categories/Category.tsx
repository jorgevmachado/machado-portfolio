'use client';
import React, { useEffect, useState } from 'react';

import ExpenseCategoryType from '@repo/business/finance/expense-category-type';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import type { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';

import {
  expenseCategoryService,
  expenseCategoryTypeService,
} from '../../../shared';

import './Category.scss';
import Input from '@repo/ui/components/input/Input';
import { nameValidator } from '@repo/services/validator/personal/personal';
import { CRUDPage } from '../../../layout';
import ExpenseCategory from '@repo/business/finance/expense-category';

export default function ExpenseCategoryPage() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [expenseCategoryTypes, setExpenseCategoryTypes] = useState<
    Array<ExpenseCategoryType>
  >([]);

  const fetchItems = async (params: QueryParameters) => {
    return await expenseCategoryService
      .getAll(params)
      .then((response) => response as Paginate<ExpenseCategory>);
  };

  const fetchExpenseCategoryTypes = async () => {
    if (expenseCategoryTypes.length === 0) {
      setLoading(true);
      expenseCategoryTypeService
        .getAll({})
        .then((response) => {
          setExpenseCategoryTypes(response as Array<ExpenseCategoryType>);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Unable to fetch expense category types',
          });
          setExpenseCategoryTypes([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchExpenseCategoryTypes();
  });

  return (
    <CRUDPage
      headers={[
        {
          text: 'Name',
          value: 'name',
          sortable: true,
        },
        {
          text: 'Type',
          value: 'type.name',
          sortable: true,
        },
        {
          text: 'Created At',
          type: 'date',
          value: 'created_at',
          sortable: true,
        },
      ]}
      loading={loading}
      fetchItems={fetchItems}
      resourceName="Expense Category"
      saveItem={(item) =>
        item.id
          ? expenseCategoryService.update(
              item.id,
              item.name ?? '',
              item?.type?.name ?? '',
            )
          : expenseCategoryService.create(
              item.name ?? '',
              item?.type?.name ?? '',
            )
      }
      deleteItem={(id) => expenseCategoryService.remove(id)}
      renderItemForm={({ item, handleChange }) => (
        <div>
          <Input
            type="text"
            name="name"
            label="Name"
            value={item.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            context="primary"
            validate={(name) => nameValidator(name)}
          />
          <div className="category__container">
            <label>Type:</label>
            <select
              className="category__container--select"
              value={item?.type?.name || ''}
              onChange={(e) =>
                handleChange('type', { ...item.type, name: e.target.value })
              }
            >
              <option value="">Select a supplier type</option>
              {Array.isArray(expenseCategoryTypes) &&
                  expenseCategoryTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    />
  );
}