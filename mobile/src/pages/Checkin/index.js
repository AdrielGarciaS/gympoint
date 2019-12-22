/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import LayoutDefault from '~/components/LayoutDefault';
import Button from '~/components/Button';

import {
  Container,
  Header,
  CheckinContainer,
  List,
  Title,
  Hour,
} from './styles';

function Checkin({ isFocused }) {
  const student = useSelector(state => state.auth.user);

  const [checkins, setCheckins] = useState([]);

  async function loadCheckins() {
    const response = await api.get(`users/${student.id}/checkins`);
    const data = response.data.map(checkin => ({
      ...checkin,
      formattedDate: formatRelative(parseISO(checkin.created_at), new Date(), {
        locale: pt,
      }),
      checkinNum:
        response.data.length -
        response.data.findIndex(c => c.id === checkin.id),
    }));

    setCheckins(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  async function handleCheckin() {
    try {
      await api.post(`users/${student.id}/checkins`);
      loadCheckins();
      return Alert.alert('Sucesso', 'Check-in Realizado com sucesso!');
    } catch (err) {
      if (err.response.status === 403) {
        return Alert.alert(
          'Falha',
          'Você só pode realizar 5 check-ins a cada 7 dias'
        );
      }
      return Alert.alert('Falha', 'Falha ao realizar check-in');
    }
  }

  return (
    <LayoutDefault>
      <Container>
        <Button onPress={handleCheckin}>Novo Check-in</Button>
        <Header>Últimos 5 check-ins:</Header>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          refreshing={false}
          onRefresh={loadCheckins}
          renderItem={({ item }) => (
            <CheckinContainer>
              <Title>{`Check-in #${item.checkinNum}`}</Title>
              <Hour>{item.formattedDate}</Hour>
            </CheckinContainer>
          )}
        />
      </Container>
    </LayoutDefault>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: <Icon name="check-circle" size={20} color="#ee4e62" />,
};

console.tron.log(Checkin.navigationOptions);

export default withNavigationFocus(Checkin);
