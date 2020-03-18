import React from 'react';
import { Line } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import './App.css';
import "chartjs-plugin-annotation";
import { useState, useEffect } from "react";


async function fetchAll(urls) {
  try {
    var data = await Promise.all(
      urls.map(url => fetch(url).then(response => response.json()))
    );

    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

const useModelDatas = location => {
  const [modelDatas, setModelDatas] = useState(null);

  async function fetchData() {
    let urls = Array.from({length: 7}, (x,i) => `/${location}.${i}.json`);
    let loadedModelDatas = await fetchAll(urls);
    setModelDatas(loadedModelDatas);
  }

  useEffect(() => {
    fetchData();
  }, [location]);
  return modelDatas;
};

const COLUMNS = {
  hospitalizations: 8,
  beds: 11,
  cumulativeDeaths: 10,
  cumulativeInfected: 9,
  date: 0
};
class Model {
  constructor(data) {
    let _parseInt = number => parseInt(number.replace(/,/g, "") || 0);

    this.dates = data.map(row => new Date(row[COLUMNS.date]));
    this.hospitalizations = data.map(row =>
      _parseInt(row[COLUMNS.hospitalizations])
    );
    this.beds = data.map(row => _parseInt(row[COLUMNS.beds]));
    this.cumulativeDeaths = data.map(row =>
      _parseInt(row[COLUMNS.cumulativeDeaths])
    );
    this.cumulativeInfected = data.map(row =>
      _parseInt(row[COLUMNS.cumulativeInfected])
    );

    this.maxInfected = this.cumulativeInfected[
      this.cumulativeInfected.length - 1
    ];
    this.cumulativeDead = this.cumulativeDeaths[
      this.cumulativeDeaths.length - 1
    ];
    this.dateOverwhelmed = this.dates.find(
      (num, idx) => this.hospitalizations[idx] > this.beds[idx]
    );
  }

  getColumn(columnName, days) {
    return this.dates
      .slice(0, Math.ceil(days / 4))
      .map((date, idx) => ({ x: date, y: this[columnName][idx] }));
  }

  getColumnAt(columnName, days) {
    let idx = Math.ceil(days / 4);
    return this[columnName][idx];
  }

  getDataset(label, columnName, duration, color) {
    return {
      label,
      fill: false,
      borderColor: color,
      data: this.getColumn(columnName, duration)
    };
  }
}

function ModelPage({location, locationName}) {
  let modelDatas = useModelDatas(location);

  if (!modelDatas) {
    return <div>Loading...</div>;
  }

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

  let place = locationName;

  let distancingDelay = duration => [
    baseline.getDataset("No Action", "hospitalizations", duration, "red"),
    baseline.getDataset(
      "Distancing Today",
      "hospitalizations",
      duration,
      "blue"
    )];
  let distancingDelayShortTerm = distancingDelay(15);
  distancingDelayShortTerm[0].borderDash = [20, 30];

  let scenarios = duration => [
    baseline.getDataset("No Action", "hospitalizations", duration, "red"),
    distancing.now.getDataset(
      "Distancing Today for 2 months (R0 = 1.3)",
      "hospitalizations",
      duration,
      "blue"
    ),
    contain.now.getDataset(
      "Wuhan level containment for 1 month (R0 = 0.4)",
      "hospitalizations",
      duration,
      "green"
    ),
    baseline.getDataset("Hospital Beds", "beds", duration, "black")
  ];
  let scenariosLongTerm = scenarios(80);
/**/

  let flattenScenarios = [
    distancing.now.getDataset(
      "Distancing Today for 2 months (R0 = 1.3)",
      "hospitalizations",
      180,
      "green"
    ),
    distancing.twoWeek.getDataset(
      "Distancing in 2 weeks for 2 months (R0 = 1.3)",
      "hospitalizations",
      180,
      "yellow"
    ),
    distancing.fourWeek.getDataset(
      "Distancing in 4 weeks for 2 months (R0 = 1.3)",
      "hospitalizations",
      180,
      "red"
    ),
  ];
  let containScenarios = [
    contain.now.getDataset("Wuhan Level Containment for 1 month (R0 = 0.4)",
      "hospitalizations", 180, "green"),
    contain.oneWeek.getDataset("Wuhan Level Containment for 1 month after 1wk (R0 = 0.4)",
      "hospitalizations", 180, "yellow"),
    contain.twoWeek.getDataset("Wuhan Level Containment for 1 month after 2wk(R0 = 0.4)",
      "hospitalizations", 180, "red"),
  ];


  return (
    <>
      <h3>
        <Link to="/">Back to map</Link>
      </h3>

      <h2>Likely hospitalizations in {place}</h2>

      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
        <h2>Impact of actions you can take</h2>

        <div class="graphs-container">
          <div class="">
            <h4> Hospitalizations over time</h4>
            <LineGraph data={{ datasets: scenariosLongTerm }} />
          </div>

          <div class="clear" />
        </div>

        <h2>Outcomes</h2>
        <OutcomesTable
          models={[baseline, distancing.now, contain.now]}
          labels={[
            "Do Nothing",
            "Social Distancing (2 months)",
            "Wuhan Level Containment (1 months)"
          ]}
        />
      </div>
      <div
        style={{
          backgroundColor: "#fafafa",
          padding: 20,
          marginTop: 20,
          marginBottom: 100
        }}
      >
        <h2>Why you must respond fast</h2>

        <div class="graphs-container" style={{ display: "none" }}>
          <div class="small-graph">
            <h4> Flatten scenarios </h4>
            <LineGraph data={{ datasets: flattenScenarios }} />
          </div>

          <div class="small-graph">
            <h4> Contain scenarios </h4>
            <LineGraph data={{ datasets: containScenarios }} />
          </div>

          <div class="clear" />
        </div>

        <h4>Wuhan Level Containment (1 month)</h4>
        <OutcomesTable
          models={[contain.now, contain.oneWeek, contain.twoWeek]}
          labels={["Act now", "Act in 1 week", "Act in 2 weeks"]}
        />

        <h4>Social Distancing (2 months)</h4>
        <p> [coming soon]</p>
      </div>
      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
        <h1>FAQ</h1>
        <h3>Why does almost everyone get COVID-19?</h3>
        <p> Because given the.. </p>
      </div>
    </>
  );
}
/*
<OutcomesTable
          models={[distancing, flatten2wk, flatten1mo]}
          labels={["Act now", "Act in 2 weeks", "Act in 4 weeks"]}
        />*/

// hospital overload
// end of social distancing
// end of containment
function LineGraph({data, maxY}) {
  return (
    <Line
      data={data}
      width={500}
      height={600}
      options={{
        annotation: {
          drawTime: 'afterDatasetsDraw',
          annotations: [{
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: new Date('March 19 2020'),
              borderColor: 'green',
              borderWidth: 1,
              label: {
                  enabled: true,
                  position: "top",
                  content: "hello"
              }
          }]
        },
        hover: {
          intersect: false
        },
        tooltips: {
          mode: "index"
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              type: "linear",
              ticks: {
                max: maxY,
                callback: function(value, index, values) {
                  return value.toLocaleString();
                }
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  quarter: "MMM YYYY"
                },
                tooltipFormat: "MMMM DD"
              }
            }
          ]
        }
      }}
    />
  );
}


function OutcomesTable({models, labels}) {
  return (
    <table
      style={{
        width: "100%",
        margin: "auto",
        border: "1px solid #ccc",
        padding: 20,
        textAlign: "left"
      }}
    >
      <thead>
        <tr>
          <th>Scenario</th>
          <th>
            Cumulative
            <br /> Infected
          </th>
          <th>
            Hospitals
            <br /> Overloaded
          </th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <OutcomesRow model={models[0]} label={labels[0]} />
        <OutcomesRow model={models[1]} label={labels[1]} />
        <OutcomesRow model={models[2]} label={labels[2]} />
      </tbody>
    </table>
  );
};
function OutcomesRow({model, label}) {
  return (
    <tr>
      <td>{label}</td>
      <td>{model.maxInfected.toLocaleString()}</td>
      <td>
        {model.dateOverwhelmed ? model.dateOverwhelmed.toDateString() : "never"}
      </td>
      <td>{model.cumulativeDead.toLocaleString()}</td>
    </tr>
  );
}

export default ModelPage;
