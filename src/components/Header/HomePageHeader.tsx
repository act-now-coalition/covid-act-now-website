import React from 'react';
import moment from 'moment';

import {
  Wrapper,
  Content,
  Disclaimer,
  HeaderSubCopy,
  HeaderTitle,
  HeaderSubCopyItem,
  ClickableCopy,
} from './HomePageHeader.style';
import { useModelLastUpdatedDate } from 'common/utils/model';

const noop = () => {};

const HomePageHeader = (props: { indicatorsLinkOnClick: () => void }) => {
  const lastUpdatedDate = useModelLastUpdatedDate() || new Date();

  return (
    <Wrapper>
      <Content>
        <HeaderTitle component="h1">
          USA's COVID Warning System: Map & Risk Levels
        </HeaderTitle>
        <div>
          <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
            <HeaderSubCopyItem>
              Our map shows risk levels for <strong>50 states</strong> and{' '}
              <strong>3,200 counties</strong> using{' '}
              <ClickableCopy onClick={props.indicatorsLinkOnClick || noop}>
                5 key metrics
              </ClickableCopy>
              .{' '}
              <small>
                Last updated: {moment.utc(lastUpdatedDate).format('l')}.
              </small>
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
