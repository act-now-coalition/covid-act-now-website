import React from 'react';
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
          Get vaccinated and continue to mask and social distance.
        </li>
        {surgoUrl && (
          <li>
            Learn about&nbsp;
            <ExternalLink
              href={surgoUrl}
              onClick={() => trackLinkClick('Surgo link')}
            >
              {surgoUrlCta}
            </ExternalLink>
          </li>
        )}
        <li>
          Share resources for vulnerable individuals.
        </li>
        <li>
          Learn about why vulnerability data is important for all communities.
        </li>
      </LinkList>
    </Wrapper>
  );
};

function trackLinkClick(label: string) {
  trackEvent(EventCategory.VULNERABILITIES, EventAction.CLICK_LINK, label);
}

export default FooterLinks;
