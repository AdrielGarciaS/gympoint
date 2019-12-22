import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, Nav } from './styles';

import logo from '~/assets/images/logoHeader.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.user);

  const [page, setPage] = useState('students');

  function navigate(actualPage) {
    setPage(actualPage);
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Nav
            selected={page === 'students'}
            onClick={() => navigate('students')}
            to="/students"
          >
            <p>ALUNOS</p>
          </Nav>
          <Nav
            selected={page === 'plans'}
            onClick={() => navigate('plans')}
            to="/plans"
          >
            <p>PLANOS</p>
          </Nav>
          <Nav
            selected={page === 'registers'}
            onClick={() => navigate('registers')}
            to="/registers"
          >
            <p>MATRÍCULAS</p>
          </Nav>
          <Nav
            selected={page === 'helpOrders'}
            onClick={() => navigate('helpOrders')}
            to="/helpOrders"
          >
            <p>PEDIDOS DE AUXÍLIO</p>
          </Nav>
        </nav>

        <aside>
          <p>{profile.name}</p>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
