import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const FallbackAlert: React.FC = () => (
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    An error occurred while rendering this component. We were notified about it
    and will fix it soon.
  </Alert>
);

export default FallbackAlert;
