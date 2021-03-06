import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    max-width: 1200px;
    margin: 0 30px;
    width: 100%;
    margin-bottom: 30px;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        margin: 15px 0;
        font-size: 24px;
        font-weight: bold;
      }
      aside {
        button {
          background: #ee4d64;
          height: 36px;
          width: 140px;
          border: 0;
          border-radius: 4px;
          color: #fff;
          font-weight: bold;
          text-align: right;
          padding-right: 20px;
          transition: 1s;
          margin-left: 20px;

          &:hover {
            background: ${darken(0.05, '#ee4d64')};
          }
        }

        input {
          width: 230px;
          height: 36px;
          border-radius: 4px;
          margin-left: 15px;
          border: 1px solid #ddd;
          padding-left: 20px;
        }
      }
    }
    > div {
      padding: 20px;
      background: #fff;
      border-radius: 4px;
    }
  }
`;
