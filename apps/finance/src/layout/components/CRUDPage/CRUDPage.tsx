import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import type { SortedColumn, TSort } from '@repo/ds/components/table/interface';
import Table from '@repo/ds/components/table/Table';

import Pagination from '@repo/ds/components/pagination/Pagination';

import useAlert from '@repo/ui/hooks/alert/useAlert';

// import {getValidPage, getUpdatedUrlParams} from './config';
import type { CRUDPageProps, UpdateURLParams } from './interface';

import './CRUDPage.scss';

export default function CRUDPage<T extends { id: string }>({
  headers,
  loading: outLoading = false,
  saveItem,
  fetchItems,
  deleteItem,
  resourceName,
  renderItemForm,
  prepareItemForSave,
}: CRUDPageProps<T>) {
  const { addAlert } = useAlert();
  // const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<Array<T>>([]);
  // const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
  //   sort: searchParams.get('sort') ?? '',
  //   order: (searchParams.get('order') as TSort) ?? '',
  // });
  const [sortedColumn, setSortedColumn] = useState<SortedColumn>({
    sort: '',
    order: '',
  });
  // const [currentPage, setCurrentPage] = useState<number>(
  //     getValidPage(Number(searchParams.get('page'))),
  // );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(outLoading);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  // const updateURLParams = (params: UpdateURLParams) => {
  //   const newParams = getUpdatedUrlParams({
  //     ...params,
  //     searchParams
  //   });
  //   setSearchParams(newParams);
  // };

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
    // updateURLParams({ sort, order });
    setSortedColumn({ sort, order });
  };

  const handlePageChange = (page: number) => {
    // updateURLParams({ page: String(page) });
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
        message:
          (error as Error)?.message || `Error removing ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item?: T) => {
    setEditingItem(item ?? null);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchResources();
  }, [currentPage]);

  return (
    <div className="crud">
      <div className="crud__header">
        <Text tag="h1" variant="big" color="info-80">
          Management of {resourceName}
        </Text>
        {saveItem && (
          <Button onClick={() => openModal()} context="success">
            Create new {resourceName}
          </Button>
        )}
      </div>
      <Table
        items={items}
        headers={headers}
        actions={
          saveItem || deleteItem
            ? {
                text: 'Actions',
                align: 'center',
                edit: saveItem
                  ? { onClick: (item: T) => openModal(item) }
                  : undefined,
                delete: deleteItem
                  ? { onClick: (item: T) => handleDelete(String(item.id)) }
                  : undefined,
              }
            : undefined
        }
        loading={loading}
        onRowClick={saveItem ? (item: T) => openModal(item) : undefined}
        onSortedColumn={handleSort}
        currentSortedColumn={sortedColumn}
      />
      {isModalVisible && (
        <div className="crud__modal">
          <div className="crud__modal--content">
            <h2>
              {editingItem ? `Edit ${resourceName}` : `Create ${resourceName}`}
            </h2>
            {renderItemForm && renderItemForm({
              item: editingItem || {},
              handleChange: (key, value) =>
                setEditingItem((prev) =>
                  prev ? { ...prev, [key]: value } : ({ [key]: value } as T),
                ),
            })}
            <div className="crud__modal--content-actions">
              <Button context="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                context="error"
                appearance="outline"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
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