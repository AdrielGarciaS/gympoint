import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  button:nth-child(1) {
    background: #ddd;
    transition: 1s;

    :hover {
      background: ${darken(0.05, '#ddd')};
    }
  }
`;

export const Content = styled.div`
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
