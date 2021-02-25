import styled, { css } from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import LinkButton from 'components/LinkButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.25rem;

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;
  }
`;

export const OpenLinkIcon = styled(OpenInNewIcon)``;

const PurpleButton = css`
  background-color: ${COLOR_MAP.PURPLE};
  color: white;

  ${OpenLinkIcon} {
    color: white;
    opacity: 0.5;
  }

  &:hover {
    background-color: ${COLOR_MAP.PURPLE};
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.12);
  }
`;

const WhiteButton = css`
  color: ${COLOR_MAP.PURPLE};

  &:hover {
    background-color: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledLinkButton = styled(LinkButton)<{ $highlighted: boolean }>`
  text-transform: none;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${COLOR_MAP.PURPLE};
  min-height: 50px;

  ${props => (props.$highlighted ? PurpleButton : WhiteButton)}

  &:first-child {
    margin: 0 0 8px;
  }

  svg {
    max-width: 24px;
  }

  @media (min-width: ${mobileBreakpoint}) {
    &:first-child {
      margin: 0 16px 0 0;
    }
  }
`;
