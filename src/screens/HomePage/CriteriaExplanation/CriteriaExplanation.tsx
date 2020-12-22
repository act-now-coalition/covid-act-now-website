import React from 'react';
import {
  Wrapper,
  Criterion,
  KickerContent,
  CriterionHeader,
  CriterionDescription,
  CriteriaList,
  ListSubheader,
  Content,
  KickerWrapper,
  RiskLevelChangeExplainer,
} from './CriteriaExplanation.style';
import { Subtitle1 } from 'components/Typography';
import ExternalLink from 'components/ExternalLink';

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
      <Subtitle1 align="center">How we determine risk levels</Subtitle1>
      <ListSubheader>Key metrics</ListSubheader>
      <CriteriaList>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Metric 1" number="1" />
          <Content>
            <CriterionHeader>Daily new cases</CriterionHeader>
            <CriterionDescription>
              How many new cases are confirmed daily?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Metric 2" number="2" />
          <Content>
            <CriterionHeader>Infection Rate</CriterionHeader>
            <CriterionDescription>
              Is the number of infections going down?{' '}
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <Kicker isMobile={props.isMobile} title="Metric 3" number="3" />
          <Content>
            <CriterionHeader>Positive Test Rate</CriterionHeader>
            <CriterionDescription>
              Is COVID testing widespread enough to identify new cases?
            </CriterionDescription>
          </Content>
        </Criterion>
      </CriteriaList>
      <RiskLevelChangeExplainer component="p">
        Learn about{' '}
        <ExternalLink href="/faq#december-risk-levels-change">
          changes we made
        </ExternalLink>{' '}
        to how we determine risk levels on December 21.
      </RiskLevelChangeExplainer>
    </Wrapper>
  );
};

export default CriteriaExplanation;
