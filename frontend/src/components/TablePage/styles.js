import styled from 'styled-components';

export const Container = styled.div`
  font-size: 16px;

  table {
    border-collapse: collapse;
    width: 100%;
    th {
      text-align: left;
      padding-left: 10px;
    }

    tbody tr {
      border-top: 1px solid #eee;
      &:first-child {
        border: 0;
      }
    }

    td {
      padding: 15px;
    }
  }
`;
