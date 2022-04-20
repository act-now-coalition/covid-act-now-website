import React, { Fragment, useState } from 'react';
import loveLetter from '@iconify/icons-twemoji/love-letter';
import { Icon } from '@iconify/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { NavBarSearch } from 'components/NavBar';
import { NavAllOtherPages } from 'components/NavBar';
import {
  Container,
  ContentWrapper,
  SectionHeader,
  Header,
  IntroWrapper,
  BodyCopy,
} from 'screens/Donate/Donate.style';
import GiveButterEmbed from 'screens/Donate/GiveButterEmbed';
import donateContent from 'cms-content/donate';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import { DesktopOnlyDonateButton } from 'components/DonateButton';
import { Box } from '@material-ui/core';

const Intro: React.FC = () => {
  const { headerLines } = donateContent;
  return (
    <IntroWrapper>
      <Header>
        {headerLines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < headerLines.length - 1 ? <br /> : ''}
          </Fragment>
        ))}
      </Header>
      <BodyCopy source={donateContent.intro} />
    </IntroWrapper>
  );
};

const Donate: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavAllOtherPages
        renderSearch={() => (
          <NavBarSearch menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        )}
        renderSecondaryElement={() => <DesktopOnlyDonateButton />}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Container>
        {isMobile && <Intro />}
        <GiveButterEmbed embedUrl="https://givebutter.com/embed/c/VT7Yvu" />
        <ContentWrapper>
          {!isMobile && (
            <Fragment>
              <Icon icon={loveLetter} />
              <Intro />
            </Fragment>
          )}
          {donateContent.sections.map((section, i) => (
            <Fragment key={i}>
              <SectionHeader>{section.title}</SectionHeader>
              <BodyCopy source={section.copy} />
            </Fragment>
          ))}
        </ContentWrapper>
      </Container>
      <Box marginX={3}>
        <ShareModelBlock />
      </Box>
    </>
  );
};

export default Donate;
