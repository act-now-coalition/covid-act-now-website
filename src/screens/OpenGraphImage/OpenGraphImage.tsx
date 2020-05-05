import _ from 'lodash';
import React from 'react';
import { useParams } from 'react-router';
import { ChartType } from 'enums/zones';
import { Projections } from 'models/Projections';
import { Wrapper, Content } from './OpenGraphImage.style';
import { useProjections } from 'utils/model';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';

const OpenGraphImage = ({ children }: { children: React.ReactNode }) => {
  const { stateId, countyFipsId } = useParams();
  return (
    <Wrapper>
      <Content>
        {stateId || countyFipsId ? (
          <LocationPageOpenGraphImage
            stateId={stateId}
            countyFipsId={countyFipsId}
          />
        ) : (
          <SocialLocationPreview />
        )}
      </Content>
    </Wrapper>
  );
};

const LocationPageOpenGraphImage = ({
  stateId,
  countyFipsId,
}: {
  stateId?: string;
  countyFipsId?: string;
}) => {
  let projections: Projections | undefined;
  let countyOptions = countyFipsId && { full_fips_code: countyFipsId };
  projections = useProjections(stateId, { countyOptions }) as any;

  if (!projections) {
    return null;
  }
  const projection = projections.primary;
  const stats = {
    [ChartType.CASE_GROWTH_RATE]: projection.rt,
    [ChartType.HOSPITAL_USAGE]: projection.currentIcuUtilization,
    [ChartType.POSITIVE_TESTS]: projection.currentTestPositiveRate,
  };

  return <SocialLocationPreview projections={projections} stats={stats} />;
};

export default OpenGraphImage;
