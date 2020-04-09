import React from 'react';
import ShareBlock from './ShareBlock';
import { STATES } from 'enums';
import { StateCode } from 'enums/us_states';
import { County } from 'components/MapSelectors/MapTypes';

const ShareModelBlock = ({
  condensed,
  location,
  county,
  embedSnippet,
}: {
  condensed: boolean;
  location: StateCode;
  county: County;
  embedSnippet?: string;
}) => {
  const locationName = STATES[location];
  const countyName = county && county.county;
  const displayName = countyName
    ? `${countyName}, ${locationName}`
    : locationName;
  const shareURL = `https://covidactnow.org/us/${location.toLowerCase()}${
    county ? `/county/${county.county_url_name}` : ''
  }`;
  const shareQuote = `This is the point of no return for intervention to prevent ${displayName}'s hospital system from being overloaded by Coronavirus: `;
  const shareInstruction = `Share ${displayName}'s COVID trends`;
  const newsletterInstruction = `Get the latest updates from the Covid Act Now team for ${displayName}`;

  return (
    <ShareBlock
      condensed={condensed}
      location={location}
      shareURL={shareURL}
      countyName={countyName}
      embedSnippet={embedSnippet}
      shareQuote={shareQuote}
      shareInstruction={shareInstruction}
      newsletterInstruction={newsletterInstruction}
    />
  );
};
export default ShareModelBlock;
