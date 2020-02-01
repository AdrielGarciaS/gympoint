import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import { formatDecimalBr, formatDecimalEn } from '~/util/format';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';

import {
  ContainerUsers,
  ContainerNewUser,
  ContentNewUser,
  ContainerNavigate,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('*'),
  email: Yup.string()
    .email()
    .required('*'),
  age: Yup.number()
    .integer('*')
    .positive('*')
    .required('*'),
  weight: Yup.string('*'),
  height: Yup.number('Altura em cm').integer(),
});

export default function Students() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [manageUser, setManageUser] = useState(null);
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
  }, [page, search, manageUser]);

  async function handleNewUser(user, { resetForm }) {
    try {
      const newUser = {
        ...user,
        weight: Number.isInteger(Number(user.weight))
          ? formatDecimalEn(user.weight.concat(',00'))
          : formatDecimalEn(user.weight),
      };
      if (schema.isValid(newUser)) {
        const response = await api.post(`/users`, newUser);
        setUsers([...users, response.data]);
        toast.success('Cadastrado com sucesso!');
        resetForm();
      }
    } catch (err) {
      if (err.message === 'email must be unique') {
        toast.error('Email já cadastrado');
      }
      toast.error('Erro ao cadastrar, verifique os dados informados');
    }
  }

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
    return setManageUser(user);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  async function handleUpdateUser(user, { resetForm }) {
    try {
      const updateUser = {
        ...user,
        weight: Number.isInteger(Number(user.weight))
          ? formatDecimalEn(user.weight.concat(',00'))
          : formatDecimalEn(user.weight),
      };
      await api.put(`/users/${manageUser.id}`, updateUser);
      resetForm();
      return toast.success('Cadastrado com Sucesso!');
    } catch (err) {
      console.tron.log(err);
      if (
        err.message === 'email must be unique' ||
        err.message === 'Request failed with status code 402'
      ) {
        return toast.error('Email já cadastrado');
      }
      return toast.error('Erro ao cadastrar, verifique os dados informados');
    }
  }

  if (manageUser) {
    return (
      <ContainerNewUser manageUser={manageUser}>
        <header>
          <h1>
            {manageUser !== 'newUser'
              ? 'Atualizar cadastro'
              : 'Cadastro de aluno'}
          </h1>
          <aside>
            <button
              onClick={() => {
                handleSetUpdate(false);
              }}
              type="button"
            >
              VOLTAR
            </button>
            <button form="newUserForm" type="submit">
              {manageUser !== 'newUser' ? 'ATUALIZAR' : 'CADASTRAR'}
            </button>
          </aside>
        </header>
        <ContentNewUser>
          <Form
            initialData={manageUser}
            id="newUserForm"
            onSubmit={
              manageUser !== 'newUser' ? handleUpdateUser : handleNewUser
            }
          >
            <p>NOME COMPLETO</p>
            <Input name="name" type="text" placeholder="José da Silva" />
            <p>ENDEREÇO DE E-MAIL</p>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
            <table>
              <thead>
                <tr>
                  <th>IDADE</th>
                  <th>PESO(kg)</th>
                  <th>ALTURA(cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input name="age" />
                  </td>
                  <td>
                    <Input name="weight" />
                  </td>
                  <td>
                    <Input name="height" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </ContentNewUser>
      </ContainerNewUser>
    );
  }

  return (
    <>
      <ContainerUsers manageUser={manageUser}>
        <header>
          <h1>Gerenciando alunos</h1>
          <aside>
            <button onClick={() => setManageUser('newUser')} type="button">
              CADASTRAR
            </button>
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
