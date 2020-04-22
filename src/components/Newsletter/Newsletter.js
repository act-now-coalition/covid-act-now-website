import React from 'react';
import { StyledNewsletter } from './Newsletter.style';

class Newsletter extends React.Component {
  constructor() {
    super();
    this.form = null;
    this.emailInput = null;
    this.submitForm = this.submitForm.bind(this);
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

  render() {
    const { stateId, county } = this.props;
    return (
      <StyledNewsletter>
        <form
          ref={f => (this.form = f)}
          className="js-cm-form"
          id="subForm"
          method="post"
          data-id="2BE4EF332AA2E32596E38B640E905619AA6E1FB8D17A78ED48A8BBBF6B7BCEE2B5CA9AB5B4861F0A4E7AD231EC5D9077A3A8C1F7BFD94F2E4DA103E6791E7F2A"
        >
          <input
            hidden
            readOnly
            aria-label="state"
            value={stateId || ''}
            id="fieldjlkiiyj"
            maxLength="200"
            name="cm-f-jlkiiyj"
          />
          <input
            hidden
            readOnly
            aria-label="county"
            value={county || ''}
            id="fieldjlkiiyt"
            maxLength="200"
            name="cm-f-jlkiiyt"
          />
          <input
            ref={i => (this.emailInput = i)}
            autoComplete="Email"
            aria-label="Email"
            placeholder="Enter your email address"
            className="js-cm-email-input qa-input-email"
            id="fieldEmail"
            maxLength="200"
            name="cm-wuyluk-wuyluk"
            required=""
            type="email"
          />
          <button type="submit" onClick={this.submitForm}>
            Sign up
          </button>
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
