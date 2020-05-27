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
          console.log(new FormData(this.form));
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
          data-id="2BE4EF332AA2E32596E38B640E90561930C9C3A433D015D9D4BD88E99175E51395EF5EBFFD527179E032AC15455BB1208D87A6CE87843E524B0EA520CBFF446E"
        >
          <input
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
          />
          <input
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
