import React from 'react';
import FallbackAlert from './FallbackAlert';

/** Renders `fallback` in place of a child subtree that throws while rendering. */
export class FallbackErrorBoundary extends React.Component<
  { fallback: React.ComponentType },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const Fallback = this.props.fallback;
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}

const ErrorBoundary: React.FC = ({ children }) => (
  <FallbackErrorBoundary fallback={FallbackAlert}>
    {children}
  </FallbackErrorBoundary>
);

export default ErrorBoundary;
