import React from 'react';
import { Container, LoadingMessage, CircularProgress } from './Fallback.style';

const Fallback: React.FC = () => {
  return (
    <Container>
      <LoadingMessage>Loading...</LoadingMessage>
      <CircularProgress size={35} />
    </Container>
  );
};

export default Fallback;
