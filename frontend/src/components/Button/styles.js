import styled from 'styled-components';
import { darken } from 'polished';

export const ButtonStyle = styled.button`
  color: ${props => (props.delete ? '#de3b3b' : '#4d85ee')};
  border: none;
  background: none;
  transition: 0.5s;

  :hover {
    color: ${props =>
      props.delete ? darken(0.1, '#de3b3b') : darken(0.1, '#4d85ee')};
  }
  padding-left: 15px;
`;
