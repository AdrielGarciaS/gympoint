import React, { useState } from 'react';

import LayoutDefault from '~/components/LayoutDefault';

import {
  Wrapper,
  Container,
  ContainerTitle,
  Title,
  Date,
  TextHelpOrder,
} from './styles';

export default function Read({ navigation }) {
  const [helpOrder, setHelpOrder] = useState([navigation.getParam('item')]);

  return (
    <LayoutDefault backPage="List" navigation={navigation}>
      <Wrapper
        data={helpOrder}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Container>
            <ContainerTitle>
              <Title>PERGUNTA</Title>
              <Date>{item.formattedDateAsk}</Date>
            </ContainerTitle>
            <TextHelpOrder>{item.question}</TextHelpOrder>
            <ContainerTitle>
              <Title>RESPOSTA</Title>
              <Date>{item.formattedDateAnswer}</Date>
            </ContainerTitle>
            <TextHelpOrder>{item.answer}</TextHelpOrder>
          </Container>
        )}
      />
    </LayoutDefault>
  );
}
