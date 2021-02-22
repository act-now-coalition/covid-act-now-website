import React from 'react';
import { Region, MetroArea } from 'common/regions';
import { getVaccineInfoByFips } from 'cms-content/vaccines/phases';
import RegionVaccinationBlock from 'components/RegionVaccinationBlock';
import VaccinationEligibilityBlock from 'components/VaccinationEligibilityBlock';
import ErrorBoundary from 'components/ErrorBoundary';

const VaccinationBlock: React.FC<{ region: Region }> = ({ region }) => {
  const vaccineInfo = getVaccineInfoByFips(region.fipsCode);

  const isMultiStateMetro =
    region instanceof MetroArea && region.states.length > 1;

  // We only have vaccination phases information for states, so we show only the vaccination
  // links for multi-state metro areas or when we don't have vaccination info
  const showVaccinationLinks = isMultiStateMetro || !vaccineInfo;

  return (
    <ErrorBoundary>
      {showVaccinationLinks ? (
        <RegionVaccinationBlock region={region} />
      ) : (
        <VaccinationEligibilityBlock region={region} />
      )}
    </ErrorBoundary>
  );
};

export default VaccinationBlock;
