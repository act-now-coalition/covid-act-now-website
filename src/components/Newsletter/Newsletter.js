import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020';
import { each } from 'lodash';

import { StyledNewsletter, InputHolder } from './Newsletter.style';

const Newsletter = props => {
  const submitForm = e => {
    console.log(e);
    e.preventDefault();
    window.gtag('event', 'subscribe', {
      event_category: 'engagement',
    });
    let url = new URL('https://createsend.com/t/getsecuresubscribelink');
    url.searchParams.append('email', email);
    url.searchParams.append(
      'data',
      '2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446',
    );

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.text().then(text => {
          console.log(text);
          console.log(new FormData(this.form));
          this.form.action = text;
          this.form.submit();
        });
      })
      .then(data => {
        console.log(data);
      });
  };

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

  const { stateId, county } = props;
  const [value, setValue] = React.useState(
    autocomplete_options.filter(
      option =>
        option.state_code === stateId &&
        (option.county === county || option.county === undefined),
    ),
  );
  const [email, setEmail] = React.useState('');
  const [newsletterSignup, setNewsletterSignup] = React.useState(true);

  // subscription link https://confirmsubscription.com/h/t/58A40B3258BE0D56
  return (
    <StyledNewsletter>
      <form
        className="js-cm-form"
        id="subForm"
        method="post"
        onSubmit={evt => submitForm(evt)}
        data-id="2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446E"
      >
        {/* <input
          hidden
          readOnly
          aria-label="state"
          value={stateId || ''}
          id="fieldjlkiyul"
          maxLength="200"
          name="cm-f-jlkiyul"
        />
        <input
          hidden
          readOnly
          aria-label="county"
          value={county || ''}
          id="fieldjlkulhk"
          maxLength="200"
          name="cm-f-jlkulhk"
        /> */}
        <InputHolder>
          <input
            id="checkbox"
            name="newsletter"
            type="checkbox"
            checked={newsletterSignup}
            onChange={e => {
              setNewsletterSignup(!newsletterSignup);
            }}
          />
          <label for="checkbox">
            {' '}
            Also send me <b>daily news</b> with the latest data and scientific
            findings on COVID{' '}
          </label>
        </InputHolder>
        <Autocomplete
          multiple
          id="alert-locations"
          value={value}
          getOptionSelected={(option, value) =>
            option.full_fips_code === value.full_fips_code
          }
          onChange={(event, newValue) => {
            setValue([...newValue]);
          }}
          options={autocomplete_options}
          getOptionLabel={option => option.county || option.state}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option.county || option.state}
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
            autoComplete="Email"
            aria-label="Email"
            placeholder="Enter your email address"
            className="js-cm-email-input qa-input-email"
            id="fieldEmail"
            maxLength="200"
            name="cm-wurhhh-wurhhh"
            required=""
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit">Sign up</button>
        </InputHolder>
      </form>
      <script
        type="text/javascript"
        src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"
      />
    </StyledNewsletter>
  );
};

export default Newsletter;

{
  /*
  Script from campaign monitor
  <div>
   <h1 color="#000">Get the latest from Covid Act Now</h1>
   <form class="js-cm-form" id="subForm" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="2BE4EF332AA2E32596E38B640E905619E90CD5DAC48A878CDEBFFE3B420D8CD24E4AEABAB52A4CE3526219C7A966AE965B84F99C823C89EFF1F01B28DE4F975E">
      <div>
         <div><label>Name </label><input aria-label="Name" id="fieldName" maxlength="200" name="cm-name"></div>
         <div><label>Email </label><input autocomplete="Email" aria-label="Email" class="js-cm-email-input qa-input-email" id="fieldEmail" maxlength="200" name="cm-yddtsd-yddtsd" required="" type="email"></div>
         <div><label>alert_list_csv </label><input aria-label="alert_list_csv" id="fieldjrdtwy" maxlength="200" name="cm-f-jrdtwy"></div>
         <div><label>newsletter_opt_out </label><input aria-label="newsletter_opt_out" id="fieldjrdtwt" maxlength="200" name="cm-f-jrdtwt"></div>
         <div><label>state </label><input aria-label="state" id="fieldjrdtwi" maxlength="200" name="cm-f-jrdtwi"></div>
         <div><label>county </label><input aria-label="county" id="fieldjrdtwd" maxlength="200" name="cm-f-jrdtwd"></div>
      </div>
      <button type="submit">Subscribe</button>
   </form>
</div>
<script type="text/javascript" src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"></script> */
}
