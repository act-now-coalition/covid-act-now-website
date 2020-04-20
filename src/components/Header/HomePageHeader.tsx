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
          43,000 American Lives Saved{' '}
          <HighlightColor>
            <a href="https://blog.covidactnow.org/early-action-saves-43000-lives/">
              and Counting.
            </a>
          </HighlightColor>
        </HeaderTitle>
        <div>
          <HeaderSubCopy color="inherit" component="p" variant="subtitle2">
            Staying home saves lives. Our projections show how COVID is
            spreading in your area, when hospitals may become overloaded, and
            what you can do to stop it.
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
