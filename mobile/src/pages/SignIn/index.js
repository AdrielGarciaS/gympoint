import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import logo from '~/assets/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email));
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleSubmit}
        />

        <Button loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </Button>
      </Form>
    </Container>
  );
}
