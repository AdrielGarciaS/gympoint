import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import LayoutDefault from '~/components/LayoutDefault';
import Button from '~/components/Button';
import { Container, TextArea } from './styles';

export default function New({ navigation }) {
  const student = useSelector(state => state.auth.user);
  const [helpOrder, setHelpOrder] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`users/${student.id}/help-orders`, {
        question: helpOrder,
      });
      Alert.alert('Sucesso', 'Pedido de auxílio enviado com sucesso');
      setHelpOrder('');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao enviar o pedido de auxílio');
    }
  }
  return (
    <LayoutDefault backPage="List" navigation={navigation}>
      <Container>
        <TextArea
          placeholder="Inclua seu pedido de auxílio"
          value={helpOrder}
          onChangeText={setHelpOrder}
        />
        <Button onPress={handleSubmit}>Enviar Pedido</Button>
      </Container>
    </LayoutDefault>
  );
}
