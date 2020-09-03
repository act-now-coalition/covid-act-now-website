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
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 2" number="2" />
          <Content>
            <CriterionHeader>Infection Rate</CriterionHeader>
            <CriterionDescription>
              Is the number of infections going down?{' '}
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 3" number="3" />
          <Content>
            <CriterionHeader>Positive Test Rate</CriterionHeader>
            <CriterionDescription>
              Is COVID testing widespread enough to identify new cases?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 4" number="4" />
          <Content>
            <CriterionHeader>ICU Headroom Used</CriterionHeader>
            <CriterionDescription>
              Do hospitals have capacity to treat a surge of COVID
              hospitalizations?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Indicator 5" number="5" />
          <Content>
            <CriterionHeader>Tracers Hired</CriterionHeader>
            <CriterionDescription>
              Are we hiring enough contact tracers given the number of new
              cases?
            </CriterionDescription>
          </Content>
        </Criterion>
      </CriteriaList>
    </Wrapper>
  );
};

export default CriteriaExplanation;
