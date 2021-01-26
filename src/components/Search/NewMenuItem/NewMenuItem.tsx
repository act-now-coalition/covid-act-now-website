import React from 'react';
import {
  StyledLink,
  Wrapper,
  Subcopy,
  Icon,
  InnerContent,
  ArrowIcon,
} from './NewMenuItem.style';
import { Region, MetroArea, County } from 'common/regions';
import { formatEstimate } from 'common/utils';
import { getLocationIconFillColor } from 'components/Search';
import { StyledRegionName } from 'components/SharedComponents';

const NewMenuItem: React.FC<{ region: Region; zipCodeInput: string }> = ({
  region,
  zipCodeInput,
}) => {
  const showStateCode = region instanceof County || region instanceof MetroArea;
  const fillColor = getLocationIconFillColor(region);

  return (
    <StyledLink to={region.relativeUrl}>
      <Wrapper>
        <Icon fillColor={fillColor} />
        <InnerContent>
          <StyledRegionName showStateCode={showStateCode} region={region} />
          {zipCodeInput ? (
            <Subcopy>Contains the zip code {zipCodeInput}</Subcopy>
          ) : (
            <Subcopy>{formatEstimate(region.population)} population</Subcopy>
          )}
        </InnerContent>
        <ArrowIcon />
      </Wrapper>
    </StyledLink>
  );
};

export default NewMenuItem;
