import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Container } from './Fallback.style';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => (
  <Container>
    <p>An error has occurred in this component.</p>
    <details>
      <summary>Error details</summary>
      {error?.stack && <pre>{error?.stack}</pre>}
    </details>
  </Container>
);

export default ErrorFallback;
