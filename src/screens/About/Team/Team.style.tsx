import styled from 'styled-components';
import { Paragraph } from 'components/Markdown';
import Grid from '@material-ui/core/Grid';
import { COLOR_MAP } from 'common/colors';

export const Headshot = styled.img`
  border-radius: 50%;
  max-width: 4rem;
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
    margin: auto 0;
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

export const AlumniName = styled.p`
  margin: 0;
  line-height: 1.3;
`;
