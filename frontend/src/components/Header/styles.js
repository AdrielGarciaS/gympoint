import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    flex-direction: row;

    img {
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-size: 15px;
      margin-left: 20px;
      color: #444;
      font-weight: bold;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    color: #666;
    font-weight: bold;
    font-size: 14px;

    button {
      background: none;
      border: 0;
      color: #de3b3b;
    }
  }
`;

export const Nav = styled(Link)`
  p {
    color: ${props => (props.selected ? '#444444' : '#999999')};
  }
`;
