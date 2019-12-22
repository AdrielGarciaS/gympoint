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

export const PlanList = styled.div`
  border-top: 1px solid #eee;

  table {
    width: 100%;
    text-align: left;
    tr,
    td {
      font-size: 16px;
      text-align: center;
      margin-right: 50px;
    }
    tbody td {
      padding: 15px;
      border-bottom: 1px solid #eee;

      button {
        align-self: flex-end;
        color: #4d85ee;
        border: none;
        background: none;
        transition: 0.5s;

        :hover {
          color: ${darken(0.1, '#4d85ee')};
        }
        & + button {
          padding-left: 15px;
          color: #de3b3b;
          :hover {
            color: ${darken(0.1, '#de3b3b')};
          }
        }
      }
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
