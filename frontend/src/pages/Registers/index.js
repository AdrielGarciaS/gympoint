import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import {
  MdThumbDown,
  MdThumbUp,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';

import { ContainerRegisters, ContainerNavigate } from './styles';

export default function Registers() {
  const [registers, setRegisters] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadRegisters() {
      const response = await api.get(`/registers?page=${page}`);
      const data = response.data.map(register => ({
        ...register,
        formattedStartDate: format(
          parseISO(register.start_date),
          "d 'de' MMMM 'de' yyy",
          {
            locale: pt,
          }
        ),
        formattedEndDate: format(
          parseISO(register.end_date),
          "d 'de' MMMM 'de' yyy",
          {
            locale: pt,
          }
        ),
      }));
      setRegisters(data);
    }
    loadRegisters();
  }, [page]);

  async function handleDeleteRegister(register) {
    try {
      const { id, student } = register;
      const confirm = window.confirm(
        `Confirma a exclusão da matrícula do aluno ${student.name}?`
      );
      if (confirm) {
        await api.delete(`/registers/${id}`);
        toast.success('Matrícula excluída com sucesso!');
        const newRegisters = registers.filter(reg => id !== reg.id);
        setRegisters(newRegisters);
      }
    } catch (error) {
      toast.error('Erro ao excluir matrícula');
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  function handleSetUpdateRegister(register) {
    history.push(`/manageRegister/${register.id}`);
  }

  return (
    <ContainerRegisters>
      <header>
        <h1>Gerenciar matrículas</h1>
        <aside>
          <button type="button" onClick={() => history.push('/manageRegister')}>
            CADASTRAR
          </button>
        </aside>
      </header>
      <TablePage>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {registers.map(register => (
              <tr key={register.id}>
                <td>{register.student.name}</td>
                <td>{register.plan.title}</td>
                <td>{register.formattedStartDate}</td>
                <td>{register.formattedEndDate}</td>
                <td>
                  {register.active ? (
                    <MdThumbUp color="#2fe762" size={18} />
                  ) : (
                    <MdThumbDown color="#e72f2f" size={18} />
                  )}
                </td>
                <td>
                  <EditAndDeleteButtons
                    handleEdit={() => handleSetUpdateRegister(register)}
                    handleDelete={() => handleDeleteRegister(register)}
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
    </ContainerRegisters>
  );
}
