'use client';
import { nameValidator } from '@repo/services/validator/personal/personal';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import Input from '@repo/ui/components/input/Input';

import { CRUDPage } from '../../../layout';

import { useSupplierType } from './useSupplierType';

export default function SupplierTypePage() {
  const { fetchItems, saveItem, deleteItem, loading } = useSupplierType();
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
      loading={loading}
      saveItem={saveItem}
      fetchItems={fetchItems}
      deleteItem={deleteItem}
      resourceName="Supplier Type"
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