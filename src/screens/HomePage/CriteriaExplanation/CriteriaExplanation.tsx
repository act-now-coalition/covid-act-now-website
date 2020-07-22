import React from 'react';
import {
  Wrapper,
  Criterion,
  KickerContent,
  CriterionHeader,
  CriterionDescription,
  CriteriaList,
  ListHeader,
  ListSubheader,
  Content,
  KickerWrapper,
} from './CriteriaExplanation.style';
import { BetaTag } from 'components/LocationPage/ChartsHolder.style';

const Kicker = (props: {
  number: string;
  title: string;
  isMobile: Boolean;
}) => {
  const kickerText = props.isMobile ? props.number : props.title;

  return (
    <KickerWrapper>
      <KickerContent>{kickerText}</KickerContent>
    </KickerWrapper>
  );
};

const CriteriaExplanation = (props: { isMobile: Boolean }) => {
  return (
    <Wrapper>
      <ListHeader>How we determine risk levels</ListHeader>
      <ListSubheader>Key indicators</ListSubheader>
      <CriteriaList>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 1" number="1" />
          <Content>
            <CriterionHeader>Daily new cases</CriterionHeader>
            <CriterionDescription>
              How many new cases are confirmed daily?
            </CriterionDescription>
            <BetaTag>New Indicator</BetaTag>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 2" number="2" />
          <Content>
            <CriterionHeader>Infection Rate</CriterionHeader>
            <CriterionDescription>
              Are the number of infections going down?{' '}
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 3" number="3" />
          <Content>
            <CriterionHeader>Test Positivity</CriterionHeader>
            <CriterionDescription>
              Is COVID testing widespread enough to identify new cases?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 4" number="4" />
          <Content>
            <CriterionHeader>ICU Headroom</CriterionHeader>
            <CriterionDescription>
              Do hospitals have capacity to treat a surge of COVID
              hospitalizations?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 5" number="5" />
          <Content>
            <CriterionHeader>Contacts Traced</CriterionHeader>
            <CriterionDescription>
              Are we finding and isolating most new cases before COVID spreads?
            </CriterionDescription>
          </Content>
        </Criterion>
      </CriteriaList>
    </Wrapper>
  );
};

export default CriteriaExplanation;
