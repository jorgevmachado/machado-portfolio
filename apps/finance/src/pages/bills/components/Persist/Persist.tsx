import React, { useEffect, useState } from 'react';

import { ValidatorMessage } from '@repo/services/validator/interface';
import { yearValidator } from '@repo/services/validator/date/date';

import Bill from '@repo/business/finance/bill';
import Bank from '@repo/business/finance/bank/bank';
import BillCategory from '@repo/business/finance/bill-category';
import { EBillType } from '@repo/business/finance/enum';

import Select from '@repo/ds/components/select/Select';
import Button from '@repo/ds/components/button/Button';

import Input from '@repo/ui/components/input/Input';

type BillFormErrors = {
  year?: ValidatorMessage;
  type?: ValidatorMessage;
  bank?: ValidatorMessage;
  category?: ValidatorMessage;
};

type PersistProps = {
  item?: Bill;
  banks: Array<Bank>;
  closeModal: () => void;
  handleSave: (item?: Bill, close?: () => void) => Promise<Bill | undefined>;
  categories: Array<BillCategory>;
};

export default function Persist({
  item,
  banks,
  closeModal,
  handleSave,
  categories,
}: PersistProps) {
  const [currentItem, setCurrentItem] = useState<Bill | undefined>(item);
  const [errors, setErrors] = useState<Partial<BillFormErrors>>({
    year: {
      valid: true,
      message: '',
    },
    type: {
      valid: true,
      message: 'Please select a type.',
    },
    bank: {
      valid: true,
      message: 'Please select a bank.',
    },
    category: {
      valid: true,
      message: 'Please select a category.',
    },
  });

  const validateFields = (): boolean => {
    const validationErrors: Partial<BillFormErrors> = {};

    validationErrors.year = yearValidator({ value: currentItem?.year });

    validationErrors.type = {
      valid: Boolean(currentItem?.type),
      message: errors.type?.message ?? '',
    };

    validationErrors.bank = {
      valid: Boolean(currentItem?.bank),
      message: errors.bank?.message ?? '',
    };

    validationErrors.category = {
      valid: Boolean(currentItem?.category),
      message: errors.category?.message ?? '',
    };

    setErrors(validationErrors);
    return (
      validationErrors.year?.valid &&
      validationErrors.bank?.valid &&
      validationErrors.type?.valid &&
      validationErrors.category?.valid
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentItem) {
      return;
    }
    if (!validateFields()) {
      return;
    }

    await handleSave(currentItem, closeModal);
  };

  useEffect(() => {
    if (!currentItem?.year) {
      setCurrentItem(
        (prev) =>
          ({
            ...prev,
            year: new Date().getFullYear(),
          }) as Bill,
      );
    }
  }, [currentItem?.year]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          min="1"
          max="9999"
          type="number"
          name="year"
          label="Year"
          value={
            currentItem?.year?.toString() ?? new Date().getFullYear().toString()
          }
          context="primary"
          onChange={(e) => {
            const updatedYear = e.target.value;
            setCurrentItem(
              (prev) =>
                ({
                  ...prev,
                  year: parseInt(updatedYear),
                }) as Bill,
            );
          }}
          validate={(year) => yearValidator(year)}
          placeholder="Enter a year"
          reloadValidate={errors.year}
        />
      </div>
      <div>
        <Select
          value={currentItem?.type ?? ''}
          label="Type"
          options={Object.values(EBillType).map((item) => ({
            value: item,
            label: item,
          }))}
          onChange={(value) => {
            setCurrentItem(
              (prev) =>
                ({
                  ...prev,
                  type: value as EBillType,
                }) as Bill,
            );
          }}
          isInvalid={!errors.type?.valid}
          placeholder="Choose a type"
          invalidMessage={errors.type?.message}
        />
      </div>
      <div>
        <Select
          value={currentItem?.bank?.id ?? ''}
          label="Bank"
          options={banks.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => {
            setCurrentItem(
              (prev) =>
                ({
                  ...prev,
                  bank: banks.find((bank) => bank.id === value),
                }) as Bill,
            );
          }}
          isInvalid={!errors.bank?.valid}
          placeholder="Choose a bank"
          invalidMessage={errors.bank?.message}
        />
      </div>
      <div>
        <Select
          value={currentItem?.category?.id ?? ''}
          label="Category"
          options={categories.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(value) => {
            setCurrentItem(
              (prev) =>
                ({
                  ...prev,
                  category: categories.find(
                    (category) => category.id === value,
                  ),
                }) as Bill,
            );
          }}
          isInvalid={!errors.category?.valid}
          placeholder="Choose a category"
          invalidMessage={errors.category?.message}
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
        <Button type="submit" context="success">
          Save
        </Button>
        <Button
          context="error"
          appearance="outline"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}