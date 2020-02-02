import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';
import { formatPriceBr, formatDecimalEn, formatDecimalBr } from '~/util/format';

import { Container, Content } from './styles';

export default function ManagePlan() {
  const { id } = useParams();

  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState('0,0');
  const [plan, setPlan] = useState(null);

  const calcPrice = useMemo(() => duration * price, [duration, price]) || 0;

  useEffect(() => {
    async function loadPlan() {
      if (id) {
        const response = await api.get(`plan/${id}`);
        setPlan({
          ...response.data,
          price: formatDecimalBr(response.data.price),
          formattedPrice: formatPriceBr(response.data.price),
        });
      }
    }
    loadPlan();
  }, [id]);

  async function handleNewPlan(planData, { resetForm }) {
    try {
      const newPlan = {
        ...planData,
        price: formatDecimalEn(planData.price),
      };
      await api.post('/plans', newPlan);
      toast.success('Plano cadastrado com sucesso!');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar');
    }
  }

  async function handleUpdatePlan(planData, { resetForm }) {
    try {
      const updatedPlan = {
        ...planData,
        price: formatDecimalEn(planData.price),
      };
      await api.put(`/plans/${plan.id}`, updatedPlan);
      toast.success('Plano atualizado com sucesso!');
      resetForm();
    } catch (error) {
      toast.error('Erro ao cadastrar');
    }
  }

  return (
    <Container>
      <header>
        <h1>{plan ? 'Atualizar plano' : 'Cadastrar Plano'}</h1>
        <aside>
          <button onClick={() => history.goBack()} type="button">
            VOLTAR
          </button>
          <button form="newPlan" type="submit">
            {plan ? 'ATUALIZAR' : 'CADASTRAR'}
          </button>
        </aside>
      </header>
      <Content>
        <Form
          initialData={plan}
          id="newPlan"
          onSubmit={plan ? handleUpdatePlan : handleNewPlan}
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
      </Content>
    </Container>
  );
}
