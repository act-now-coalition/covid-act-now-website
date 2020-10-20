import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return <div>Error</div>;
};

export default ErrorFallback;
