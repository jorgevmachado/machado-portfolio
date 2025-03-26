'use client';
import { nameValidator } from '@repo/services/validator/personal/personal';

import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';
import Bank from '@repo/business/finance/bank/bank';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import Input from '@repo/ui/components/input/Input';

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
          type: ETypeTableHeaderItem.DATE,
          sortable: true,
        },
      ]}
      resourceName="Bank"
      fetchItems={fetchItems}
      saveItem={(item) =>
        item.id
          ? bankService.update(item.id, { name: item.name ?? '' })
          : bankService.create({ name: item.name ?? '' })
      }
      deleteItem={(id) => bankService.remove(id)}
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
            placeholder="Enter a bank"
          />
        </div>
      )}
    />
  );
}