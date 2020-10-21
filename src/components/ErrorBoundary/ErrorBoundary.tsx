import React from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps as ReactErrorBoundaryProps,
} from 'react-error-boundary';
import Fallback from './Fallback';

const errorHandler = (error: Error, info: { componentStack: string }) => {
  // TODO: Send error info to Sentry
  console.log('Error');
};

/**
 * The ErrorBoundary component catch JavaScript errors in the child component
 * tree, logs the errors and display a fallback UI, preventing the app from
 * crashing.
 */

type ErrorBoundaryProps = Omit<ReactErrorBoundaryProps, 'FallbackComponent'>;

const ErrorBoundary: React.FC<ErrorBoundaryProps> = props => {
  const { children, ...otherProps } = props;
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={errorHandler}
      {...otherProps}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
