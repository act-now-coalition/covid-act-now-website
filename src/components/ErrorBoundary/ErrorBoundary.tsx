import React from 'react';
import * as Sentry from '@sentry/react';
import FallbackAlert from './FallbackAlert';

const ErrorBoundary: React.FC = ({ children }) => (
  <Sentry.ErrorBoundary fallback={FallbackAlert}>
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
