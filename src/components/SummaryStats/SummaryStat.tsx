import React from 'react';

import {Status} from 'enums/status'
import SignalStatus from 'components/SignalStatus/SignalStatus';
import { SummaryStatWrapper, StatNameText, StatValueText } from './SummaryStat.style';

export interface SummaryStatProp {
    name: string, 
    value: string, 
    status: Status,
}

const SummaryStat = (props: SummaryStatProp) => {

    return (
        <SummaryStatWrapper>
            <StatNameText>
                {props.name}
            </StatNameText>
            <StatValueText>
                {props.value}
            </StatValueText>
            <SignalStatus status={props.status}/>
        </SummaryStatWrapper>
    )
}

export default SummaryStat