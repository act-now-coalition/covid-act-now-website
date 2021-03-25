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
        You can now see which counties and metros are most and least vulnerable.
        Higher vulnerability areas are more likely to experience severe physical
        and economic suffering from COVID, and to face a harder, longer
        recovery.
        <br />
        <br />
        As of March 24, 2021, people in the <i>most</i> vulnerable third of U.S.
        counties are 45 percent more likely to have died from COVID than people
        in the <i>least</i> vulnerable third of U.S. counties.
        <br />
        <br />
        This is due to a number of factors such as a community members’ income,
        age, and underlying health, as well as their access to transportation
        and health care.
        <br />
        <br />
        To calculate vulnerability, we use Surgo Ventures’{' '}
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
        <br />
        <Link to="covid-explained/covid-vulnerability-data">Learn more</Link>
      </AnnouncementBodyCopy>
    </Wrapper>
  );
};

export default Announcements;
