'use client';
import type { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';

import ExpenseCategoryType from '@repo/business/finance/expense-category-type';

import { expenseGroupService } from '../../../shared';

import { CRUDPage } from '../../../layout';

import './Group.scss';

export default function ExpenseGroupPage() {
  const fetchItems = async (params: QueryParameters) => {
    return await expenseGroupService
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
      resourceName="Expense Group"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? expenseGroupService.update(item.id, item.name ?? '')
          : expenseGroupService.create(item.name ?? '')
      }
      deleteItem={(id) => expenseGroupService.remove(id)}
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