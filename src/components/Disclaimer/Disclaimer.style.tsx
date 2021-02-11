import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import palette from 'assets/theme/palette';
import { COLOR_MAP } from 'common/colors';

export const DisclaimerWrapper = styled.div`
  max-width: 600px;
  margin: 0.5rem 0 1.5rem;
  padding: 1rem;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;

  @media (max-width: 900px) {
    margin: 0 1rem 1.5rem;
  }
`;

export const DisclaimerSpan = styled.span<{ isOpen?: boolean }>`
  text-decoration: ${({ isOpen }) => !isOpen && 'underline'};
  cursor: pointer;
  color: ${COLOR_MAP.GRAY_BODY_COPY};
  font-size: 0.875rem;
`;

// export const DisclaimerWrapper = styled.div`
//   background: #fbfbfb;
//   max-width: 600px;
//   padding: 1.5rem;
//   border-radius: 4px;
//   margin: 0.5rem 0 1.5rem;
//   padding: 1rem;
//   flex: 1;

//   @media (max-width: 900px) {
//     margin: 0 1rem 1.5rem;
//   }
// `;

// export const DisclaimerHeader = styled(Typography)`
//   margin-top: 0;
//   margin-bottom: 1rem;
//   font-size: 1rem;
//   font-weight: 700;
//   line-height: 1.6rem;
//   color: ${palette.black};
// `;

// export const DisclaimerBody = styled(Typography)`
//   font-size: 0.875rem;
//   color: rgba(0, 0, 0, 0.7);
// `;
