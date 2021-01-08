import React from 'react';
import * as Sentry from '@sentry/react';
import { Link } from 'react-router-dom';
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
  <Sentry.ErrorBoundary fallback={Fallback}>{children}</Sentry.ErrorBoundary>
);

export default ErrorBoundary;
