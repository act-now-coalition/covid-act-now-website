import fetch from 'node-fetch';
import _ from 'lodash';
import { REVERSED_STATES } from '../src/common';

(async () => {
  const response = await fetch('https://static01.nyt.com/newsgraphics/2020/04/22/states-reopening-coronavirus/b1b95228c6c701d7bed02f15b301f937055c4f75/statesData.json');
  const json = await response.json();
  const result = { } as any;
  for (const state in json) {
    const data = json[state];
    const stateCode = REVERSED_STATES[state];
    if (!stateCode) {
      console.log('Skipping ', state);
    } else {
      result[stateCode] = data['keyDates'];
    }
  }
  console.log(JSON.stringify(result, null, 2));
})().catch(e => {
  console.error(e);
  process.exit(-1);
});
