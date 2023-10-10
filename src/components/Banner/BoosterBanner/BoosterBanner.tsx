import React from 'react';
import {
  Container,
  Header,
  // SubHeader,
  ButtonsContainer,
} from './BoosterBanner.style';
import vaccine_icon from '../../../assets/images/VaccineIcon.svg';
import { Box } from '@material-ui/core';
import BoosterButton from './BoosterButton';
// import HomeTestButton from './HomeTestButton';
// import ExternalLink from 'components/ExternalLink';
import { useBreakpoint } from 'common/hooks';

const VaccineIcon = ({ height }: { height?: number }) => (
  <Box mx="auto" mb={1.8}>
    <img src={vaccine_icon} height={height || 40} alt="Vaccine Icon" />
  </Box>
);

const Buttons: React.FC = () => {
  return (
    <ButtonsContainer>
      <BoosterButton />
      {/* <HomeTestButton /> */}
    </ButtonsContainer>
  );
};

const BoosterBanner: React.FC = () => {
  const isMobile = useBreakpoint(600);
  const headerCopy = 'New boosters are available for Fall\u00A02023!';
  return (
    <Container>
      {isMobile ? (
        <Box display="flex" alignItems="center">
          <Header>{headerCopy}</Header>
          <VaccineIcon />
        </Box>
      ) : (
        <>
          <VaccineIcon />
          <Header>{headerCopy}</Header>
        </>
      )}
      {/* <SubHeader>
        Source:&nbsp;
        <ExternalLink style={{ color: 'inherit' }} href="https://www.cdc.gov/">
          CDC
        </ExternalLink>
      </SubHeader> */}
      <Buttons />
    </Container>
  );
};

export default BoosterBanner;
