import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Subtitle1 } from 'components/Typography';
import {
  AnnouncementIntro,
  Wrapper,
  Date,
  AnnouncementBodyCopy,
} from './Announcements.style';
import { scrollWithOffset } from 'components/TableOfContents';

const Announcements: React.FC = () => {
  return (
    <Wrapper>
      <Subtitle1>Announcements</Subtitle1>
      <AnnouncementIntro>
        COVID Vulnerability Data Now Available
      </AnnouncementIntro>
      <Date>THURSDAY, Mar 4, 2021</Date>
      <AnnouncementBodyCopy>
        Our vulnerability metric is calculated using government and health data
        sources. It is a static metric.
        <br />
        <br />
        As of May 4, 2021, people in the <i>most</i> vulnerable third of U.S.
        counties are 47 percent more likely to have died from COVID than people
        in the <i>least</i> vulnerable third of U.S. counties.
        <br />
        <br />
        Read more about Surgo Ventures’&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://precisionforcovid.org/ccvi"
        >
          COVID-19 Community Vulnerability Index (CCVI)
        </a>
        .
        <br />
        <br />
        <HashLink
          to="#compare-vulnerabilities"
          scroll={element => scrollWithOffset(element, -80)}
        >
          See the most vulnerable counties
        </HashLink>
      </AnnouncementBodyCopy>
    </Wrapper>
  );
};

export default Announcements;
