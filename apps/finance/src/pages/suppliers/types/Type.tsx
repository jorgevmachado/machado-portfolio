'use client';
import React, { useState } from 'react';

import { nameValidator } from '@repo/services/validator/personal/personal';

import SupplierType from '@repo/business/finance/supplier-type';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import useModal from '@repo/ds/components/modal/useModal';
import Button from '@repo/ds/components/button/Button';
import Table from '@repo/ds/components/table/Table';
import Pagination from '@repo/ds/components/pagination/Pagination';

import Input from '@repo/ui/components/input/Input';

import Header from '../../../layout/components/Header';

import { useSupplierType } from './useSupplierType';

type FormProps = {
  item?: SupplierType;
  handleSave: (
    supplierType?: SupplierType,
    close?: () => void,
  ) => Promise<SupplierType | undefined>;
  closeModal: () => void;
};

function Form({ item, handleSave, closeModal }: FormProps) {
  const [currentItem, setCurrentItem] = useState<SupplierType | undefined>(
    item,
  );
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
              }) as SupplierType,
          );
        }}
        validate={(name) => nameValidator(name)}
        placeholder="Enter a Supplier Type"
      />
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

export default function SupplierTypePage() {
  const {
    loading,
    results,
    handleSort,
    handleSave,
    totalPages,
    currentPage,
    handleDelete,
    resourceName,
    sortedColumn,
    handlePageChange,
  } = useSupplierType();
  const { openModal, modal, closeModal } = useModal();

  const handleOpenModal = (item?: SupplierType) => {
    openModal({
      title: item?.id ? `Edit ${resourceName}` : `Create ${resourceName}`,
      body: (
        <Form item={item} closeModal={closeModal} handleSave={handleSave} />
      ),
    });
  };
  return (
    <div style={{ padding: '20px' }}>
      <Header
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
            text: 'Created At',
            value: 'created_at',
            type: ETypeTableHeaderItem.DATE,
            sortable: true,
          },
        ]}
        actions={{
          text: 'Actions',
          align: 'center',
          edit: { onClick: (item: SupplierType) => handleOpenModal(item) },
          delete: { onClick: (item: SupplierType) => handleDelete(item.id) },
        }}
        loading={loading}
        onRowClick={(item: SupplierType) => handleOpenModal(item)}
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
    </div>
  );
}