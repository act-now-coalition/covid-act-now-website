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
      ? `${region.name}'s most vulnerable neighborhoods.`
      : `${region.name}'s most vulnerable counties.`;
  return (
    <Wrapper>
      <ListHeader>Support vulnerable communities:</ListHeader>
      <LinkList>
        <li>
          Get vaccinated and continue to mask and social distance. See&nbsp;
          <Link to="/faq" onClick={() => trackLinkClick('FAQs')}>
            more vaccine resources and FAQs here.
          </Link>
        </li>
        {surgoUrl && (
          <li>
            <ExternalLink
              href={surgoUrl}
              onClick={() => trackLinkClick('Surgo link')}
            >
              {`Learn about ${surgoUrlCta}`}
            </ExternalLink>
          </li>
        )}
        <li>
          Share&nbsp;
          <Link
            to="/covid-explained/federal-resources-covid-relief"
            onClick={() => trackLinkClick('Vulnerable community resources')}
          >
            resources for vulnerable individuals.
          </Link>
        </li>
        <li>
          Learn about&nbsp;
          <Link
            to="/covid-explained/covid-vulnerability-data"
            onClick={() =>
              trackLinkClick('Why is vulnerability data important')
            }
          >
            why vulnerability data is important for all communities.
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
