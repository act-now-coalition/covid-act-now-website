import styled from 'styled-components';
import { Slider } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { GeoScopeFilter } from 'common/utils/compare';

const returnSliderLabelColor = (
  filter: GeoScopeFilter,
  $isModal: boolean,
  geoScope: GeoScopeFilter,
) => {
  if (!$isModal) {
    if (geoScope === filter) return 'black';
    return `${COLOR_MAP.GRAY_BODY_COPY}`;
  }
  return 'white';
};

export const Container = styled.div<{
  $isModal: boolean;
  $isHomepage?: boolean;
}>`
  display: flex;
  margin: ${({ $isModal }) => $isModal && '0 auto'};
  justify-content: ${({ $isHomepage, $isModal }) =>
    $isHomepage && $isModal && 'center'};
  flex-direction: column;
  align-items: ${({ $isModal }) => $isModal && 'center'};

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: unset;
    margin: ${({ $isModal }) => $isModal && '0 auto'};
  }
`;

export const SliderContainer = styled.div<{ $isModal: boolean }>`
  width: 200px;
  margin-left: ${({ $isModal }) => !$isModal && '1.75rem'};
`;

export const GeoSlider = styled(Slider)<{
  $isModal: boolean;
  geoScope: GeoScopeFilter;
}>`
  color: ${COLOR_MAP.BLUE};
  opacity: 1;

  span {
    &:nth-child(5) {
      color: ${props =>
        returnSliderLabelColor(
          GeoScopeFilter.NEARBY,
          props.$isModal,
          props.geoScope,
        )};
      font-weight: ${({ geoScope }) =>
        geoScope === GeoScopeFilter.NEARBY && 'bold'};
    }
    &:nth-child(7) {
      color: ${props =>
        returnSliderLabelColor(
          GeoScopeFilter.STATE,
          props.$isModal,
          props.geoScope,
        )};
      font-weight: ${({ geoScope }) =>
        geoScope === GeoScopeFilter.STATE && 'bold'};
    }
    &:nth-child(9) {
      color: ${props =>
        returnSliderLabelColor(
          GeoScopeFilter.COUNTRY,
          props.$isModal,
          props.geoScope,
        )};
      font-weight: ${({ geoScope }) =>
        geoScope === GeoScopeFilter.COUNTRY && 'bold'};
    }
  }
`;
