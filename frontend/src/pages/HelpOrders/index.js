import React, { useState, useEffect } from 'react';
import { Form, Textarea } from '@rocketseat/unform';
import { MdClose, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  ContainerOrders,
  ContentOrders,
  ContainerAnswer,
  ContentAnswer,
  Scroll,
  ContainerNavigate,
} from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('*'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [isAnswering, setIsAnswering] = useState(false);

  const [order, setOrder] = useState({ answer: null });

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/users/help-orders?page=${page}`);
      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, [order, page]);

  function handleOpenHelpOrder(helpOrder) {
    setOrder(helpOrder);
    setIsAnswering(true);
  }

  function handleCloseHelpOrder() {
    setIsAnswering(false);
    setOrder({});
  }

  async function handleSubmitAnswer(answer, { resetForm }) {
    try {
      if (schema.isValid(answer)) {
        await api.put(`/users/help-orders/${order.id}/answer`, answer);
        toast.success('Resposta enviada com sucesso!');
        handleCloseHelpOrder();
        resetForm();
      }
    } catch (error) {
      toast.error('Falha ao enviar a resposta!');
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handleBeforePage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  return (
    <>
      <ContainerOrders answering={isAnswering}>
        <header>
          <h1>Pedidos de auxílio</h1>
        </header>
        <ContentOrders>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(helpOrder => (
                <tr key={helpOrder.id}>
                  <td>
                    <p>{helpOrder.student.name}</p>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleOpenHelpOrder(helpOrder)}
                      disabled={isAnswering}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentOrders>
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
      </ContainerOrders>
      <ContainerAnswer answering={isAnswering}>
        <ContentAnswer>
          <aside>
            <h1>PERGUNTA DO ALUNO</h1>
            <button type="button" onClick={() => handleCloseHelpOrder()}>
              <MdClose color=" #ff0000" size={18} />
            </button>
          </aside>
          <Scroll>
            <p>{order.question}</p>
          </Scroll>
          <br />
          <h1>SUA RESPOSTA</h1>
          <Form onSubmit={handleSubmitAnswer}>
            <Textarea
              id="answer"
              name="answer"
              type="text-area"
              value={order.answer ? order.answer : ''}
              onChange={e => setOrder({ ...order, answer: e.target.value })}
            />
            <br />
            <button type="submit">Responder aluno</button>
          </Form>
        </ContentAnswer>
      </ContainerAnswer>
    </>
  );
}
