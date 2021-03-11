import React from 'react';

/*
 * This Fallback alert allow us to customize an error message for the user when
 * a component fails. Since the error message is not useful for the user, we won't
 * render it and just log to Sentry instead.
 */
const FallbackAlert: React.FC = () => <></>;

export default FallbackAlert;
