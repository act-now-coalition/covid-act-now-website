import React from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps,
} from 'react-error-boundary';
import ErrorFallback from './Fallback';

export const Kabong: React.FC = () => {
  const onClick = () => {
    throw new Error('Boom');
  };
  return <button onClick={onClick}>Boom</button>;
};

const errorHandler = (error: Error, info: { componentStack: string }) => {
  // TODO: Send error info to Sentry
  console.log('Error');
};

/**
 * The ErrorBoundary component catch JavaScript errors in the child component
 * tree, logs the errors and display a fallback UI, preventing the app from
 * crashing.
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = props => {
  const { children, ...otherProps } = props;
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
      {...otherProps}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
