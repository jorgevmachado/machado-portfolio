import React, { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import SupplierType from '@repo/business/finance/supplier-type';
import Supplier, { SupplierEntity } from '@repo/business/finance/supplier';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { supplierService, supplierTypeService } from '../../shared';

import './Supplier.scss';

interface FetchSupplierTypesProps {
  supplier?: Supplier;
  updated?: boolean;
  deletedId?: string;
}

export default function SupplierPage() {
  const { addAlert } = useAlert();
  const [suppliers, setSuppliers] = useState<Array<Supplier>>([]);
  const [supplierTypes, setSupplierTypes] = useState<Array<SupplierType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [newType, setNewType] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const ITEMS_PER_PAGE = 10;

  const fetchSupplierTypes = async () => {
    setLoading(true);
    supplierTypeService
      .getAll({})
      .then((response) => {
        const currentResponse = response as Array<SupplierType>;
        setSupplierTypes(currentResponse);
      })
      .catch((error) => {
        addAlert({
          type: 'error',
          message: error?.message ?? 'Unable to fetch supplier types',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setNewName('');
    setNewType(undefined);
    setIsModalVisible(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setIsEditing(true);
    setEditingSupplier(supplier);
    setNewName(supplier.name);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (isEditing && editingSupplier) {
      supplierService
        .update(editingSupplier.id, newName, newType)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'Tipo de fornecedor atualizado com sucesso!',
          });
          fetchSuppliers({ supplier: response, updated: true });
          setIsModalVisible(false);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message:
              error?.message ??
              'Ocorreu um erro ao atualizar o tipo de fornecedor.',
          });
        })
        .finally(() => setLoading(false));
    } else {
      if (!newType) {
        addAlert({
          type: 'error',
          message: 'Selecione um tipo de fornecedor.',
        });
        return;
      }
      supplierService
        .create(newName, newType)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'fornecedor criado com sucesso!',
          });
          fetchSuppliers({ supplier: response });
          setIsModalVisible(false);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message: error?.message ?? 'Ocorreu um erro ao criar o fornecedor.',
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const fetchSuppliers = async (
    fetchSupplierTypesProps?: FetchSupplierTypesProps,
  ) => {
    setLoading(true);
    supplierService
      .getAll({
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      })
      .then((response) => {
        const currentResponse = response as Paginate<SupplierEntity>;
        const results = currentResponse.results as Array<Supplier>;

        const { pages } = currentResponse;
        setTotalPages(pages);

        const { supplier, updated, deletedId } = fetchSupplierTypesProps ?? {};
        if (supplier) {
          if (!updated) {
            results.push(supplier);
            setSuppliers(results);
          }
          if (updated) {
            results.map((item) => {
              if (item.id === supplier.id) {
                item.name = supplier.name;
                item.type = supplier.type;
              }
            });
            setSuppliers(results);
          }
        } else if (!supplier && deletedId) {
          const data = results.filter((type) => type.id !== deletedId);
          setSuppliers(data);
        } else {
          setSuppliers(results);
        }
      })
      .catch((error) => {
        addAlert({
          type: 'error',
          message: error?.message ?? 'Unable to fetch supplier types',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteSupplierType = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover este fornecedor?'))
      return;
    setLoading(true);
    supplierService
      .remove(id)
      .then((response) => {
        addAlert({
          type: 'success',
          message: response?.message ?? 'fornecedor removido com sucesso!',
        });
        fetchSuppliers({ deletedId: id });
      })
      .catch((error) => {
        addAlert({
          type: 'error',
          message:
            error?.message ??
            'Ocorreu um erro ao remover o tipo de fornecedor.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = supplierTypes.find(
      (type) => type.name === event.target.value,
    );
    setNewType(selectedType?.name);
  };

  useEffect(() => {
    fetchSupplierTypes();
    fetchSuppliers();
  }, [currentPage]);

  return (
    <div className="supplier-container">
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Gerenciar Fornecedores</h1>
        <button className="btn btn-create" onClick={openCreateModal}>
          Novo Fornecedor
        </button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type.name}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => openEditModal(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteSupplierType(item.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Nenhum tipo de fornecedor encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Próxima
          </button>
        </div>
      )}

      {/* Formulário de Criação / Edição */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditing ? 'Editar Fornecedor' : 'Criar Fornecedor'}</h2>
            <input
              type="text"
              placeholder="Nome do fornecedor"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className="select-container">
              <select
                value={newType || ''}
                className="select"
                onChange={handleChange}
              >
                <option value="">Selecione um tipo de fornecedor</option>
                {supplierTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-save"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setIsModalVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}