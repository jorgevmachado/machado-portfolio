'use client';
import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';
import BillCategory from '@repo/business/finance/bill-category';

import { billCategoryService } from '../../../shared';
import { CRUDPage } from '../../../layout';

export default function BillCategoryPage() {
  const fetchItems = async (params: QueryParameters) => {
    return await billCategoryService
      .getAll(params)
      .then((response) => response as Paginate<BillCategory>);
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
      fetchItems={fetchItems}
      resourceName="Bill Category"
      saveItem={(item) =>
        item.id
          ? billCategoryService.update(item.id, { name: item.name ?? '' })
          : billCategoryService.create({ name: item.name ?? '' })
      }
      deleteItem={(id) => billCategoryService.remove(id)}
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