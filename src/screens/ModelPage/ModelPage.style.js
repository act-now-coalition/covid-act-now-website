import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Content = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 32px;
  margin: auto;
  @media (min-width: 600px) {
    padding: 0;
  }
`;

export const ShareSpacer = styled.div`
  padding-right: 32px;
`;

export const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
