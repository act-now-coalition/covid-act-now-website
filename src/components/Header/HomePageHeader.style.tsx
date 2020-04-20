import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  margin: 0;
  padding: 3rem 2rem 2rem;
  background-color: #f2f2f2;
  text-align: center;

  @media (min-width: 600px) {
    padding: 4rem 2rem 3rem;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const HighlightColor = styled.span`
  > a {
    color: #00d07d;
    font-weight: 600;
    text-decoration: underline rgba(0, 0, 0, 0);
    transition: 0.2s ease text-decoration-color;

    &:hover {
      text-decoration-color: #00d07d;
    }
  }
`;

export const HeaderTitle = styled(Typography)<{ component?: string }>`
  font-size: 2em;
  font-weight: 500;
  line-height: 2.3rem;
  margin-bottom: 0.5rem;

  @media (max-width: 599px) {
    font-size: 1.5em;
  }
`;

export const HeaderSubCopy = styled(Typography)<{ component?: string }>`
  font-size: 1rem;
  line-height: 1.6rem;
  margin: 0 auto 2rem;
  max-width: 560px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Disclaimer = styled.div`
  padding: 0.7rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);

  a {
    color: #00d07d;
  }
`;

export const SelectorWrapper = styled.div`
  margin-bottom: 0rem;
`;
