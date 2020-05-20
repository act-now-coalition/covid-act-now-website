import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import palette from 'assets/theme/palette';
import { StyledShareButtonStyles } from '../ShareBlock/ShareBlock.style';
import { COLOR_MAP } from 'common/colors';

export const CopyLinkButton = styled(Typography)`
  font-size: 0.7rem;
  line-height: 1.3;
  text-transform: none;
  margin: auto;
  color: rgba(0, 0, 0, 0.7);
`;

export const ChartShareButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${palette.white};
  border-radius: 4px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  max-width: 15rem;
  //   margin: 1.5rem auto 0;
  position: relative;

  @media (min-width: 600px) {
    // margin: 1.5rem 0 0.75rem;
    margin-left: auto;
    // position: static;
    position: relative;
    top: 119px;
  }
`;

export const ChartShareButton = styled.div`
  ${StyledShareButtonStyles}
  border-right: ${({ isLast }) =>
    isLast ? 'none' : `1px solid ${COLOR_MAP.GRAY.LIGHT}`};
  display: ${({ isLast }) => (isLast ? 'flex' : 'block')};
`;

// border-left: ${({isFirst}) => isFirst ? '2px solid red' : '2px solid yellow'};
