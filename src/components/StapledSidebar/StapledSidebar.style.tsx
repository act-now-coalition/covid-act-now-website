import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div``;

export const SidebarWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 3rem;
  position: relative;
  width: 15rem;
`;

export const Sidebar = styled.div<{
  stapledTop: boolean;
  stapledBottom: boolean;
  offset: Number;
}>`
  padding: 2rem 0 0 3rem;
  position: ${({ stapledTop, stapledBottom }) =>
    stapledTop ? 'fixed' : stapledBottom ? 'absolute' : 'relative'};
  top: ${({ stapledTop, offset }) => (stapledTop ? offset + 'px' : 'auto')};
  bottom: ${({ stapledBottom }) => (stapledBottom ? '0' : 'auto')};

  @media (max-width: 600px) {
    position: relative;
    top: auto;
  }
`;

export const SidebarLink = styled.a`
  margin-bottom: 0.5rem;
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
`;

export const SectionHeader = styled(Typography)<{
  variant: String;
  component: String;
}>`
  padding-top: 80px;
  margin-top: -40px;
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
