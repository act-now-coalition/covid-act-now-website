import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {
  Wrapper,
  Content,
  Disclaimer,
  HeaderSubCopy,
  HeaderTitle,
  HeaderSubCopyItem,
  ClickableCopy,
} from './HomePageHeader.style';

const noop = () => {};

const HomePageHeader = (props: { indicatorsLinkOnClick: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Wrapper>
      <Content>
        <HeaderTitle>America’s COVID Warning System</HeaderTitle>
        <div>
          <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
            <HeaderSubCopyItem>
              We use{' '}
              <ClickableCopy onClick={props.indicatorsLinkOnClick || noop}>
                5 key metrics
              </ClickableCopy>{' '}
              to determine risk levels {!isMobile && <br />}
              for <strong>50 states</strong> and{' '}
              <strong>3,000+ counties</strong>.
            </HeaderSubCopyItem>
          </HeaderSubCopy>
          {false && (
            <Disclaimer>
              We also make projections for the country as a whole.{' '}
              <a href="http://gooogle.com" rel="noopener noreferrer">
                View our nationwide projections
              </a>
            </Disclaimer>
          )}
        </div>
      </Content>
    </Wrapper>
  );
};

export default HomePageHeader;
