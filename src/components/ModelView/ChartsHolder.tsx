import React from 'react';

import {
  MainContentWrapper,
  MainContentInner,
  MainContentInnerBody,
} from './ChartsHolder.style';
import LocationPageHeader from 'components/LocationPageHeader/LocationPageHeader';
import ChartModule from 'components/Charts/ChartModule';
import NoCountyDetail from './NoCountyDetail';

interface ChartDetails {
  title: string;
  series: any[];
}

const ChartsHolder = (props: {
  projections: any; // make this be a type with
  stateId: string;
  countyId: string;
}) => {
  const chart_modules: ChartDetails[] = [
    {
      title: '[DEV] Projections',
      series: [],
    },
    {
      title: '[DEV] Case Growth Rate',
      series: [],
    },
    {
      title: '[DEV] Testing',
      series: [],
    },
  ];

  return (
    <>
      {props.projections && !props.projections.primary ? (
        <NoCountyDetail countyId={props.countyId} stateId={props.stateId} />
      ) : (
        <MainContentWrapper>
          <MainContentInner>
            <LocationPageHeader projections={props.projections} />
            <MainContentInnerBody>
              {chart_modules.map((chart_module, _) => {
                return (
                  <>
                    {props.projections && (
                      <ChartModule
                        height=""
                        title={chart_module.title}
                        series={chart_module.series}
                        condensed={false}
                        forCompareModels={false}
                      />
                    )}
                  </>
                );
              })}
              {/* TODO(): Disclaimer should go here! */}
            </MainContentInnerBody>
          </MainContentInner>
        </MainContentWrapper>
      )}
    </>
  );
};

export default ChartsHolder;
