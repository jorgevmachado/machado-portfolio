'use client';
import React, { useState } from 'react';

import { nameValidator } from '@repo/services/validator/personal/personal';

import BillCategory from '@repo/business/finance/bill-category';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import useModal from '@repo/ds/components/modal/useModal';
import Table from '@repo/ds/components/table/Table';
import Pagination from '@repo/ds/components/pagination/Pagination';
import Button from '@repo/ds/components/button/Button';

import Input from '@repo/ui/components/input/Input';
import PageHeader from '@repo/ui/layout/page-header/PageHeader';

import { useBillCategory } from './useBillCategory';

type FormProps = {
  item?: BillCategory;
  handleSave: (
    bank?: BillCategory,
    close?: () => void,
  ) => Promise<BillCategory | undefined>;
  closeModal: () => void;
};

function Form({ item, handleSave, closeModal }: FormProps) {
  const [currentItem, setCurrentItem] = useState<BillCategory | undefined>(
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
              }) as BillCategory,
          );
        }}
        validate={(name) => nameValidator(name)}
        placeholder="Enter a Bill Category"
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
        <Button context="error" appearance="outline" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function BillCategoryPage() {
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
  } = useBillCategory();
  const { openModal, modal, closeModal } = useModal();

  const handleOpenModal = (item?: BillCategory) => {
    openModal({
      title: item?.id ? `Edit ${resourceName}` : `Create ${resourceName}`,
      body: (
        <Form item={item} closeModal={closeModal} handleSave={handleSave} />
      ),
    });
  };

  return (
    <div style={{ padding: '20px' }}>
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
            text: 'Created At',
            value: 'created_at',
            type: ETypeTableHeaderItem.DATE,
            sortable: true,
          },
        ]}
        actions={{
          text: 'Actions',
          align: 'center',
          edit: { onClick: (item: BillCategory) => handleOpenModal(item) },
          delete: { onClick: (item: BillCategory) => handleDelete(item.id) },
        }}
        loading={loading}
        onRowClick={(item: BillCategory) => handleOpenModal(item)}
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