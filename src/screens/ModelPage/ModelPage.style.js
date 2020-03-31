import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Content = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 2rem;
  margin: auto;
  @media (min-width: 900px) {
    padding: 0;
  }
`;

export const LoadingScreen = styled.div`
  min-height: 90vh;
`;

export const ShareSpacer = styled.div`
  padding-right: 32px;

  @media (max-width: 600px) {
    padding-right: 16px;
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 3rem 0;
  padding: 1rem 0.5rem;
  background-color: rgba(242, 242, 242);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ShareInstruction = styled.div`
  font-size: 1.5rem;
  padding-right: 32px;

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0 0 8px;
  }
`;

export const ShareButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
