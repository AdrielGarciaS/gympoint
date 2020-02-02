import styled from 'styled-components';

export const ContainerRegisters = styled.div`
  display: ${props => (props.manageReg ? 'none' : 'block')};
`;

export const Plan = styled.button`
  border: 0;
  border-bottom: 1px solid #ddd;
  text-align: left;
  width: 100%;
  background: none;
  height: 25px;

  cursor: default;

  &:hover {
    background: #eee;
  }

  p {
    padding-left: 20px;
  }
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
