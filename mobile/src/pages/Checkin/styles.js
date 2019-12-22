import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 0 30px;
`;

export const Header = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})`
  margin-top: 20px;
  margin-bottom: 120px;
`;

export const CheckinContainer = styled.View`
  background: #fff;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px 15px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Hour = styled.Text`
  color: #666;
`;
