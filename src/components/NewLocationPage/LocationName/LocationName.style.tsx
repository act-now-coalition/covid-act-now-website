import styled from 'styled-components';
import { materialSMBreakpoint } from 'assets/theme/sizes';
import { COLOR_MAP } from 'common/colors';

export const RegionNameContainer = styled.div`
  text-align: center;
  @media (min-width: ${materialSMBreakpoint}) {
    text-align: left;
  }
`;

export const RegionNameText = styled.h1`
  ${props => props.theme.fonts.regularBook};
  font-size: 2rem;
  line-height: 1.3;
  margin: 0 0 0.25rem;
`;

export const UpdatedOnText = styled.span`
  color: ${COLOR_MAP.GREY_4};
  font-size: 0.9rem;
`;
