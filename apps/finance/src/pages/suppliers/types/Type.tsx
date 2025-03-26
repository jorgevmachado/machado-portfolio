'use client';
import { nameValidator } from '@repo/services/validator/personal/personal';

import type { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';
import SupplierType from '@repo/business/finance/supplier-type';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import Input from '@repo/ui/components/input/Input';

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
        {
          text: 'Created At',
          value: 'created_at',
          type: ETypeTableHeaderItem.DATE,
          sortable: true,
        },
      ]}
      resourceName="Supplier Type"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? supplierTypeService.update(item.id, { name: item.name ?? '' })
          : supplierTypeService.create({ name: item.name ?? '' })
      }
      deleteItem={(id) => supplierTypeService.remove(id)}
      renderItemForm={({ item, handleChange }) => (
        <div>
          <Input
            type="text"
            name="name"
            label="Name"
            value={item.name || ''}
            context="primary"
            onChange={(e) => handleChange('name', e.target.value)}
            validate={(name) => nameValidator(name)}
            placeholder="Enter a Supplier Type"
          />
        </div>
      )}
    />
  );
}