import React, { Fragment } from 'react';
import { Region, County, State, MetroArea } from 'common/regions';
import {
  getMetroAreaVaccinationInfo,
  getStateVaccinationInfo,
  StateVaccinationInfo,
} from './vaccination-info-by-state';
import ExternalLink from 'components/ExternalLink';

const VaccinationInfo: React.FC<{ region: Region }> = ({ region }) => {
  const vaccinationLinks =
    region instanceof County || region instanceof State ? (
      <StateVaccinationInfo
        stateVaccinationInfo={getStateVaccinationInfo(region)}
      />
    ) : (
      <MetroAreaVaccinationInfo
        stateVaccinationInfoList={getMetroAreaVaccinationInfo(
          region as MetroArea,
        )}
      />
    );

  return (
    <div>
      <h1>How can I get vaccinated</h1>
      <h2>{`in ${region.fullName}`}</h2>
      <div style={{ border: 'solid 1px blue' }}>
        Here are the best resources we've found to:
        {vaccinationLinks}
      </div>
    </div>
  );
};

const StateVaccinationInfo: React.FC<{
  stateVaccinationInfo: StateVaccinationInfo;
}> = ({ stateVaccinationInfo }) => {
  const { eligibilityInfoUrl, vaccinationSignupUrl } = stateVaccinationInfo;
  return (
    <Fragment>
      <div>
        <ExternalLink href={eligibilityInfoUrl}>
          Find out about your eligibility
        </ExternalLink>
      </div>
      {vaccinationSignupUrl && (
        <div>
          <ExternalLink href={vaccinationSignupUrl}>
            Sign up for the COVID-19 vaccine
          </ExternalLink>
        </div>
      )}
    </Fragment>
  );
};

const MetroAreaVaccinationInfo: React.FC<{
  stateVaccinationInfoList: StateVaccinationInfo[];
}> = ({ stateVaccinationInfoList }) => {
  return null;
};

export default VaccinationInfo;
