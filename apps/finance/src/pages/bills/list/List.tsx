'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import Tabs from '@repo/ds/components/tabs/Tabs';
import Spinner from '@repo/ds/elements/spinner/Spinner';
import PageHeader from '@repo/ui/layout/page-header/PageHeader';

import { SubTab } from '../components';

import { DependencyFallback } from '../../../layout';

import useBill from '../useBill';

import './list.scss';

export default function BillPage() {
  const {
    modal,
    banks,
    loading,
    categories,
    handleOpenModal,
    billListCategory,
    hasAllDependencies,
  } = useBill();
  const router = useRouter();

  return loading ? (
    <Spinner context="neutral" />
  ) : (
    <>
      <PageHeader
        resourceName="Bill"
        button={
          hasAllDependencies ? { onClick: () => handleOpenModal() } : undefined
        }
      />
      {banks.length === 0 && (
        <DependencyFallback
          dependencyName="Bank"
          resourceName="Bill"
          button={{
            label: 'Create Bank',
            onClick: () => router.push('/banks'),
          }}
        />
      )}
      {categories.length === 0 && (
        <DependencyFallback
          dependencyName="Bill Category"
          resourceName="Bill"
          button={{
            label: 'Create Bill Category',
            onClick: () => router.push('/bills/categories'),
          }}
        />
      )}
      {modal}
      {billListCategory.length === 0 ? (
        <DependencyFallback message="No bills were found." />
      ) : (
        <Tabs
          fluid
          tabItems={billListCategory.map((item) => ({
            title: item.title,
            children: <SubTab key={item.title} list={item.list} />,
          }))}
        />
      )}
    </>
  );
}