import React, { useState, useMemo } from 'react';

import LightTooltip from 'components/LightTooltip/LightTooltip';
import ClaimStateBlock from 'components/ClaimStateBlock/ClaimStateBlock';

import {
    DisclaimerWrapper,
    Disclaimer,
    DisclaimerHeader,
    DisclaimerBody,
  } from './Disclaimer.style';


const ModelDisclaimer = (props: {modelLastUpdatedDate: Date, stateId: string, selectedCounty: string}) => {
    return (
    <DisclaimerWrapper>
        <Disclaimer>
        <DisclaimerHeader>
            <LightTooltip
            title="Currently we aggregate data over 4 day intervals to smooth out inconsistencies in the source data. We’re working on improving this now."
            placement="bottom"
            >
            <span>
                Last updated{' '}
                {props.modelLastUpdatedDate && props.modelLastUpdatedDate.toLocaleDateString()}
            </span>
            </LightTooltip>
        </DisclaimerHeader>
        <DisclaimerBody>
            This model updates every 3 days and is intended to help make fast
            decisions, not predict the future.{' '}
            <a
            href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn more about our projection and its limitations
            </a>
            .
        </DisclaimerBody>
        </Disclaimer>
        <Disclaimer>
            <ClaimStateBlock stateId={props.stateId} county={props.selectedCounty} />
        </Disclaimer>
    </DisclaimerWrapper>
    )
}

export default ModelDisclaimer