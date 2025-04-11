import React, { useEffect, useState } from 'react';

import type { SortedColumn } from '@repo/ds/components/table/interface';
import Table from '@repo/ds/components/table/Table';

import Pagination from '@repo/ds/components/pagination/Pagination';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import DependencyFallback from '../DependencyFallback';
import CRUDHeader from '../CRUDHeader';

import type { CRUDPageProps } from './interface';

import './CRUDPage.scss';
import CRUDModal from '../CRUDModal';

export default function CRUDPage<T extends { id: string }>({
  headers,
  loading: outLoading = false,
  saveItem,
  fetchItems,
  deleteItem,
  resourceName,
  fallBackCrud,
  renderItemForm,
  prepareItemForSave,
}: CRUDPageProps<T>) {
  const { addAlert } = useAlert();
  const [items, setItems] = useState<Array<T>>([]);

  const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
    sort: '',
    order: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(outLoading);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const ITEMS_PER_PAGE = 10;

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await fetchItems({
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      });
      setItems(response.results);
      setTotalPages(response.pages);
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message || `Erro ao buscar ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSort = ({ sort, order }: SortedColumn) => {
    setSortedColumn({ sort, order });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSave = async () => {
    if (!editingItem || !saveItem) {
      return;
    }

    setLoading(true);
    try {
      const itemToSave = prepareItemForSave
        ? prepareItemForSave(editingItem)
        : editingItem;

      await saveItem(itemToSave);
      addAlert({
        type: 'success',
        message: `${resourceName} saved successfully!`,
      });
      setIsModalVisible(false);
      await fetchResources();
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Error saving ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id || !deleteItem) {
      return;
    }
    setLoading(true);
    try {
      await deleteItem(id);
      addAlert({
        type: 'success',
        message: `${resourceName} successfully removed!`,
      });
      await fetchResources();
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message || `Error removing ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const openModalVintage = (item?: T) => {
    setEditingItem(item ?? null);
    setIsModalVisible(true);
  };

  const handleChange = (key: keyof T, value: unknown, item?: T) => {
    const currentEditingItem = { ...editingItem, ...item } as T
        ? {
          ...editingItem,
          [key]: value,
        }
        : {
          [key]: value,
        } as T
    setEditingItem(currentEditingItem as T);
  }


  useEffect(() => {
    fetchResources();
  }, [currentPage]);

  return (
    <div className="crud">
      {fallBackCrud && fallBackCrud.show ? (
        <DependencyFallback
          message={fallBackCrud.message}
          button={fallBackCrud.button}
        />
      ) : (
        <>
          <CRUDHeader
            title={`Management of ${resourceName}`}
            button={saveItem && {
              label: `Create new ${resourceName}`,
              onClick: () => openModalVintage(),
            }}
          />
          <Table
            items={items}
            headers={headers}
            actions={
              saveItem || deleteItem
                ? {
                    text: 'Actions',
                    align: 'center',
                    edit: saveItem
                      ? { onClick: (item: T) => openModalVintage(item) }
                      : undefined,
                    delete: deleteItem
                      ? { onClick: (item: T) => handleDelete(String(item.id)) }
                      : undefined,
                  }
                : undefined
            }
            loading={loading}
            onRowClick={saveItem ? (item: T) => openModalVintage(item) : undefined}
            onSortedColumn={handleSort}
            notFoundMessage={`No ${resourceName} found`}
            currentSortedColumn={sortedColumn}
          />
          <CRUDModal
              isOpen={isModalVisible}
              title={
                editingItem?.id ? `Edit ${resourceName}` : `Create ${resourceName}`
              }
              actions={{
                error: { onClick: () => setIsModalVisible(false) },
                success: { onClick: () => handleSave() },
              }}
          >
            {renderItemForm &&
                renderItemForm({
                  item: editingItem || {},
                  handleChange,
                })}
          </CRUDModal>
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