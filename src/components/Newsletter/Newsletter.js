import React from 'react';
import regions, { County, getStateCode } from 'common/regions';
import { isValidEmail } from 'common/utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import AutocompleteRegions from 'components/AutocompleteRegions';
import { getDefaultRegions, subscribeToLocations } from './utils';
import { StyledNewsletter, InputHolder, InputError } from './Newsletter.style';

class Newsletter extends React.Component {
  constructor(props) {
    super();
    this.form = null;
    this.emailInput = null;
    this.state = {
      checked: true,
      email: '',
      errorMessage: '',
      selectedRegions: props.region ? getDefaultRegions(props.region) : [],
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(e) {
    e.preventDefault();
    const { email } = this.state;

    // can't submit the form without the email entered and email that is valid
    if (isValidEmail(email)) {
      await this.subscribeToAlerts();
      trackEvent(EventCategory.ENGAGEMENT, EventAction.SUBSCRIBE);
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
    } else {
      this.setState({ errorMessage: 'Must supply a valid email address' });
    }
  }

  async subscribeToAlerts() {
    const email = this.emailInput.value;
    const { selectedRegions } = this.state;
    const fipsList = selectedRegions.map(region => region.fipsCode);
    if (fipsList.length) {
      await subscribeToLocations(email, fipsList);
    }
  }

  handleSetEmail = email => {
    if (email) {
      this.setState({ email });
    }

    if (isValidEmail(email)) {
      this.setState({ errorMessage: '' });
    }
  };

  render() {
    const { region } = this.props;
    const { checked, selectedRegions, errorMessage } = this.state;
    const countyName = region instanceof County ? region.name : null;
    const stateCode = region ? getStateCode(region) : null;
    const errMessageOpen = errorMessage.length > 0;

    const onChangeRegions = (event, newSelectedRegions) => {
      this.setState({ selectedRegions: newSelectedRegions });
    };

    return (
      <StyledNewsletter>
        {/* This form comes from the signup form builder
        (https://covidactnow.createsend.com/subscribers/signupformbuilder/<listid>) within the subscribers page
        From there choose the option where you add code to your website without css.
        To update grab the data-id, classNames, ids and names for each of the inputs in order to subscribe users.
        We hide some of the information users don't need to enter and add some form fields that the api doesn't
        require (i.e the alert-loctions autocomplete).
         */}
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
            value={stateCode || ''}
            id="fieldjrdtwi"
            maxLength="200"
            name="cm-f-jrdtwi"
          />
          <input
            hidden
            readOnly
            aria-label="county"
            id="fieldjrdtwd"
            maxLength="200"
            name="cm-f-jrdtwd"
            value={countyName || ''}
          />
          <AutocompleteRegions
            regions={regions.all()}
            selectedRegions={selectedRegions}
            onChangeRegions={onChangeRegions}
            placeholder="+ Add alert locations"
          />
          <InputHolder>
            <input
              ref={i => (this.emailInput = i)}
              autoComplete="Email"
              aria-label="Email"
              placeholder="Enter your email address"
              className="js-cm-email-input qa-input-email"
              id="fieldEmail"
              maxLength="200"
              name="cm-yddtsd-yddtsd"
              required=""
              type="email"
              onChange={e => this.handleSetEmail(e.target.value)}
            />
            <button type="submit" onClick={this.submitForm}>
              Sign up
            </button>
          </InputHolder>
          {this.state.errorMessage && (
            <InputError>{this.state.errorMessage}</InputError>
          )}
          <InputHolder errMessageOpen={errMessageOpen}>
            <input
              type="checkbox"
              value="wurhhh"
              id="wurhhh"
              name="cm-ol-wurhhh"
              onChange={() => this.setState({ checked: !checked })}
              checked={checked}
            />
            <label htmlFor="checkbox">
              Also send me <b>daily news</b> with the latest data and scientific
              findings on COVID
            </label>
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
