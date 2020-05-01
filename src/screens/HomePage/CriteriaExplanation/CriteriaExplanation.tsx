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
          <Kicker>Criterion 1</Kicker>
          <CriterionHeader>Is COVID in retreat?</CriterionHeader>
          <CriterionDescription>
            Are COVID cases and deaths decreasing?{' '}
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Criterion 2</Kicker>
          <CriterionHeader>Are we testing enough?</CriterionHeader>
          <CriterionDescription>
            Is COVID testing widespread enough to identify new cases?
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Criterion 3</Kicker>
          <CriterionHeader>Are our hospitals ready?</CriterionHeader>
          <CriterionDescription>
            Do hospitals have capacity to treat a surge of COVID
            hospitalizations?
          </CriterionDescription>
        </Criterion>
      </CriteriaList>
    </Wrapper>
  );
};

export default CriteriaExplanation;
