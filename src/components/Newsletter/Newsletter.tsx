import React from 'react';
import { StyledNewsletter } from './Newsletter.style';

export default function Newsletter({
  location,
  county,
}: {
  location?: string;
  county?: string;
}) {
  const form = React.useRef<HTMLFormElement>(null);
  const emailInput = React.useRef<HTMLInputElement>(null);

  const submitForm = (e: React.FormEvent<any>) => {
    if (form.current == null || emailInput.current == null) return;

    e.preventDefault();
    window.gtag('event', 'subscribe', {
      event_category: 'engagement',
    });

    let url = new URL('https://createsend.com/t/getsecuresubscribelink');
    url.searchParams.append('email', emailInput.current.value);
    url.searchParams.append('data', form.current.getAttribute('data-id')!);
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        response.text().then(text => {
          if (form.current == null) return;
          form.current.action = text;
          form.current.submit();
        });
      })
      .then(data => {
        console.log(data);
      });
  };

  return (
    <StyledNewsletter>
      <form
        ref={form}
        className="js-cm-form"
        id="subForm"
        method="post"
        data-id="2BE4EF332AA2E32596E38B640E905619AA6E1FB8D17A78ED48A8BBBF6B7BCEE2B5CA9AB5B4861F0A4E7AD231EC5D9077A3A8C1F7BFD94F2E4DA103E6791E7F2A"
      >
        <input
          hidden
          readOnly
          aria-label="state"
          value={location || ''}
          id="fieldjlkiiyj"
          maxLength={200}
          name="cm-f-jlkiiyj"
        />
        <input
          hidden
          readOnly
          aria-label="county"
          value={county || ''}
          id="fieldjlkiiyt"
          maxLength={200}
          name="cm-f-jlkiiyt"
        />
        <input
          ref={emailInput}
          autoComplete="Email"
          aria-label="Email"
          placeholder="Enter your email address"
          className="js-cm-email-input qa-input-email"
          id="fieldEmail"
          maxLength={200}
          name="cm-wuyluk-wuyluk"
          required
          type="email"
        />
        <button type="submit" onClick={submitForm}>
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
