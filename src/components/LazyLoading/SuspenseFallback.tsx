import React from 'react';
import { Container, Message, CircularProgress } from './LazyLoading.style';

const SuspenseFallback: React.FC = () => {
  return (
    <Container>
      <Message>Loading...</Message>
      <CircularProgress size={35} />
    </Container>
  );
};

export default SuspenseFallback;
