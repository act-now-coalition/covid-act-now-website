import reduce from 'lodash/reduce';

import InterventionJSON from 'assets/data/interventions.json';

type StateCode =
  | 'AK'
  | 'AL'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DC'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY';

interface LocalInterventions {
  status: string;
  stay_at_home: boolean;
  schools_closed: boolean;
  restaurants_and_bars_closed: boolean;
}

export default class Interventions {
  state?: StateCode;

  constructor(state?: StateCode) {
    this.state = state;
  }

  getLocalInterventions(): LocalInterventions | null {
    return this.state ? InterventionJSON[this.state] : null;
  }

  getCurrentStateShelterInPlace(): boolean | null {
    if (!this.state) return null;
    return InterventionJSON[this.state]['status'] === 'shelter_in_place';
  }

  getCurrentStateSocialDistancing(): boolean | null {
    if (!this.state) return null;
    return ['social_distancing', 'shelter_in_place'].includes(
      InterventionJSON[this.state]['status'],
    );
  }

  getCurrentStateStayAtHome(): boolean | null {
    if (!this.state) return null;
    return InterventionJSON[this.state]['stay_at_home'];
  }

  getCurrentStateSchoolsClosed(): boolean | null {
    if (!this.state) return null;
    return InterventionJSON[this.state]['stay_at_home'];
  }

  getCurrentStateRestaurantsAndBarsClosed(): boolean | null {
    if (!this.state) return null;
    return InterventionJSON[this.state]['stay_at_home'];
  }

  getTotalStatesShelterInPlace(): number {
    return reduce(
      InterventionJSON,
      (acc: number, stateInterventions: LocalInterventions, state: string) =>
        acc +
        (state !== 'DC' && stateInterventions['status'] === 'shelter_in_place'
          ? 1
          : 0),
      0,
    );
  }

  getTotalStatesStayAtHome(): number {
    return reduce(
      InterventionJSON,
      (acc: number, stateInterventions: LocalInterventions, state: string) =>
        acc + (state !== 'DC' && stateInterventions['stay_at_home'] ? 1 : 0),
      0,
    );
  }

  getTotalStatesSocialDistancing(): number {
    // Is this both SIP and social distancing?
    return reduce(
      InterventionJSON,
      (acc: number, stateInterventions: LocalInterventions) =>
        acc +
        (['shelter_in_place', 'social_distancing'].includes(
          stateInterventions['status'],
        )
          ? 1
          : 0),
      0,
    );
  }

  getTotalStatesWithClosedSchools(): number {
    return reduce(
      InterventionJSON,
      (acc: number, stateInterventions: LocalInterventions, state: string) =>
        acc + (state !== 'DC' && stateInterventions['schools_closed'] ? 1 : 0),
      0,
    );
  }

  getTotalStatesWithClosedRestaurantsAndBars(): number {
    return reduce(
      InterventionJSON,
      (acc: number, stateInterventions: LocalInterventions, state: string) =>
        acc +
        (state !== 'DC' && stateInterventions['restaurants_and_bars_closed']
          ? 1
          : 0),
      0,
    );
  }
}
