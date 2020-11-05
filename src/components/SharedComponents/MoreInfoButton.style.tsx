import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import MuiButton from '@material-ui/core/Button';

export const MoreInfo = styled(MuiButton)`
  color: ${COLOR_MAP.BLUE};
  height: fit-content;
  border-radius: 4px;
  padding: 0.35rem 0.75rem;
  border: 1px solid #f2f2f2;
  text-transform: none;
  line-height: 1;
  letter-spacing: 0;

  &:hover {
    background-color: ${COLOR_MAP.LIGHTGRAY_BG};
  }

  svg {
    font-size: 1.25rem;
    margin-right: 0.4rem;
  }

  span {
    margin: 0;
  }
`;
