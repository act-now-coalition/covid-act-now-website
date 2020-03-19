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

export function useModelDatas(location) {
  const [modelDatas, setModelDatas] = useState(null);

  async function fetchData() {
    let urls = Array.from({ length: 8 }, (x, i) => `/data/${location}.${i}.json`);
    let loadedModelDatas = await fetchAll(urls);
    setModelDatas(loadedModelDatas);
  }

  useEffect(() => {
    fetchData();
  }, [location]);
  return modelDatas;
}

const COLUMNS = {
  hospitalizations: 8,
  beds: 11,
  cumulativeDeaths: 10,
  cumulativeInfected: 9,
  totalPopulation: 16,
  date: 0
};

export class Model {
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
           this.totalPopulation = _parseInt(data[0][COLUMNS.totalPopulation]);
         }

         idxForDay = day => Math.ceil(day / 4);

         cumulativeInfectedAfter(days) {
           return this.cumulativeInfected[this.idxForDay(days)];
         }
         cumulativeDeadAfter(days) {
           return this.cumulativeDeaths[this.idxForDay(days)];
         }
         dateAfter(days) {
           return this.dates[this.idxForDay(days)];
         }
         getColumn(columnName, days) {
           return this.dates
             .slice(0, Math.ceil(days / 4))
             .map((date, idx) => ({ x: date, y: this[columnName][idx] }));
         }

         getColumnAt(columnName, days) {
           return this[columnName][this.idxForDay(days)];
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
