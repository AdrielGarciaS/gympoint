import React from 'react';

import { Container } from './styles';
import Button from '~/components/Button';

export default function EditAndDeleteButtons({ handleDelete, handleEdit }) {
  return (
    <Container>
      <Button type="button" onClick={handleEdit}>
        editar
      </Button>
      <Button type="button" onClick={handleDelete} delete>
        apagar
      </Button>
    </Container>
  );
}
