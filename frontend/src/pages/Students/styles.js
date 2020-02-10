import styled from 'styled-components';

export const ContainerUsers = styled.div`
  display: ${props => (props.manageUser ? 'none' : 'block')};
`;
