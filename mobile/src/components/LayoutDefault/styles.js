import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f2f2f2;
`;

export const Header = styled.SafeAreaView`
  height: 50px;
  background: #fff;

  flex-direction: column;
  justify-content: center;
`;

export const Image = styled.Image`
  align-self: center;
`;

export const ContainerAside = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
`;
