import { useEffect, useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import SupplierType, {
  SupplierTypeEntity,
} from '@repo/business/finance/supplier-type';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { supplierTypeService } from '../../shared';

import './SupplierType.scss';

interface FetchSupplierTypesProps {
  supplierType?: SupplierType;
  updated?: boolean;
  deletedId?: string;
}

export default function SupplierTypePage() {
  const { addAlert } = useAlert();
  const [supplierTypes, setSupplierTypes] = useState<Array<SupplierType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierType | null>(
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

  const openEditModal = (supplier: SupplierType) => {
    setIsEditing(true);
    setEditingSupplier(supplier);
    setNewName(supplier.name);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (isEditing && editingSupplier) {
      supplierTypeService
        .update(editingSupplier.id, newName)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'Tipo de fornecedor atualizado com sucesso!',
          });
          fetchSupplierTypes({ supplierType: response, updated: true });
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
      supplierTypeService
        .create(newName)
        .then((response) => {
          addAlert({
            type: 'success',
            message: 'Tipo de fornecedor criado com sucesso!',
          });
          fetchSupplierTypes({ supplierType: response });
          setIsModalVisible(false);
        })
        .catch((error) => {
          addAlert({
            type: 'error',
            message:
              error?.message ??
              'Ocorreu um erro ao criar o tipo de fornecedor.',
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const fetchSupplierTypes = async (
    fetchSupplierTypesProps?: FetchSupplierTypesProps,
  ) => {
    setLoading(true);
    supplierTypeService
      .getAll({
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      })
      .then((response) => {
        const currentResponse = response as Paginate<SupplierTypeEntity>;
        const results = currentResponse.results as Array<SupplierType>;

        const { pages } = currentResponse;
        setTotalPages(pages);

        const { supplierType, updated, deletedId } =
          fetchSupplierTypesProps ?? {};
        if (supplierType) {
          if (!updated) {
            results.push(supplierType);
            setSupplierTypes(results);
          }
          if (updated) {
            results.map((type) => {
              if (type.id === supplierType.id) {
                type.name = supplierType.name;
              }
            });
            setSupplierTypes(results);
          }
        } else if (!supplierType && deletedId) {
          const data = results.filter((type) => type.id !== deletedId);
          setSupplierTypes(data);
        } else {
          setSupplierTypes(results);
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
    if (
      !window.confirm('Tem certeza que deseja remover este tipo de fornecedor?')
    )
      return;
    setLoading(true);
    supplierTypeService
      .remove(id)
      .then((response) => {
        addAlert({
          type: 'success',
          message:
            response?.message ?? 'Tipo de fornecedor removido com sucesso!',
        });
        fetchSupplierTypes({ deletedId: id });
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
    fetchSupplierTypes();
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
            {supplierTypes.length > 0 ? (
              supplierTypes.map((type) => (
                <tr key={type.id}>
                  <td>{type.name}</td>
                  <td>{new Date(type.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => openEditModal(type)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteSupplierType(type.id)}
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

  // return (
  //   <div>
  //     <div
  //       style={{
  //         marginBottom: '20px',
  //         display: 'flex',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <h1>Gerenciar Tipos de Fornecedores</h1>
  //       <button
  //         onClick={() => {
  //           setEditingSupplier(null);
  //           setNewName('');
  //           setIsModalVisible(true);
  //         }}
  //       >
  //         Novo Tipo de Fornecedor
  //       </button>
  //     </div>
  //     {loading ? (
  //       <p>Carregando...</p>
  //     ) : (
  //       <table
  //         style={{
  //           width: '100%',
  //           border: '1px solid #ddd',
  //           borderCollapse: 'collapse',
  //         }}
  //       >
  //         <thead>
  //           <tr>
  //             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
  //             <th style={{ border: '1px solid #ddd', padding: '8px' }}>
  //               Criado em
  //             </th>
  //             <th
  //               style={{
  //                 border: '1px solid #ddd',
  //                 padding: '8px',
  //                 textAlign: 'center',
  //               }}
  //             >
  //               Ações
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {supplierTypes.map((type) => (
  //             <tr key={type.id}>
  //               <td style={{ border: '1px solid #ddd', padding: '8px' }}>
  //                 {type.name}
  //               </td>
  //               <td style={{ border: '1px solid #ddd', padding: '8px' }}>
  //                 {new Date(type.created_at).toLocaleDateString()}
  //               </td>
  //               <td
  //                 style={{
  //                   border: '1px solid #ddd',
  //                   padding: '8px',
  //                   textAlign: 'center',
  //                 }}
  //               >
  //                 <button
  //                   onClick={() => {
  //                     setEditingSupplier(type);
  //                     setNewName(type.name);
  //                     setIsModalVisible(true);
  //                   }}
  //                   style={{ marginRight: '10px' }}
  //                 >
  //                   Editar
  //                 </button>
  //                 <button
  //                   onClick={() => deleteSupplierType(type.id)}
  //                   style={{ color: 'red' }}
  //                 >
  //                   Remover
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     )}
  //     {/* Formulário de Criação / Edição */}
  //     {isModalVisible && (
  //       <div
  //         style={{
  //           position: 'fixed',
  //           top: 0,
  //           left: 0,
  //           width: '100%',
  //           height: '100%',
  //           backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <div
  //           style={{
  //             backgroundColor: '#fff',
  //             padding: '20px',
  //             borderRadius: '4px',
  //             width: '400px',
  //             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  //           }}
  //         >
  //           <h2>
  //             {editingSupplier
  //               ? 'Editar Tipo de Fornecedor'
  //               : 'Novo Tipo de Fornecedor'}
  //           </h2>
  //           <input
  //             type="text"
  //             value={newName}
  //             onChange={(e) => setNewName(e.target.value)}
  //             placeholder="Digite o nome"
  //             style={{
  //               width: '100%',
  //               padding: '8px',
  //               marginBottom: '10px',
  //               border: '1px solid #ddd',
  //               borderRadius: '4px',
  //             }}
  //           />
  //           <div
  //             style={{
  //               display: 'flex',
  //               justifyContent: 'flex-end',
  //               gap: '10px',
  //             }}
  //           >
  //             <button onClick={() => setIsModalVisible(false)}>Cancelar</button>
  //             <button
  //               onClick={
  //                 editingSupplier ? updateSupplierType : createSupplierType
  //               }
  //             >
  //               {editingSupplier ? 'Atualizar' : 'Criar'}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}