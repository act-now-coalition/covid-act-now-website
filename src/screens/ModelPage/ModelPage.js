import React from 'react';
import { useParams } from 'react-router-dom';
import CountyMap from 'components/CountyMap/CountyMap';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

import Header from 'components/Header/Header';
import Chart from 'components/Chart/Chart';
import Callout from 'components/Callout/Callout';
import Newsletter from 'components/Newsletter/Newsletter';
import {
  Wrapper,
  Content,
  ShareContainer,
  ShareSpacer,
} from './ModelPage.style';
import { STATES, STATE_TO_INTERVENTION, INTERVENTIONS } from 'enums';
import { useModelDatas, Model } from 'utils/model';

const LAST_DATES_CALLOUT_COLORS = {
  // Array is [fill color, border color]
  [INTERVENTIONS.NO_ACTION]: ['rgba(255, 0, 0, 0.0784)', 'red'],
  [INTERVENTIONS.SOCIAL_DISTANCING]: ['rgba(255, 255, 0, 0.0784)', 'yellow'],
  [INTERVENTIONS.SHELTER_IN_PLACE]: ['rgba(0, 255, 0, 0.0784)', 'green'],
};

const DAYS = 1000 * 60 * 60 * 24;
const ONE_HUNDRED_DAYS = 100 * DAYS;

const CallToAction = ({ model, intervention }) => {
  function formatDate(date) {
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(
      date,
    );
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    return `${month} ${day}`;
  }

  function suggestedIntervention() {
    switch (intervention) {
      case INTERVENTIONS.NO_ACTION:
        return INTERVENTIONS.SHELTER_IN_PLACE;
      case INTERVENTIONS.SOCIAL_DISTANCING:
        return INTERVENTIONS.SHELTER_IN_PLACE;
      default:
        return 'stricter intervention';
    }
  }

  let actionText, actionDateRange;
  if (
    !model.dateOverwhelmed ||
    model.dateOverwhelmed - new Date() > ONE_HUNDRED_DAYS
  ) {
    actionText = `${intervention} projected to successfully delay hospital overload by greater than 3 months.`;
  } else {
    actionText = `To prevent hospital overload, ${suggestedIntervention()} must be implemented by:`;
    const earlyDate = new Date(model.dateOverwhelmed.getTime() - 14 * DAYS);
    const lateDate = new Date(model.dateOverwhelmed.getTime() - 9 * DAYS);
    actionDateRange = (
      <div style={{ fontWeight: 'bold', marginTop: '1.2rem' }}>
        {formatDate(earlyDate)} to {formatDate(lateDate)}
      </div>
    );
  }

  const [calloutFillColor, calloutStrokeColor] = LAST_DATES_CALLOUT_COLORS[
    intervention
  ];

  return (
    <Callout
      borderColor={calloutStrokeColor}
      backgroundColor={calloutFillColor}
    >
      <div style={{ fontWeight: 'normal' }}>{actionText}</div>
      {actionDateRange}
    </Callout>
  );
};

let lowercaseStates = [
  'AK',
  'CA',
  'CO',
  'FL',
  'MO',
  'NM',
  'NV',
  'NY',
  'OR',
  'TX',
  'WA',
];

function ModelPage() {
  const { id: location } = useParams();
  const locationName = STATES[location];
  const intervention = STATE_TO_INTERVENTION[location];

  let locationNameForDataLoad = location;

  if (lowercaseStates.indexOf(location) > -1) {
    locationNameForDataLoad = location.toLowerCase();
  }
  let modelDatas = useModelDatas(locationNameForDataLoad);
  const shareURL = `https://covidactnow.org/state/${location}`;
  const shareQuote = `This is the point of no return for intervention to prevent ${locationName}'s hospital system from being overloaded by Coronavirus: `;
  const hashtag = 'COVIDActNow';

  if (!modelDatas) {
    return <Header locationName={locationName} intervention={intervention} />;
  }

  // Initialize models
  let baseline = new Model(modelDatas.baseline, {
    intervention: 'No Action',
    r0: 2.4,
  });
  let distancing = {
    now: new Model(modelDatas.strictDistancingNow, {
      intervention: 'Shelter-in-place',
      durationDays: 90,
      r0: 1.2,
    }),
  };
  let distancingPoorEnforcement = {
    now: new Model(modelDatas.weakDistancingNow, {
      intervention: 'Social distancing',
      durationDays: 90,
      r0: 1.7,
    }),
  };
  let contain = {
    now: new Model(modelDatas.containNow, {
      intervention: 'Wuhan-style Lockdown',
      durationDays: 90,
      r0: 0.3,
    }),
  };

  const interventionToModel = {
    [INTERVENTIONS.NO_ACTION]: baseline,
    [INTERVENTIONS.SOCIAL_DISTANCING]: distancingPoorEnforcement.now,
    [INTERVENTIONS.SHELTER_IN_PLACE]: distancing.now,
  };

  // Prep datasets for graphs
  // short label: 'Distancing Today for 2 Months', 'Wuhan Level Containment for 1 Month'
  let scenarioComparisonOverTime = duration => [
    baseline.getDataset('hospitalizations', duration, 'red'),
    distancing.now.getDataset('hospitalizations', duration, 'blue'),
    distancingPoorEnforcement.now.getDataset(
      'hospitalizations',
      duration,
      'orange',
    ),
    contain.now.getDataset('hospitalizations', duration, 'green'),
    baseline.getDataset('beds', duration, 'black', 'Available Hospital Beds'),
  ];
  let scenarioComparison = scenarioComparisonOverTime(100);

  return (
    <Wrapper>
      <Header locationName={locationName} intervention={intervention} />
      <Content>
        <Panel>
          <CountyMap />
          <Chart
            state={locationName}
            subtitle="Hospitalizations over time"
            data={scenarioComparison}
            dateOverwhelmed={baseline.dateOverwhelmed}
          />

          <CallToAction
            model={interventionToModel[intervention]}
            intervention={intervention}
          />

          <Callout borderColor="black">
            <ShareContainer>
              <div
                style={{ paddingRight: 28, fontWeight: 'bold' }}
              >{`Share ${locationName}'s COVID-19 trends:`}</div>

              <FacebookShareButton url={shareURL} quote={shareQuote}>
                <FacebookIcon size={40} round={false} borderRadius={5} />
              </FacebookShareButton>

              <ShareSpacer />

              <TwitterShareButton
                url={shareURL}
                title={shareQuote}
                hashtags={[hashtag]}
              >
                <TwitterIcon size={40} round={false} borderRadius={5} />
              </TwitterShareButton>

              <ShareSpacer />

              <LinkedinShareButton
                url={shareURL}
                title={shareQuote}
                hashtags={[hashtag]}
              >
                <LinkedinIcon size={40} round={false} borderRadius={5} />
              </LinkedinShareButton>
            </ShareContainer>
          </Callout>

          <OutcomesTable
            title="Predicted Outcomes after 3 Months"
            models={[
              baseline,
              distancingPoorEnforcement.now,
              distancing.now,
              contain.now,
            ]}
            colors={['red', 'orange', 'blue', 'green']}
            asterisk={['', '*', '*', '**']}
            timeHorizon={100}
          />

          <ul style={{ textAlign: 'left', lineHeight: '2em' }}>
            <li style={{ listStyleType: 'none', marginBottom: 10 }}>
              *{' '}
              <b>
                A second spike in disease may occur after social distancing is
                stopped.
              </b>{' '}
              Interventions are important because they buy time to create surge
              capacity in hospitals and develop therapeutic drugs that may have
              potential to lower hospitalization and fatality rates from
              COVID-19.{' '}
              <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                See full scenario definitions here.
              </a>
            </li>
            <li style={{ listStyleType: 'none' }}>
              ** Our models show that it would take at least 2 months of
              Wuhan-style Lockdown to achieve full containment. However, it is
              unclear at this time how you could manage newly introduced
              infections.{' '}
              <a href="https://docs.google.com/document/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/edit#heading=h.vyhw42b7pgoj">
                See full scenario definitions here.
              </a>
            </li>
          </ul>
        </Panel>
        <div style={{ marginTop: '3rem' }}>
          <Newsletter />
        </div>
      </Content>
    </Wrapper>
  );
}

function Panel({ children, title }) {
  return <div style={{}}>{children}</div>;
}

function formatNumber(num) {
  if (num > 1000) {
    return (Math.round(num / 1000) * 1000).toLocaleString();
  } else if (num > 0) {
    return '<1000';
  } else {
    return 0;
  }
}

function formatBucketedNumber(num, total) {
  let percent = num / total;
  if (percent < 0.01) {
    return '<1%';
  } else if (percent < 0.7) {
    return Math.round(percent * 100) + '%';
  } else {
    return '>70%';
  }
}

function OutcomesTable({ models, asterisk, timeHorizon, title, colors }) {
  return (
    <div style={{ overflow: 'scroll' }}>
      <h3>{title}</h3>
      <table
        style={{
          minWidth: 500,
          width: '100%',
          margin: 'auto',
          border: '1px solid #ccc',
          padding: 20,
          textAlign: 'left',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Estimated Cumulative Infected</th>
            <th>Estimated Date Hospitals Overloaded</th>
            <th>Estimated Deaths</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, idx) => (
            <OutcomesRow
              key={idx}
              model={model}
              label={`${model.label}${asterisk[idx]}`}
              color={colors[idx]}
              timeHorizon={timeHorizon}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function OutcomesRow({ model, label, timeHorizon, color }) {
  return (
    <tr>
      <td style={{ fontWeight: 'bold', color }}>{label}</td>
      <td>
        {formatBucketedNumber(
          timeHorizon
            ? model.cumulativeInfectedAfter(timeHorizon)
            : model.cumulativeInfected,
          model.totalPopulation,
        )}
      </td>
      {timeHorizon ? (
        <td>
          {model.dateOverwhelmed &&
          model.dateOverwhelmed < model.dateAfter(timeHorizon)
            ? model.dateOverwhelmed.toDateString()
            : model.dateOverwhelmed
            ? 'outside time bound'
            : 'never'}
        </td>
      ) : (
        <td>
          {model.dateOverwhelmed
            ? model.dateOverwhelmed.toDateString()
            : 'never'}
        </td>
      )}

      <td>
        {formatNumber(
          timeHorizon
            ? model.cumulativeDeadAfter(timeHorizon)
            : model.cumulativeDead,
        )}
      </td>
    </tr>
  );
}

export default ModelPage;
