import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  padding: 50px 0;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin: 30px;

    span {
      color: red;
      margin-bottom: 5px;
      align-self: flex-start;
      font-weight: bold;
    }

    input {
      border-radius: 4px;
      height: 45px;
      border: 1px solid #ddd;
      padding: 15px;
      margin: 8px 0;
    }

    p {
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }

    button {
      background: #ee4d64;
      border-radius: 4px;
      height: 45px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      border-style: none;
    }
  }
`;
