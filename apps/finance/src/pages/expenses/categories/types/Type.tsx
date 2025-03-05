'use client';
import type { QueryParameters } from '@repo/business/shared/interface';

import { Paginate } from '@repo/business/paginate';

import ExpenseCategoryType from '@repo/business/finance/expense-category-type';

import { expenseCategoryTypeService } from '../../../../shared';

import { CRUDPage } from '../../../../layout';

export default function ExpenseCategoryTypePage() {
  const fetchItems = async (params: QueryParameters) => {
    return await expenseCategoryTypeService
      .getAll(params)
      .then((response) => response as Paginate<ExpenseCategoryType>);
  };

  return (
    <CRUDPage
      headers={[
        {
          text: 'Name',
          value: 'name',
          sortable: true,
        },
        {
          text: 'Created At',
          value: 'created_at',
          type: 'date',
          sortable: true,
        },
      ]}
      resourceName="Expense Category Type"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? expenseCategoryTypeService.update(item.id, item.name ?? '')
          : expenseCategoryTypeService.create(item.name ?? '')
      }
      deleteItem={(id) => expenseCategoryTypeService.remove(id)}
      renderItemForm={({ item, handleChange }) => (
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={item.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
      )}
    />
  );
}