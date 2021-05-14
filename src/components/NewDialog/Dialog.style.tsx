import styled from 'styled-components';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { LargeOutlinedButton } from 'components/ButtonSystem';
import { materialSMBreakpoint } from 'assets/theme/sizes';

// Some extra styling on the Paper component to override MUI's default styles
export const StyledPaper = styled(Paper)`
  max-height: 100%;
  height: 100%;
  margin: 0;
  width: 100%;
  border-radius: 0;

  @media (min-width: ${materialSMBreakpoint}) {
    max-height: calc(100% - 64px);
    margin: 2rem;
    width: unset;
    height: unset;
    border-radius: 4px;
  }
`;

export const HeaderWrapper = styled.div`
  margin: 0;
  padding: 1.75rem 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.h2`
  margin: 0;
  ${props => props.theme.fonts.regularBookBold};
  font-size: 1.25rem;
`;

export const DialogContent = styled(MuiDialogContent)`
  padding: 0 1.5rem 1.5rem;

  ${LargeOutlinedButton} {
    width: 100%;
    display: flex;
    align-self: center;
    white-space: nowrap;
  }

  @media (min-width: ${materialSMBreakpoint}) {
    ${LargeOutlinedButton} {
      max-width: 250px;
      margin: auto;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  margin-left: 0.75rem;
`;
