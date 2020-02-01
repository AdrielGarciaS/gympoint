import React from 'react';

import { ButtonStyle } from './styles';

export default function Button({ children, ...rest }) {
  return <ButtonStyle {...rest}>{children}</ButtonStyle>;
}
