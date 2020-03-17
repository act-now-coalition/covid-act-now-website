import React from 'react';
import { Line, Chart } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import './App.css';

import { useState, useEffect } from "react";

const useFetch = url => {
  const [data, setData] = useState(null);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, [url]);
  return data;
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
}

function ModelPage({location, locationName}) {
  const baselineModelData = useFetch(`/${location}.0.json`);
  const distancingModelData = useFetch(`/${location}.1.json`);
  const wuhanModelData = useFetch(`/${location}.2.json`);
  const flatten2wkModelData = useFetch(`/${location}.3.json`);
  const flatten1moModelData = useFetch(`/${location}.4.json`);
  const contain1wkModelData = useFetch(`/${location}.5.json`);
  const contain2wkModelData = useFetch(`/${location}.6.json`);

  if (
    !(
      baselineModelData &&
      distancingModelData &&
      wuhanModelData &&
      flatten2wkModelData &&
      flatten1moModelData &&
      contain1wkModelData &&
      contain2wkModelData
    )
  ) {
    return <div>Loading...</div>;
  }

  let baseline = new Model(baselineModelData);
  let distancing = new Model(distancingModelData);
  let wuhan = new Model(wuhanModelData);
  let flatten2wk = new Model(flatten2wkModelData);
  let flatten1mo = new Model(flatten1moModelData);
  let contain1wk = new Model(contain1wkModelData);
  let contain2wk = new Model(contain2wkModelData);

  let place = locationName;
  let baselineTwoWeeks = [
    {
      label: "Hospitalizations",
      fill: false,
      borderColor: "red",
      data: baseline.getColumn("hospitalizations", 30)
    },
  ];
  let baselineThreeMonths = [
    {
      label: "Hospitalizations",
      fill: false,
      borderColor: "red",
      data: baseline.getColumn("hospitalizations", 90)
    },
    {
      label: "Deaths",
      fill: false,
      borderColor: "black",
      data: baseline.getColumn("cumulativeDeaths", 90)
    },

    {
      label: "Total Hospital Beds",
      fill: false,
      borderColor: "blue",
      data: baseline.getColumn("beds", 90)
    }
  ];
      console.log(baselineTwoWeeks);


  let distancingDelay = duration => [
    {
      label: "No Action",
      fill: false,
      borderColor: "red",
      data: baseline.getColumn("hospitalizations", duration)
    },
    {
      label: "Distancing Today",
      fill: false,
      borderColor: "blue",
      data: distancing.getColumn("hospitalizations", duration)
    }
  ];
  let distancingDelayShortTerm = distancingDelay(15);
  distancingDelayShortTerm[0].borderDash = [20, 30];

  let distancingDelayLongTerm = distancingDelay(30);


  let distancingDelayDelta =
    baseline.getColumnAt("hospitalizations", 30) -
    distancing.getColumnAt("hospitalizations", 30);

  let scenarios = duration => [
    {
      label: "No Action",
      fill: false,
      borderColor: "red",
      data: baseline.getColumn("hospitalizations", duration)
    },
    {
      label: "Distancing Today for 2 months (R0 = 1.3)",
      fill: false,
      borderColor: "yellow",
      data: distancing.getColumn("hospitalizations", duration)
    },
    {
      label: "Wuhan level containment for 1 month (R0 = 0.4)",
      fill: false,
      borderColor: "green",
      data: wuhan.getColumn("hospitalizations", duration)
    },
    {
      label: "Hospital Beds",
      fill: false,
      borderColor: "blue",
      data: distancing.getColumn("beds", duration)
    }

  ];
  let scenariosShortTerm = scenarios(30);
  let scenariosLongTerm = scenarios(180);


  let flattenScenarios = [
    {
      label: "Distancing Today for 2 months (R0 = 1.3)",
      fill: false,
      borderColor: "green",
      data: distancing.getColumn("hospitalizations", 180)
    },
    {
      label: "Distancing in 2 weeks for 2 months (R0 = 1.3)",
      fill: false,
      borderColor: "yellow",
      data: flatten2wk.getColumn("hospitalizations", 180)
    },
    {
      label: "Distancing in 1 month for 2 months (R0 = 1.3)",
      fill: false,
      borderColor: "red",
      data: flatten1mo.getColumn("hospitalizations", 180)
    }
  ];
  let containScenarios = [
    {
      label: "Wuhan Level Containment for 1 month (R0 = 0.4)",
      fill: false,
      borderColor: "green",
      data: wuhan.getColumn("hospitalizations", 180)
    },
    {
      label:
        "Wuhan Level Containment for 1 month after 1wk (R0 = 0.4)",
      fill: false,
      borderColor: "yellow",
      data: contain1wk.getColumn("hospitalizations", 180)
    },
    {
      label:
        "Wuhan Level Containment for 1 month after 2wk(R0 = 0.4)",
      fill: false,
      borderColor: "red",
      data: contain2wk.getColumn("hospitalizations", 180)
    }
  ];



  return (
    <>
      <h3>
        <Link to="/">Back to map</Link>
      </h3>

      <div
        style={{
          backgroundColor: "#fafafa",
          padding: 20,
          marginTop: 20,
          display: "none"
        }}
      >
        <h1>Likely hospitalizations in {place}: now to June</h1>
        <div class="graphs-container">
          <div class="small-graph">
            <h4> Next 2 weeks </h4>
            <LineGraph data={{ datasets: baselineTwoWeeks }} />
          </div>

          <div class="small-graph">
            <h4> Next 3 months </h4>
            <LineGraph data={{ datasets: baselineThreeMonths }} />
          </div>

          <div class="clear" />
        </div>

        <h3 style={{ margin: 50 }}>
          Up to {baseline.maxInfected.toLocaleString()} infected, and{" "}
          <span class="stark">
            {baseline.cumulativeDead.toLocaleString()} dead
          </span>
          . <br /> Hospitalizations will exceed available beds around{" "}
          {baseline.dateOverwhelmed
            ? baseline.dateOverwhelmed.toDateString()
            : "never"}
          .
        </h3>
      </div>

      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
        <h1>Impact of actions you can take</h1>

        <div class="graphs-container">
          <div class="small-graph" style={{ display: "none" }}>
            <h4> Immediate Action, Next 30 days </h4>
            <LineGraph data={{ datasets: scenariosShortTerm }} maxY={10000} />
          </div>

          <div class="">
            <h4> Hospitalizations over time</h4>
            <LineGraph data={{ datasets: scenariosLongTerm }} />
          </div>

          <div class="clear" />
        </div>

        <h2>Outcomes</h2>
        <OutcomesTable
          models={[baseline, distancing, wuhan]}
          labels={["Do Nothing", "Social Distancing (2 months)", "Wuhan Level Containment (1 months)"]}
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
        <h1>Why you must respond fast</h1>

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
          models={[wuhan, contain1wk, contain2wk]}
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

function LineGraph({data, maxY}) {
  return (
    <Line
      data={data}
      width={500}
      height={250}
      options={{
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
