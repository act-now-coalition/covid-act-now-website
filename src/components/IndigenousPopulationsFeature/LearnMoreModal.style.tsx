import styled from 'styled-components';
import { COLOR_MAP } from 'common/colors';
import { Typography } from '@material-ui/core';

export const Header = styled(Typography)`
  font-size: 1.35rem;
  font-weight: bold;
  line-height: 1.15;
  margin-bottom: 0.75rem;
`;

export const BodyCopy = styled(Typography)`
  font-size: 1rem;
  line-height: 1.4;
  color: ${COLOR_MAP.GRAY_BODY_COPY};

  ul {
    padding-left: 1rem;
  }

  li {
    color: ${COLOR_MAP.BLUE};
    cursor: pointer;

    ::marker {
      color: ${COLOR_MAP.GRAY_BODY_COPY};
    }
  }

  a {
    text-decoration: none;
  }
`;
