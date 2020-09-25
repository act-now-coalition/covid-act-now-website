import React, { Fragment } from 'react';
import loveLetter from '@iconify/icons-twemoji/love-letter';
import { Icon } from '@iconify/react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Container,
  ContentWrapper,
  SectionHeader,
  BodyCopy,
  Header,
  IntroWrapper,
} from 'screens/Donate/Donate.style';
import GiveButterEmbed from 'screens/Donate/GiveButterEmbed';

const Intro = () => {
  return (
    <IntroWrapper>
      <Header>
        Our data saves lives.
        <br />
        Donate to keep us online.
      </Header>
      <BodyCopy>
        We are a tiny, independent non-profit (mostly of volunteers) working
        relentlessly since March to bring you the most important COVID
        information.
      </BodyCopy>
    </IntroWrapper>
  );
};

const roadmapListContent = [
  {
    sectionHeader: 'Keep the data flowing',
    copy:
      'Our resources are running short. By donating you keep us online, so that we can continue:',
    listItems: [
      'Improving data quality',
      'Inspiring more action',
      'Reaching more people',
    ],
  },
  {
    sectionHeader: 'Join the fight against COVID',
    copy: 'By keeping us online, you’re also:',
    listItems: [
      'Helping build a shared understand of COVID',
      'Joining our fight against misinformation',
      'Leaving a legacy during this generation defining crisis',
    ],
  },
];

const Donate = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));

  return (
    <Container>
      {isMobile && <Intro />}
      <GiveButterEmbed />
      <ContentWrapper>
        {!isMobile && (
          <Fragment>
            <Icon icon={loveLetter} />
            <Intro />
          </Fragment>
        )}
        {roadmapListContent.map((item: any, i: number) => (
          <Fragment>
            <SectionHeader>{item.sectionHeader}</SectionHeader>
            <BodyCopy>{item.copy}</BodyCopy>
            <ul>
              {item.listItems.map((item: any, i: number) => (
                <BodyCopy as="li">{item}</BodyCopy>
              ))}
            </ul>
          </Fragment>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default Donate;
