import React from 'react';
import { StyledNewsletter, NewsletterCopy } from './Newsletter.style';

const Newsletter = ({stateAbbr, stateFull, county}) => {
  const location = county ? ` in ${county}` : stateFull ? ` in ${stateFull}` : stateAbbr ? ` in ${stateAbbr}` : '';;
  return (
    <StyledNewsletter>
      <NewsletterCopy color="inherit" component="p" variant="subtitle2">
        Get the latest projections for when COVID will overload hospitals {location}
      </NewsletterCopy>
      <form className="js-cm-form" id="subForm" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="2BE4EF332AA2E32596E38B640E905619AA6E1FB8D17A78ED48A8BBBF6B7BCEE2B5CA9AB5B4861F0A4E7AD231EC5D9077A3A8C1F7BFD94F2E4DA103E6791E7F2A">
        <input hidden readOnly aria-label="state" value={stateAbbr || ''} id="fieldjlkiiyj" maxLength="200" name="cm-f-jlkiiyj" />
        <input hidden readOnly aria-label="county" value={county || ''} id="fieldjlkiiyt" maxLength="200" name="cm-f-jlkiiyt" />
        <input autoComplete="Email" aria-label="Email" placeholder="Enter your email address" className="js-cm-email-input qa-input-email" id="fieldEmail" maxLength="200" name="cm-wuyluk-wuyluk" required="" type="email" />
        <button type="submit">Sign up</button>
      </form>
      <script type="text/javascript" src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js">
      </script>
    </StyledNewsletter>
  );
};

export default Newsletter;
