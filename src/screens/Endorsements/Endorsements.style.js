import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #f2f2f2;
  padding: 0;
  padding: 40px;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  h1,
  h5,
  p {
    margin-bottom: 24px;
  }
`;

export const Quote = styled.div`
  background-color: white;
  border-radius: 8px;
  margin: 40px 0;
  padding: 24px;
  display: flex;
  svg {
    width: 48px;
    height: 48px;
    transform: rotate(180deg);
    margin-right: 8px;
    position: relative;
    top: -8px;
    &:after {
      content: '|';
      color: red;
    }
  }
  p {
    margin: 0;
  }
`;
