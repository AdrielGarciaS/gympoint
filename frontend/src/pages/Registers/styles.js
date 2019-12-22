import styled from 'styled-components';
import Select from 'react-select';
import { darken } from 'polished';

export const ContainerRegisters = styled.div`
  display: ${props => (props.manageReg ? 'none' : 'block')};
`;

export const ContentRegisters = styled.div`
  padding: 20px;
  background: #fff;
  width: 100%;

  table {
    width: 100%;
    text-align: center;
    tr,
    th {
      font-size: 16px;
    }

    th:nth-child(1) {
      text-align: left;
    }

    tbody td:nth-child(1) {
      text-align: left;
    }

    tbody td {
      padding: 15px 0;
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

export const ContainerForm = styled.div`
  display: ${props => (props.manageReg ? 'block' : 'none')};

  header button:nth-child(1) {
    background: #ddd;
    transition: 1s;

    :hover {
      background: ${darken(0.05, '#ddd')};
    }
  }
`;

export const RegForm = styled.div`
  padding: 20px;
  margin: 0;
  background: #fff;

  form {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;

    input {
      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: 1px solid #ddd;
      padding-left: 20px;
    }

    table {
      margin-top: 10px;
      th {
        text-align: left;
      }
      td {
        padding-right: 10px;

        :nth-child(4) {
          padding-right: 0;
        }
      }
    }
  }
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

export const SelectPlan = styled(Select)`
  width: 120px;
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
