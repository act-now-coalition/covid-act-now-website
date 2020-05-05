import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  min-height: calc(100vh - 64px);
`;

export const ModelSelectorContainer = styled.div`
  // HACK: This should maybe be sticky or something, but I don't know how to make it work.
  position: fixed;
  z-index: 10;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 1rem;
`;

export const ModelComparisonsContainer = styled.div`
  // HACK: Leave extra space at the top to leave room for InputsContainer (which is position=fixed).
  padding-top: 250px;
`;

export const ComparisonControlsContainer = styled.div`
  display: flex;
  background: #f2f2f2;
  margin-top: 1rem;
  padding: 1rem 2rem;
`;
