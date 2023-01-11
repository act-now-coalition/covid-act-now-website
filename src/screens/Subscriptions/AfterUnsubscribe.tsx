import React, { createRef } from 'react';
import { Wrapper, Header, BodyCopy } from './Subscriptions.style';
import { EventAction, EventCategory } from 'components/Analytics';
import ExternalLink from 'components/ExternalLink';
import { LargeFilledButton } from 'components/ButtonSystem';

const AfterUnsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';
  const formRef = createRef<HTMLFormElement>();

  // We'll go ahead and prefetch the link so it's ready if/when they click the
  // subscribe link.
  const formAction = getFormActionLink(email);

  const onSubscribeClick = async () => {
    if (formRef?.current) {
      formRef.current.action = await formAction;
      formRef.current.submit();
    }
  };

  return (
    <Wrapper>
      <Header>One last thing...</Header>
      <BodyCopy>
        <p>
          Hi there! It looks like you're leaving us. We're sorry to see you go
          and wanted to thank you for being a subscriber and supporter of Covid
          Act Now.
        </p>
        <p>
          Our organization will be working on some exciting new projects in the
          future. Our mission is the same: to help people make informed
          decisions by focusing on{' '}
          <ExternalLink href="https://covidactnow.org/about">
            data, transparency and accessibility
          </ExternalLink>
          .
        </p>
        <p>
          If you would like to be alerted about our new ventures, click the
          button below. And if there are any issues, topics or current events
          that you think could benefit from the Covid Act Now approach please
          let us know at{' '}
          <a href="mailto:contact@actnowcoalition.org">
            contact@actnowcoalition.org
          </a>
          .
        </p>
      </BodyCopy>
      <LargeFilledButton
        onClick={onSubscribeClick}
        trackingCategory={EventCategory.ENGAGEMENT}
        trackingAction={EventAction.SUBSCRIBE}
        trackingLabel="Future Projects (after-unsubscribe)"
      >
        Alert me about future projects
      </LargeFilledButton>

      {/*
          Form originally generated from https://covidactnow.createsend.com/subscribers/signupformbuilder/CF15EB108C36FA37
          (including the weird IDs, etc.)
         */}
      <form
        ref={formRef}
        className="js-cm-form"
        id="subForm"
        method="POST"
        data-id={CREATESEND_DATA_ID}
      >
        <input
          className="js-cm-email-input qa-input-email"
          id="fieldEmail"
          name="cm-jrjjlhr-jrjjlhr"
          type="hidden"
          value={email}
        />
      </form>
    </Wrapper>
  );
};

export default AfterUnsubscribe;

const CREATESEND_DATA_ID =
  '2BE4EF332AA2E32596E38B640E905619870E74723062A0063B893518B3DF0E78D82D32E2B527067C1448DA5B9AB1A453761A10515342B3F0E968D27B0371E31A';

export async function getFormActionLink(emailAddress: string) {
  let url = new URL('https://createsend.com/t/getsecuresubscribelink');
  url.searchParams.append('email', encodeURIComponent(emailAddress));
  url.searchParams.append('data', CREATESEND_DATA_ID);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });

  return response.text();
}
