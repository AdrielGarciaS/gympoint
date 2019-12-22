import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { darken } from 'polished';

export const ContainerOrders = styled.div`
  filter: ${props => (props.answering ? 'blur(3px)' : 0)};
`;

export const ContentOrders = styled.div`
  font-size: 16px;

  table {
    width: 100%;
    th {
      text-align: left;
      padding-left: 10px;
    }
    tbody {
      tr {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & + tr {
          border-top: 1px solid #eee;
        }
      }
      td {
        padding: 15px;

        button {
          background: none;
          border: 0;
          color: ${props => (props.answer ? '#ee4d64' : '#4d85ee')};
          padding-right: 0;
          transition: 0.5s;

          :hover {
            color: ${darken(0.1, '#4d85ee')};
          }
        }
      }
    }
  }
`;

export const ContainerAnswer = styled.span`
  display: ${props => (props.answering ? 'flex' : 'none')};
  background: #fff;
  position: absolute;
  align-self: center;

  max-width: 450px;
  max-height: 600px;
  width: 100%;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ContentAnswer = styled.span`
  display: flex;

  flex-direction: column;
  padding: 25px;
  width: 100%;

  aside {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    button {
      border: 0;
      background: none;

      width: 16px;
      height: 16px;
    }
  }

  h1 {
    font-size: 16px;
    padding: 5px 0;
    color: #444;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  textarea {
    height: 180px;
    width: 100%;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #666;

    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    margin-top: 5px;
    width: 100%;
    height: 45px;

    background: #ee4d64;
    border: 0;
    border-radius: 4px;

    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 100px;
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
