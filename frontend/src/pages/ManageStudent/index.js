import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { formatDecimalEn, formatDecimalBr } from '~/util/format';

import { Container, Content } from './styles';

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

export default function ManageStudent() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  console.tron.log(id);

  useEffect(() => {
    async function loadUser() {
      if (id) {
        const response = await api.get(`user/${id}`);

        setUser({
          ...response.data,
          weight: formatDecimalBr(response.data.weight),
        });
      }
    }

    loadUser();
  }, [id]);

  async function handleNewUser(userData, { resetForm }) {
    try {
      const newUser = {
        ...userData,
        weight: Number.isInteger(Number(userData.weight))
          ? formatDecimalEn(userData.weight.concat(',00'))
          : formatDecimalEn(userData.weight),
      };
      if (schema.isValid(newUser)) {
        await api.post(`/users`, newUser);
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

  async function handleUpdateUser(userData, { resetForm }) {
    try {
      const updateUser = {
        ...userData,
        weight: Number.isInteger(Number(user.weight))
          ? formatDecimalEn(userData.weight.concat(',00'))
          : formatDecimalEn(userData.weight),
      };
      await api.put(`/users/${user.id}`, updateUser);
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
      return toast.error('Erro ao atualizar, verifique os dados informados');
    }
  }

  return (
    <Container>
      <header>
        <h1>{user ? 'Atualizar Cadastro' : 'Cadastro de aluno'}</h1>
        <aside>
          <button onClick={() => history.goBack()} type="button">
            VOLTAR
          </button>
          <button form="newUserForm" type="submit">
            {user ? 'ATUALIZAR' : 'CADASTRAR'}
          </button>
        </aside>
      </header>
      <Content>
        <Form
          initialData={user}
          id="newUserForm"
          onSubmit={user ? handleUpdateUser : handleNewUser}
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
      </Content>
    </Container>
  );
}
