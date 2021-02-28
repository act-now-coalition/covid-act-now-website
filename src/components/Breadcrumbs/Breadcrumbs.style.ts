import styled from 'styled-components';
import { Link } from 'common/utils/router';
import { COLOR_MAP } from 'common/colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const BreadcrumbLink = styled(Link)`
  color: ${COLOR_MAP.BLUE};
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  a {
    display: block;
  }
`;

export const ArrowBackIcon = styled(ArrowBackIosIcon)`
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  display: block;
  width: 16px;
  height: 16px;
`;
