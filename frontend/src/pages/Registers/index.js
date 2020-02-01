import React, { useEffect, useState, useMemo } from 'react';
import { format, parseISO, getTime, addMonths, isValid } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import {
  MdThumbDown,
  MdThumbUp,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import api from '~/services/api';

import { formatPriceBr, formatDateToString } from '~/util/format';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';

import {
  ContainerRegisters,
  ContainerForm,
  RegForm,
  SelectPlan,
  ContainerNavigate,
} from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number('').required('*'),
  plan_id: Yup.number('').required('*'),
  start_date: Yup.date('').required('*'),
});

export default function Registers() {
  const [registers, setRegisters] = useState([]);

  const [manageReg, setManageReg] = useState(false);

  const [startDate, setStartDate] = useState(formatDateToString(new Date()));
  const [formData, setFormData] = useState({});
  const [plansSelectList, setPlansSelectList] = useState([]);

  const [page, setPage] = useState(1);

  const totalPrice = useMemo(
    () => (formData.plan ? formData.plan.price * formData.plan.duration : 0),
    [formData]
  );

  const endDate = useMemo(
    () =>
      formData.plan
        ? addMonths(
            formData.startDate ? formData.startDate : getTime(new Date()),
            formData.plan.duration
          )
        : new Date(),
    [formData.plan, formData.startDate]
  );

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
  }, [manageReg, page]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      const data = response.data.map(plan => ({
        value: plan.id,
        label: plan.title,
        ...plan,
      }));
      setPlansSelectList(data);
    }
    loadPlans();
  }, [manageReg]);

  function resetStatesForm() {
    setFormData({});
    setStartDate(formatDateToString(new Date()));
  }

  async function searchStudent(name) {
    if (name !== '') {
      const response = await api.get(`users?q=${name}`);
      response.data.map(student => ({
        value: student.id,
        label: student.name,
        ...student,
      }));
    }
  }

  async function handleNewRegister() {
    try {
      const newReg = {
        student_id: formData.student.id,
        plan_id: formData.plan.id,
        start_date: formatDateToString(
          formData.startDate ? formData.startDate : new Date()
        ),
      };
      if (schema.isValid(newReg)) {
        await api.post('/registers', newReg);
        toast.success('Matrícula realizada com sucesso!');

        resetStatesForm();
      }
    } catch (err) {
      toast.error('Erro ao criar matrícula, verifique os dados informados');
    }
  }

  async function handleUpdateRegister() {
    try {
      const id = manageReg;
      const updateReg = {
        student_id: formData.student.id,
        plan_id: formData.plan.id,
        start_date: formatDateToString(
          formData.startDate ? formData.startDate : new Date()
        ),
      };
      if (schema.isValid(updateReg)) {
        await api.put(`/registers/${id}`, updateReg);
        toast.success('Matrícula atualizada com sucesso!');

        resetStatesForm();
      }
    } catch (err) {
      toast.error('Erro ao criar matrícula, verifique os dados informados');
    }
  }

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

  const handleSelectStudent = student => {
    setFormData(student);
  };

  const handleSelectPlan = plan => {
    setFormData({ ...formData, plan });
  };

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  function handleInputStartDate(date) {
    setStartDate(date);
    if (isValid(parseISO(date))) {
      const millisecondsDate = getTime(parseISO(date));
      setFormData({
        ...formData,
        startDate: millisecondsDate,
      });
    }
  }

  function handleSetUpdateRegister(register) {
    const { id, start_date } = register;
    const student = {
      label: register.student.name,
      value: register.student.id,
      id: register.student_id,
      name: register.student.name,
    };

    const plan = {
      label: register.plan.title,
      value: register.plan.id,
      id: register.plan_id,
      title: register.plan.title,
      duration: register.plan.duration,
      price: register.plan.price,
    };

    setFormData({ student, plan, startDate: new Date(start_date) });
    setStartDate(formatDateToString(start_date));

    setManageReg(id);
  }

  if (manageReg) {
    return (
      <ContainerForm manageReg={manageReg}>
        <header>
          <h1>
            {manageReg === 'newReg'
              ? 'Cadastro de matrícula'
              : 'Atualizar matrícula'}
          </h1>
          <aside>
            <button
              type="button"
              onClick={() => {
                resetStatesForm();
                setManageReg(false);
              }}
            >
              VOLTAR
            </button>
            <button form="registerForm" type="submit">
              {manageReg === 'newReg' ? 'CADASTRAR' : 'ATUALIZAR'}
            </button>
          </aside>
        </header>
        <RegForm>
          <Form
            id="registerForm"
            onSubmit={
              manageReg === 'newReg' ? handleNewRegister : handleUpdateRegister
            }
          >
            <p>ALUNO</p>
            <AsyncSelect
              name="student"
              onChange={handleSelectStudent}
              placeholder="Nome do aluno"
              loadOptions={name => searchStudent(name)}
              value={formData.student}
            />
            <table>
              <thead>
                <tr>
                  <th>PLANO</th>
                  <th>DATA DE INÍCIO</th>
                  <th>DATA DE TÉRMINO</th>
                  <th>VALOR FINAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <SelectPlan
                      name="plan_id"
                      placeholder="Selecione"
                      options={plansSelectList}
                      onChange={handleSelectPlan}
                      isSearchable={false}
                      defaultValue={formData.plan}
                    />
                  </td>
                  <td>
                    <Input
                      placeholder="Escolha a data"
                      name="start_date"
                      type="date"
                      onChange={e => handleInputStartDate(e.target.value)}
                      value={startDate}
                    />
                  </td>
                  <td>
                    <Input
                      name="end_date"
                      type="date"
                      value={formatDateToString(endDate)}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      name="price"
                      type="text"
                      value={formatPriceBr(totalPrice)}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </RegForm>
      </ContainerForm>
    );
  }

  return (
    <ContainerRegisters manageReg={manageReg}>
      <header>
        <h1>Gerenciar matrículas</h1>
        <aside>
          <button type="button" onClick={() => setManageReg('newReg')}>
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
