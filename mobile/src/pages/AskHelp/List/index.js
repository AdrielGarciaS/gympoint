/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import LayoutDefault from '~/components/LayoutDefault';
import Button from '~/components/Button';

import {
  Container,
  ListOrders,
  TouchableAsk,
  HeaderAsk,
  Answered,
  AskDate,
  Ask,
} from './styles';

function List({ navigation, isFocused }) {
  const student = useSelector(state => state.auth.user);
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);

  async function loadHelpOrders() {
    const response = await api.get(
      `users/${student.id}/help-orders?page=${page}`
    );
    const data = response.data.map(order => ({
      ...order,
      formattedDateAsk: formatRelative(parseISO(order.created_at), new Date(), {
        locale: pt,
      }),
      formattedDateAnswer: order.answer_at
        ? formatRelative(parseISO(order.answer_at), new Date(), {
            locale: pt,
          })
        : '',
    }));

    if (page > 1 && data) {
      setHelpOrders([...helpOrders, ...data]);
    } else {
      setHelpOrders(data);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused, page]);

  return (
    <LayoutDefault>
      <Container>
        <Button
          onPress={() => {
            navigation.navigate('New');
          }}
        >
          Novo pedido de auxílio
        </Button>
        <ListOrders
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          refreshing={false}
          onRefresh={loadHelpOrders}
          onEndReachedThreshold={0.2}
          onEndReached={() => setPage(page + 1)}
          renderItem={({ item }) => (
            <TouchableAsk onPress={() => navigation.navigate('Read', { item })}>
              <HeaderAsk>
                <Answered answered={!!item.answer}>
                  {item.answer ? 'Respondido' : 'Sem resposta'}
                </Answered>
                <AskDate>{item.formattedDateAsk}</AskDate>
              </HeaderAsk>
              <Ask>{item.question}</Ask>
            </TouchableAsk>
          )}
        />
      </Container>
    </LayoutDefault>
  );
}

export default withNavigationFocus(List);
