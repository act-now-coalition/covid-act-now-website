import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_MAP } from 'common/colors';
import { mobileBreakpoint } from 'assets/theme/sizes';
import fonts from 'common/theme/fonts';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LinkButton from 'components/LinkButton';

const mobileBreakpointPlus = '960px';

export const StyledFooter = styled.footer`
  box-sizing: content-box;
  background: ${COLOR_MAP.BLACK};
  padding: 1.5rem;

  @media (min-width: ${mobileBreakpoint}) {
    padding: 3rem;
  }

  @media (min-width: ${mobileBreakpointPlus}) {
    padding: 4rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  width: 100%;
  margin: auto;

  img {
    height: 20px;
    margin-bottom: 1rem;
    align-self: center;
  }

  @media (min-width: ${mobileBreakpoint}) {
    flex-direction: row;

    img {
      align-self: flex-start;
    }
  }
`;

export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:last-child {
    align-items: center;
  }

  @media (min-width: ${mobileBreakpoint}) {
    &:not(:last-child) {
      margin-bottom: 0;
      margin-right: 3.5rem;
    }

    &:last-child {
      align-items: flex-start;
    }
  }

  @media (min-width: ${mobileBreakpointPlus}) {
    &:not(:last-child) {
      margin-right: 5rem;
    }
  }
`;

export const SectionHeader = styled.h2`
  ${fonts.regularBookMidWeight};
  color: ${COLOR_MAP.GREY_3};
  text-transform: uppercase;
  margin: 0 0 1.25rem;
  font-size: 1rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowIcon = styled(ArrowForwardIcon)`
  color: ${COLOR_MAP.GREY_3};
  font-size: 1.25rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;

  ${ArrowIcon} {
    margin-left: 8px;
  }
`;

export const RowWithSpacing = styled(Row)`
  &:not(:last-of-type) {
    margin-bottom: 1.75rem;
  }
`;

export const BodyCopy = css`
  ${fonts.regularBook};
  color: ${COLOR_MAP.GREY_3};
  line-height: 1.4;
  margin: 0;
`;

export const FeaturedDescription = styled.p`
  ${BodyCopy};
  letter-spacing: 0;
`;

export const AboutCopy = styled.p`
  ${BodyCopy};
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: ${mobileBreakpoint}) {
    text-align: left;
  }
`;

export const ButtonBase = css`
  ${fonts.regularBookMidWeight};
  color: white;
  width: fit-content;
  text-transform: none;
  line-height: 1.4;
`;

export const TextButton = styled(LinkButton)`
  ${ButtonBase};
  font-size: 1rem;
  padding: 0;

  &:hover {
    ${ArrowIcon} {
      transform: translateX(6px);
      transition: transform 0.06s ease-in-out;
    }
  }
`;

export const LearnLink = styled(TextButton)`
  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  @media (min-width: ${mobileBreakpoint}) {
    &:last-of-type {
      margin-bottom: 1.75rem;
    }
  }
`;

export const OutlinedButton = styled(LinkButton)<{ desktopOnly?: boolean }>`
  ${ButtonBase};
  font-size: 0.8725rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid ${COLOR_MAP.GREY_3};
  display: ${({ desktopOnly }) => desktopOnly && 'none'};
  white-space: nowrap;
  &:nth-child(2) {
    margin-left: 0.75rem;
  }

  &:hover {
    background-color: rgba(83, 97, 253, 0.6);
    border-color: ${COLOR_MAP.NEW_BLUE_PURPLE};
  }

  @media (min-width: ${mobileBreakpoint}) {
    display: inherit;
  }
`;

export const SocialButtonsRow = styled.div`
    display: flex;
    svg {
        fill: white;
        font-size: 1.75rem;
        &:hover {
          fill: ${COLOR_MAP.NEW_BLUE_PURPLE};
        }
    }
    a {
      color: white;
        &:not(:last-of-type) {
            margin-right: .75rem;
        }
        &:last-of-type {
          align-self: center;
      }
    }
    }
`;

export const IconWrapper = styled.div`
  display: block;
  margin-right: 1rem;
`;

export const LogoWrapper = styled(Link)`
  line-height: 1;
  margin-bottom: 1.25rem;
`;
