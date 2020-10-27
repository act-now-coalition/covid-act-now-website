import React, { Fragment } from 'react';
import loveLetter from '@iconify/icons-twemoji/love-letter';
import { Icon } from '@iconify/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Container,
  ContentWrapper,
  SectionHeader,
  Header,
  IntroWrapper,
  BodyCopy,
} from 'screens/Donate/Donate.style';
import GiveButterEmbed from 'screens/Donate/GiveButterEmbed';
import { donateContent } from 'common/utils/netlify';
import {
  Experiment,
  Variant,
  ExperimentID,
  VariantID,
} from 'components/Experiment';

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

  return (
    <Container>
      {isMobile && <Intro />}
      <Experiment id={ExperimentID.DONATE_OCT27}>
        <Variant id={VariantID.A}>
          <GiveButterEmbed campaignUrl="https://givebutter.com/embed/c/donate-nov-2020" />
        </Variant>
        <Variant id={VariantID.B}>
          <GiveButterEmbed campaignUrl="https://givebutter.com/embed/c/donate-nov-2020-b" />
        </Variant>
      </Experiment>
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
  );
};

export default Donate;
