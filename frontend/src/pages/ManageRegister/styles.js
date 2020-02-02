import styled from 'styled-components';
import Select from 'react-select';
import { darken } from 'polished';

export const Container = styled.div`
  header button:nth-child(1) {
    background: #ddd;
    transition: 1s;

    :hover {
      background: ${darken(0.05, '#ddd')};
    }
  }
`;

export const Content = styled.div`
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

export const SelectPlan = styled(Select)`
  width: 120px;
`;
