import React from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from 'components/ExternalLink';
import { getSurgoUrlByRegion } from 'common/ccvi';
import { Region, County } from 'common/regions';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Wrapper, LinkList, ListHeader } from './FooterLinks.style';

const FooterLinks: React.FC<{ region: Region }> = ({ region }) => {
  const surgoUrl = getSurgoUrlByRegion(region);
  const surgoUrlCta =
    region instanceof County
      ? `${region.name}'s most vulnerable neighborhoods`
      : `${region.name}'s most vulnerable counties`;

  return (
    <Wrapper>
      <ListHeader>Also see:</ListHeader>
      <LinkList>
        <li>
          <ExternalLink
            href={surgoUrl}
            onClick={() => trackLinkClick('Surgo link')}
          >
            {surgoUrlCta}
          </ExternalLink>
        </li>
        <li>
          <Link
            to="/learn" // TODO - replace with article url
            onClick={() => trackLinkClick('Vulnerable community resources')}
          >
            Resources for vulnerable people
          </Link>
        </li>
        <li>
          <Link
            to="/learn" // TODO - replace with article url
            onClick={() =>
              trackLinkClick('Why is vulnerability data important')
            }
          >
            Why vulnerability data is important for all communities
          </Link>
        </li>
      </LinkList>
    </Wrapper>
  );
};

function trackLinkClick(label: string) {
  trackEvent(EventCategory.VULNERABILITIES, EventAction.CLICK_LINK, label);
}

export default FooterLinks;
