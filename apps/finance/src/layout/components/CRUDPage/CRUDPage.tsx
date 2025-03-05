import React, { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import type { TableProps } from '@repo/ds/components/table/interface';
import Table from '@repo/ds/components/table/Table';

import Pagination from '@repo/ds/components/pagination/Pagination';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import './CRUDPage.scss';

interface RenderItemFormParams<T> {
  item: Partial<T>;
  handleChange: (key: keyof T, value: unknown) => void;
}

interface CRUDPageProps<T extends { id: string }> {
  headers: TableProps['headers'];
  saveItem?: (item: Partial<T>) => Promise<T>;
  fetchItems: (params: QueryParameters) => Promise<Paginate<T>>;
  deleteItem?: (param: string) => Promise<{ message: string }>;
  resourceName: string;
  renderItemForm: (params: RenderItemFormParams<T>) => React.ReactNode;
  prepareItemForSave?: (item: unknown) => Partial<T>;
}

export default function CRUDPage<T extends { id: string }>({
  headers,
  saveItem,
  fetchItems,
  deleteItem,
  resourceName,
  renderItemForm,
  prepareItemForSave,
}: CRUDPageProps<T>) {
  const { addAlert } = useAlert();

  const [items, setItems] = useState<Array<T>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
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
        message: `${resourceName} salvo com sucesso!`,
      });
      setIsModalVisible(false);
      await fetchResources();
    } catch (error) {
      addAlert({
        type: 'error',
        message: (error as Error)?.message ?? `Erro ao salvar ${resourceName}.`,
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
        message: `${resourceName} removido com sucesso!`,
      });
      await fetchResources();
    } catch (error) {
      addAlert({
        type: 'error',
        message:
          (error as Error)?.message || `Erro ao remover ${resourceName}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item?: T) => {
    setEditingItem(item ?? null);
    setIsModalVisible(true);
  }

  useEffect(() => {
    fetchResources();
  }, [currentPage]);

  return (
    <div className="crud">
      <div className="crud__header">
        <Text tag="h1" variant="big" color="info-80">
          Management of {resourceName}
        </Text>
        { saveItem && (
            <Button onClick={() => openModal()} context="success">
              Create new {resourceName}
            </Button>
        )}
      </div>
      <Table
        items={items}
        headers={headers}
        actions={ (saveItem || deleteItem)  ? {
          text: 'Actions',
          align: 'center',
          edit: saveItem  ? { onClick: (item: T) => openModal(item) } : undefined,
          delete: deleteItem ? { onClick: (item: T) => handleDelete(String(item.id)) } : undefined,
        } : undefined}
        loading={loading}
        onRowClick={saveItem ? (item: T) => openModal(item) : undefined}
      />
      {isModalVisible && (
        <div className="crud__modal">
          <div className="crud__modal--content">
            <h2>
              {editingItem ? `Edit ${resourceName}` : `Create ${resourceName}`}
            </h2>
            {renderItemForm({
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
      { totalPages > 1 && (
          <Pagination
              fluid
              currentPage={currentPage}
              pageRange={totalPages}
              totalPages={totalPages}
              handleNewPage={(newPage) => setCurrentPage(newPage)}
              isNumberedPagination
              disableButtonsFirstAndLastPage
          />
      )}
    </div>
  );
}