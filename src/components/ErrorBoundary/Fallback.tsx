import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Container } from './Fallback.style';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => (
  <Container>
    <div>Something went wrong</div>
  </Container>
);

export default ErrorFallback;
