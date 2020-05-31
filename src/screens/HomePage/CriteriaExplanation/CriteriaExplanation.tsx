import React from 'react';
import {
  Wrapper,
  Criterion,
  Kicker,
  CriterionHeader,
  CriterionDescription,
  CriteriaList,
} from './CriteriaExplanation.style';

const CriteriaExplanation = () => {
  return (
    <Wrapper>
      <CriteriaList>
        <Criterion>
          <Kicker>Indicator 1</Kicker>
          <CriterionHeader>Are COVID cases decreasing?</CriterionHeader>
          <CriterionDescription>
            Is the number of infections and deaths going down?{' '}
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Indicator 2</Kicker>
          <CriterionHeader>Are we testing enough?</CriterionHeader>
          <CriterionDescription>
            Is COVID testing widespread enough to identify new cases?
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Indicator 3</Kicker>
          <CriterionHeader>Are our hospitals ready?</CriterionHeader>
          <CriterionDescription>
            Do hospitals have capacity to treat a surge of COVID
            hospitalizations?
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Indicator 4</Kicker>
          <CriterionHeader>Are we tracing fast enough?</CriterionHeader>
          <CriterionDescription>
            Are we finding and isolating most new cases before COVID spreads?
          </CriterionDescription>
        </Criterion>
      </CriteriaList>
    </Wrapper>
  );
};

export default CriteriaExplanation;
