import styled from 'styled-components';

export const ContainerUsers = styled.div`
  display: ${props => (props.manageUser ? 'none' : 'block')};
`;

export const ContainerNavigate = styled.span`
  aside {
    display: flex;
    align-items: center;
    justify-content: space-around;

    font-size: 24px;
    font-weight: bold;
    color: #4d85ee;

    button {
      border: 0;
      background: none;
    }
  }
`;
