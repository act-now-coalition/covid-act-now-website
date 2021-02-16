import React from 'react';
import { Switch, Redirect } from 'common/utils/router';
import explainedArticles from 'cms-content/explained';

const DeepDivesRedirect: React.FC = () => {
  return (
    <Switch>
      {explainedArticles.map(({ articleID }) => (
        <Redirect
          exact
          from={`/deep-dives/${articleID}`}
          to={`/covid-explained/${articleID}`}
        />
      ))}
      <Redirect exact from="/deep-dives" to="/covid-explained" />
    </Switch>
  );
};

export default DeepDivesRedirect;
