import styled from 'styled-components/native';

export const Wrapper = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 30px;
`;

export const Container = styled.SafeAreaView`
  background: #fff;
  margin-top: 20px;
  margin-bottom: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
`;

export const ContainerTitle = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #444;
  font-family: Roboto-Black;
`;

export const Date = styled.Text`
  color: #666;
`;

export const TextHelpOrder = styled.Text`
  color: #666;
  margin-bottom: 20px;
`;
