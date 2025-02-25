import { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import ExpenseCategoryType, {
  ExpenseCategoryTypeEntity,
} from '@repo/business/finance/expense-category-type';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { expenseCategoryTypeService } from '../../shared';

import './CategoryType.scss';

interface FetchExpenseCategoryTypesProps {
  expenseCategoryType?: ExpenseCategoryType;
  updated?: boolean;
  deletedId?: string;
}

export default function ExpenseCategoryPage() {
  const { addAlert } = useAlert();
  const [expenseCategoryTypes, setExpenseCategoryTypes] = useState<Array<ExpenseCategoryType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingExpenseCategoryType, setEditingExpenseCategoryType] = useState<ExpenseCategoryType | null>(
    null,
  );
  const [newName, setNewName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const ITEMS_PER_PAGE = 10;

  const openCreateModal = () => {
    setIsEditing(false);
    setNewName('');
    setIsModalVisible(true);
  };

  const openEditModal = (expenseCategoryType: ExpenseCategoryType) => {
    setIsEditing(true);
    setEditingExpenseCategoryType(expenseCategoryType);
    setNewName(expenseCategoryType.name);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (isEditing && editingExpenseCategoryType) {
      expenseCategoryTypeService
        .update(editingExpenseCategoryType.id, newName)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'Tipo de Categoria da Despesa atualizado com sucesso!',
          });
          fetchExpenseCategoryTypes({ expenseCategoryType: response, updated: true });
          setIsModalVisible(false);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message:
              error?.message ??
              'Ocorreu um erro ao atualizar o tipo de categoria da despesa.',
          });
        })
        .finally(() => setLoading(false));
    } else {
      expenseCategoryTypeService
        .create(newName)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'Tipo de categoria da despesa criado com sucesso!',
          });
          fetchExpenseCategoryTypes({ expenseCategoryType: response });
          setIsModalVisible(false);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message:
              error?.message ??
              'Ocorreu um erro ao criar o tipo de categoria da despesa.',
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const fetchExpenseCategoryTypes = async (
    fetchSupplierTypesProps?: FetchExpenseCategoryTypesProps,
  ) => {
    setLoading(true);
    expenseCategoryTypeService
      .getAll({
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      })
      .then((response) => {
        const currentResponse = response as Paginate<ExpenseCategoryTypeEntity>;
        const results = currentResponse.results as Array<ExpenseCategoryType>;

        const { pages } = currentResponse;
        setTotalPages(pages);

        const { expenseCategoryType, updated, deletedId } =
          fetchSupplierTypesProps ?? {};
        if (expenseCategoryType) {
          if (!updated) {
            results.push(expenseCategoryType);
            setExpenseCategoryTypes(results);
          }
          if (updated) {
            results.map((type) => {
              if (type.id === expenseCategoryType.id) {
                type.name = expenseCategoryType.name;
              }
            });
            setExpenseCategoryTypes(results);
          }
        } else if (!expenseCategoryType && deletedId) {
          const data = results.filter((type) => type.id !== deletedId);
          setExpenseCategoryTypes(data);
        } else {
          setExpenseCategoryTypes(results);
        }
      })
      .catch((error) => {
        addAlert({
          type: 'error',
          message: error?.message ?? 'Unable to fetch expense category types',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteExpenseCategoryType = async (id: string) => {
    if (
      !window.confirm('Tem certeza que deseja remover este tipo de  categoria da despesa?')
    )
      return;
    setLoading(true);
    expenseCategoryTypeService
      .remove(id)
      .then((response) => {
        addAlert({
          type: 'success',
          message:
            response?.message ?? 'Tipo de categoria da despesa removido com sucesso!',
        });
        fetchExpenseCategoryTypes({ deletedId: id });
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

  useEffect(() => {
    fetchExpenseCategoryTypes();
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
        <h1>Gerenciar Tipos de Fornecedores</h1>
        <button className="btn btn-create" onClick={openCreateModal}>
          Novo Tipo de Fornecedor
        </button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategoryTypes.length > 0 ? (
              expenseCategoryTypes.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
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
                      onClick={() => deleteExpenseCategoryType(item.id)}
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
            <h2>
              {isEditing
                ? 'Editar Tipo de Fornecedor'
                : 'Criar Tipo de Fornecedor'}
            </h2>
            <input
              type="text"
              placeholder="Nome do fornecedor"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
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