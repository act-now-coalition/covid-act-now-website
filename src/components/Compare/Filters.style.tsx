import styled from 'styled-components';
import { Slider, Button, Popper } from '@material-ui/core';
import { COLOR_MAP } from 'common/colors';
import { GeoScopeFilter } from 'common/utils/compare';

const returnSliderLabelColor = (
  filter: GeoScopeFilter,
  $isModal: boolean,
  geoScope?: GeoScopeFilter,
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
  margin: ${({ $isModal }) => $isModal && '1rem auto 0'};
  padding: ${({ $isModal }) => ($isModal ? '0 0 0 1.75rem' : '0.75rem 0')};
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

  @media (min-width: 600px) {
    margin-left: ${({ $isModal }) => !$isModal && '2rem'};
  }
`;

export const GeoSlider = styled(Slider)<{
  $isModal: boolean;
  geoScope?: GeoScopeFilter;
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

export const DropdownContainer = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  width: 200px;
  border-radius: 0 0 4px 4px;
`;

export const MetroMenuButton = styled(Button)<{
  $isOpen: boolean;
  $isStatePage?: boolean;
  disabled: boolean;
  $isModal: boolean;
  $isMobile: boolean;
}>`
  align-items: flex-start;
  text-transform: none;
  display: ${({ disabled, $isMobile }) =>
    disabled && $isMobile ? 'none' : 'block'};
  border: ${({ disabled, $isModal }) =>
    disabled && $isModal
      ? `1px solid ${COLOR_MAP.GRAY.DARK}`
      : '1px solid #e0e0e0'};
  width: 200px;
  border-radius: ${({ $isOpen }) => ($isOpen ? '4px 4px 0 0' : '4px')};
  font-family: Roboto;
  margin: ${({ $isStatePage }) => !$isStatePage && '.75rem 0'};
  padding: 0.375rem 0.75rem;

  &:hover {
    background-color: unset;
  }

  span {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    justify-content: space-between;
    color: ${({ disabled, $isModal }) =>
      disabled && $isModal && `${COLOR_MAP.GRAY.DARK}`};

    &:first-child {
      color: ${({ disabled, $isModal }) =>
        !disabled && !$isModal && `${COLOR_MAP.GRAY_BODY_COPY}`};
      color: ${({ disabled, $isModal }) => !disabled && $isModal && 'white'};
      font-size: 0.8rem;
      font-weight: normal;
    }

    &:nth-child(2) {
      color: ${({ disabled, $isModal }) => !disabled && $isModal && 'white'};
      color: ${({ disabled, $isModal }) => !disabled && !$isModal && 'black'};
      font-weight: 500;
      font-size: 0.95rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  ul {
    width: 200px;
  }

  svg {
    margin: auto 0 auto 0.2rem;
    transform: translatex(0.2rem);
    color: ${({ disabled, $isModal }) =>
      disabled && $isModal && `${COLOR_MAP.GRAY.DARK}`};
  }

  @media (min-width: 600px) {
    margin: ${({ $isStatePage }) => !$isStatePage && '0 0 0 3.75rem'};
  }
`;

export const MetroMenuPopper = styled(Popper)`
  z-index: 10;
`;
