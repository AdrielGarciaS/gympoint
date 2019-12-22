import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { Container, Header, Image, ContainerAside } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logoHeader.png';

export default function LayoutDefault({ children, backPage, navigation }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  const focused = true;

  return (
    <Container>
      <Header>
        <Image source={logo} />
        <ContainerAside>
          {backPage ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('List', focused)}
            >
              <Icon name="chevron-left" size={20} color="#f52c45" />
            </TouchableOpacity>
          ) : (
            <Text />
          )}
          <TouchableOpacity>
            <Icon
              onPress={handleSignOut}
              name="exit-to-app"
              size={20}
              color="#f52c45"
            />
          </TouchableOpacity>
        </ContainerAside>
      </Header>
      {children}
    </Container>
  );
}
