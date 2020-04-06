import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  HeaderSubCopy,
  HeaderRule,
  HeaderTitle,
  BlackBar,
} from './Header.style';

const Header = ({
  locationName,
  countyName = null,
}: {
  locationName: string;
  countyName?: string | null;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  let whoShouldAct = countyName
    ? `${countyName}, ${locationName}`
    : locationName;

  return (
    <BlackBar>
      <div>
        <HeaderTitle>
          Why you must act now {locationName ? `: ${whoShouldAct}` : ''}
        </HeaderTitle>
        {isMobile && <HeaderRule />}
      </div>
      <div>
        <HeaderSubCopy
          style={{ marginBottom: isMobile ? '1rem' : '0.5rem' }}
          color="inherit"
          component="p"
          variant="subtitle2"
        >
          Public leaders &amp; health officials: The only thing that matters
          right now is the speed of your response.
        </HeaderSubCopy>

        <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
          <i>
            This model is intended to help make fast decisions, not predict the
            future.
          </i>
        </HeaderSubCopy>
      </div>
    </BlackBar>
  );
};

export default Header;
