import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import 'react-datepicker/dist/react-datepicker.css';

import { formatPriceBr, formatDateToBr } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, SelectPlan } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number('').required('*'),
  plan_id: Yup.number('').required('*'),
  start_date: Yup.date('').required('*'),
});

export default function ManageRegister() {
  const { id } = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [student, setStudent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(null);
  const [register, setRegister] = useState(null);

  const totalPrice = useMemo(() => (plan ? plan.price * plan.duration : 0), [
    plan,
  ]);

  const endDate = useMemo(
    () =>
      formatDateToBr(plan ? addMonths(startDate, plan.duration) : startDate),
    [plan, startDate]
  );
  console.tron.log(register);
  console.tron.log(id);

  useEffect(() => {
    async function loadRegister() {
      if (id) {
        const response = await api.get(`/register/${id}`);
        setPlan({ ...response.data.plan, id: response.data.plan_id });
        setStudent({
          id: response.data.student_id,
          name: response.data.student.name,
        });
        setRegister(response.data);
        setStartDate(new Date(response.data.start_date));
      }
    }

    loadRegister();
  }, [id]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans/');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  function resetStatesForm() {
    setStudent(null);
    setPlan(null);
    setRegister(null);
    setStartDate(new Date());
  }

  // eslint-disable-next-line consistent-return
  async function searchStudent(name) {
    if (name !== '') {
      const response = await api.get(`users?q=${name}`);
      return response.data;
    }
  }

  async function handleNewRegister() {
    try {
      const newReg = {
        student_id: student.id,
        plan_id: plan.id,
        start_date: startDate,
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
      const updateReg = {
        student_id: student.id,
        plan_id: plan.id,
        start_date: startDate || new Date(),
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

  const handleSelectStudent = user => {
    setStudent(user);
  };

  const handleSelectPlan = planSelected => {
    setPlan(planSelected);
  };

  function handleInputStartDate(date) {
    setStartDate(date);
  }

  return (
    <Container>
      <header>
        <h1>{register ? 'Atualizar matrícula' : 'Cadastro de matrícula'}</h1>
        <aside>
          <button type="button" onClick={() => history.goBack()}>
            VOLTAR
          </button>
          <button form="registerForm" type="submit">
            {register ? 'ATUALIZAR' : 'CADASTRAR'}
          </button>
        </aside>
      </header>
      <Content>
        <Form
          id="registerForm"
          onSubmit={register ? handleUpdateRegister : handleNewRegister}
        >
          <p>ALUNO</p>
          <AsyncSelect
            name="student"
            onChange={handleSelectStudent}
            placeholder="Nome do aluno"
            loadOptions={name => searchStudent(name)}
            getOptionLabel={s => s.name}
            getOptionValue={s => s.id}
            value={student}
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
                    options={plans}
                    onChange={handleSelectPlan}
                    isSearchable={false}
                    getOptionLabel={p => p.title}
                    getOptionValue={p => p.id}
                    value={plan}
                  />
                </td>
                <td>
                  <DatePicker
                    locale={pt}
                    placeholder="Escolha a data"
                    name="start_date"
                    type="date"
                    onChange={handleInputStartDate}
                    selected={startDate}
                    value={formatDateToBr(startDate)}
                  />
                </td>
                <td>
                  <Input name="end_date" type="text" value={endDate} disabled />
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
      </Content>
    </Container>
  );
}
