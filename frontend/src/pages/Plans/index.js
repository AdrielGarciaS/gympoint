import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import api from '~/services/api';
import { formatPriceBr, formatDecimalEn, formatDecimalBr } from '~/util/format';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';

import {
  ContainerPlans,
  ContainerForm,
  PlanForm,
  ContainerNavigate,
} from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [managePlan, setManagePlan] = useState(false);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState('0,0');

  const [page, setPage] = useState(1);

  const calcPrice = useMemo(() => duration * price, [duration, price]) || 0;

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`/plans?page=${page}`);
      const data = response.data.map(plan => ({
        ...plan,
        price: formatDecimalBr(plan.price),
        formattedPrice: formatPriceBr(plan.price),
      }));
      setPlans(data);
    }
    loadPlans();
  }, [managePlan, page]);

  async function handleNewPlan(plan, { resetForm }) {
    try {
      const newPlan = {
        ...plan,
        price: formatDecimalEn(plan.price),
      };
      const response = await api.post('/plans', newPlan);
      setPlans([...plans, response.data]);
      toast.success('Plano cadastrado com sucesso!');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar');
    }
  }

  async function handleUpdatePlan(plan, { resetForm }) {
    try {
      const updatedPlan = {
        ...plan,
        price: formatDecimalEn(plan.price),
      };
      await api.put(`/plans/${managePlan.id}`, updatedPlan);
      toast.success('Plano atualizado com sucesso!');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar');
    }
  }

  async function handleDeletePlan(plan) {
    const confirm = window.confirm(
      `Confirma a exclusão do plano ${plan.title}?`
    );
    if (confirm) {
      try {
        await api.delete(`/plans/${plan.id}`);
        const newPlans = plans.filter(p => p.id !== plan.id);
        setPlans(newPlans);
        toast.success('Plano excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir');
      }
    }
  }

  function handleSetUpdate(plan) {
    setManagePlan(plan);
    setPrice(plan.price);
    setDuration(plan.duration);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  if (managePlan) {
    return (
      <ContainerForm managePlan={managePlan}>
        <header>
          <h1>
            {managePlan !== 'newPlan' ? 'Atualizar plano' : 'Cadastrar Plano'}
          </h1>
          <aside>
            <button
              onClick={() => {
                setManagePlan(null);
                setDuration(null);
                setPrice(null);
              }}
              type="button"
            >
              VOLTAR
            </button>
            <button form="newPlan" type="submit">
              {managePlan !== 'newPlan' ? 'ATUALIZAR' : 'CADASTRAR'}
            </button>
          </aside>
        </header>
        <PlanForm>
          <Form
            initialData={managePlan}
            id="newPlan"
            onSubmit={
              managePlan !== 'newPlan' ? handleUpdatePlan : handleNewPlan
            }
          >
            <p>TÍTULO DO PLANO</p>
            <Input name="title" type="text" />
            <table>
              <thead>
                <tr>
                  <th>DURAÇÃO(meses)</th>
                  <th>PREÇO MENSAL</th>
                  <th>PREÇO TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input
                      onChange={e => setDuration(e.target.value)}
                      name="duration"
                      type="text"
                    />
                  </td>
                  <td>
                    <Input
                      onChange={e => setPrice(formatDecimalEn(e.target.value))}
                      name="price"
                      type="text"
                    />
                  </td>
                  <td>
                    <input
                      value={formatPriceBr(calcPrice)}
                      type="text"
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        </PlanForm>
      </ContainerForm>
    );
  }

  return (
    <ContainerPlans managePlan={managePlan}>
      <header>
        <h1>Gerenciar planos</h1>
        <aside>
          <button onClick={() => setManagePlan('newPlan')} type="button">
            CADASTRAR
          </button>
        </aside>
      </header>
      <TablePage>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>PREÇO MENSAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration} meses</td>
                <td>{plan.formattedPrice}</td>
                <td>
                  <EditAndDeleteButtons
                    handleEdit={() => handleSetUpdate(plan)}
                    handleDelete={() => handleDeletePlan(plan)}
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
    </ContainerPlans>
  );
}
