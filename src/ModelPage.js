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

  if (!(baselineModelData && distancingModelData && wuhanModelData)) {
    return <div>Loading...</div>;
  }

  let baseline = new Model(baselineModelData);
  let distancing = new Model(distancingModelData);
  let wuhan = new Model(wuhanModelData);

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
      label: "No Distancing",
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

  let scenarios = duration => ([
    {
      label: "No distancing",
      fill: false,
      borderColor: "red",
      data: baseline.getColumn("hospitalizations", duration)
    },
    {
      label: "Distancing Today for 2 months (R0 = 1.3",
      fill: false,
      borderColor: "yellow",
      data: distancing.getColumn("hospitalizations", duration)
    },
    {
      label: "Full Containment for 1 month (Wuhan-style; R0 = 0.3)",
      fill: false,
      borderColor: "green",
      data: wuhan.getColumn("hospitalizations", duration)
    }
  ]);
  let scenariosShortTerm = scenarios(30);
  let scenariosLongTerm = scenarios(180);

  return (
    <>
      <h3>
        <Link to="/">Back to map</Link>
      </h3>

      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
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
          <span class="stark">{baseline.cumulativeDead.toLocaleString()} dead</span>. <br />{" "}
          Hospitalizations will exceed available beds around{" "}
          {baseline.dateOverwhelmed
            ? baseline.dateOverwhelmed.toDateString()
            : "never"}
          .
        </h3>
      </div>
      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
        <h1>Immediate action is critical</h1>

        <div class="graphs-container">
          <div class="small-graph">
            <h4> Next two weeks </h4>
            <LineGraph data={{ datasets: distancingDelayShortTerm }} />
          </div>

          <div class="small-graph">
            <h4> Next 30 days </h4>
            <LineGraph data={{ datasets: distancingDelayLongTerm }} />
          </div>

          <div class="clear" />
        </div>

        <h3 style={{ margin: 50 }}>
          {distancingDelayDelta.toLocaleString()} less hospitalizations in 1
          months. <br />
          Containment likely possible until XXX.
        </h3>
      </div>
      <div style={{ backgroundColor: "#fafafa", padding: 20, marginTop: 20 }}>
        <h1>Coronavirus: Act Now</h1>
        <h2>Political Leaders, Public Health Officials: The only thing that matters right now is the speed of your response</h2>
        <h2 style={{color:"red"}}>This model is intended to help make fast decisions, not predict the future</h2>

        <div class="graphs-container">
          <div class="small-graph">
            <h4> Next 30 days </h4>
            <LineGraph data={{ datasets: scenariosShortTerm }} maxY={10000} />
          </div>

          <div class="small-graph">
            <h4> Next 6 months </h4>
            <LineGraph data={{ datasets: scenariosLongTerm }} />
          </div>

          <div class="clear" />
        </div>

        <table
          style={{
            width: "100%",
            margin: "auto",
            marginTop: 50,
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
            <tr>
              <td>Do nothing</td>
              <td>{baseline.maxInfected.toLocaleString()}</td>
              <td>
                {baseline.dateOverwhelmed
                  ? baseline.dateOverwhelmed.toDateString()
                  : "never"}
              </td>
              <td>{baseline.cumulativeDead.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Distancing Today</td>
              <td>{distancing.maxInfected.toLocaleString()}</td>
              <td>
                {distancing.dateOverwhelmed
                  ? distancing.dateOverwhelmed.toDateString()
                  : "never"}
              </td>
              <td>{distancing.cumulativeDead.toLocaleString()}</td>
            </tr>
            <tr>
              <td>"Wuhan" Today</td>
              <td>{wuhan.maxInfected.toLocaleString()}</td>
              <td>
                {wuhan.dateOverwhelmed
                  ? wuhan.dateOverwhelmed.toDateString()
                  : "Never"}
              </td>
              <td>{wuhan.cumulativeDead.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}


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
export default ModelPage;
