const { map } = require('lodash');
const { US_STATES } = require('./../../enums');

module.exports = {
  HOME_PAGE: {
    SELECTOR: '.us-state-map',
    DATASET: '/',
  },
  STATE_PAGES: {
    SELECTOR: '.highcharts-container',
    DATASET: map(US_STATES, (_, stateCode) => `/us/${stateCode.toLowerCase()}`),
  },
};
