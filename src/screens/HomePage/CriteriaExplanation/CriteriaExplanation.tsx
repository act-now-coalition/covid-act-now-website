import React from 'react';
import {
  Wrapper,
  Criterion,
  Kicker,
  CriterionHeader,
  CriterionDescription,
  CriteraFootnote,
  CriteriaList,
} from './CriteriaExplanation.style';
import { useHistory } from 'react-router-dom';

const CriteriaExplanation = () => {
  const history = useHistory();
  const goTo = (route: string) => {
    history.push(route);
    window.scrollTo(0, 0);
  };

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
          <CriterionHeader>
            Do we know how much COVID is actually out there?
          </CriterionHeader>
          <CriterionDescription>
            Is COVID testing widespread enough to be identifying most of the new
            cases?
          </CriterionDescription>
        </Criterion>
        <Criterion>
          <Kicker>Criterion 3</Kicker>
          <CriterionHeader>
            If there’s a new wave of infections, are our hospitals ready?
          </CriterionHeader>
          <CriterionDescription>
            Do hospitals have enough capacity to treat a possible surge of COVID
            hospitalizations?
          </CriterionDescription>
        </Criterion>
      </CriteriaList>
      <CriteraFootnote>
        Learn more about our assessment criteria and US Interventions model{' '}
        <span onClick={() => goTo('/about#model')}>here</span>.
      </CriteraFootnote>
    </Wrapper>
  );
};

export default CriteriaExplanation;
