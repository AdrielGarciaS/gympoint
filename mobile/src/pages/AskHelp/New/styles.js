import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 30px;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 4,
})`
  margin-top: 20px;
  margin-bottom: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding-left: 20px;
  max-height: 400px;
`;
