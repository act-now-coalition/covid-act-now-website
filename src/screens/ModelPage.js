import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Header from 'components/Header/Header';

import { useModelDatas, Model } from 'utils/model';

function ModelPage({ location, locationName }) {
  let modelDatas = useModelDatas(location);

  if (!modelDatas) {
    return <div>Loading...</div>;
  }

  // Initialize models
  let baseline = new Model(modelDatas[0], {intervention: 'No Action', r0: 2.6});
  let distancing = {
    now: new Model( modelDatas[1], {
        intervention: 'Social Distancing, Strict Enforcement',
        durationDays: 60,
        r0: 1.2
      }),
    /*twoWeek: new Model( modelDatas[2], {
        intervention: 'Social Distancing, Strict Enforcement',
        durationDays: 60,
        r0: 1.2,
        delayDays: 14
      }),
    fourWeek: new Model( modelDatas[3], {
        intervention: 'Social Distancing, Strict Enforcement',
        durationDays: 60,
        r0: 1.2,
        delayDays: 7
      }),*/
  };
  let distancingPoorEnforcement = {
     now: new Model( modelDatas[7], {
        intervention: 'Social Distancing, Loose Enforcement',
        durationDays: 60,
        r0: 1.6
      }),
  };
  let contain = {
    now: new Model( modelDatas[4], {
        intervention: 'Wuhan Level Containment',
        durationDays: 30,
        r0: 0.4
      }),
    /*oneWeek: new Model( modelDatas[5], {
        intervention: 'Wuhan Level Containment',
        durationDays: 30,
        r0: 0.4,
        delayDays: 7
      }),
    twoWeek: new Model( modelDatas[6], {
        intervention: 'Wuhan Level Containment',
        durationDays: 30,
        r0: 0.4,
        delayDays: 7
      }),*/
    };

  // Prep datasets for graphs
  // short label: 'Distancing Today for 2 Months', 'Wuhan Level Containment for 1 Month'
  let scenarioComparisonOverTime = duration => [
    baseline.getDataset("hospitalizations", duration, "red"),
    distancing.now.getDataset("hospitalizations", duration, "blue"),
    distancingPoorEnforcement.now.getDataset("hospitalizations", duration, "orange"),
    contain.now.getDataset("hospitalizations", duration, "green"),
    baseline.getDataset("beds", duration, "black", "Hospital Beds")
  ];
  let scenarioComparison = scenarioComparisonOverTime(60);

  return (
    <>
      <Header locationName={locationName} />
      <div className="App" style={{ maxWidth: 900, margin: 'auto' }}>

        <Panel title="Impact of actions you can take">
          <div className="graphs-container">
            <LineGraph
              title="Hospitalizations over time"
              data={{ datasets: scenarioComparison }}
              annotations={{
                'Hospitals Overloaded': {
                  on: baseline.dateOverwhelmed,
                  yOffset: 50,
                  xOffset: 30,
                },
                /* 'End Wuhan Level Containment ': {
                  on: contain.now.interventionEnd,
                  xOffset: -50,
                  yOffset: 30,
                },
                'End Social Distancing': {
                  on: distancing.now.interventionEnd,
                  xOffset: 30,
                  yOffset: 10,
                },*/
              }}
            />
          </div>

          <div
            style={{
              padding: 20,
              border: '2px solid red',
              marginBottom: 20,
              marginTop: 40,
              backgroundColor: 'white',
            }}
          >
            Estimated last day to act to ease/delay hospital overload:{' '}
            <LastDatesToAct model={baseline} />
          </div>

          <OutcomesTable
            title="Outcomes within 2 months"
            models={[
              baseline,
              distancing.now,
              distancingPoorEnforcement.now,
              contain.now,
            ]}
            asterisk={['', '*', '*', '**']}
            timeHorizon={70}
          />
          <OutcomesTable
            title="Outcomes within 6 months"
            subtitle="Delaying impact through social distancing buys us time to prepare
              hospitals and improve interventions and treatments. Unless social
              distancing is implemented for 9 to 15 months, a second spike in
              disease may occur after social distancing is stopped"
            models={[
              baseline,
              distancing.now,
              distancingPoorEnforcement.now,
              contain.now,
            ]}
            asterisk={['', '*', '*', '**']}
            timeHorizon={190}
          />

          <ul style={{ textAlign: 'left', lineHeight: '2em' }}>
            <li style={{ listStyleType: 'none', marginBottom: 10 }}>
              * Delaying impact through social distancing buys us time to
              prepare hospitals and improve interventions and treatments. Unless
              social distancing is implemented for 9 to 15 months, a second
              spike in disease may occur after social distancing is stopped.
            </li>
            <li style={{ listStyleType: 'none' }}>
              ** Our models show that it would take approximately six weeks of
              Wuhan Level Containment in order to fully contain. However, it is
              unclear at this time how you could manage newly introduced
              infections.
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Panel({ children, title }) {
  return (
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function formatNumber(num) {
  return (Math.round(num / 1000) * 1000).toLocaleString();
}

function formatBucketedNumber(num, total) {
  let percent = num / total;
  if (percent < 0.7) {
    return Math.round(percent * 100) + '%';
  } else {
    return '>70%';
  }
}

function LineGraph({ data, maxY, annotations, title }) {
  let annotationConfigs = [];
  annotations = annotations || {};
  for (let label in annotations) {
    annotationConfigs.push({
      type: 'line',
      mode: 'vertical',
      scaleID: 'x-axis-0',
      value: annotations[label].on,
      borderColor: 'gray',
      borderWidth: 1,
      label: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        fontStyle: 'normal',
        fontColor: 'black',
        enabled: true,
        position: 'top',
        content: label,
        xAdjust: annotations[label].xOffset || 0,
        yAdjust: annotations[label].yOffset || 0,
      },
    });
  }

  return (
    <>
      <h3> {title}</h3>
      <Line
        data={data}
        width={500}
        height={400}
        options={{
          annotation: {
            drawTime: 'afterDatasetsDraw',
            annotations: annotationConfigs,
          },
          hover: {
            intersect: false,
          },
          tooltips: {
            mode: 'index',
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                type: 'linear',
                ticks: {
                  max: maxY,
                  callback: function(value, index, values) {
                    return formatNumber(value);
                  },
                },
              },
            ],
            xAxes: [
              {
                type: 'time',
                distribution: 'series',
                time: {
                  displayFormats: {
                    quarter: 'MMM YYYY',
                  },
                  tooltipFormat: 'MMMM DD',
                },
              },
            ],
          },
        }}
      />
    </>
  );
}

function OutcomesTable({ models, asterisk, timeHorizon, title }) {
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
              timeHorizon={timeHorizon}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function OutcomesRow({ model, label, timeHorizon }) {
  return (
    <tr>
      <td>{label}</td>
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
          {model.dateOverwhelmed < model.dateAfter(timeHorizon)
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

function LastDatesToAct({ model }) {
  function formatDate(date) {
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(
      date,
    );
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    return `${month} ${day}`;
  }

  const days = 1000 * 60 * 60 * 24;
  let earlyDate = new Date(model.dateOverwhelmed.getTime() - 21 * days);
  let lateDate = new Date(model.dateOverwhelmed.getTime() - 14 * days);

  return (
    <b>
      {formatDate(earlyDate)} to {formatDate(lateDate)}
    </b>
  );
}
