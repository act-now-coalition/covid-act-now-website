import styled from 'styled-components';

export const RiskMapTooltip = styled.div`
  ${props => props.theme.fonts.regularBookBold};
  background-color: white;
  border-radius: 4px;
  color: black;
  filter: drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.16));
  font-size: 16px;
  padding: 5px;
`;
