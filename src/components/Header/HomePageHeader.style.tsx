import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { COLOR_MAP } from 'common/colors';

export const Wrapper = styled.div`
  margin: 0;
  padding: 1.5rem 1rem;
  background-color: white;
  text-align: center;

  @media (min-width: 600px) {
    padding: 4rem 2rem 2rem;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const HeaderTitle = styled(Typography)<{ component?: string }>`
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2.3rem;
  color: black;
  max-width: 300px;
  margin: 1.2rem auto 1.5rem;

  @media (min-width: 600px) {
    margin: 1rem auto 1rem;
    font-size: 3rem;
    line-height: 1.2;
    max-width: unset;
  }
`;

export const HeaderSubCopy = styled(Typography)<{ component?: string }>`
  font-size: 1rem;
  line-height: 1.6rem;
  margin: 0 auto 0.5rem;
  max-width: 300px;

  a {
    color: inherit;
  }

  @media (min-width: 600px) {
    margin-bottom: 0;
    max-width: 560px;
  }
`;

export const ClickableCopy = styled.span`
  color: ${COLOR_MAP.BLUE};
  text-decoration: underline;
  cursor: pointer;
`;

export const HeaderSubCopyItem = styled.span`
  font-family: Roboto;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  @media (min-width: 600px) {
    display: unset;
    font-size: 19px;
    line-height: 140%;
  }
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
  position: relative;

  display: flex;
  flex: 1;
  margin: 0 1rem 1rem;

  @media (min-width: 600px) {
    margin: 0;
    max-width: 300px;
  }
`;
