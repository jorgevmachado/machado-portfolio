'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { nameValidator } from '@repo/services/validator/personal/personal';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import Select from '@repo/ds/components/select/Select';

import Input from '@repo/ui/components/input/Input';
import { CRUDPage } from '../../layout';

import { useSupplier } from './useSupplier';

import './Supplier.scss';

export default function SupplierPage() {
  const { loading, saveItem, deleteItem, fetchItems, supplierTypes } =
    useSupplier();
  const router = useRouter();

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
          type: ETypeTableHeaderItem.DATE,
          value: 'created_at',
          sortable: true,
        },
      ]}
      loading={loading}
      saveItem={saveItem}
      deleteItem={deleteItem}
      fetchItems={fetchItems}
      resourceName="Supplier"
      fallBackCrud={{
        show: supplierTypes.length === 0,
        message:
          'No supplier types were found. Please create a supplier type before creating a supplier.',
        button: {
          label: 'Create Supplier Type',
          onClick: () => router.push('/suppliers/types'),
        },
      }}
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
            placeholder="Enter a supplier"
          />
          <div className="supplier__container">
            <Select
              value={item?.type?.name ?? ''}
              label="Category"
              options={supplierTypes.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(name) =>
                handleChange('type', { ...item.type, name: name as string })
              }
              placeholder="Choose a category"
            />
          </div>
        </div>
      )}
    />
  );
}