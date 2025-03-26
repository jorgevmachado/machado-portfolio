'use client';
import React from 'react';
import { nameValidator } from '@repo/services/validator/personal/personal';

import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';
import BillCategory from '@repo/business/finance/bill-category';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import Input from '@repo/ui/components/input/Input';

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
          type: ETypeTableHeaderItem.DATE,
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