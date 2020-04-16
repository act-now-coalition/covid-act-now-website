import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ListIcon from '@material-ui/icons/List';

import { STATES } from 'enums';

import ShareBlock from 'components/ShareBlock/ShareBlock';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import Newsletter from 'components/Newsletter/Newsletter';

import Interventions from 'models/Interventions';

import {
  IconWrapper,
  ListIconNumber,
  PublicCallToActionHeader,
  PublicCallToActionColumn,
  PublicCallToActionContainer,
  PublicCallToActionContentBlock,
  PublicCallToActionContentContainer,
} from './PublicCallToAction.style';

import ProgressBar from './ProgressBar';

const PublicCallToAction = ({ county, location }) => {
  const modelInterventions = new Interventions(
    location && location.toUpperCase(),
  );

  const totalStatesStayAtHome = modelInterventions.getTotalStatesStayAtHome();
  const totalStatesSchoolsClosed = modelInterventions.getTotalStatesWithClosedSchools();
  const totalStatesSocialDistancing = modelInterventions.getTotalStatesSocialDistancing();
  const totalStatesRestaurantsAndBarsClosed = modelInterventions.getTotalStatesWithClosedRestaurantsAndBars();

  return (
    <PublicCallToActionContainer>
      {/* Column 1 */}
      <PublicCallToActionHeader variant="h4">
        How citizens can help
      </PublicCallToActionHeader>
      <PublicCallToActionColumn fullWidth flexGrow={1}>
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
            <ShareBlock condensed />
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
      {/* TODO: Policy makers */}
      {/* <PublicCallToActionColumn flexGrow={2}>
        <PublicCallToActionHeader variant="h4">
          How policy makers can help
        </PublicCallToActionHeader>
        {location ? (
          // ------- STATE PAGE --------
          <>
            <ContentBlock
              icon={<CheckIcon />}
              iconColor="#31E8BC"
              header={`Measures already taken by the state of ${STATES[location]}`}
            >
              {[
                modelInterventions.getCurrentStateSocialDistancing()
                  ? 'Social distancing'
                  : null,
                modelInterventions.getCurrentStateStayAtHome()
                  ? 'Stay at home'
                  : null,
                modelInterventions.getCurrentStateSchoolsClosed()
                  ? 'Schools closed'
                  : null,
                modelInterventions.getCurrentStateRestaurantsAndBarsClosed()
                  ? 'Restaurants and bars closed'
                  : null,
              ]
                .filter(Boolean)
                .map(text => (
                  <Typography>{text}</Typography>
                ))}
            </ContentBlock>
            <ContentBlock
              icon={<ListIcon />}
              iconColor="#3BBCE6"
              header="Suggested next steps"
            >
              TODO
            </ContentBlock>
          </>
        ) : (
          // ------- HOME / NATIONAL PAGE --------
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
          </PublicCallToActionColumn>*/}
    </PublicCallToActionContainer>
  );
};

const ContentBlock = ({ icon, iconColor, number, header, children }) => (
  <PublicCallToActionContentBlock>
    {/* Icon will supercede number */}
    {icon ? (
      <IconWrapper iconColor={iconColor}>{icon}</IconWrapper>
    ) : (
      <ListIconNumber>{number}</ListIconNumber>
    )}
    <PublicCallToActionContentContainer>
      <PublicCallToActionHeader variant="h6">{header}</PublicCallToActionHeader>
      {children}
    </PublicCallToActionContentContainer>
  </PublicCallToActionContentBlock>
);

export default PublicCallToAction;
