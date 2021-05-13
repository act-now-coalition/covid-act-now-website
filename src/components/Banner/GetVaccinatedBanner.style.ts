import styled from 'styled-components';
import { LargeFilledButton } from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const BannerContainer = styled.div`
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  justify-content: center;

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    padding: 1.5rem 1rem;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    max-width: 520px;
  }
`;

export const Body = styled.span`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 15px;
  margin-bottom: 1rem;
  line-height: 1.5;

  strong {
    color: black;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// NOTE: We are customizing this button because the text wraps on mobile
// ideally, we should move this to all the LargeButton variants
export const LargeButton = styled(LargeFilledButton)`
  max-height: unset;
  min-height: 3.125rem;
  .MuiButton-label {
    line-height: 1.2;
  }
`;
