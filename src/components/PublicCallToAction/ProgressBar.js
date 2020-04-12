import * as React from 'react';
import { range } from 'lodash';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const ProgressBar = ({
  description,
  entity,
  entityPlural,
  verb,
  total,
  current,
}) => {
  const plural = entityPlural || entity + 's';
  const entityCopy = current === 1 ? entity : plural;
  return (
    <Container>
      <ProgressBarContainer>
        {range(Math.floor(current / 2)).map(_ => (
          <ProgressBarBit total={total} />
        ))}
      </ProgressBarContainer>
      <CopyContainer>
        <Description>{description}</Description>
        <Completed>
          {current} {entityCopy} {verb}
        </Completed>
      </CopyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const CopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
`;

const Description = styled(Typography)`
  font-weight: 800;
  font-size: 0.7rem;
  @media only screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Completed = styled(Typography)`
  color: #848484;
  font-size: 0.6rem;
  text-align: right;
  @media only screen and (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 10px;
  padding: 1px;
  margin: 0.2rem 0;
  border-radius: 1px;
  border: 1px solid #f2f2f2;
  background-color: white;

  @media only screen and (min-width: 768px) {
    margin: 0.5rem 0;
    min-width: 450px;
  }
`;

const ProgressBarBit = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: calc(100% / ${props => Math.floor(props.total / 2)});
  background-color: #31e8bc;
  border-right: 1px solid white;
  border-left: 1px solid white;
  padding: 1px 2px;
`;

export default ProgressBar;
