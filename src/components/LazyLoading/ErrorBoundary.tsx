import React from 'react';
import { Link } from 'react-router-dom';
import { FallbackErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { Container, Message } from './LazyLoading.style';

const Fallback: React.FC = () => {
  return (
    <Container>
      <Message>Something went wrong.</Message>
      <Link to="/">Return to homepage</Link>
    </Container>
  );
};

const ErrorBoundary: React.FC = ({ children }) => (
  <FallbackErrorBoundary fallback={Fallback}>{children}</FallbackErrorBoundary>
);

export default ErrorBoundary;
