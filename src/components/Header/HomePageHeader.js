import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';

import {
  Wrapper,
  Content,
  Disclaimer,
  SelectorWrapper,
  HeaderSubCopy,
  HighlightColor,
  HeaderTitle,
  BlackBar,
} from './HomePageHeader.style';

const HomePageHeader = ({
  children,
  locationName,
  countyName = null,
  intervention,
}) => {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleStateSelectChange = option => {
    const route = `/state/${option.state_code}`;

    history.push(route);

    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <Content>
        <HeaderTitle>
          Act now to <HighlightColor>save lives</HighlightColor> in your community.
        </HeaderTitle>
        <div>
          <HeaderSubCopy
            color="inherit"
            component="p"
            variant="subtitle2"
          >
            Our projections show when hospitals will likely become overloaded throughout the county, and what you can do to change the course of COVID-19 in your local area.
          </HeaderSubCopy>

          <SelectorWrapper>
            <GlobalSelector handleChange={handleStateSelectChange} />
          </SelectorWrapper>
          <Disclaimer>
            We also make projections for the country as a whole. <a href="">View our nationwide projections</a>
          </Disclaimer>
        </div>
      </Content>
    </Wrapper>
  );
};

export default HomePageHeader;
