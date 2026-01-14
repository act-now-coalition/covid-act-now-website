import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { TableHead, TableCell, TableRow, Modal } from '@material-ui/core';
import isNumber from 'lodash/isNumber';
import { ChartLocationName } from 'components/LocationPage/ChartsHolder.style';
import { Wrapper as LocationName } from 'components/SharedComponents/StyledRegionName/StyledRegionName.style';
import { COLORS } from 'common';
import { COLOR_MAP, LEVEL_COLOR } from 'common/colors';
import { Level } from 'common/level';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { SectionHeader } from 'components/SharedComponents/SharedComponents.style';

// TODO (Chelsi): consolidate into a theme:

export const locationNameCellWidthPercent = 22;
export const locationNameCellWidth = 195;

const getMetricHeaderBackground = (
  $sortByPopulation: boolean,
  $isModal: boolean,
  $isSelectedMetric: boolean,
) => {
  if ($isModal) {
    if ($isSelectedMetric && !$sortByPopulation) return 'black';
    return `${COLOR_MAP.GRAY_BODY_COPY}`;
  } else {
    if ($isSelectedMetric && !$sortByPopulation)
      return `${COLOR_MAP.NEW_BLUE.BASE}`;
    return 'white';
  }
};

export const CenteredContentModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div<{
  $isModal?: boolean;
  $isHomepage?: boolean;
}>`
  max-width: ${({ $isHomepage }) => ($isHomepage ? '1000px' : '900px')};
  width: 100%;
  margin: 0 auto;
  background: ${({ $isModal }) => $isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
  max-height: ${({ $isModal }) => $isModal && '100vh'};

  @media (min-width: 600px) {
    margin: 0 auto;
    max-height: ${({ $isModal }) => ($isModal ? '80vh' : 'unset')};
  }

  @media (min-width: 1060px) {
    margin: 0 auto;
  }

  @media (min-width: 1350px) {
    margin: ${({ $isModal }) => ($isModal ? '0 auto' : '0 445px 0 auto')};
  }

  @media (min-width: 1750px) {
    margin: 0 auto;
  }

  table {
    border-spacing: 0;

    a {
      display: table;
      color: black;
      width: 100%;
    }
  }

  ${ChartLocationName} {
    margin: 0.25rem 0;
  }
`;

export const ArrowContainer = styled.div<{
  $arrowColorNotSelected: string;
  $isModal?: boolean;
}>`
  color: ${COLOR_MAP.GRAY_ICON};
  font-family: Roboto;
  font-size: 0.875rem;
  transform: translate(-0.25rem, 0.15rem);
  margin-top: 0.25rem;
  display: flex;

  span {
    margin: auto 0 auto 0.25rem;
  }

  svg {
    color: ${({ $arrowColorNotSelected }) => $arrowColorNotSelected};

    &:hover {
      color: ${({ $isModal }) => ($isModal ? 'white' : 'black')};
    }
  }
`;

export const CellStyles = css`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

export const LocationHeaderCell = styled(TableCell)<{
  $isModal: boolean;
  $sortByPopulation: boolean;
  $arrowColorSelected: string;
  $arrowColorNotSelected: string;
  $sortDescending: boolean;
}>`
  ${CellStyles}
  width: ${locationNameCellWidthPercent}%;
  min-width: ${locationNameCellWidth}px;

  background-color: ${({ $isModal, $sortByPopulation }) =>
    $isModal && $sortByPopulation
      ? 'black'
      : $isModal
      ? `${COLOR_MAP.GRAY_BODY_COPY}`
      : $sortByPopulation
      ? `${COLOR_MAP.NEW_BLUE.BASE}`
      : 'white'};

  color: ${({ $isModal, $sortByPopulation }) =>
    !$isModal && $sortByPopulation && 'white'};

  ${ArrowContainer} {
    svg{
      &:first-child {
        color: ${({ $arrowColorSelected, $sortByPopulation }) =>
          $sortByPopulation && `${$arrowColorSelected}`};
        opacity: ${({ $sortDescending, $sortByPopulation }) =>
          $sortDescending && $sortByPopulation && '.5'};
      }
      &:nth-child(2){
        transform: translatex(-0.1rem);
        color: ${({ $arrowColorSelected, $sortByPopulation }) =>
          $sortByPopulation && `${$arrowColorSelected}`};
        opacity: ${({ $sortDescending, $sortByPopulation }) =>
          !$sortDescending && $sortByPopulation && '.5'};
      }
      &:hover{
        color: ${({ $arrowColorSelected, $sortByPopulation }) =>
          $sortByPopulation && `${$arrowColorSelected}`};
        opacity: 1;
      }
    }
  }

  span{
    color: ${COLOR_MAP.GRAY.DARK};
    font-weight: normal;
    color: ${({ $isModal, $sortByPopulation }) =>
      !$isModal && $sortByPopulation ? 'white' : `${COLOR_MAP.GRAY.DARK}`};

  }
`;

export const MetricHeaderCell = styled(TableCell)<{
  $isModal: boolean;
  $sortByPopulation: boolean;
  $arrowColorSelected: string;
  $sortDescending: boolean;
  $isSelectedMetric: boolean;
  $desiredWidthPercent: number;
  $minWidthPx: number;
}>`
  ${CellStyles}

  width: ${props => props.$desiredWidthPercent}%;
  min-width: ${props => props.$minWidthPx}px;

  background-color: ${props =>
    getMetricHeaderBackground(
      props.$sortByPopulation,
      props.$isModal,
      props.$isSelectedMetric,
    )};
    color: ${({ $sortByPopulation, $isSelectedMetric }) =>
      !$sortByPopulation && $isSelectedMetric && 'white'};

    ${ArrowContainer} {
      svg{
        &:nth-child(2) {
          transform: translatex(-0.1rem);
          color: ${({
            $arrowColorSelected,
            $sortByPopulation,
            $isSelectedMetric,
          }) =>
            !$sortByPopulation &&
            $isSelectedMetric &&
            `${$arrowColorSelected}`};
          opacity: ${({
            $sortDescending,
            $sortByPopulation,
            $isSelectedMetric,
          }) =>
            !$sortDescending &&
            !$sortByPopulation &&
            $isSelectedMetric &&
            '.5'};
        }
        &:first-child {
          color: ${({
            $arrowColorSelected,
            $sortByPopulation,
            $isSelectedMetric,
          }) =>
            !$sortByPopulation &&
            $isSelectedMetric &&
            `${$arrowColorSelected}`};
          opacity: ${({
            $sortDescending,
            $sortByPopulation,
            $isSelectedMetric,
          }) =>
            $sortDescending && !$sortByPopulation && $isSelectedMetric && '.5'};
        }
        &:hover{
          color: ${({
            $arrowColorSelected,
            $sortByPopulation,
            $isSelectedMetric,
          }) =>
            !$sortByPopulation &&
            $isSelectedMetric &&
            `${$arrowColorSelected}`};
            opacity: 1;
        }
      }
    }
`;

export const TableHeadContainer = styled(TableHead)<{ $isModal?: boolean }>`
  ${MetricHeaderCell}, ${LocationHeaderCell} {
    vertical-align: bottom;
    line-height: 1.1rem;
    padding: 1rem 0.6rem 0.8rem;
    color: ${({ $isModal }) => $isModal && 'white'};
    border-bottom: ${({ $isModal }) =>
      !$isModal && `2px solid ${COLORS.LIGHTGRAY}`};
  }

  th {
    &:last-child {
      padding-right: 0.5rem;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Population = styled.span`
  font-family: Source Code Pro;
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY.DARK};
  font-family: Source Code Pro;
  margin-right: 0.75rem;
  margin-right: 0.5rem;
`;

export const Rank = styled.span`
  color: ${COLOR_MAP.GRAY.DARK};
  font-family: Source Code Pro;
  margin-right: 0.75rem;
`;

export const LocationCellWrapper = styled.div`
  display: flex;
  min-width: 0;
`;

export const LocationRankWrapper = styled.div`
  flex: 0 0 auto;
`;

export const LocationNameWrapper = styled.div`
  flex: 1 1 auto;
  white-space: normal;
  text-overflow: initial;
`;

export const LocationInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SharedCellStyles = css`
  text-align: left;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  cursor: pointer;

  svg {
    margin-right: 0.4rem;
    font-size: 0.75rem;
  }
`;

export const LocationNameCell = styled.td<{
  $iconColor?: Level;
  sortByPopulation: boolean;
}>`
  ${SharedCellStyles}
  width: ${locationNameCellWidthPercent}%;
  min-width: ${locationNameCellWidth}px;
  background-color: ${({ sortByPopulation }) =>
    sortByPopulation && 'rgba(0,0,0,0.02)'};
  font-weight: 500;
  line-height: 1.2;

  svg {
    color: ${({ $iconColor }) =>
      $iconColor !== undefined && `${LEVEL_COLOR[$iconColor]}`};
  }

  div {
    display: inline-block;

    &:first-child {
      vertical-align: top;
    }
  }

  ${LocationCellWrapper} {
    display: flex;
  }
`;

export const DataCellValue = styled.span<{
  $valueUnknown: boolean;
  $textAlign: string;
  $fontSize: string;
}>`
  min-width: 48px;
  display: inline-block;
  text-align: ${({ $textAlign }) => $textAlign};
  font-size: ${({ $fontSize }) => $fontSize};
  opacity: ${({ $valueUnknown }) => $valueUnknown && '.5'};
  font-family: Source Code Pro;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

export const VaccinationsCell = styled.div`
  display: flex;
  min-width: 110px;
`;

export const VaccinationsCellValue = styled.div`
  font-size: 16px;
  font-family: Source Code Pro;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  margin-right: 0.5rem;
  text-transform: capitalize;
`;

export const VaccinationsCellProgressBar = styled.div`
  display: flex;
  width: 100%;
  margin: auto 0.25rem;
  padding-right: 20px;
`;

export const DataCell = styled.td<{
  $isSelected: boolean;
  $desiredWidthPercent: number;
  $minWidthPx: number;
}>`
  ${SharedCellStyles}
  width: ${props => props.$desiredWidthPercent}%;
  min-width: ${props => props.$minWidthPx}px;
  padding-right: 0;
  color: ${({ $isSelected }) =>
    $isSelected ? 'black' : `${COLOR_MAP.GRAY_BODY_COPY}`};
  font-weight: ${({ $isSelected }) => $isSelected && '600'};
  background-color: ${({ $isSelected }) => $isSelected && 'rgba(0,0,0,0.02)'};
`;

export const Tag = styled.div`
  border-radius: 5px;
  font-size: 0.875rem;
  padding: 0.2rem 0.35rem;
  font-weight: bold;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  background: ${COLORS.LIGHTGRAY};
`;

export const Row = styled(TableRow)<{
  index?: number;
  $isCurrentCounty?: boolean;
  $isModal?: boolean;
  $headerRowBackground?: string;
}>`
  background-color: ${({ index, $headerRowBackground }) =>
    !isNumber(index)
      ? `${$headerRowBackground}`
      : (index ?? 0) % 2 === 0
      ? `${COLOR_MAP.LIGHTGRAY_BG}`
      : 'white'};
  background-color: ${({ $isModal }) =>
    $isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
  background-color: ${({ $isCurrentCounty }) => $isCurrentCounty && '#FFEFD6'};
  border-bottom: none;

  th {
    border-bottom: none;
  }

  &:hover {
    color: ${({ $headerRowBackground }) =>
      !$headerRowBackground && `${COLOR_MAP.NEW_BLUE.BASE}`};
    ${DataCell} {
      span,
      ${Tag} {
        color: ${COLOR_MAP.NEW_BLUE.BASE};
      }
    }
    ${LocationName} {
      color: ${COLOR_MAP.NEW_BLUE.BASE};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  padding-top: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
  justify-content: space-between;

  div {
    &:first-child {
      display: flex;
      flex-direction: column;
    }
  }

  @media (min-width: 600px) {
    div {
      &:first-child {
        flex-direction: row;
      }
    }
  }
`;

export const FooterText = styled.p`
  line-height: 0.25;
  margin-right: 1rem;
`;

export const FooterLinkStyles = css`
  font-family: Roboto;
  color: ${COLOR_MAP.BLUE};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: fit-content;
  font-size: 14px;
`;

export const FooterLink = styled.div`
  ${FooterLinkStyles}
`;

export const ModalHeader = styled.div<{ isHomepage?: boolean }>`
  background-color: ${COLOR_MAP.GRAY_BODY_COPY};
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 1.25rem;
  align-items: center;
  max-width: ${({ isHomepage }) => (isHomepage ? '1000px' : '900px')};
  width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    margin: 1rem auto 0;
  }

  svg {
    color: white;
    cursor: pointer;
    font-size: 1.75rem;
    margin-bottom: auto;
  }
`;

export const DivForRef = styled.div``;

export const StateName = styled.div`
  font-size: 0.9rem;
  line-height: 1.2;
`;

export const HeaderContainer = styled.div<{ $isHomepage?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-direction: ${({ $isHomepage }) => ($isHomepage ? 'column' : 'row')};
  align-items: ${({ $isHomepage }) => ($isHomepage ? 'center' : 'unset')};

  .MuiToggleButtonGroup-root {
    margin-top: 0.5rem;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    justify-content: flex-start;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 375px) {
    .MuiToggleButtonGroup-root {
      margin: 0;
    }
  }
`;

export const CompareHeader = styled(SectionHeader)<{ $isHomepage?: boolean }>`
  line-height: 1.5;
  margin: ${({ $isHomepage }) => ($isHomepage ? '0 0 .75rem' : '0')};
  font-size: ${({ $isHomepage }) => ($isHomepage ? '1.625rem' : '1.5rem')};

  @media (min-width: ${materialSMBreakpoint}) {
    margin: ${({ $isHomepage }) =>
      $isHomepage ? '0 0 .75rem' : '0 2.5rem 0 0'};
    font-size: ${({ $isHomepage }) => ($isHomepage ? '2.25rem' : '1.5rem')};
  }
`;

export const OutOfDateCallout = styled.div`
  ${props => props.theme.fonts.regularBook};
  font-size: 0.875rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
`;

export const NumberOfLocationsText = styled.span`
  ${props => props.theme.fonts.regularBook};
  color: ${COLOR_MAP.GREY_4};
`;
