import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  margin: 0;
  padding: 3rem 2rem 2rem;
  background-color: #f2f2f2;

  @media(min-width: 600px) {
    padding: 4rem 2rem 3rem;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const HighlightColor = styled.span`
  color: red;
  font-weight: 600;
`;

export const HeaderTitle = styled(Typography)`
  font-size: 2em;
  font-weight: 500;
  line-height: 2.3rem;
  margin-bottom: 1.5rem;
`;

export const HeaderSubCopy = styled(Typography)`
  font-size: 1rem;
  line-height: 1.6rem;
  margin-bottom: 2rem;
  max-width: 700px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Disclaimer = styled.div`
  padding: 0.7rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);

  a {
    color: red;
  }

`;

export const SelectorWrapper = styled.div`
  margin-bottom: 2rem;
`;
