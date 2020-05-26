import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import palette from 'assets/theme/palette';

export const CriteriaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 -0.5rem;

  @media (min-width: 600px) {
    margin: 0 -1rem;
    flex-wrap: nowrap;
  }
`;

export const Wrapper = styled.div`
  margin: 0 1rem;
  padding: 1rem 0;
  max-width: 900px;
  border-bottom: 1px solid ${palette.lightGray};

  @media (min-width: 600px) {
    padding-top: 3rem;
    margin-top: 0;
  }

  @media (min-width: 932px) {
    margin: 0 auto;
  }
`;

export const Criterion = styled.div`
  flex: 1 50%;
  padding: 0 0.5rem 0.5rem;
  border-right: 1px solid ${palette.lightGray};

  &:last-child {
    border-right: 0;
  }

  @media (min-width: 600px) {
    flex: 1;
    flex-direction: row;
    padding: 0 1rem 1rem;
    margin-right: 2rem;
    border-right: 0;

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

  @media screen and (max-width: 599px) {
    display: none;
  }
`;

export const CriterionDescription = styled(Typography)`
  font-size: 0.75rem;
  line-height: 1.125rem;
  font-weight: 500;

  @media (min-width: 600px) {
    font-weight: 400;
    font-size: 0.875rem;
  }
`;
