import React, { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import './CRUDPage.scss';

interface RenderItemFormParams<T> {
  item: Partial<T>;
  handleChange: (key: keyof T, value: unknown) => void;
}

interface CRUDPageProps<T extends { id: string }> {
  saveItem: (item: Partial<T>) => Promise<T>;
  fetchItems: (params: QueryParameters) => Promise<Paginate<T>>;
  deleteItem: (param: string) => Promise<{ message: string }>;
  renderTable: {
    bodies: Array<string>;
    headers: Array<string>;
    actionEdit?: boolean;
    actionDelete?: boolean;
  };
  resourceName: string;
  renderItemForm: (params: RenderItemFormParams<T>) => React.ReactNode;
  prepareItemForSave?: (item: unknown) => Partial<T>;
}

export default function CRUDPage<T extends { id: string }>({
  saveItem,
  fetchItems,
  deleteItem,
  renderTable,
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

  const hasActions = renderTable.actionEdit || renderTable.actionDelete;

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
    if (!editingItem) return;

    setLoading(true);
    try {
      const itemToSave = prepareItemForSave
        ? prepareItemForSave(editingItem)
        : editingItem;

      const savedItem = await saveItem(itemToSave);
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
    if (!id) {
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

  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalVisible(true);
  };

  const openEditModal = (item: T) => {
    setEditingItem(item);
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

        <Button onClick={openCreateModal} context="success">
          Create new {resourceName}
        </Button>
      </div>
      {loading ? (
        <>loading...</>
      ) : (
        <table className="crud__table">
          <thead>
            <tr>
              {renderTable.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {hasActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {renderTable.bodies.map((body, hIndex) => (
                  <td key={hIndex}>
                    {String((item as Record<string, unknown>)[body])}
                  </td>
                ))}
                {hasActions && (
                  <td className="crud__table--actions">
                    {renderTable.actionEdit && (
                      <Button
                        context="attention"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </Button>
                    )}
                    {renderTable.actionDelete && (
                      <Button
                        context="error"
                        onClick={() => handleDelete(String(item.id))}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para criar/editar */}
      {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>
                {editingItem ? `Edit ${resourceName}` : `Create ${resourceName}`}
              </h2>
            </div>
          </div>
        // <div className="crud__modal">
        //   <h2>
        //     {editingItem ? `Edit ${resourceName}` : `Create ${resourceName}`}
        //   </h2>
        //   {renderItemForm({
        //     item: editingItem || {},
        //     handleChange: (key, value) =>
        //       setEditingItem((prev) =>
        //         prev ? { ...prev, [key]: value } : ({ [key]: value } as T),
        //       ),
        //   })}
        //   <button onClick={handleSave}>Salvar</button>
        //   <button onClick={() => setIsModalVisible(false)}>Cancelar</button>
        // </div>
      )}

      {totalPages >= 1 && (
        <div className="crud__pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            {' '}
            Page {currentPage} of {totalPages}{' '}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}