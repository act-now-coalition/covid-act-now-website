import React from 'react';
import {
  Wrapper,
  Criterion,
  MobileKicker,
  DesktopKicker,
  CriterionHeader,
  CriterionDescription,
  CriteriaList,
  ListHeader,
  ListSubheader,
  Content,
  KickerWrapper,
} from './CriteriaExplanation.style';
import { BetaTag } from 'components/LocationPage/ChartsHolder.style';

const CriteriaExplanation = () => {
  return (
    <Wrapper>
      <ListHeader>How we determine risk levels</ListHeader>
      <ListSubheader>Key indicators</ListSubheader>
      <CriteriaList>
        <Criterion>
          <KickerWrapper>
            <MobileKicker>1</MobileKicker>
            <DesktopKicker>Indicator 1</DesktopKicker>
          </KickerWrapper>
          <Content>
            <CriterionHeader>[New infections per capita]</CriterionHeader>
            <CriterionDescription>
              [How many new infections are occuring daily?]{' '}
            </CriterionDescription>
            <BetaTag>New Indicator</BetaTag>
          </Content>
        </Criterion>
        <Criterion>
          <KickerWrapper>
            <MobileKicker>2</MobileKicker>
            <DesktopKicker>Indicator 2</DesktopKicker>
          </KickerWrapper>
          <Content>
            <CriterionHeader>Are COVID cases decreasing?</CriterionHeader>
            <CriterionDescription>
              Is the number of infections and deaths going down?{' '}
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <KickerWrapper>
            <MobileKicker>3</MobileKicker>
            <DesktopKicker>Indicator 3</DesktopKicker>
          </KickerWrapper>
          <Content>
            <CriterionHeader>Are we testing enough?</CriterionHeader>
            <CriterionDescription>
              Is COVID testing widespread enough to identify new cases?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <KickerWrapper>
            <MobileKicker>4</MobileKicker>
            <DesktopKicker>Indicator 4</DesktopKicker>
          </KickerWrapper>
          <Content>
            <CriterionHeader>Are our hospitals ready?</CriterionHeader>
            <CriterionDescription>
              Do hospitals have capacity to treat a surge of COVID
              hospitalizations?
            </CriterionDescription>
          </Content>
        </Criterion>
        <Criterion>
          <KickerWrapper>
            <MobileKicker>5</MobileKicker>
            <DesktopKicker>Indicator 5</DesktopKicker>
          </KickerWrapper>
          <Content>
            <CriterionHeader>Are we tracing fast enough?</CriterionHeader>
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
