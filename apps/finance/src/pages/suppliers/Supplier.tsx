'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { nameValidator } from '@repo/services/validator/personal/personal';

import Supplier from '@repo/business/finance/supplier/supplier';
import SupplierType from '@repo/business/finance/supplier-type';

import Table from '@repo/ds/components/table/Table';
import Pagination from '@repo/ds/components/pagination/Pagination';
import useModal from '@repo/ds/components/modal/useModal';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import Select from '@repo/ds/components/select/Select';
import Button from '@repo/ds/components/button/Button';

import Input from '@repo/ui/components/input/Input';
import PageHeader from '@repo/ui/layout/page-header/PageHeader';

import DependencyFallback from '../../layout/components/DependencyFallback';

import { useSupplier } from './useSupplier';

import './Supplier.scss';

type FormProps = {
  item?: Supplier;
  handleSave: (
    item?: Supplier,
    close?: () => void,
  ) => Promise<Supplier | undefined>;
  closeModal: () => void;
  dependencies: Array<SupplierType>;
};

function Form({ item, handleSave, closeModal, dependencies }: FormProps) {
  const [currentItem, setCurrentItem] = useState<Supplier | undefined>(item);
  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Name"
        value={currentItem?.name || ''}
        context="primary"
        onChange={(e) => {
          const updatedName = e.target.value;
          setCurrentItem(
            (prev) =>
              ({
                ...prev,
                name: updatedName,
              }) as Supplier,
          );
        }}
        validate={(name) => nameValidator(name)}
        placeholder="Enter a supplier"
      />
      <div className="supplier__container">
        <Select
          value={currentItem?.type?.id ?? ''}
          label="Category"
          options={dependencies.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => {
            setCurrentItem(
              (prev) =>
                ({
                  ...prev,
                  type: dependencies.find((item) => item.id === value),
                }) as Supplier,
            );
          }}
          placeholder="Choose a category"
        />
      </div>
      <div
        style={{
          gap: '1rem',
          display: 'grid',
          marginTop: '2rem',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <Button
          context="success"
          onClick={() => handleSave(currentItem, closeModal)}
        >
          Save
        </Button>
        <Button context="error" appearance="outline" onClick={() => closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function SupplierPage() {
  const {
    loading,
    results,
    handleSort,
    handleSave,
    totalPages,
    currentPage,
    handleDelete,
    sortedColumn,
    resourceName,
    supplierTypes,
    handlePageChange,
  } = useSupplier();
  const { openModal, modal, closeModal } = useModal();
  const router = useRouter();

  const handleOpenModal = (item?: Supplier) => {
    openModal({
      title: item?.id ? `Edit ${resourceName}` : `Create ${resourceName}`,
      body: (
        <Form
          item={item}
          handleSave={handleSave}
          closeModal={closeModal}
          dependencies={supplierTypes}
        />
      ),
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      {supplierTypes.length === 0 ? (
        <DependencyFallback
          message="No supplier types were found. Please create a supplier type before creating a supplier."
          button={{
            label: 'Create Supplier Type',
            onClick: () => router.push('/suppliers/types'),
          }}
        />
      ) : (
        <>
          <PageHeader
            title={`Management of ${resourceName}`}
            button={{
              label: `Create new ${resourceName}`,
              onClick: () => handleOpenModal(),
            }}
          />
          <Table
            items={results}
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
            actions={{
              text: 'Actions',
              align: 'center',
              edit: { onClick: (item: Supplier) => handleOpenModal(item) },
              delete: { onClick: (item: Supplier) => handleDelete(item.id) },
            }}
            loading={loading}
            onRowClick={(item: Supplier) => handleOpenModal(item)}
            onSortedColumn={handleSort}
            notFoundMessage={`No ${resourceName} found`}
            currentSortedColumn={sortedColumn}
          />
          {modal}
          {totalPages > 1 && (
            <Pagination
              fluid
              currentPage={currentPage}
              pageRange={totalPages}
              totalPages={totalPages}
              handleNewPage={handlePageChange}
              isNumberedPagination
              disableButtonsFirstAndLastPage
            />
          )}
        </>
      )}
    </div>
  );
}