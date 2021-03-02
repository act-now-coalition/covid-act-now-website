import styled, { css } from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';

export const SummaryStatsWrapper = styled(Box)<{
  $condensed?: boolean;
  $isHeader?: boolean;
}>`
  ${props =>
    props.$condensed
      ? `
    display: block;
  `
      : `
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    background-color: ${props.$isHeader ? 'none' : 'white'};
    border-radius: 0;
    box-shadow: none;
    max-width: 1040px;
    flex-direction: column;
    cursor: pointer;
    margin: 1rem 0;

    @media (min-width: 600px) {
      flex-direction: row;
      position: relative;
      margin: 0 1rem;
    }
  `}
`;

export const SummaryStatWrapper = styled(Box)<{
  $condensed?: boolean;
  $isEmbed?: boolean;
  $isHeader?: boolean;
}>`
  ${props =>
    props.$condensed
      ? `
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: ${props.$isEmbed && '14px 12px'};
    margin-bottom:  ${!props.$isEmbed && '0.75rem'};

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #fbfbfb;

      ${StatNameText} {
        color: #00bfea;
        text-decoration: underline;
      }
    }
  `
      : `
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: ${props.$isHeader ? '1rem 1.25rem' : '1.85rem 1rem'};
    align-items: stretch;
    border-bottom: ${!props.$isHeader && `1px solid ${palette.lightGray}`};

    @media (min-width: 600px) {
      border-bottom: ${!props.$isHeader && `1px solid ${palette.lightGray}`};
      margin: 0;
      flex-direction: column;
      align-items: center;
      max-width: 20%;
      padding: ${props.$isHeader ? '2rem 1rem' : '1.5rem 1.25rem'};
      align-items: ${props.$isHeader ? 'center' : 'unset'};

      &:not(:last-child) {
        border-right: ${
          props.$isHeader ? 'none' : `1px solid ${palette.divider}`
        };
      }
    }
  `}
`;

export const StatNameText = styled(Typography)<{
  $condensed?: boolean;
  $isEmbed?: boolean;
  $isHeader?: boolean;
  $statusUnknown?: boolean;
}>`
  ${props =>
    props.$condensed
      ? `
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.875rem;
    letter-spacing: ${props.$isEmbed ? '0.04em' : '0.06em'};
    text-transform: uppercase;
    text-align: left;
    color: rgba(0, 0, 0, 0.7);
    margin-right: ${props.$isEmbed ? '.75rem' : '1rem'};
  `
      : `
    font-weight: 600;
    line-height: 1.25rem;

    text-transform: uppercase;
    font-size: 14px;
    line-height: ${props.$isHeader ? '1' : '1.4'};

    @media (min-width: 600px) {
      min-height: 0;
      font-size: 1rem;
      margin-bottom: ${
        !props.$isHeader ? 0 : props.$statusUnknown ? '16px' : '9px'
      }
    }
  `}
`;

export const StatTextWrapper = styled.div<{
  $isHeader?: boolean;
  $isEmbed?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $isHeader }) => ($isHeader ? 'column' : 'row')};
  justify-content: flex-start;
  text-align: left;
  flex: 1;
  margin-right: ${({ $isEmbed }) => ($isEmbed ? '.75rem' : '1.5rem')};

  @media (min-width: 600px) {
    text-align: ${({ $isHeader }) => ($isHeader ? 'left' : 'center')};
    margin-right: 0;
  }
`;

export const StatValueWrapper = styled.div<{ $condensed?: boolean }>`
  ${props =>
    props.$condensed
      ? `
    display: flex;
    align-items: center;
  `
      : `
    display: flex;
    flex-direction: column;
    text-align: right;
    align-items: flex-end;
    justify-content: center;

    @media (min-width: 600px) {
      align-items: center;
      text-align: left;
    }
  `}
`;

export const StatDetailText = styled(Typography)`
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0.35rem;
  font-family: 'Source Code Pro';
  font-size: 12px;
  line-height: 1.4;

  @media (min-width: 600px) {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    line-height: 1.125rem;
  }
`;

export const StatValueText = styled(Typography)<{
  $condensed?: boolean;
  $statusUnknown?: boolean;
  $isEmbed?: boolean;
  $isHeader?: boolean;
}>`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-weight: 700;

  ${props =>
    props.$condensed
      ? `
    font-size: ${props.$isEmbed ? '17px' : '1rem'};
    line-height: 1rem;
    text-align: right;
  `
      : `
    font-size: ${props.$isHeader ? '1.4rem' : '1.5rem'};
    font-size: ${
      !props.$isHeader ? '1.5rem' : props.$statusUnknown ? '.95rem' : '1.4rem'
    };
    line-height: 1.125rem;
    margin-bottom: ${props.$isHeader ? '0' : '0.35rem'};


    @media (min-width: 600px) {
      text-align: left;
      font-size: ${
        !props.$isHeader
          ? '1.875rem'
          : props.$statusUnknown
          ? '.9rem'
          : '1.55rem'
      };
      line-height: ${props.$isHeader ? '1.4' : '3.5rem'};
      margin-bottom: ${props.$isHeader ? '0' : '0.5rem'};
      display: flex;
      flex-direction: column;
    }

    @media (min-width: 932px) {
      font-size: ${props.$statusUnknown ? '1rem' : '1.875rem'};
    }
  `}
`;

const SharedTagStyles = css`
  border-radius: 5px;
  display: inline-block;
  font-size: 11px;
  padding: 3px 6px;
  line-height: 14px;
  width: fit-content;
  font-family: Source Code Pro;
  font-weight: bold;
`;

export const BetaTag = styled.span<{ $isHeader?: boolean }>`
  ${SharedTagStyles};
  margin-left: ${({ $isHeader }) => ($isHeader ? 0 : '1rem')};
  background-color: ${({ $isHeader }) =>
    $isHeader ? 'none' : `${palette.info.main}`};
  border: ${({ $isHeader }) =>
    $isHeader && `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  color: ${({ $isHeader }) =>
    $isHeader ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'white'};
  transform: ${({ $isHeader }) =>
    $isHeader ? 'none' : 'translateY(-0.15rem)'};
  margin-top: ${({ $isHeader }) => ($isHeader ? '.5rem' : 'none')};

  @media (min-width: 600px) {
    transform: ${({ $isHeader }) =>
      $isHeader ? 'none' : 'translateY(-0.45rem)'};
    margin-top: ${({ $isHeader }) => ($isHeader ? '.75rem' : 'none')};
  }
`;

export const NewIndicatorTag = styled.span<{ $isHeader?: boolean }>`
  ${SharedTagStyles};
  margin-left: 0;
  background-color: ${COLOR_MAP.BLUE};
  color: white;
  margin-top: ${({ $isHeader }) => ($isHeader ? '.5rem' : 'none')};

  @media (min-width: 600px) {
    margin-top: ${({ $isHeader }) => ($isHeader ? '.75rem' : 'none')};
  }
`;

export const ValueWrapper = styled(Box)<{ $iconColor: string }>`
  display: flex;
  align-items: center;

  svg {
    font-size: 0.75rem;
    margin-right: 0.5rem;
    color: ${({ $iconColor }) => $iconColor};

    @media (min-width: 600px) {
      margin-right: 0.55rem;
      font-size: 1.15rem;
    }

    @media (min-width: 932px) {
      margin-right: 0.75rem;
    }
  }
`;

export const PrevalenceMeasure = styled(Typography)`
  font-family: Roboto;
  font-size: 12px;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  line-height: 1.1;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
`;
