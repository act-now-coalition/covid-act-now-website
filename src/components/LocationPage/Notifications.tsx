import React from 'react';
import some from 'lodash/some';
import ExternalLink from 'components/ExternalLink';
import {
  Copy,
  ColumnTitle,
  SectionColumn,
  WarningIcon,
  PurpleInfoIcon,
} from 'components/LocationPage/LocationPageHeader.style';
import { State, County, Region, MetroArea } from 'common/regions';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { CcviLevel, getCcviLevel, getCcviLevelName } from 'common/ccvi';
import { HashLink } from 'react-router-hash-link';
import { getSummaryFromFips } from 'common/location_summaries';
import { scrollWithOffset } from 'components/TableOfContents';

const EXPOSURE_NOTIFICATIONS_STATE_FIPS = [
  '01', // Alabama,
  '06', // California,
  '08', // Colorado,
  '09', // Connecticut,
  '10', // Delaware,
  '15', // Hawaii
  '22', // Louisiana,
  '24', // Maryland,
  '26', // Michigan,
  '27', // Minnesota,
  '32', // Nevada,
  '34', // New Jersey,
  '36', // New York,
  '37', // North Carolina,
  '38', // North Dakota,
  '42', // Pennsylvania,
  '51', // Virginia,
  '53', // Washington,
  '11', // Washington DC,
  '56', // Wyoming
];

const NotificationArea: React.FC<{ region: Region }> = ({ region }) => {
  enum Notification {
    HospitalizationsPeak,
    ExposureNotifications,
    Vulnerability,
    None,
  }
  let notification: Notification;

  if (showVulnerability(region)) {
    notification = Notification.Vulnerability;
  } else if (showExposureNotifications(region)) {
    notification = Notification.ExposureNotifications;
  } else {
    notification = Notification.None;
  }

  let icon, title;
  if (notification === Notification.Vulnerability) {
    icon = <PurpleInfoIcon />;
    title = 'update';
  } else {
    icon = <WarningIcon />;
    title = 'alert';
  }

  if (notification === Notification.None) {
    return null;
  }

  return (
    <React.Fragment>
      {icon}
      <SectionColumn $isUpdateCopy>
        <ColumnTitle $isUpdateCopy>{title}</ColumnTitle>

        {notification === Notification.ExposureNotifications && (
          <ExposureNotificationCopy stateName={getStateName(region)} />
        )}

        {notification === Notification.Vulnerability && (
          <VulnerabilityCopy
            locationName={region.shortName}
            fips={region.fipsCode}
          />
        )}
      </SectionColumn>
    </React.Fragment>
  );
};

const VulnerabilityCopy: React.FC<{
  locationName: string;
  fips: string;
}> = ({ locationName, fips }) => {
  const locationSummary = getSummaryFromFips(fips);
  const ccvi = locationSummary?.ccvi ?? 0;
  const level = getCcviLevel(ccvi);
  const levelName = getCcviLevelName(level).toLowerCase();
  const isHigh = level === CcviLevel.HIGH || level === CcviLevel.VERY_HIGH;

  const linkText = isHigh
    ? 'See more vulnerability details'
    : `See vulnerability details for ${locationName}`;

  return (
    <Copy>
      You can now see which locations are more vulnerable than others.{' '}
      {isHigh && (
        <React.Fragment>
          {locationName} has <strong>{levelName} vulnerability</strong>, making
          it more likely to experience severe physical and economic suffering
          from COVID, and to face a harder, longer recovery.
        </React.Fragment>
      )}
      <br />
      <br />
      <HashLink
        smooth
        scroll={(element: HTMLElement) => scrollWithOffset(element, -180)}
        to="#vulnerabilities"
        onClick={() => trackClickVulnerability('Location Header Update')}
      >
        {linkText}
      </HashLink>
    </Copy>
  );
};

const ExposureNotificationCopy: React.FC<{ stateName: string }> = ({
  stateName,
}) => {
  return (
    <Copy>
      Add your phone to{' '}
      <ExternalLink
        href="https://g.co/ens"
        onClick={() => trackClickExposureNotifications(stateName)}
      >
        {stateName}'s exposure notification system
      </ExternalLink>{' '}
      to receive alerts if you were in close contact with someone who later
      tests positive for COVID. Your privacy is protected as your identity is
      not known and your location is not tracked.
    </Copy>
  );
};

export function trackClickExposureNotifications(label: string) {
  trackEvent(
    EventCategory.EXPOSURE_NOTIFICATIONS,
    EventAction.CLICK_LINK,
    label,
  );
}

export function showExposureNotifications(region: Region) {
  if (region instanceof County) {
    return EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(region.state.fipsCode);
  } else if (region instanceof State) {
    return EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(region.fipsCode);
  } else if (region instanceof MetroArea) {
    return some(region.states, state =>
      EXPOSURE_NOTIFICATIONS_STATE_FIPS.includes(state.fipsCode),
    );
  } else {
    return false;
  }
}

const STATES_WITHOUT_CCVI = [
  '72', // Puerto Rico
  '69', // Mariana Islands
];

export function showVulnerability(region: Region) {
  if (region instanceof State) {
    return !STATES_WITHOUT_CCVI.includes(region.fipsCode);
  } else if (region instanceof County) {
    return !STATES_WITHOUT_CCVI.includes(region.state.fipsCode);
  } else if (region instanceof MetroArea) {
    return !some(region.states, state =>
      STATES_WITHOUT_CCVI.includes(state.fipsCode),
    );
  }
}

export function getStateName(region: Region) {
  if (region instanceof State) {
    return region.fullName;
  } else if (region instanceof County) {
    return region.state.fullName;
  } else if (region instanceof MetroArea) {
    return region.states.length === 1
      ? region.states[0].fullName
      : 'your state';
  } else {
    return '';
  }
}

export function trackClickVulnerability(label: string) {
  trackEvent(EventCategory.VULNERABILITIES, EventAction.CLICK_LINK, label);
}

export default NotificationArea;
