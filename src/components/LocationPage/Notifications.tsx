import React from 'react';
import { Link } from 'react-router-dom';
import { some } from 'lodash';
import ExternalLink from 'components/ExternalLink';
import {
  Copy,
  ColumnTitle,
  SectionColumn,
  WarningIcon,
} from 'components/LocationPage/LocationPageHeader.style';
import { Projections } from 'common/models/Projections';
import InfoIcon from '@material-ui/icons/Info';
import { BANNER_COPY } from 'components/Banner/ThirdWaveBanner';
import HospitalizationsAlert, {
  isHospitalizationsPeak,
} from './HospitalizationsAlert';
import { State, County, Region, MetroArea } from 'common/regions';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';

const EXPOSURE_NOTIFICATIONS_STATE_FIPS = [
  '01', // Alabama,
  '06', // California,
  '08', // Colorado,
  '09', // Connecticut,
  '10', // Delaware,
  '24', // Maryland,
  '26', // Michigan,
  '27', // Minnesota,
  '32', // Nevada,
  '24', // New Jersey,
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
    NYCCounty,
    HospitalizationsPeak,
    ThirdWave,
    ExposureNotifications,
  }
  let notification: Notification;

  if (showExposureNotifications(region)) {
    notification = Notification.ExposureNotifications;
  } else if (
    // TODO(2020/12/22): Remove NYC notice after it's been up for a week or so.
    ['36047', '36061', '36005', '36081', '36085'].includes(region.fipsCode)
  ) {
    notification = Notification.NYCCounty;
  } else if (isHospitalizationsPeak(projections.primary)) {
    notification = Notification.HospitalizationsPeak;
  } else {
    notification = Notification.ThirdWave;
  }

  let icon, title;
  if (notification === Notification.NYCCounty) {
    icon = <InfoIcon />;
    title = 'update';
  } else {
    icon = <WarningIcon />;
    title = 'alert';
  }

  return (
    <React.Fragment>
      {icon}
      <SectionColumn isUpdateCopy>
        <ColumnTitle isUpdateCopy>{title}</ColumnTitle>

        {notification === Notification.ExposureNotifications && (
          <ExposureNotificationCopy stateName={getStateName(region)} />
        )}

        {notification === Notification.HospitalizationsPeak && (
          <HospitalizationsAlert
            locationName={region.fullName}
            projection={projections.primary}
          />
        )}

        {notification === Notification.NYCCounty && (
          <NYCAggregationChangeCopy locationName={region.name} />
        )}

        {notification === Notification.ThirdWave && <ThirdWaveCopy />}
      </SectionColumn>
    </React.Fragment>
  );
};

const NYCAggregationChangeCopy: React.FC<{ locationName: string }> = ({
  locationName,
}) => {
  return (
    <Copy>
      Prior to December 15th, {locationName} was aggregated together with the
      other New York City boroughs. It now has its own metrics and risk level.
    </Copy>
  );
};

const ThirdWaveCopy = () => {
  return (
    <Copy isUpdateCopy>
      {BANNER_COPY}{' '}
      <Link to={'/covid-explained/us-third-wave'}>Learn more</Link>.
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

function getStateName(region: Region) {
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
