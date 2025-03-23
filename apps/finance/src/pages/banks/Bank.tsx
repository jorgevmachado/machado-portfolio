'use client';

import Bank from '@repo/business/finance/supplier-type';
import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';

import { bankService } from '../../shared';
import { CRUDPage } from '../../layout';

export default function BankPage() {
  const fetchItems = async (params: QueryParameters) => {
    return await bankService
      .getAll(params)
      .then((response) => response as Paginate<Bank>);
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
      resourceName="Bank"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? bankService.update(item.id, item.name ?? '')
          : bankService.create(item.name ?? '')
      }
      deleteItem={(id) => bankService.remove(id)}
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