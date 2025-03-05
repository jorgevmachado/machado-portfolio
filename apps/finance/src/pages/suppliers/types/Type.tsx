'use client';

import SupplierType from '@repo/business/finance/supplier-type';
import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';

import { supplierTypeService } from '../../../shared';

import { CRUDPage } from '../../../layout';

export default function SupplierTypePage() {
  const fetchItems = async (params: QueryParameters) => {
    return await supplierTypeService
      .getAll(params)
      .then((response) => response as Paginate<SupplierType>);
  };
  return (
    <CRUDPage
      headers={[
        {
          text: 'Name',
          value: 'name',
          sortable: true,
        },
        { text: 'Created At', value: 'created_at', type: 'date', sortable: true },
      ]}
      resourceName="Supplier Type"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? supplierTypeService.update(item.id, item.name ?? '')
          : supplierTypeService.create(item.name ?? '')
      }
      deleteItem={(id) => supplierTypeService.remove(id)}
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