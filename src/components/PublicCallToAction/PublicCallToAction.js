import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { STATES } from 'enums';

import ShareBlock from 'components/ShareBlock/ShareBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import Newsletter from 'components/Newsletter/Newsletter';

import Interventions from 'models/Interventions';

import {
  ListIconNumber,
  PublicCallToActionHeader,
  PublicCallToActionColumn,
  PublicCallToActionContainer,
  PublicCallToActionContentBlock,
  PublicCallToActionContentContainer,
} from './PublicCallToAction.style';

import ProgressBar from './ProgressBar';

const PublicCallToAction = ({ county, location }) => {
  const nationalInterventions = new Interventions();

  const totalStatesStayAtHome = nationalInterventions.getTotalStatesStayAtHome();
  const totalStatesSchoolsClosed = nationalInterventions.getTotalStatesWithClosedSchools();
  const totalStatesSocialDistancing = nationalInterventions.getTotalStatesSocialDistancing();
  const totalStatesRestaurantsAndBarsClosed = nationalInterventions.getTotalStatesWithClosedRestaurantsAndBars();

  return (
    <PublicCallToActionContainer>
      {/* Column 1 */}
      <PublicCallToActionColumn flexGrow={1}>
        <PublicCallToActionHeader variant="h4">
          How citizens can help
        </PublicCallToActionHeader>
        <ContentBlock number={1} header="Continue staying inside">
          {[
            'Only leave for essential activities',
            'Where a mask if you do leave',
            'Encourages others to do the same',
          ].map(text => (
            <Typography>{text}</Typography>
          ))}
        </ContentBlock>
        <ContentBlock number={2} header="Share this information">
          <Typography>
            <strong>Save lives</strong> by sharing with your friends, family,
            coworkers, and neighbors.
          </Typography>
          {location ? (
            <ShareModelBlock condensed location={location} county={county} />
          ) : (
            <ShareBlock />
          )}
        </ContentBlock>
        <ContentBlock number={3} header="Get the latest updates from us">
          <Typography>
            We’ll email you a daily digest with updated stats and the day’s most
            interesting Covid-related stories
          </Typography>
          <Newsletter />
        </ContentBlock>
      </PublicCallToActionColumn>
      {/* Column 2 */}
      <PublicCallToActionColumn flexGrow={2}>
        <PublicCallToActionHeader variant="h4">
          How policy makers can help
        </PublicCallToActionHeader>
        {location ? (
          <>
            <ContentBlock
              number={1}
              header={`Measures already taken by the state of ${STATES[location]}`}
            >
              This is a thing
            </ContentBlock>
          </>
        ) : (
          [
            {
              description: 'Social distancing',
              current: totalStatesSocialDistancing,
            },
            {
              description: 'Stay at home',
              current: totalStatesStayAtHome,
            },
            {
              description: 'Schools closed',
              current: totalStatesSchoolsClosed,
            },
            {
              description: 'Restaurants and bars closed',
              current: totalStatesRestaurantsAndBarsClosed,
            },
          ].map(props => (
            <ProgressBar {...props} total={50} entity="state" verb="adopted" />
          ))
        )}
      </PublicCallToActionColumn>
    </PublicCallToActionContainer>
  );
};

const ContentBlock = ({ icon, number, header, children }) => (
  <PublicCallToActionContentBlock>
    {icon || <ListIconNumber>{number}</ListIconNumber>}
    <PublicCallToActionContentContainer>
      <PublicCallToActionHeader variant="h6">{header}</PublicCallToActionHeader>
      {children}
    </PublicCallToActionContentContainer>
  </PublicCallToActionContentBlock>
); // Icon will supercede number

export default PublicCallToAction;
