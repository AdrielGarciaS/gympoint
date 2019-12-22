import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-top: 10px;
  background: #ee4e62;
  height: 45px;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 16px;
`;
