import React, { Fragment } from 'react';
import ExternalLink from 'components/ExternalLink';

function getCovidExplainedFooter(): React.ReactElement {
  return (
    <Fragment>
      *COVID Explained is a team of researchers and students from Brown
      University, Harvard Medical School, Massachusetts Institute of Technology,
      Massachusetts General Hospital, and more. Learn more at{' '}
      <ExternalLink href="https://explaincovid.org/about">
        explaincovid.org/about
      </ExternalLink>
    </Fragment>
  );
}

export default getCovidExplainedFooter;
