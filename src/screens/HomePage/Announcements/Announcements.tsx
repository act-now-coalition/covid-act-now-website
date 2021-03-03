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
        Vulnerable areas are more likely to experience severe physical and
        economic suffering from COVID, and to face a harder, longer recovery. As
        of January 2021, people in the most vulnerable third of U.S. counties
        are:
        <ul>
          <li>23 percent more likely to be diagnosed with COVID</li>
          <li>32 percent more likely to have died from COVID</li>
          <li>35 percent more likely to be unemployed due to COVID</li>
        </ul>
        This is due to a number of factors such as a community member's income,
        age, and underlying health, as well as their access to transportation
        and health care (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19"
        >
          see source
        </a>
        ).
        <br />
        <br />
        <HashLink
          to="#compare"
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
