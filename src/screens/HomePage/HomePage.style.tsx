import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Subtitle1 } from 'components/Typography';
import { mobileBreakpoint, materialSMBreakpoint } from 'assets/theme/sizes';
import {
  StyledLink as RegionItemWrappingLink,
  SkeletonWrapper as RegionItemSkeletonWrapper,
} from 'components/RegionItem/RegionItem.style';
import { COLOR_MAP } from 'common/colors';

export const ColumnCentered = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: auto auto 3rem;
`;

export const HomePageBlock = styled.div`
  margin: 3.5rem 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 2.75rem 1rem 4.75rem;
  }
`;

export const HomePageBlockHeader = styled.h2`
  ${props => props.theme.fonts.regularBookBold};
  font-size: 26px;
  margin-top: 16px;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    font-size: 36px;
  }
`;

export const HomePageBlockSubtitle = styled.div`
  ${props => props.theme.fonts.regularBook};
  font-size: 16px;
  margin-top: 20px;
  text-align: center;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 24px;
  }
`;

// zero right margin so that it's full bleed on mobile when overflowing
export const RegionItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.75rem;
  margin-left: 1rem;
  margin-right: 0;
  flex: 1;
  overflow-x: auto;

  ${RegionItemWrappingLink},${RegionItemSkeletonWrapper} {
    &:first-of-type{
      margin-right: .75rem;
    }
  }

  @media (min-width: ${materialSMBreakpoint}) {
    flex-direction: row;
    margin: auto;
    margin-top: 0.75rem;
  }
`;

export const SearchBarThermometerWrapper = styled(Box)`
  display: flex;
  justify-content: center;

  @media (min-width: 600px) {
    margin: 0 1rem -3.5rem;
  }
`;

export const BannerContainer = styled.div`
  margin: 0 auto;

  @media (min-width: ${mobileBreakpoint}) {
    margin-top: 2rem;
    max-width: 710px;
  }
`;

export const ElectionCountdownContainer = styled.div`
  margin: 1rem auto 0;

  @media (min-width: ${mobileBreakpoint}) {
    margin-top: 2rem;
  }
`;

export const SectionWrapper = styled.div`
  max-width: 1000px;
  margin: auto 1rem;
  padding: 2.5rem 0;
  border-top: 1px solid ${props => props.theme.palette.lightGray};
`;

export const SmallSectionHeader = styled(Subtitle1)`
  text-align: center;
  margin-bottom: 1.25rem;
`;

export const ToggleWrapper = styled.div`
  margin: 1.25rem auto 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 1.6rem auto 0;
  }
`;

export const VaccinationsThermometerHeading = styled.div`
  ${props => props.theme.fonts.regularBook};
  font-size: 14px;
  margin-bottom: 8px;
`;

// Items below maps:

export const MapSubitemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem auto 0;

  @media (min-width: ${materialSMBreakpoint}) {
    margin: 1.5rem auto 0;
    max-width: 800px;
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: ${materialSMBreakpoint}) {
    margin-top: 1.25rem;
  }
`;

export const AboutLink = styled(Link)`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.875rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
  color: ${COLOR_MAP.GREY_4};
  margin-right: 1.5rem;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;

export const MapDescriptionText = styled.span`
  color: ${COLOR_MAP.GREY_4};
  text-align: center;
  max-width: 640px;
  margin: ${({ theme }) => theme.spacing(4, 'auto', 1.5)};
`;

export const ExploreDataPanel = styled.div`
  background: ${COLOR_MAP.GREY_0};
  border: 1px solid ${COLOR_MAP.GREY_2};
  border-radius: 0;
  padding: ${props => props.theme.spacing(2.5)}px;
  margin-left: -1rem;
  margin-right: -1rem;
  border-left: none;
  border-right: none;

  @media (min-width: ${materialSMBreakpoint}) {
    border-radius: 16px;
    margin-left: 0;
    margin-right: 0;
    border-left: 1px solid ${COLOR_MAP.GREY_2};
    border-right: 1px solid ${COLOR_MAP.GREY_2};
  }
`;

export const ExploreDataToggle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing(2)}px;
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: ${props => props.theme.spacing(1.5, 1.75)}px;
  color: ${COLOR_MAP.GREY_4};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: rgb(0, 95, 204) 2px auto;
    outline-offset: 2px;
  }
`;

export const ExploreDataToggleText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const ExploreDataToggleTitle = styled.span`
  color: #000;
`;

export const ExploreDataToggleSubtitle = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ExploreDataPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing(1)}px;
  margin-top: ${props => props.theme.spacing(1.25)}px;
`;

export const ExploreDataPill = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 ${props => props.theme.spacing(1.25)}px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid ${COLOR_MAP.GREY_2};
  color: ${COLOR_MAP.GREY_4};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ExploreDataContent = styled.div`
  margin-top: ${props => props.theme.spacing(2)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  border-top: 1px solid ${COLOR_MAP.GREY_2};
`;
