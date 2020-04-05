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
} from './HomePageHeader.style';

const HomePageHeader = ({
  children,
  locationName,
  countyName = null,
  intervention,
}) => {
  const history = useHistory();

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
          Act now. <HighlightColor>Save lives.</HighlightColor>
        </HeaderTitle>
        <div>
          <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
            Our projections show you how COVID is spreading in your area, when
            hospitals may become overloaded, and what you can do to stop it.
          </HeaderSubCopy>

          <SelectorWrapper>
            <GlobalSelector handleChange={handleSelectChange} />
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
