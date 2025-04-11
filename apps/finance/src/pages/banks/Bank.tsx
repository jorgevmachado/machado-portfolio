'use client';
import React, { useState } from 'react';
import { nameValidator } from '@repo/services/validator/personal/personal';

import Bank from '@repo/business/finance/bank/bank';

import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import Table from '@repo/ds/components/table/Table';
import useModal from '@repo/ds/components/modal/useModal';
import Button from '@repo/ds/components/button/Button';
import Pagination from '@repo/ds/components/pagination/Pagination';

import Input from '@repo/ui/components/input/Input';

import Header from '../../layout/components/Header';

import { useBank } from './useBank';

type FormProps = {
  bank?: Bank;
  handleSave: (bank?: Bank, close?: () => void) => Promise<Bank | undefined>;
  closeModal: () => void;
};

function Form({ bank, handleSave, closeModal }: FormProps) {
  const [currentBank, setCurrentBank] = useState<Bank | undefined>(bank);
  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Name"
        value={currentBank?.name || ''}
        context="primary"
        onChange={(e) => {
          const updatedName = e.target.value;
          setCurrentBank(
            (prev) =>
              ({
                ...prev,
                name: updatedName,
              }) as Bank,
          );
        }}
        validate={(name) => nameValidator(name)}
        placeholder="Enter a bank"
      />
      <div style={{ gap: '1rem', display: 'grid', marginTop: '2rem', gridTemplateColumns: '1fr 1fr' }}>
        <Button context="success" onClick={() => handleSave(currentBank, closeModal)}>
          Save
        </Button>
        <Button context="error" appearance="outline" onClick={() => closeModal}>Cancel</Button>
      </div>
    </div>
  );
}

export default function BankPage() {
  const {
    loading,
    results,
    handleSort,
    handleSave,
    totalPages,
    currentPage,
    handleDelete,
    sortedColumn,
    handlePageChange,
  } = useBank();
  const { openModal, modal, closeModal } = useModal();
  const resourceName = 'Bank';

  const handleOpenModal = (item?: Bank) => {
    const bank = item ?? ({ name: '' } as Bank);
    openModal({
      title: bank?.id ? `Edit ${resourceName}` : `Create ${resourceName}`,
      body: (
        <Form bank={bank} closeModal={closeModal} handleSave={handleSave} />
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
                  edit: { onClick: (item: Bank) => handleOpenModal(item) },
                  delete: { onClick: (item: Bank) => handleDelete(item.id) },
              }}
              loading={loading}
              onRowClick={(item: Bank) => handleOpenModal(item)}
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