import styled, { css } from 'styled-components';
import palette from 'assets/theme/palette';
import Typography from '@material-ui/core/Typography';

export const Wrapper = styled.div<{
  noShadow?: Boolean;
  border?: Boolean;
}>`
  box-shadow: ${props =>
    props.border ? 'none' : '0px 12px 40px rgba(0, 0, 0, 0.2)'};
  border: ${props => (props.border ? `2px solid ${palette.divider}` : 'none')};
  border-radius: 4px;
  color: black;
  background-color: ${palette.white};
  width: 100%;
  min-height: 10rem;
  overflow: hidden;
  pointer-events: none;
`;

export const PreviewHeaderStyles = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PreviewHeader = styled.div`
  ${PreviewHeaderStyles}
`;

export const USMapPreviewHeader = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 230px;
`;

export const PreviewBody = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
`;

export const PreviewFooterStyles = css`
  background-color: #fbfbfb;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PreviewFooter = styled.div`
  ${PreviewFooterStyles}
`;

export const FooterText = styled(Typography)`
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
`;

export const HeaderText = styled.div`
  flex: 1;
`;

export const USMapHeaderText = styled.div`
  width: 100%;
`;

export const AlarmLevel = styled.div`
  background-color: ${(props: any) => props.color || 'darkgray'};
  color: white;

  border-radius: 4px;
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.5rem;
  padding: 0.25rem 0.5rem;
`;

export const HeaderHeader = styled(Typography)`
  font-size: 1.125rem;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const MapHeaderHeader = styled(Typography)`
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const HeaderSubhead = styled(Typography)`
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  line-height: 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
`;
