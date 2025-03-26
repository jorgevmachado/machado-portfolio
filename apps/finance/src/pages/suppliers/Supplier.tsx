'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { nameValidator } from '@repo/services/validator/personal/personal';

import { Paginate } from '@repo/business/paginate';
import type { QueryParameters } from '@repo/business/shared/interface';
import Supplier from '@repo/business/finance/supplier';
import SupplierType from '@repo/business/finance/supplier-type';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import Select from "@repo/ds/components/select/Select";

import useAlert from '@repo/ui/hooks/alert/useAlert';

import Input from '@repo/ui/components/input/Input';

import { supplierService, supplierTypeService } from '../../shared';
import { CRUDPage } from '../../layout';

import './Supplier.scss';


export default function SupplierPage() {
  const { addAlert } = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [supplierTypes, setSupplierTypes] = useState<Array<SupplierType>>([]);
  const fetchItems = async (params: QueryParameters) => {
    return await supplierService
      .getAll(params)
      .then((response) => response as Paginate<Supplier>);
  };

  const fetchSupplierTypes = async () => {
    if (supplierTypes.length === 0) {
      setLoading(true);
      supplierTypeService
        .getAll({})
        .then((response) => {
          setSupplierTypes(response as Array<SupplierType>);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Unable to fetch supplier types',
          });
          setSupplierTypes([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchSupplierTypes();
  }, []);

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
      fetchItems={fetchItems}
      resourceName="Supplier"
      saveItem={(item) =>
        item.id
          ? supplierService.update(item.id, {
              name: item.name ?? '',
              type: item?.type?.name ?? '',
            })
          : supplierService.create({
              name: item.name ?? '',
              type: item?.type?.name ?? '',
            })
      }
      deleteItem={(id) => supplierService.remove(id)}
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