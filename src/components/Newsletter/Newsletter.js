import React from 'react';
import { StyledNewsletter, InputHolder } from './Newsletter.style';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { each } from 'lodash';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';

class Newsletter extends React.Component {
  constructor() {
    super();
    this.form = null;
    this.emailInput = null;
    this.alertsSelectionArray = [];
    this.state = { alertSignUps: '' };
    this.submitForm = this.submitForm.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    window.gtag('event', 'subscribe', {
      event_category: 'engagement',
    });
    let url = new URL('https://createsend.com/t/getsecuresubscribelink');
    url.searchParams.append('email', this.emailInput.value);
    url.searchParams.append('data', this.form.getAttribute('data-id'));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.text().then(text => {
          this.form.action = text;
          this.form.submit();
        });
      })
      .then(data => {
        console.log(data);
      });
  }

  handleSelectChange = selectedOption => {
    this.alertsSelectionArray = selectedOption;
    this.setState({
      alertSignUps: this.alertsSelectionArray
        .map(item => item.full_fips_code)
        .join(','),
    });
  };

  render() {
    const { stateId, county } = this.props;

    const stateDataset = US_STATE_DATASET.state_dataset.map(state => {
      return {
        ...state,
        full_fips_code: state.state_fips_code + '000',
      };
    });
    const countyDataset = [];

    each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
      countyDataset.push(...value.county_dataset);
    });

    const autocomplete_options = stateDataset.concat(countyDataset);

    return (
      <StyledNewsletter>
        <form
          ref={f => (this.form = f)}
          className="js-cm-form"
          id="subForm"
          method="post"
          data-id="2BE4EF332AA2E32596E38B640E905619E90CD5DAC48A878CDEBFFE3B420D8CD24E4AEABAB52A4CE3526219C7A966AE965B84F99C823C89EFF1F01B28DE4F975E"
        >
          <input
            hidden
            readOnly
            aria-label="state"
            value={stateId || ''}
            id="fieldjrdtwi"
            maxlength="200"
            name="cm-f-jrdtwi"
          />
          <input
            hidden
            readOnly
            aria-label="county"
            id="fieldjrdtwd"
            maxlength="200"
            name="cm-f-jrdtwd"
            value={county || ''}
          />
          <InputHolder>
            <input
              type="checkbox"
              value="wurhhh"
              id="wurhhh"
              name="cm-ol-wurhhh"
            />
            <label for="checkbox">
              {' '}
              Also send me <b>daily news</b> with the latest data and scientific
              findings on COVID{' '}
            </label>
          </InputHolder>
          <input
            hidden
            aria-label="alert_list_csv"
            id="fieldjrdtwy"
            maxlength="200"
            name="cm-f-jrdtwy"
            onChange={value => {
              console.log(value);
            }}
            value={this.state.alertSignUps}
          />
          <Autocomplete
            multiple
            id="alert-locations"
            getOptionSelected={(option, value) =>
              option.full_fips_code === value.full_fips_code
            }
            onChange={(event, newValue) => {
              this.handleSelectChange(newValue);
            }}
            options={autocomplete_options}
            getOptionLabel={option =>
              option.county
                ? `${option.county}, ${option.state_code}`
                : option.state
            }
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={
                    option.county
                      ? `${option.county}, ${option.state_code}`
                      : option.state
                  }
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={params => (
              <TextField {...params} placeholder="Enter alert locations" />
            )}
          />
          <InputHolder>
            <input
              ref={i => (this.emailInput = i)}
              autoComplete="Email"
              aria-label="Email"
              placeholder="Enter your email address"
              class="js-cm-email-input qa-input-email"
              id="fieldEmail"
              maxlength="200"
              name="cm-yddtsd-yddtsd"
              required=""
              type="email"
            />
            <button type="submit" onClick={this.submitForm}>
              Sign up
            </button>
          </InputHolder>
        </form>
        <script
          type="text/javascript"
          src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
        />
      </StyledNewsletter>
    );
  }
}

export default Newsletter;
