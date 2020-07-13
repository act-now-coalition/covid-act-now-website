import React from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';

import {
  Wrapper,
  Content,
  Disclaimer,
  SelectorWrapper,
  HeaderSubCopy,
  HighlightColor,
  HeaderTitle,
  HeaderSubCopyItem,
} from './HomePageHeader.style';

const HomePageHeader = () => {
  const history = useHistory();

  // @ts-ignore TODO(aj): remove when converting MapSelectors
  const handleSelectChange = option => {
    let route = `/us/${option.state_code.toLowerCase()}`;

    if (option.county_url_name) {
      route = `${route}/county/${option.county_url_name}`;
    }

    history.push(route);

    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <Content>
        <HeaderTitle>
          <HighlightColor>America’s COVID warning system</HighlightColor>
        </HeaderTitle>
        <div>
          <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
            <HeaderSubCopyItem hideOnMobile>
              See COVID data and risk level for your community.
              <br />
            </HeaderSubCopyItem>
            <HeaderSubCopyItem>
              All 50 states. 2,100+ counties.
            </HeaderSubCopyItem>
          </HeaderSubCopy>

          <SelectorWrapper>
            <GlobalSelector
              handleChange={handleSelectChange}
              extendRight={undefined}
            />
          </SelectorWrapper>
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
