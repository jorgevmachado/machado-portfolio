'use client';
import React from 'react';

import { nameValidator } from '@repo/services/validator/personal/personal';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import Input from '@repo/ui/components/input/Input';

import { CRUDPage } from '../../../layout';
import { useBillCategory } from './useBillCategory';

export default function BillCategoryPage() {
  const { loading, saveItem, fetchItems, deleteItem } = useBillCategory();

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
      resourceName="Bill Category"
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
            placeholder="Enter a Bill Category"
          />
        </div>
      )}
    />
  );
}