import styled, { css } from 'styled-components';
import theme from 'assets/theme';
import { COLOR_MAP } from 'common/colors';

const barWidth = theme.spacing(2);
const barRadius = barWidth / 2;

export const ThermometerBox = styled.div`
  padding: ${theme.spacing(3)}px ${theme.spacing(2)}px;
  background-color: ${COLOR_MAP.LIGHTGRAY_BG};
`;

export const LevelContainer = styled.div`
  display: flex;
  height: 100%;
  min-height: 44px;
`;

const roundTop = css<{ $roundTop: boolean }>`
  border-top-left-radius: ${props => (props.$roundTop ? barRadius : 0)}px;
  border-top-right-radius: ${props => (props.$roundTop ? barRadius : 0)}px;
`;

const roundBottom = css<{ $roundBottom: boolean }>`
  border-bottom-left-radius: ${props => (props.$roundBottom ? barRadius : 0)}px;
  border-bottom-right-radius: ${props =>
    props.$roundBottom ? barRadius : 0}px;
`;

export const LevelColor = styled.div<{
  $color: string;
  $roundTop: boolean;
  $roundBottom: boolean;
}>`
  background-color: ${props => props.$color};
  ${roundTop};
  ${roundBottom};

  flex: 0 0 auto;
  width: ${barWidth}px;
  margin-right: ${theme.spacing(2)}px;
`;

export const LevelCopy = styled.div`
  flex: 1 1 auto;
  font-size: 0.875rem; // 14px
  line-height: 1.3;
  margin: auto 0;
  padding: ${theme.spacing(1) / 2}px 0;
`;

export const LevelTitle = styled.div`
  font-weight: ${theme.typography.fontWeightBold};
  color: black;
`;

export const LevelDescription = styled.div`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
`;

export const ThermometerWrapper = styled.div`
  margin: auto;
  width: fit-content;
`;
