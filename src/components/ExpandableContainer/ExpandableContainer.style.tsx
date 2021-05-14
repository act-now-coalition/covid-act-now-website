import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { LargeOutlinedButton } from 'components/ButtonSystem';

export const Container = styled.div``;

export const ExpandButton = styled(LargeOutlinedButton)<{
  collapsed: boolean;
}>`
  width: 100%;
  border-radius: 0 0 4px 4px;
  border: 1px solid ${COLOR_MAP.GREY_2};
  box-shadow: ${({ collapsed }) =>
    collapsed ? '0 -5px 8px -5px rgba(0, 0, 0, 0.12)' : 'none'};

  &:hover {
    border: 1px solid ${COLOR_MAP.GREY_2};
  }
`;

export const InnerContent = styled.div<{
  collapsedHeight: number;
  collapsed: boolean;
}>`
  height: ${({ collapsed, collapsedHeight }) =>
    collapsed ? `${collapsedHeight}px` : 'fit-content'};
  overflow: hidden;
  border: 1px solid ${COLOR_MAP.GREY_2};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
`;
