import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export const ContentWrapper = styled.div`
  > h4,
  > p {
    margin-bottom: 1.5rem;
  }

  > ul li p {
    margin-bottom: 1rem;
  }
`;

export const SidebarWrapper = styled.div`
  flex-shrink: 0;
  margin-left: 4.5rem;
  margin-top: 1rem;
  position: relative;
  width: 11rem;

  @media (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Sidebar = styled.div<{
  stapledTop: boolean;
  stapledBottom: boolean;
  offset: Number;
}>`
  padding: 2rem 0 0;
  position: ${({ stapledTop, stapledBottom }) =>
    stapledTop ? 'fixed' : stapledBottom ? 'absolute' : 'relative'};
  top: ${({ stapledTop, offset }) => (stapledTop ? offset + 'px' : 'auto')};
  bottom: ${({ stapledBottom }) => (stapledBottom ? '0' : 'auto')};

  @media (max-width: 900px) {
    bottom: auto;
    position: relative;
    top: auto;
  }
`;

export const StyledSidebarLink = styled.a`
  margin-bottom: 0.5rem;
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
`;

const NAV_HEIGHT = 65;
const OUTER_PADDING = 16;
const INNER_PADDING = 40;
export const SectionHeader = styled(Typography)<{
  variant: String;
  component: String;
}>`
  padding-top: ${NAV_HEIGHT + INNER_PADDING - 1}px;
  margin-top: -${NAV_HEIGHT - OUTER_PADDING}px;

  &:before {
    display: block;
    width: 100%;
    content: ' ';
    transform: translateY(-${INNER_PADDING}px);
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  &:first-child:before {
    display: none;
  }
`;

// .pillars-wrapper {
//   flex-direction: column;

//   .pillars-cta {
//     margin-bottom: 1.5rem;
//     margin-right: 0;
//     width: 100%;
//   }

//   .pillar {
//     margin-bottom: 3rem;
//   }
// }
