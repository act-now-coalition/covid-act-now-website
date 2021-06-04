import styled from 'styled-components';
import { Paragraph } from 'components/Markdown';
import Grid from '@material-ui/core/Grid';
import { COLOR_MAP } from 'common/colors';

export const Headshot = styled.img`
  border-radius: 50%;
  width: 4rem;
  max-height: 4rem;
  margin-right: 1.5rem;
  height: fit-content;
`;

export const TeamMemberWrapper = styled(Grid)`
  display: flex;

  a {
    color: black;
    text-decoration: none;
    height: fit-content;
    margin: 0;
    &:hover {
      color: ${COLOR_MAP.BLUE};
    }
  }
`;

export const DescriptionWrapper = styled.div`
  ${Paragraph} {
    margin-bottom: 0;
  }
`;

export const AlumniWrapper = styled.span`
  a {
    color: black;
    text-decoration: none;
    height: fit-content;
    margin: 0;
    &:hover {
      color: ${COLOR_MAP.BLUE};
    }
  }

  &:not(:last-of-type):after {
    content: ', ';
  }
`;

export const AlumniName = styled.span`
  margin: 0;
  line-height: 1.3;
`;
