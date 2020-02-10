import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { formatPriceBr, formatDecimalBr } from '~/util/format';

import TablePage from '~/components/TablePage';
import EditAndDeleteButtons from '~/components/EditAndDeleteButtons';
import InfinityScroll from '~/components/InfinityScoll';

import { Container } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`/plans?page=${page}`);
      const data = response.data.map(plan => ({
        ...plan,
        price: formatDecimalBr(plan.price),
        formattedPrice: formatPriceBr(plan.price),
      }));
      setPlans([...plans, ...data]);
    }
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
    return history.push(`/managePlan/${plan.id}`);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <Container>
      <header>
        <h1>Gerenciar planos</h1>
        <aside>
          <button onClick={() => history.push('/managePlan')} type="button">
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
            <InfinityScroll loadMore={handleNextPage} />
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
    </Container>
  );
}
