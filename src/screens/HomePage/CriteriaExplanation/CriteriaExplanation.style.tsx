import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import palette from 'assets/theme/palette';

export const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  margin: 4.5rem 1rem 0;
  padding: 1rem 0 0;
  max-width: 900px;
  border-top: 1px solid ${palette.lightGray};

  @media (min-width: 600px) {
    padding-top: 3rem;
  }

  @media (min-width: 932px) {
    margin: 4.5rem auto 0;
  }
`;

export const Criterion = styled.div`
  flex: 1;
  margin-bottom: 1rem;
  padding: 0 0 1rem;
  border-bottom: 1px solid ${palette.lightGray};

  @media (min-width: 600px) {
    flex-direction: row;
    margin-right: 2rem;
    border-bottom: 0;
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Kicker = styled(Typography)`
  font-size: 0.875rem;
  color: ${palette.secondary.main};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const CriterionHeader = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.75rem;
  margin-bottom: 0.75rem;
`;

export const CriterionDescription = styled(Typography)`
  font-size: 0.875rem;
`;
