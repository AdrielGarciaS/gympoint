import styled from 'styled-components';
import { darken } from 'polished';

export const ContainerPlans = styled.div`
  display: ${props => (props.managePlan ? 'none' : 'block')};
`;

export const PlanForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    font-size: 14;
    font-weight: bold;

    input {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 20px;
    }

    table {
      margin-top: 10px;
      tr {
        display: flex;
        justify-content: space-between;

        th {
          padding-right: 90px;
        }
      }
    }
  }
`;

export const ContainerForm = styled.div`
  display: ${props => (props.managePlan ? 'block' : 'none')};
  button:nth-child(1) {
    background: #ddd;
    transition: 1s;

    :hover {
      background: ${darken(0.05, '#ddd')};
    }
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
