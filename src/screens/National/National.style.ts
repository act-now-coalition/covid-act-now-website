import styled from 'styled-components';
import theme from 'assets/theme';
import { Heading1 } from 'components/Markdown';
import { COLOR_MAP } from 'common/colors';
import { materialSMBreakpoint } from 'assets/theme/sizes';

export const Placeholder = styled.div`
  padding: ${theme.spacing(2)}px;
`;

export const PageContent = styled.main`
  margin: 0 ${theme.spacing(2)}px ${theme.spacing(4)}px;

  @media (min-width: ${960}px) {
    max-width: ${960}px;
    margin: 0 auto ${theme.spacing(4)}px;
  }
`;

export const Header = styled(Heading1)`
  text-align: center;
  font-size: 1.75rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-bottom: 3rem;
  }
`;

export const CopyContainer = styled.div`
  margin: 1.5rem 0 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 4rem 0;
  }
`;

export const Paragraph = styled.p`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 1.25rem;
  max-width: 600px;
  margin: 1.25rem auto;
  line-height: 1.3;

  span {
    font-weight: 500;
  }
`;
