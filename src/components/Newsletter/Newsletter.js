import React from 'react';
import regions, { County, getStateCode } from 'common/regions';
import { isValidEmail } from 'common/utils';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import AutocompleteRegions from 'components/AutocompleteRegions';
import { getDefaultRegions, subscribeToLocations } from './utils';
import {
  StyledNewsletter,
  SubscribeButton,
  InputHolder,
  InputError,
} from './Newsletter.style';

class Newsletter extends React.Component {
  constructor(props) {
    super();
    this.form = null;
    this.emailInput = null;
    this.state = {
      dailyDownloadChecked: true,
      email: '',
      errorMessage: '',
      selectedRegions: props.region ? getDefaultRegions(props.region) : [],
      showConfirmationText: false,
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(e) {
    e.preventDefault();
    const { email } = this.state;

    if (isValidEmail(email)) {
      await this.subscribeToAlerts();
      trackEvent(EventCategory.ENGAGEMENT, EventAction.SUBSCRIBE);

      // If they are signing up for daily download (in addition to alerts), then we
      // submit the Campaign Monitor signup form, which will land them on a Campaign
      // Monitor confirmation page.
      if (this.state.dailyDownloadChecked) {
        let url = new URL('https://createsend.com/t/getsecuresubscribelink');
        url.searchParams.append('email', this.emailInput.value);
        url.searchParams.append('data', this.form.getAttribute('data-id'));

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        });
        const text = await response.text();
        this.form.action = text;
        this.form.submit();
      } else {
        // Since we didn't use the Campaign Monitor signup form we need to show our
        // own confirmation UI (just change the button text/color for 3sec).
        this.setState({ showConfirmationText: true });
        setTimeout(() => {
          this.setState({ showConfirmationText: false });
        }, 3000);
      }
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
    const {
      dailyDownloadChecked,
      selectedRegions,
      errorMessage,
      showConfirmationText,
    } = this.state;
    const countyName = region instanceof County ? region.name : null;
    const stateCode = region ? getStateCode(region) : null;
    const errMessageOpen = errorMessage.length > 0;

    const onChangeRegions = (event, newSelectedRegions) => {
      this.setState({ selectedRegions: newSelectedRegions });
    };

    return (
      <StyledNewsletter>
        {/*
        This form comes from the signup form builder for the "Full Sign Up List_Scrubbed" list
        in Campaign Monitor (under Lists & subscribers).
        (https://covidactnow.createsend.com/subscribers/signupformbuilder/1cb29de18ed7358f).
        From there choose the option where you add code to your website without css.
        To update grab the data-id, classNames, ids and names for each of the inputs in order to subscribe users.
         */}
        <form
          ref={f => (this.form = f)}
          className="js-cm-form"
          id="subForm"
          method="post"
          data-id="2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446E"
        >
          <input
            hidden
            readOnly
            aria-label="state"
            value={stateCode || ''}
            id="fieldjlkiyul"
            maxLength="200"
            name="cm-f-jlkiyul"
          />
          <input
            hidden
            readOnly
            aria-label="county"
            id="fieldjlkulhk"
            maxLength="200"
            name="cm-f-jlkulhk"
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
              className="fs-exclude"
              ref={i => (this.emailInput = i)}
              autoComplete="Email"
              aria-label="Email"
              placeholder="Enter your email address"
              className="js-cm-email-input qa-input-email"
              id="fieldEmail"
              maxLength="200"
              name="cm-wurhhh-wurhhh"
              required=""
              type="email"
              onChange={e => this.handleSetEmail(e.target.value)}
            />
            <SubscribeButton
              type="submit"
              onClick={this.submitForm}
              confirmation={showConfirmationText}
            >
              {showConfirmationText ? 'Subscribed!' : 'Sign up'}
            </SubscribeButton>
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
              onChange={() =>
                this.setState({ dailyDownloadChecked: !dailyDownloadChecked })
              }
              checked={dailyDownloadChecked}
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
