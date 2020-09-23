import styled from 'styled-components';
import { COLORS } from 'common';
import { TeamList } from 'screens/About/About';
import { COLOR_MAP } from 'common/colors';
import ReactMarkdown from 'react-markdown';

export const Wrapper = styled.div`
  background-color: white;
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem 0 3rem;

  @media (max-width: 932px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  background-color: ${COLORS.LIGHTGRAY};
`;

export const TextContent = styled.div`
  max-width: 600px;
`;

export const ActiveAlumniButtonContainer = styled.div`
  display: flex;
  width: 180px;
  border: 1px solid #e0e0e0;
  margin-bottom: 2rem;
  border-radius: 4px;
  font-size: 15px;
`;

export const ActiveAlumniButton = styled.div<{
  teamList?: TeamList;
}>`
  width: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  padding: 0.1rem;
  color: #828282;
  line-height: 1;
  padding: 14px 0 12px;

  &:first-child {
    border-right: 1px solid #e0e0e0;
    border-bottom: ${({ teamList }) =>
      teamList === TeamList.Active && `2px solid ${COLOR_MAP.GREEN.BASE}`};
    border-bottom-left-radius: ${({ teamList }) =>
      teamList === TeamList.Active && `3px`};
    color: ${({ teamList }) => teamList === TeamList.Active && `black`};
    font-weight: ${({ teamList }) => teamList === TeamList.Active && `bold`};
  }

  &:last-child {
    border-bottom: ${({ teamList }) =>
      teamList === TeamList.Alumni && `2px solid ${COLOR_MAP.GREEN.BASE}`};
    border-bottom-right-radius: ${({ teamList }) =>
      teamList === TeamList.Alumni && `3px`};
    color: ${({ teamList }) => teamList === TeamList.Alumni && `black`};
    font-weight: ${({ teamList }) => teamList === TeamList.Alumni && `bold`};
  }
`;

/**
 * For CMS content
 * Rich-text styles for blocks of markdown:
 */

export const BodyCopy = styled(ReactMarkdown)`
  a {
    color: ${COLOR_MAP.BLUE};
  }
`;
