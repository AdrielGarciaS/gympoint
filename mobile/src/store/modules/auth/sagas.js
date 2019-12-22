import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email } = payload;

    const response = yield call(api.post, '/sessions/', {
      email,
    });

    const { token, user } = response.data;

    if (user.admin) {
      Alert.alert('Erro no login', 'Administrador, use a plataforma web');
      yield put(signInFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve erro no login, verifique seu ID de cadastro'
    );
    yield put(signInFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
