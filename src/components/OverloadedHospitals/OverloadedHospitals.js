import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import FIPS_TO_COUNTY from '../MapSelectors/datasets/fips_to_county';

import { OverloadedHospitalsContainer } from './OverloadedHospitals.style';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default class OverloadedHospitals extends React.Component {
  state = { numCounties: 10, counties: null };

  componentDidMount() {
    this._asyncRequest = fetch(
      'https://data.covidactnow.org/snapshot/latest/us/counties/counties_top_100.json',
    )
      .then(response => response.json())
      .then(({ data }) => {
        data.forEach(county => {
          county.lastUpdatedDate = moment(county.lastUpdatedDate);
          county.projections.hospitalBeds.peakDate = moment(
            county.projections.hospitalBeds.peakDate,
          );
          county.projections.hospitalBeds.shortageStartDate = moment(
            county.projections.hospitalBeds.shortageStartDate,
          );
          const { state_code, county_url_name } = FIPS_TO_COUNTY[county.fips];
          county.path = `/us/${_.lowerCase(
            state_code,
          )}/county/${county_url_name}`;
        });
        this.setState({
          counties: _.sortBy(
            data,
            'projections.hospitalBeds.shortageStartDate',
          ),
        });
      });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  seeMore = e => {
    this.setState({ numCounties: this.state.numCounties + 10 });
    e.preventDefault();
    return false;
  };

  render() {
    return (
      <OverloadedHospitalsContainer>
        <h1>Counties most at risk of hospital overload from COVID</h1>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>County, State</th>
              <th>Overload</th>
              <th>Peak</th>
              <th>Bed Shortfall</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.counties &&
              _.take(this.state.counties, this.state.numCounties).map(
                ({ countyName, stateName, projections, fips, path }, idx) => (
                  <tr key={fips}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{countyName}</strong>
                      <br />
                      {stateName}
                    </td>
                    <td>
                      {projections.hospitalBeds.shortageStartDate.format(
                        'MMM D',
                      )}
                    </td>
                    <td>{projections.hospitalBeds.peakDate.format('MMM D')}</td>
                    <td>{projections.hospitalBeds.peakShortfall}</td>
                    <td>
                      <a href={path}>
                        Details <NavigateNextIcon />
                      </a>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
        <p>
          Showing <strong>{this.state.numCounties} counties</strong>{' '}
          {this.state.numCounties < 100 && (
            <a href="#" onClick={this.seeMore}>
              See more
            </a>
          )}
        </p>
      </OverloadedHospitalsContainer>
    );
  }
}
