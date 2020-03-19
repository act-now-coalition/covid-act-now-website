import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { useModelDatas, Model } from 'utils/model';

function ModelPage({ location, locationName }) {
  let modelDatas = useModelDatas(location);

  if (!modelDatas) {
    return <div>Loading...</div>;
  }

  // Initialize models
  let baseline = new Model(modelDatas[0]);
  let distancing = {
    now: new Model(modelDatas[1]),
    twoWeek: new Model(modelDatas[3]),
    fourWeek: new Model(modelDatas[4]),
  };
  let contain = {
    now: new Model(modelDatas[2]),
    oneWeek: new Model(modelDatas[5]),
    twoWeek: new Model(modelDatas[6]),
  };

  // Prep datasets for graphs
  let scenarioComparisonOverTime = duration => [
    baseline.getDataset(
      'No Action (R0 = 2.6)',
      'hospitalizations',
      duration,
      'red',
    ),
    distancing.now.getDataset(
      'Distancing Today for 2 months (R0 = 1.4)',
      'hospitalizations',
      duration,
      'blue',
    ),
    contain.now.getDataset(
      'Wuhan level containment for 1 month (R0 = 0.4)',
      'hospitalizations',
      duration,
      'green',
    ),
    baseline.getDataset('Hospital Beds', 'beds', duration, 'black'),
  ];
  let scenarioComparison = scenarioComparisonOverTime(80);

  /*let distancingScenarios = [
    distancing.now.getDataset("Distancing Today for 2 months (R0 = 1.4)",
      "hospitalizations", 180, "green"),
    distancing.twoWeek.getDataset("Distancing in 2 weeks for 2 months (R0 = 1.4)",
      "hospitalizations", 180, "yellow"),
    distancing.fourWeek.getDataset("Distancing in 4 weeks for 2 months (R0 = 1.4)",
      "hospitalizations", 180, "red"),
  ];
  let containScenarios = [
    contain.now.getDataset("Wuhan Level Containment for 1 month (R0 = 0.4)",
      "hospitalizations", 180, "green"),
    contain.oneWeek.getDataset("Wuhan Level Containment for 1 month after 1wk (R0 = 0.4)",
      "hospitalizations", 180, "yellow"),
    contain.twoWeek.getDataset("Wuhan Level Containment for 1 month after 2wk(R0 = 0.4)",
      "hospitalizations", 180, "red"),
  ];*/

  return (
    <>
      <h3>
        <Link to="/">Back to map</Link>
      </h3>

      <h1>{locationName}</h1>

      <Panel title="Impact of actions you can take">
        <div class="graphs-container">
          <LineGraph
            title="Hospitalizations over time"
            data={{ datasets: scenarioComparison }}
            annotations={{
              'Hospitals Overloaded': {
                on: baseline.dateOverwhelmed,
                yOffset: 50,
                xOffset: 30,
              },
              'End Wuhan Level Containment ': {
                on: new Date('April 17 2020'),
                xOffset: -50,
                yOffset: 30,
              },
              'End Social Distancing': {
                on: new Date('May 17 2020'),
                xOffset: 30,
                yOffset: 10,
              },
            }}
          />
        </div>

        <div
          style={{
            padding: 20,
            border: '1px solid red',
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
          models={[baseline, distancing.now, contain.now]}
          labels={[
            'Do Nothing',
            '2 Months of Social Distancing, Starting Today*',
            '1 Month of Wuhan Level Containment, Starting Today**',
          ]}
          timeHorizon={70}
        />
        <OutcomesTable
          title="Outcomes within 6 months"
          subtitle="Delaying impact through social distancing buys us time to prepare
            hospitals and improve interventions and treatments. Unless social
            distancing is implemented for 9 to 15 months, a second spike in
            disease may occur after social distancing is stopped"
          models={[baseline, distancing.now, contain.now]}
          labels={[
            'Do Nothing',
            '2 Months of Social Distancing, Starting Today*',
            '1 Month of Wuhan Level Containment, Starting Today**',
          ]}
          timeHorizon={190}
        />

        <ul style={{ textAlign: 'left', lineHeight: '2em' }}>
          <li style={{ listStyleType: 'none', marginBottom: 10 }}>
            * Delaying impact through social distancing buys us time to prepare
            hospitals and improve interventions and treatments. Unless social
            distancing is implemented for 9 to 15 months, a second spike in
            disease may occur after social distancing is stopped.
          </li>
          <li style={{ listStyleType: 'none' }}>
            ** Assuming that a full containment policy (such as implemented in
            Wuhan) is infeasible to implement in the USA for any longer than 1
            month, for many regions the model predicts containment is no longer
            possible. Even if containment is acheived, strict travel
            restrictions and selective quarantine would need to remain in place
            for many months thereafter to prevent reintroduction of the disease.
          </li>
        </ul>
      </Panel>

      <div
        style={{
          backgroundColor: '#fafafa',
          padding: 20,
          marginTop: 20,
          marginBottom: 100,
        }}
      >
        <h2>Timing scenarios for interventions</h2>
        <h4>1 Month of Wuhan Level Containment, Then Stop</h4>
        {contain.now.cumulativeDead < baseline.cumulativeDead / 2 ? (
          <OutcomesTable
            models={[contain.now, contain.oneWeek, contain.twoWeek]}
            labels={['Act now', 'Act in 1 week', 'Act in 2 weeks']}
          />
        ) : (
          <>
            Containment with 1 months of Wuhan Level Containment measures is not
            possible
          </>
        )}

        <h4>2 Months of Social Distancing, Then Stop</h4>
        <p> [coming soon]</p>
      </div>
    </>
  );
}

function Panel({ children, title }) {
  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        padding: 20,
        marginTop: 20,
        marginBottom: 100,
      }}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

/*
<OutcomesTable
          models={[distancing, flatten2wk, flatten1mo]}
          labels={["Act now", "Act in 2 weeks", "Act in 4 weeks"]}
        />*/
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

function OutcomesTable({ models, labels, timeHorizon, title }) {
  return (
    <div style={{ overflow: 'scroll' }}>
      <h3>{title}</h3>
      <table
        style={{
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
          <OutcomesRow
            model={models[0]}
            label={labels[0]}
            timeHorizon={timeHorizon}
          />
          <OutcomesRow
            model={models[1]}
            label={labels[1]}
            timeHorizon={timeHorizon}
          />
          <OutcomesRow
            model={models[2]}
            label={labels[2]}
            timeHorizon={timeHorizon}
          />
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
