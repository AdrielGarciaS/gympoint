import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: block;

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
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-direction: column;

    span {
      color: #f00;
    }

    input {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 20px;
    }

    table {
      width: 100%;
      margin: 10px 0;
    }

    p {
      margin: 10px 0;
    }

    thead {
      text-align: left;
    }
  }
`;
