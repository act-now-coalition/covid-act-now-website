import React from 'react';
import { some } from 'lodash';
import ExternalLink from 'components/ExternalLink';
import {
  Copy,
  ColumnTitle,
  SectionColumn,
  WarningIcon,
  PurpleInfoIcon,
} from 'components/LocationPage/LocationPageHeader.style';
import { Projections } from 'common/models/Projections';
import InfoIcon from '@material-ui/icons/Info';
import HospitalizationsAlert, {
  isHospitalizationsPeak,
} from './HospitalizationsAlert';
import {
  State,
  County,
  Region,
  MetroArea,
  getFormattedStateCode,
} from 'common/regions';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { useCcviForFips } from 'common/hooks';
import { getCcviLevel } from 'common/ccvi';

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

const NotificationArea: React.FC<{ projections: Projections }> = ({
  projections,
}) => {
  const region = projections.region;

  enum Notification {
    HospitalizationsPeak,
    ExposureNotifications,
    Vulnerability,
    None,
  }
  let notification: Notification;

  // NOTE: For now showVulnerability() always returns true and will be the notification shown.
  if (showVulnerability(region)) {
    notification = Notification.Vulnerability;
  } else if (showExposureNotifications(region)) {
    notification = Notification.ExposureNotifications;
  } else if (isHospitalizationsPeak(projections.primary)) {
    notification = Notification.HospitalizationsPeak;
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

        {notification === Notification.HospitalizationsPeak && (
          <HospitalizationsAlert
            locationName={region.fullName}
            projection={projections.primary}
          />
        )}

        {notification === Notification.Vulnerability && (
          <VulnerabilityCopy
            locationName={region.name}
            fips={projections.fips}
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
  const scores = useCcviForFips(fips);
  const level = getCcviLevel(scores?.overall ?? 0);
  return (
    <Copy>
      <p>We now surface vulnerability levels for locations.</p>
      <p>See vulnerability details for {locationName}.</p>
      {locationName} has {levelLabel} vulnerability, making it more likely to
      experience severe physical and economic suffering from COVID, and to face
      a harder, longer recovery.{' '}
      <ExternalLink
        href="https://youtu.be/0EqSXDwTq6U" //placeholder
      >
        See more vulnerability details below
      </ExternalLink>
      .
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

export function showVulnerability(region: Region) {
  // STUB. Return true if the vulnerability category for the region is "High" or "Very High"
  return true;
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

export default NotificationArea;
