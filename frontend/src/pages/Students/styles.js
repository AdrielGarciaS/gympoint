import styled from 'styled-components';
import { darken } from 'polished';

export const ContainerUsers = styled.div`
  display: ${props => (props.manageUser ? 'none' : 'block')};
`;

export const Content = styled.div`
  table {
    width: 100%;
    font-size: 16px;
    thead {
      font-weight: bold;
      th {
        text-align: left;
        padding-left: 10px;
      }
      td:nth-child(3) {
        text-align: center;
      }
    }

    tbody {
      td {
        padding: 15px;
        border-bottom: 1px solid #eee;
      }

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
    td:nth-child(4) {
      text-align: end;
    }

    td:nth-child(3) {
      text-align: center;
    }
  }
`;

export const ContainerNewUser = styled.div`
  display: ${props => (props.manageUser ? 'block' : 'none')};

  button:nth-child(1) {
    background: #ddd;
    transition: 1s;

    :hover {
      background: ${darken(0.05, '#ddd')};
    }
  }
`;

export const ContentNewUser = styled.div`
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
