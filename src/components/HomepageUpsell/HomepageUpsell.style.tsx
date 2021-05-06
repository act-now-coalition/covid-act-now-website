import styled from 'styled-components';
import BaseButton from 'components/ButtonSystem/BaseButton/BaseButton';
import { Chevron } from 'components/NewLocationPage/Shared/Shared.style';
import { COLOR_MAP } from 'common/colors';

export const StyledButton = styled(BaseButton)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  text-transform: none;
  padding: 1rem 1.25rem;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 0;
  z-index: 1;
  display: flex;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    background-color: white;
    ${Chevron} {
      transform: translate(6px, 5.5px);
      transition: transform 0.06s ease-in-out;
    }
  }
`;

export const BodyText = styled.p`
  ${props => props.theme.fonts.regularBook};
  color: ${COLOR_MAP.GREY_4};
  margin: 0.7rem 0 0;
  line-height: 1.4;
`;

export const MapWrapper = styled.div`
  max-width: 100px;
  width: 100%;
  pointer-events: none;
  margin-right: 1rem;
`;

export const TextContainer = styled.div`
  font-size: 1rem;
`;
