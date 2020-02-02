import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import { formatDecimalBr } from '~/util/format';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';

import { ContainerUsers, ContainerNavigate } from './styles';

export default function Students() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  function handleSearch(user) {
    setSearch(user);
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get(`/users?q=${search}&page=${page}`);
      const data = response.data.map(user => ({
        ...user,
        weight: formatDecimalBr(user.weight),
      }));
      setUsers(data);
    }

    loadUsers();
  }, [page, search]);

  async function handleDeleteUser(user) {
    const confirm = window.confirm(
      `Confirma a exclusão do aluno ${user.name}?`
    );
    if (confirm) {
      try {
        await api.delete(`/users/${user.id}`);
        const newUsers = users.filter(u => u.id !== user.id);
        setUsers(newUsers);
        toast.success(`Usuário ${user.name} excluído com sucesso!`);
      } catch (err) {
        if (err.response.status === 401) {
          toast.error('O usuário possui uma matrícula cadastrada');
        } else {
          toast.error('Erro ao excluir');
        }
      }
    }
  }

  function handleSetUpdate(user) {
    return history.push(`/manageStudent/${user.id}`);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  return (
    <>
      <ContainerUsers>
        <header>
          <h1>Gerenciando alunos</h1>
          <aside>
            <Link to="/manageStudent">
              <button type="button">CADASTRAR</button>
            </Link>
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={e => handleSearch(e.target.value)}
            />
          </aside>
        </header>
        <TablePage>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>IDADE</th>
                <td />
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <EditAndDeleteButtons
                      handleEdit={() => handleSetUpdate(user)}
                      handleDelete={() => handleDeleteUser(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TablePage>
        <ContainerNavigate>
          <aside>
            <button type="button" onClick={() => handleBeforePage()}>
              <MdNavigateBefore size={36} color="#4d85ee" />
            </button>
            {page}
            <button type="button" onClick={() => handleNextPage()}>
              <MdNavigateNext size={36} color="#4d85ee" />
            </button>
          </aside>
        </ContainerNavigate>
      </ContainerUsers>
    </>
  );
}
