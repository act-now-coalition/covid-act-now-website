import React from 'react';

import Endorsements from 'screens/Endorsements/Endorsements';
import { Wrapper } from 'screens/Endorsements/EndorsementsPage.style.js';
import AppMetaTags from '../../components/AppMetaTags/AppMetaTags';

const EndorsementsPage = () => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/endorsements"
        pageTitle="Endorsements"
        pageDescription="While no projection is perfect, we endorse this tool and model as
              a valid and important way to frame the decisions political leaders
              must make now."
      />
      <Endorsements />
    </Wrapper>
  );
};

export default EndorsementsPage;
