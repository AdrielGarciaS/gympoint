import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 0 30px;
`;

export const ListOrders = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  margin-bottom: 120px;
`;

export const TouchableAsk = styled.TouchableOpacity`
  max-height: 250px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
  margin-top: 10px;
`;

export const HeaderAsk = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
`;

export const Answered = styled.Text`
  font-weight: bold;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const AskDate = styled.Text``;

export const Ask = styled.Text`
  margin-top: 15px;
`;
